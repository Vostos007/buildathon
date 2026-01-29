/**
 * Smart Salary Slicer - CategoryCard Component
 *
 * Card displaying category name, percentage, and calculated amount.
 */

import { formatCurrency, formatPercentage } from '../../utils/formatters';
import { CATEGORY_CONFIG } from '../../constants/budget';
import type { CategoryCardProps } from '../../types/budget';

export function CategoryCard({ category, percentage, amount, currency }: CategoryCardProps) {
  const config = CATEGORY_CONFIG[category];
  const Icon = config.icon;
  
  // Get color classes based on category
  const getColorClasses = () => {
    switch (category) {
      case 'needs':
        return {
          gradient: 'from-needs to-needs-dark',
          text: 'text-needs',
          bg: 'bg-needs/10',
          border: 'border-needs/20',
          glow: 'shadow-glow-needs',
          bar: 'bg-needs',
        };
      case 'wants':
        return {
          gradient: 'from-wants to-wants-dark',
          text: 'text-wants',
          bg: 'bg-wants/10',
          border: 'border-wants/20',
          glow: 'shadow-glow-wants',
          bar: 'bg-wants',
        };
      case 'savings':
        return {
          gradient: 'from-savings to-savings-dark',
          text: 'text-savings',
          bg: 'bg-savings/10',
          border: 'border-savings/20',
          glow: 'shadow-glow-savings',
          bar: 'bg-savings',
        };
    }
  };

  const colors = getColorClasses();

  return (
    <div 
      className={`
        relative bg-background-secondary border rounded-2xl p-5 
        transition-all duration-200 overflow-hidden
        hover:-translate-y-0.5 hover:shadow-card-hover
        ${colors.border}
      `}
    >
      {/* Left accent bar */}
      <div className={`absolute left-0 top-0 bottom-0 w-1 ${colors.bar}`} />
      
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-3">
          <div className={`
            w-10 h-10 rounded-xl flex items-center justify-center
            bg-gradient-to-br ${colors.gradient} ${colors.glow}
          `}>
            <Icon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h3 className="font-semibold text-text-primary">
              {config.label}
            </h3>
            <p className="text-xs text-text-muted">
              {formatPercentage(percentage)}
            </p>
          </div>
        </div>
      </div>
      
      {/* Amount */}
      <div className="mt-4">
        <p className={`font-mono text-2xl font-semibold ${colors.text}`}>
          {formatCurrency(amount, currency)}
        </p>
        <p className="text-xs text-text-muted mt-1">
          {config.description}
        </p>
      </div>
      
      {/* Progress bar */}
      <div className="mt-4 h-1.5 bg-background-tertiary rounded-full overflow-hidden">
        <div 
          className={`h-full ${colors.bar} transition-all duration-300`}
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
}
