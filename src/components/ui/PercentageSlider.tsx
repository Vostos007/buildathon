/**
 * Smart Salary Slicer - PercentageSlider Component
 *
 * Interactive slider for adjusting category percentages with Radix UI.
 */

import * as Slider from '@radix-ui/react-slider';
import { formatPercentage } from '../../utils/formatters';
import { CATEGORY_CONFIG } from '../../constants/budget';
import type { PercentageSliderProps } from '../../types/budget';

export function PercentageSlider({
  category,
  value,
  onChange,
}: PercentageSliderProps) {
  const config = CATEGORY_CONFIG[category];
  const Icon = config.icon;
  
  // Get color classes based on category
  const getColorClasses = () => {
    switch (category) {
      case 'needs':
        return {
          track: 'bg-needs/20',
          range: 'bg-needs',
          thumb: 'bg-needs border-needs focus:ring-needs/30',
          text: 'text-needs',
          iconBg: 'bg-needs/10',
        };
      case 'wants':
        return {
          track: 'bg-wants/20',
          range: 'bg-wants',
          thumb: 'bg-wants border-wants focus:ring-wants/30',
          text: 'text-wants',
          iconBg: 'bg-wants/10',
        };
      case 'savings':
        return {
          track: 'bg-savings/20',
          range: 'bg-savings',
          thumb: 'bg-savings border-savings focus:ring-savings/30',
          text: 'text-savings',
          iconBg: 'bg-savings/10',
        };
    }
  };

  const colors = getColorClasses();

  const handleValueChange = (newValue: number[]) => {
    if (newValue[0] !== undefined) {
      onChange(newValue[0]);
    }
  };

  return (
    <div className="bg-background-secondary border border-border-subtle rounded-2xl p-5">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-9 h-9 rounded-lg ${colors.iconBg} flex items-center justify-center`}>
            <Icon className={`w-4 h-4 ${colors.text}`} />
          </div>
          <div>
            <h4 className="font-medium text-text-primary">
              {config.label}
            </h4>
            <p className="text-xs text-text-muted">
              {config.description}
            </p>
          </div>
        </div>
        
        <div className={`font-mono text-2xl font-bold ${colors.text}`}>
          {formatPercentage(value)}
        </div>
      </div>
      
      {/* Slider */}
      <Slider.Root
        className="relative flex items-center select-none touch-none w-full h-6"
        value={[value]}
        max={100}
        min={0}
        step={1}
        onValueChange={handleValueChange}
        aria-label={`${config.label} percentage`}
      >
        <Slider.Track className={`relative grow rounded-full h-2 ${colors.track}`}>
          <Slider.Range className={`absolute rounded-full h-full ${colors.range}`} />
        </Slider.Track>
        <Slider.Thumb
          className={`
            block w-6 h-6 rounded-full border-2 shadow-md
            transition-all duration-150
            focus:outline-none focus:ring-4
            hover:scale-110
            ${colors.thumb}
            cursor-grab active:cursor-grabbing
          `}
        />
      </Slider.Root>
      
      {/* Labels */}
      <div className="flex justify-between mt-2 text-xs text-text-muted">
        <span>0%</span>
        <span>50%</span>
        <span>100%</span>
      </div>
    </div>
  );
}
