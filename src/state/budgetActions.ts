/**
 * Smart Salary Slicer - Budget Actions
 * 
 * Action creators for the budget reducer.
 */

import type { CategoryType, BudgetAction, Percentages, CurrencyCode } from '../types/budget';

/**
 * Action creator for setting monthly income
 */
export function setIncome(value: number): BudgetAction {
  return {
    type: 'SET_INCOME',
    payload: value,
  };
}

/**
 * Action creator for setting selected currency
 */
export function setCurrency(currency: CurrencyCode): BudgetAction {
  return {
    type: 'SET_CURRENCY',
    payload: currency,
  };
}

/**
 * Action creator for setting a category percentage
 */
export function setPercentage(category: CategoryType, value: number): BudgetAction {
  return {
    type: 'SET_PERCENTAGE',
    payload: { category, value },
  };
}

/**
 * Action creator for applying a preset
 */
export function setPreset(percentages: Percentages): BudgetAction {
  return {
    type: 'SET_PRESET',
    payload: percentages,
  };
}

/**
 * Action creator for resetting to default percentages
 */
export function resetToDefault(): BudgetAction {
  return {
    type: 'RESET_TO_DEFAULT',
  };
}

/**
 * Action creator for setting the active/hovered category
 */
export function setActiveCategory(category: CategoryType | null): BudgetAction {
  return {
    type: 'SET_ACTIVE_CATEGORY',
    payload: category,
  };
}
