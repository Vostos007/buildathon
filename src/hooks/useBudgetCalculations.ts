/**
 * Smart Salary Slicer - useBudgetCalculations Hook
 * 
 * Hook for calculating derived budget values from state.
 */

import { useMemo } from 'react';
import type { AppState, Amounts, ChartData } from '../types/budget';
import { CATEGORY_TYPES } from '../types/budget';
import { CATEGORY_CONFIG } from '../constants/budget';

/**
 * Return type for useBudgetCalculations hook
 */
interface UseBudgetCalculationsReturn {
  amounts: Amounts;
  dailySafeToSpend: number;
  totalPercentage: number;
  chartData: ChartData[];
}

/**
 * Hook for calculating derived budget values
 */
export function useBudgetCalculations(state: AppState): UseBudgetCalculationsReturn {
  return useMemo(() => {
    // Calculate amounts for each category
    const amounts: Amounts = {
      needs: (state.monthlyIncome * state.percentages.needs) / 100,
      wants: (state.monthlyIncome * state.percentages.wants) / 100,
      savings: (state.monthlyIncome * state.percentages.savings) / 100,
    };

    // Calculate daily safe-to-spend (Wants / 30 days)
    const dailySafeToSpend = amounts.wants / 30;

    // Calculate total percentage (should always be 100)
    const totalPercentage = Object.values(state.percentages).reduce((sum, val) => sum + val, 0);

    // Generate chart data
    const chartData: ChartData[] = CATEGORY_TYPES.map(category => ({
      name: CATEGORY_CONFIG[category].label,
      value: state.percentages[category],
      color: CATEGORY_CONFIG[category].color,
      category,
      amount: amounts[category],
    }));

    return {
      amounts,
      dailySafeToSpend,
      totalPercentage,
      chartData,
    };
  }, [state.monthlyIncome, state.percentages]);
}
