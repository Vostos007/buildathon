/**
 * Smart Salary Slicer - useBudget Hook
 * 
 * Main hook for managing budget state and dispatching actions.
 */

import { useReducer, useCallback, useEffect } from 'react';
import type { AppState, CategoryType, Percentages, CurrencyCode } from '../types/budget';
import { INITIAL_STATE } from '../types/budget';
import { budgetReducer } from '../state/budgetReducer';
import {
  setIncome,
  setCurrency,
  setPercentage,
  setPreset,
  resetToDefault,
  setActiveCategory,
} from '../state/budgetActions';
import { loadState, saveState } from '../utils/storage';

/**
 * Return type for useBudget hook
 */
interface UseBudgetReturn {
  state: AppState;
  actions: {
    setIncome: (value: number) => void;
    setCurrency: (currency: CurrencyCode) => void;
    setPercentage: (category: CategoryType, value: number) => void;
    setPreset: (percentages: Percentages) => void;
    resetToDefault: () => void;
    setActiveCategory: (category: CategoryType | null) => void;
  };
}

/**
 * Hook for managing budget state
 */
export function useBudget(): UseBudgetReturn {
  // Load initial state from localStorage or use default
  const getInitialState = (): AppState => {
    const stored = loadState();
    if (stored) {
      return { 
        ...INITIAL_STATE, 
        ...stored,
        currency: (stored as any).currency || INITIAL_STATE.currency
      };
    }
    return INITIAL_STATE;
  };

  const [state, dispatch] = useReducer(budgetReducer, undefined, getInitialState);
  
  // Save to localStorage whenever state changes
  useEffect(() => {
    saveState(state);
  }, [state]);

  const handleSetIncome = useCallback((value: number) => {
    dispatch(setIncome(value));
  }, [dispatch]);

  const handleSetCurrency = useCallback((currency: CurrencyCode) => {
    dispatch(setCurrency(currency));
  }, [dispatch]);

  const handleSetPercentage = useCallback((category: CategoryType, value: number) => {
    dispatch(setPercentage(category, value));
  }, [dispatch]);
  
  const handleSetPreset = useCallback((percentages: Percentages) => {
    dispatch(setPreset(percentages));
  }, [dispatch]);

  const handleResetToDefault = useCallback(() => {
    dispatch(resetToDefault());
  }, [dispatch]);

  const handleSetActiveCategory = useCallback((category: CategoryType | null) => {
    dispatch(setActiveCategory(category));
  }, [dispatch]);

  return {
    state,
    actions: {
      setIncome: handleSetIncome,
      setCurrency: handleSetCurrency,
      setPercentage: handleSetPercentage,
      setPreset: handleSetPreset,
      resetToDefault: handleResetToDefault,
      setActiveCategory: handleSetActiveCategory,
    },
  };
}
