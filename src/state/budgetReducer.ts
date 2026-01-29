/**
 * Smart Salary Slicer - Budget Reducer
 *
 * Reducer function for managing budget state with smart percentage distribution.
 */

import type { AppState, BudgetAction, CategoryType, Percentages, ValidationResult } from '../types/budget';
import { INITIAL_STATE, DEFAULT_PERCENTAGES } from '../types/budget';

// Re-export for backward compatibility
export { INITIAL_STATE };

/**
 * Validates and adjusts percentages
 * (Deprecated: logic moved directly to reducer for independent sliders)
 */
function validateAndAdjustPercentages(
  current: Percentages,
  category: CategoryType,
  value: number
): ValidationResult {
  // Simple fallback that reflects the new independent logic
  const otherSum = Object.entries(current)
    .filter(([cat]) => cat !== category)
    .reduce((sum, [, val]) => sum + val, 0);
  const clamped = Math.max(0, Math.min(100 - otherSum, value));
  const next = { ...current, [category]: clamped };
  return {
    isValid: Math.abs(Object.values(next).reduce((a, b) => a + b, 0) - 100) < 0.01,
    adjustedPercentages: next
  };
}

/**
 * Budget reducer function
 */
export function budgetReducer(state: AppState, action: BudgetAction): AppState {
  switch (action.type) {
    case 'SET_INCOME': {
      const income = Math.max(0, action.payload);
      return {
        ...state,
        monthlyIncome: income,
      };
    }

    case 'SET_CURRENCY': {
      return {
        ...state,
        currency: action.payload,
      };
    }
    
    case 'SET_PERCENTAGE': {
      const { category, value } = action.payload;
      
      console.log('Reducer SET_PERCENTAGE:', category, value);
      
      // Calculate max allowed value for this category (100 - sum of others)
      const otherCategoriesSum = Object.entries(state.percentages)
        .filter(([cat]) => cat !== category)
        .reduce((sum, [, val]) => sum + val, 0);
      const maxAllowed = 100 - otherCategoriesSum;
      
      // Clamp value to valid range [0, maxAllowed]
      const clampedValue = Math.max(0, Math.min(maxAllowed, value));
      
      const newPercentages = {
        ...state.percentages,
        [category]: clampedValue,
      };
      
      const totalPercent = Object.values(newPercentages).reduce((sum, val) => sum + val, 0);
      const isValid = Math.abs(totalPercent - 100) < 0.01;
      
      return {
        ...state,
        percentages: newPercentages,
        isValid,
      };
    }
    
    case 'SET_PRESET': {
      return {
        ...state,
        percentages: { ...action.payload },
        isValid: true,
      };
    }
    
    case 'RESET_TO_DEFAULT': {
      return {
        ...state,
        percentages: { ...DEFAULT_PERCENTAGES },
        isValid: true,
      };
    }
    
    case 'SET_ACTIVE_CATEGORY': {
      return {
        ...state,
        activeCategory: action.payload,
      };
    }
    
    default:
      return state;
  }
}

export { validateAndAdjustPercentages };
