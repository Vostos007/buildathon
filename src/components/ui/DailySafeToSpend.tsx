/**
 * Smart Salary Slicer - DailySafeToSpend Component
 * 
 * Card displaying the daily safe-to-spend amount (Wants / 30 days).
 */

import { Sparkles } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';
import type { DailySafeToSpendProps } from '../../types/budget';

export function DailySafeToSpend({ dailyAmount, currency }: DailySafeToSpendProps) {
  return (
    <div className="relative overflow-hidden">
      {/* Background gradient */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          background: 'linear-gradient(135deg, #10B981 0%, #059669 100%)',
        }}
      />
      
      <div className="relative bg-background-secondary border border-wants/20 rounded-2xl p-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Sparkles className="w-5 h-5 text-wants" />
          <span className="text-sm font-medium text-text-secondary uppercase tracking-wider">
            Daily Safe-to-Spend
          </span>
          <Sparkles className="w-5 h-5 text-wants" />
        </div>
        
        <p className="font-mono text-4xl sm:text-5xl font-bold text-wants tracking-tight">
          {formatCurrency(dailyAmount, currency)}
        </p>
        
        <p className="text-sm text-text-muted mt-2">
          From your Wants budget (÷ 30 days)
        </p>
        
        {/* Decorative elements */}
        <div className="absolute top-2 right-2 w-2 h-2 rounded-full bg-wants/30 animate-pulse" />
        <div className="absolute bottom-2 left-2 w-1.5 h-1.5 rounded-full bg-wants/20 animate-pulse" style={{ animationDelay: '0.5s' }} />
      </div>
    </div>
  );
}
