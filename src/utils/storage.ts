/**
 * Smart Salary Slicer - Local Storage Utilities
 * 
 * Utilities for persisting state in localStorage.
 */

import type { AppState, Percentages, CurrencyCode } from '../types/budget';

const STORAGE_KEY = 'smart-salary-slicer-state';

interface StoredState {
  monthlyIncome: number;
  currency: CurrencyCode;
  percentages: Percentages;
}

/**
 * Load state from localStorage
 */
export function loadState(): Partial<AppState> | null {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return null;
    
    const parsed: StoredState = JSON.parse(stored);
    
    // Validate the data
    if (
      typeof parsed.monthlyIncome !== 'number' ||
      typeof parsed.percentages?.needs !== 'number' ||
      typeof parsed.percentages?.wants !== 'number' ||
      typeof parsed.percentages?.savings !== 'number'
    ) {
      return null;
    }
    
    // Validate percentages sum to ~100
    const total = parsed.percentages.needs + parsed.percentages.wants + parsed.percentages.savings;
    const isValid = Math.abs(total - 100) < 0.1;
    
    return {
      monthlyIncome: parsed.monthlyIncome,
      currency: parsed.currency || 'USD',
      percentages: parsed.percentages,
      isValid,
    };
  } catch (error) {
    console.error('Failed to load state from localStorage:', error);
    return null;
  }
}

/**
 * Save state to localStorage
 */
export function saveState(state: AppState): void {
  try {
    const toStore: StoredState = {
      monthlyIncome: state.monthlyIncome,
      currency: state.currency,
      percentages: state.percentages,
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(toStore));
  } catch (error) {
    console.error('Failed to save state to localStorage:', error);
  }
}

/**
 * Clear state from localStorage
 */
export function clearState(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Failed to clear state from localStorage:', error);
  }
}
