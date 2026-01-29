/**
 * Smart Salary Slicer - Main App Component
 * 
 * Root component that wires together all features and state management.
 */

import { Layout } from './components/layout/Layout';
import { IncomeInput } from './components/ui/IncomeInput';
import { CategoryCard } from './components/ui/CategoryCard';
import { DailySafeToSpend } from './components/ui/DailySafeToSpend';
import { PercentageSlider } from './components/ui/PercentageSlider';
import { BudgetDonutChart } from './components/charts/BudgetDonutChart';
import { useBudget } from './hooks/useBudget';
import { useBudgetCalculations } from './hooks/useBudgetCalculations';
import { CATEGORY_TYPES } from './types/budget';
import { BUDGET_PRESETS } from './constants/budget';
import { RotateCcw } from 'lucide-react';

function App() {
  const { state, actions } = useBudget();
  const { amounts, dailySafeToSpend, chartData } = useBudgetCalculations(state);

  return (
    <Layout>
      {/* Income Input Section */}
      <section className="mb-10 animate-fade-in">
        <IncomeInput 
          value={state.monthlyIncome} 
          currency={state.currency}
          onChange={actions.setIncome} 
          onCurrencyChange={actions.setCurrency}
        />
      </section>

      {/* Chart Section */}
      <section className="mb-10 animate-slide-up" style={{ animationDelay: '0.1s' }}>
        {/* Preset Buttons */}
        <div className="flex flex-wrap justify-center gap-2 mb-6">
          {Object.entries(BUDGET_PRESETS).map(([key, preset]) => (
            <button
              key={key}
              onClick={() => actions.setPreset(preset.percentages)}
              className="px-4 py-2 text-sm font-medium text-text-secondary bg-background-tertiary border border-border rounded-lg hover:border-cyan-400 hover:text-cyan-400 transition-colors"
              title={preset.description}
            >
              {preset.label}
            </button>
          ))}
        </div>
        
        <BudgetDonutChart 
          data={chartData}
          currency={state.currency}
          activeCategory={state.activeCategory}
          onCategoryHover={actions.setActiveCategory}
        />
      </section>

      {/* Category Cards Section */}
      <section className="mb-10 animate-slide-up" style={{ animationDelay: '0.2s' }}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {CATEGORY_TYPES.map((category) => (
            <CategoryCard
              key={category}
              category={category}
              percentage={state.percentages[category]}
              amount={amounts[category]}
              currency={state.currency}
            />
          ))}
        </div>
      </section>

      {/* Daily Safe-to-Spend Section */}
      <section className="mb-10 animate-slide-up" style={{ animationDelay: '0.3s' }}>
        <DailySafeToSpend 
          dailyAmount={dailySafeToSpend} 
          currency={state.currency} 
        />
      </section>

      {/* Percentage Adjustment Section */}
      <section className="mb-10 animate-slide-up" style={{ animationDelay: '0.4s' }}>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-text-primary">
            Adjust Percentages
          </h2>
          <button
            onClick={actions.resetToDefault}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-text-secondary bg-background-tertiary border border-border rounded-lg hover:border-needs hover:text-needs transition-colors"
          >
            <RotateCcw className="w-4 h-4" />
            Reset to 50/30/20
          </button>
        </div>
        
        <div className="space-y-4">
          {CATEGORY_TYPES.map((category) => (
            <PercentageSlider
              key={category}
              category={category}
              value={state.percentages[category]}
              onChange={(value) => actions.setPercentage(category, value)}
            />
          ))}
        </div>
        
        {/* Total indicator */}
        <div className="mt-6 text-center">
          <p className="text-sm text-text-muted">
            {(() => {
              const totalPercent = Object.values(state.percentages).reduce((a, b) => a + b, 0);
              const isExact100 = Math.abs(totalPercent - 100) < 0.01;
              const displayPercent = isExact100 ? 100 : Math.round(totalPercent * 10) / 10;
              const available = 100 - totalPercent;
              
              if (isExact100) {
                return (
                  <>
                    Total: <span className="font-mono font-semibold text-wants">{displayPercent}%</span>
                  </>
                );
              } else if (available > 0.01) {
                return (
                  <>
                    Available to distribute: <span className="font-mono font-semibold text-cyan-400">{Math.round(available * 10) / 10}%</span>
                  </>
                );
              } else {
                return (
                  <>
                    Over by: <span className="font-mono font-semibold text-red-500">{Math.round(Math.abs(available) * 10) / 10}%</span>
                  </>
                );
              }
            })()}
          </p>
        </div>
      </section>
    </Layout>
  );
}

export default App;
