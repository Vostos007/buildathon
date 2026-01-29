/**
 * Smart Salary Slicer - Formatters
 * 
 * Utility functions for formatting currency, percentages, and numbers.
 */

import type { CurrencyCode } from '../types/budget';

/**
 * Format a number as currency
 * Shows without cents for whole numbers, with cents for fractional amounts
 */
export function formatCurrency(
  amount: number,
  currency: CurrencyCode = 'USD',
  locale: string = 'en-US',
  decimals?: number
): string {
  // If decimals is explicitly provided, use it; otherwise auto-detect
  const fractionDigits = decimals !== undefined
    ? decimals
    : (amount % 1 === 0 ? 0 : 2);
  
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(amount);
}

/**
 * Get the symbol for a currency code
 */
export function getCurrencySymbol(currency: CurrencyCode): string {
  switch (currency) {
    case 'EUR': return '€';
    case 'GBP': return '£';
    default: return '$';
  }
}

/**
 * Format a number as a compact currency (e.g., $5K, $1.2M)
 */
export function formatCompactCurrency(
  amount: number,
  currency: string = 'USD',
  locale: string = 'en-US'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    notation: 'compact',
    maximumFractionDigits: 1,
  }).format(amount);
}

/**
 * Format a number as percentage
 */
export function formatPercentage(value: number, decimals: number = 0): string {
  return `${value.toFixed(decimals)}%`;
}

/**
 * Format a number with thousand separators
 */
export function formatNumber(value: number, decimals: number = 0): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(value);
}

/**
 * Parse a currency string back to a number
 * Removes currency symbols, commas, and whitespace
 */
export function parseCurrency(value: string): number {
  const cleaned = value
    .replace(/[^\d.-]/g, '') // Remove all non-numeric characters except . and -
    .replace(/\.(?=.*\.)/g, ''); // Remove extra decimal points
  
  const parsed = parseFloat(cleaned);
  return isNaN(parsed) ? 0 : parsed;
}

/**
 * Format input value for display in the income input
 * Adds commas as thousand separators
 */
export function formatInputValue(value: string): string {
  // Remove non-numeric characters except decimal point
  const cleaned = value.replace(/[^\d.]/g, '');
  
  // Handle empty string
  if (!cleaned) return '';
  
  // Parse the number
  const num = parseFloat(cleaned);
  if (isNaN(num)) return '';
  
  // Validate: reject negative numbers
  if (num < 0) return '';
  
  // Validate: max income limit (999,999,999)
  if (num > 999999999) return '';
  
  // Format with commas
  const parts = cleaned.split('.');
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  
  return parts.join('.');
}
