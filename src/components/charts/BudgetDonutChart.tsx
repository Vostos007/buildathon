/**
 * Smart Salary Slicer - BudgetDonutChart Component
 *
 * Recharts donut chart visualization for budget distribution.
 * Tooltip is rendered outside the chart so it never overlaps the donut or center total.
 */

import { useState, useCallback } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Sector } from 'recharts';
import { formatCurrency } from '../../utils/formatters';
import type { BudgetDonutChartProps, ChartData, CurrencyCode } from '../../types/budget';

// Custom active shape for hover effect
const renderActiveShape = (props: any) => {
  const {
    cx,
    cy,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
  } = props;

  return (
    <g>
      {/* Active sector with larger radius */}
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 8}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        cornerRadius={4}
      />
      {/* Glow effect */}
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={outerRadius + 10}
        outerRadius={outerRadius + 14}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
        opacity={0.3}
      />
    </g>
  );
};

// Tooltip content shown outside the chart (no overlap with donut or center)
function ChartTooltipPanel({ data, allData, currency }: { data: ChartData | null; allData: ChartData[]; currency: CurrencyCode }) {
  if (!data) {
    // Show elegant mini-legend when nothing is hovered
    return (
      <div className="bg-background-tertiary border border-border-subtle rounded-xl p-3 space-y-2">
        {allData.map((item) => (
          <div key={item.category} className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full shrink-0" 
              style={{ backgroundColor: item.color }}
            />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-text-muted">{item.name}</p>
              <p className="text-sm font-semibold text-text-primary tabular-nums">
                {item.value}% · {formatCurrency(item.amount, currency)}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  }
  return (
    <div className="bg-background-elevated border border-border-subtle rounded-xl p-3 shadow-xl">
      <p className="font-semibold text-text-primary mb-1">{data.name}</p>
      <p className="text-sm" style={{ color: data.color }}>
        {data.value}% of budget
      </p>
      <p className="font-mono text-text-primary mt-1">
        {formatCurrency(data.amount, currency)}
      </p>
    </div>
  );
}

export function BudgetDonutChart({ 
  data, 
  currency,
  activeCategory,
  onCategoryHover 
}: BudgetDonutChartProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  // Calculate total for center display
  const totalAmount = data.reduce((sum, item) => sum + item.amount, 0);

  const handleMouseEnter = useCallback((_: any, index: number) => {
    setActiveIndex(index);
    onCategoryHover(data[index]?.category || null);
  }, [data, onCategoryHover]);

  const handleMouseLeave = useCallback(() => {
    setActiveIndex(null);
    onCategoryHover(null);
  }, [onCategoryHover]);

  // Sync active index with activeCategory prop
  useState(() => {
    if (activeCategory) {
      const index = data.findIndex(item => item.category === activeCategory);
      if (index !== -1) {
        setActiveIndex(index);
      }
    } else {
      setActiveIndex(null);
    }
  });

  const activeData = activeIndex !== null ? data[activeIndex] ?? null : null;

  return (
    <div className="w-full max-w-[400px] mx-auto flex flex-col sm:flex-row items-center gap-4 sm:gap-6">
      {/* Chart: donut only, no tooltip inside */}
      <div className="relative w-full max-w-[280px] sm:max-w-[260px] aspect-square shrink-0">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius="60%"
              outerRadius="80%"
              paddingAngle={2}
              cornerRadius={4}
              startAngle={90}
              endAngle={-270}
              dataKey="value"
              animationDuration={500}
              animationEasing="ease-out"
              activeIndex={activeIndex ?? undefined}
              activeShape={renderActiveShape}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              {data.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={entry.color}
                  stroke="none"
                />
              ))}
            </Pie>
          </PieChart>
        </ResponsiveContainer>
        {/* Center total — always visible, never covered by tooltip */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <p className="text-sm text-text-muted mb-1">Total</p>
          <p className="font-mono text-2xl sm:text-3xl font-bold text-text-primary">
            {formatCurrency(totalAmount, currency)}
          </p>
        </div>
      </div>

      {/* Tooltip panel outside the chart — right on desktop, below on mobile */}
      <div className="w-full sm:w-auto sm:min-w-[160px] shrink-0">
        <ChartTooltipPanel data={activeData} allData={data} currency={currency} />
      </div>
    </div>
  );
}
