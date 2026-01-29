/**
 * Smart Salary Slicer - Constants
 *
 * Application constants including category configuration and chart settings.
 */

import { Home, ShoppingBag, PiggyBank } from 'lucide-react';
import type { CategoryConfigMap } from '../types/budget';

// ========================================
// CATEGORY COLORS
// ========================================

export const CATEGORY_COLORS = {
  needs: {
    primary: '#8B5CF6',
    light: '#A78BFA',
    dark: '#7C3AED',
    glow: 'rgba(139, 92, 246, 0.3)',
    shadow: '0 0 20px rgba(139, 92, 246, 0.4)',
  },
  wants: {
    primary: '#10B981',
    light: '#34D399',
    dark: '#059669',
    glow: 'rgba(16, 185, 129, 0.3)',
    shadow: '0 0 20px rgba(16, 185, 129, 0.4)',
  },
  savings: {
    primary: '#06B6D4',
    light: '#22D3EE',
    dark: '#0891B2',
    glow: 'rgba(6, 182, 212, 0.3)',
    shadow: '0 0 20px rgba(6, 182, 212, 0.4)',
  },
} as const;

// ========================================
// CATEGORY CONFIGURATION
// ========================================

export const CATEGORY_CONFIG: CategoryConfigMap = {
  needs: {
    label: 'Needs',
    color: CATEGORY_COLORS.needs.primary,
    lightColor: CATEGORY_COLORS.needs.light,
    darkColor: CATEGORY_COLORS.needs.dark,
    glow: CATEGORY_COLORS.needs.glow,
    shadow: CATEGORY_COLORS.needs.shadow,
    icon: Home,
    defaultPercentage: 50,
    description: 'Essential expenses like rent, groceries, and utilities',
  },
  wants: {
    label: 'Wants',
    color: CATEGORY_COLORS.wants.primary,
    lightColor: CATEGORY_COLORS.wants.light,
    darkColor: CATEGORY_COLORS.wants.dark,
    glow: CATEGORY_COLORS.wants.glow,
    shadow: CATEGORY_COLORS.wants.shadow,
    icon: ShoppingBag,
    defaultPercentage: 30,
    description: 'Non-essential spending like dining out and entertainment',
  },
  savings: {
    label: 'Savings',
    color: CATEGORY_COLORS.savings.primary,
    lightColor: CATEGORY_COLORS.savings.light,
    darkColor: CATEGORY_COLORS.savings.dark,
    glow: CATEGORY_COLORS.savings.glow,
    shadow: CATEGORY_COLORS.savings.shadow,
    icon: PiggyBank,
    defaultPercentage: 20,
    description: 'Emergency fund, investments, and future goals',
  },
} as const;

// ========================================
// CHART CONFIGURATION
// ========================================

export const CHART_CONFIG = {
  innerRadius: '60%',
  outerRadius: '80%',
  paddingAngle: 2,
  cornerRadius: 4,
  startAngle: 90,
  endAngle: -270,
  animationDuration: 500,
  animationEasing: 'ease-out',
} as const;

// ========================================
// INPUT CONFIGURATION
// ========================================

export const INPUT_CONFIG = {
  minIncome: 0,
  maxIncome: 999999999,
  decimalPlaces: 2,
} as const;

// ========================================
// SLIDER CONFIGURATION
// ========================================

export const SLIDER_CONFIG = {
  min: 0,
  max: 100,
  step: 1,
} as const;

// ========================================
// DEFAULT VALUES
// ========================================

export const DEFAULT_VALUES = {
  monthlyIncome: 5000,
  needsPercentage: 50,
  wantsPercentage: 30,
  savingsPercentage: 20,
  daysInMonth: 30,
} as const;

// ========================================
// BUDGET PRESETS (LIFE MODES)
// ========================================

export const BUDGET_PRESETS = {
  student: {
    label: 'Student',
    description: 'High needs, minimal wants, modest savings',
    percentages: { needs: 70, wants: 10, savings: 20 },
  },
  balanced: {
    label: 'Balanced',
    description: 'Classic 50/30/20 rule',
    percentages: { needs: 50, wants: 30, savings: 20 },
  },
  aggressive: {
    label: 'Aggressive Saver',
    description: 'Maximum savings, minimal spending',
    percentages: { needs: 30, wants: 0, savings: 70 },
  },
  family: {
    label: 'Family',
    description: 'Higher needs, balanced wants and savings',
    percentages: { needs: 60, wants: 25, savings: 15 },
  },
} as const;

export type PresetKey = keyof typeof BUDGET_PRESETS;

// ========================================
// ANIMATION CONFIGURATION
// ========================================

export const ANIMATION_CONFIG = {
  duration: {
    fast: 150,
    normal: 200,
    slow: 300,
  },
  easing: {
    default: 'cubic-bezier(0.4, 0, 0.2, 1)',
    bounce: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
  },
} as const;
