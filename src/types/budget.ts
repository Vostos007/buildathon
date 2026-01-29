/**
 * Smart Salary Slicer - TypeScript Types
 * 
 * Core type definitions for the budget calculator application.
 */

// ========================================
// CATEGORY TYPES
// ========================================

/**
 * Supported currency codes
 */
export type CurrencyCode = 'USD' | 'EUR' | 'GBP';

/**
 * The three main budget categories in the 50/30/20 rule
 */
export type CategoryType = 'needs' | 'wants' | 'savings';

/**
 * All valid category keys
 */
export const CATEGORY_TYPES: CategoryType[] = ['needs', 'wants', 'savings'];

// ========================================
// PERCENTAGE TYPES
// ========================================

/**
 * Percentage distribution across all categories
 */
export interface Percentages {
  needs: number;
  wants: number;
  savings: number;
}

/**
 * Percentage state with lock functionality
 */
export interface PercentageState {
  values: Percentages;
  locked: Record<CategoryType, boolean>;
}

// ========================================
// AMOUNT TYPES
// ========================================

/**
 * Calculated amounts for each category
 */
export interface Amounts {
  needs: number;
  wants: number;
  savings: number;
}

// ========================================
// CHART DATA TYPES
// ========================================

/**
 * Data structure for Recharts donut chart
 */
export interface ChartData {
  name: string;
  value: number;
  color: string;
  category: CategoryType;
  amount: number;
}

// ========================================
// STATE TYPES
// ========================================

/**
 * Core application state
 */
export interface AppState {
  /** User's monthly income */
  monthlyIncome: number;
  /** Selected currency */
  currency: CurrencyCode;
  /** Percentage distribution (must always sum to 100) */
  percentages: Percentages;
  /** UI validation state */
  isValid: boolean;
  /** Currently highlighted category */
  activeCategory: CategoryType | null;
}

/**
 * Initial/default state values
 */
export const DEFAULT_PERCENTAGES: Percentages = {
  needs: 50,
  wants: 30,
  savings: 20,
};

/**
 * Initial application state
 */
export const INITIAL_STATE: AppState = {
  monthlyIncome: 5000,
  currency: 'USD',
  percentages: { ...DEFAULT_PERCENTAGES },
  isValid: true,
  activeCategory: null,
};

// ========================================
// ACTION TYPES
// ========================================

/**
 * All possible action types for the budget reducer
 */
export type BudgetAction =
  | { type: 'SET_INCOME'; payload: number }
  | { type: 'SET_CURRENCY'; payload: CurrencyCode }
  | { type: 'SET_PERCENTAGE'; payload: { category: CategoryType; value: number } }
  | { type: 'SET_PRESET'; payload: Percentages }
  | { type: 'RESET_TO_DEFAULT' }
  | { type: 'SET_ACTIVE_CATEGORY'; payload: CategoryType | null };

// ========================================
// VALIDATION TYPES
// ========================================

/**
 * Result of percentage validation
 */
export interface ValidationResult {
  isValid: boolean;
  adjustedPercentages: Percentages;
  errorMessage?: string;
}

// ========================================
// COMPONENT PROP TYPES
// ========================================

/**
 * Props for the IncomeInput component
 */
export interface IncomeInputProps {
  value: number;
  currency: CurrencyCode;
  onChange: (value: number) => void;
  onCurrencyChange: (currency: CurrencyCode) => void;
}

/**
 * Props for the CategoryCard component
 */
export interface CategoryCardProps {
  category: CategoryType;
  percentage: number;
  amount: number;
}

/**
 * Props for the PercentageSlider component
 */
export interface PercentageSliderProps {
  category: CategoryType;
  value: number;
  onChange: (value: number) => void;
  maxValue?: number;
}

/**
 * Props for the DailySafeToSpend component
 */
export interface DailySafeToSpendProps {
  dailyAmount: number;
}

/**
 * Props for the BudgetDonutChart component
 */
export interface BudgetDonutChartProps {
  data: ChartData[];
  activeCategory: CategoryType | null;
  onCategoryHover: (category: CategoryType | null) => void;
}

// ========================================
// CATEGORY CONFIGURATION
// ========================================

/**
 * Configuration for each budget category
 */
export interface CategoryConfig {
  label: string;
  color: string;
  lightColor: string;
  darkColor: string;
  glow: string;
  shadow: string;
  icon: React.ComponentType<{ className?: string }>;
  defaultPercentage: number;
  description: string;
}

/**
 * Record of all category configurations
 */
export type CategoryConfigMap = Record<CategoryType, CategoryConfig>;
