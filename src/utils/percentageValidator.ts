/**
 * Smart Salary Slicer - Percentage Validator
 * 
 * Utility functions for validating and adjusting percentage distributions.
 */

import type { CategoryType, Percentages, ValidationResult } from '../types/budget';
import { CATEGORY_TYPES } from '../types/budget';

/**
 * Calculate the sum of all percentages
 */
export function calculateTotalPercentage(percentages: Percentages): number {
  return Object.values(percentages).reduce((sum, val) => sum + val, 0);
}

/**
 * Check if percentages sum to 100%
 */
export function isValidPercentageDistribution(percentages: Percentages): boolean {
  const total = calculateTotalPercentage(percentages);
  return Math.abs(total - 100) < 0.01;
}

/**
 * Clamp a percentage value between 0 and 100
 */
export function clampPercentage(value: number): number {
  return Math.max(0, Math.min(100, value));
}

/**
 * Round a percentage to the nearest integer
 */
export function roundPercentage(value: number): number {
  return Math.round(value);
}

/**
 * Distribute a difference proportionally among categories
 */
function distributeProportionally(
  percentages: Percentages,
  categories: CategoryType[],
  difference: number
): Percentages {
  const total = categories.reduce((sum, cat) => sum + percentages[cat], 0);
  
  if (total === 0) {
    // If all are 0, distribute equally
    const equalShare = difference / categories.length;
    const result = { ...percentages };
    categories.forEach(cat => {
      result[cat] = equalShare;
    });
    return result;
  }
  
  const result = { ...percentages };
  categories.forEach(cat => {
    const proportion = percentages[cat] / total;
    result[cat] = Math.max(0, percentages[cat] - (difference * proportion));
  });
  
  return result;
}

/**
 * Adjust percentages to ensure they sum to exactly 100%
 * Fixes rounding errors by adjusting the largest category
 */
function fixRoundingError(percentages: Percentages, changedCategory: CategoryType): Percentages {
  const total = calculateTotalPercentage(percentages);
  const difference = 100 - total;
  
  if (Math.abs(difference) < 0.01) {
    return percentages;
  }
  
  // Find the largest category (excluding the one that was just changed)
  const otherCategories = CATEGORY_TYPES.filter(cat => cat !== changedCategory);
  const largest = otherCategories.reduce((a, b) => 
    percentages[a] > percentages[b] ? a : b
  );
  
  const adjusted = { ...percentages };
  adjusted[largest] = Math.max(0, adjusted[largest] + difference);
  
  return adjusted;
}

/**
 * Smart percentage adjustment algorithm
 * When one category changes, others adjust proportionally to maintain 100% total
 */
export function adjustPercentages(
  current: Percentages,
  changedCategory: CategoryType,
  newValue: number
): ValidationResult {
  // Clamp and round the new value
  const clampedValue = clampPercentage(roundPercentage(newValue));
  
  // Calculate the difference that needs to be distributed
  const difference = clampedValue - current[changedCategory];
  
  // If no change, return current state
  if (difference === 0) {
    return {
      isValid: true,
      adjustedPercentages: current,
    };
  }
  
  // Get other categories
  const otherCategories = CATEGORY_TYPES.filter(cat => cat !== changedCategory);
  const totalOthers = otherCategories.reduce((sum, cat) => sum + current[cat], 0);
  
  // Handle edge case: setting to 100%
  if (clampedValue >= 100) {
    return {
      isValid: true,
      adjustedPercentages: {
        needs: changedCategory === 'needs' ? 100 : 0,
        wants: changedCategory === 'wants' ? 100 : 0,
        savings: changedCategory === 'savings' ? 100 : 0,
      },
    };
  }
  
  // Handle edge case: other categories are all 0
  if (totalOthers === 0) {
    const remaining = 100 - clampedValue;
    const adjusted: Percentages = {
      [changedCategory]: clampedValue,
      needs: changedCategory === 'needs' ? clampedValue : remaining / 2,
      wants: changedCategory === 'wants' ? clampedValue : remaining / 2,
      savings: changedCategory === 'savings' ? clampedValue : 0,
    };
    
    // Ensure the non-changed categories sum to remaining
    if (changedCategory !== 'needs') adjusted.needs = remaining / 2;
    if (changedCategory !== 'wants') adjusted.wants = remaining / 2;
    if (changedCategory !== 'savings') adjusted.savings = 0;
    
    // Fix any rounding
    const final = fixRoundingError(adjusted, changedCategory);
    return { isValid: true, adjustedPercentages: final };
  }
  
  // Normal case: distribute proportionally
  let adjusted = distributeProportionally(
    { ...current, [changedCategory]: clampedValue },
    otherCategories,
    difference
  );
  
  // Round all values
  (Object.keys(adjusted) as CategoryType[]).forEach(cat => {
    adjusted[cat] = roundPercentage(adjusted[cat]);
  });
  
  // Fix any rounding errors
  adjusted = fixRoundingError(adjusted, changedCategory);
  
  // Final validation
  const finalTotal = calculateTotalPercentage(adjusted);
  const allNonNegative = Object.values(adjusted).every(v => v >= 0);
  
  return {
    isValid: allNonNegative && Math.abs(finalTotal - 100) < 0.1,
    adjustedPercentages: adjusted,
    errorMessage: !allNonNegative ? 'Percentages cannot be negative' : undefined,
  };
}

/**
 * Validate that a single percentage value is valid
 */
export function isValidPercentage(value: number): boolean {
  return !isNaN(value) && value >= 0 && value <= 100;
}

/**
 * Get the remaining percentage available for distribution
 */
export function getRemainingPercentage(percentages: Percentages): number {
  return 100 - calculateTotalPercentage(percentages);
}
