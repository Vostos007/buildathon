/**
 * Smart Salary Slicer - IncomeInput Component
 * 
 * Large, centered input field for monthly income with currency formatting.
 */

import { useState, useCallback, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { formatCurrency, parseCurrency, getCurrencySymbol } from '../../utils/formatters';
import type { IncomeInputProps, CurrencyCode } from '../../types/budget';

export function IncomeInput({ value, currency, onChange, onCurrencyChange }: IncomeInputProps) {
  const [inputValue, setInputValue] = useState(value > 0 ? value.toString() : '');
  const [isFocused, setIsFocused] = useState(false);
  const [showCurrencySelector, setShowCurrencySelector] = useState(false);

  // Update input value when prop changes
  useEffect(() => {
    if (!isFocused) {
      setInputValue(value > 0 ? value.toString() : '');
    }
  }, [value, isFocused]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const rawValue = e.target.value;
    
    // Allow empty string
    if (!rawValue) {
      setInputValue('');
      onChange(0);
      return;
    }
    
    // Parse the input - remove non-numeric except dot
    const cleanValue = rawValue.replace(/[^\d.]/g, '');
    const parsed = parseCurrency(cleanValue);
    
    // Limit to reasonable max
    if (parsed > 999999999) {
      return;
    }
    
    setInputValue(cleanValue);
    onChange(parsed);
  }, [onChange]);

  const handleFocus = useCallback(() => {
    setIsFocused(true);
    // Select all text for easy editing
    if (inputValue) {
      setTimeout(() => {
        const input = document.getElementById('income-input') as HTMLInputElement;
        if (input) {
          input.select();
        }
      }, 0);
    }
  }, [inputValue]);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
    // Format on blur
    if (value > 0) {
      setInputValue(value.toString());
    } else {
      setInputValue('');
    }
  }, [value]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    // Allow only numbers, decimal point, backspace, delete, arrows, and comma (for parsing)
    const allowedKeys = [
      'Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Home', 'End',
      '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '.', ','
    ];
    
    // Allow Ctrl+A, Ctrl+C, Ctrl+V, Ctrl+X
    if (e.ctrlKey || e.metaKey) {
      return;
    }
    
    if (!allowedKeys.includes(e.key)) {
      e.preventDefault();
    }
    
    // Prevent multiple decimal points
    if (e.key === '.' && inputValue.includes('.')) {
      e.preventDefault();
    }
  }, [inputValue]);

  const displayValue = isFocused 
    ? inputValue 
    : value > 0 
      ? formatCurrency(value, currency).replace(/[€$£]/g, '').trim() 
      : '';

  const currencies: { code: CurrencyCode; symbol: string }[] = [
    { code: 'USD', symbol: '$' },
    { code: 'EUR', symbol: '€' },
    { code: 'GBP', symbol: '£' },
  ];

  return (
    <div className="w-full relative">
      <label 
        htmlFor="income-input"
        className="block text-center text-text-secondary text-sm font-medium mb-4"
      >
        Monthly Income
      </label>
      
      <div 
        className={`
          flex items-center justify-center gap-3 px-8 py-6 
          bg-background-tertiary border-2 rounded-2xl 
          transition-all duration-200
          ${isFocused 
            ? 'border-needs shadow-glow-needs ring-4 ring-needs/10' 
            : 'border-border hover:border-border-focus'
          }
        `}
      >
        {/* Currency Selector Button */}
        <div className="relative">
          <button
            onClick={() => setShowCurrencySelector(!showCurrencySelector)}
            className={`
              flex items-center gap-1 px-3 py-2 rounded-xl
              transition-all duration-200 hover:bg-background-secondary
              ${isFocused ? 'text-needs' : 'text-text-muted'}
            `}
            title="Change Currency"
          >
            <span className="text-3xl font-bold leading-none">
              {getCurrencySymbol(currency)}
            </span>
            <ChevronDown className={`w-4 h-4 transition-transform duration-200 ${showCurrencySelector ? 'rotate-180' : ''}`} />
          </button>

          {showCurrencySelector && (
            <>
              <div 
                className="fixed inset-0 z-10" 
                onClick={() => setShowCurrencySelector(false)} 
              />
              <div className="absolute top-full left-0 mt-2 bg-background-tertiary border border-border rounded-xl shadow-xl z-20 overflow-hidden min-w-[120px] animate-fade-in">
                {currencies.map((c) => (
                  <button
                    key={c.code}
                    onClick={() => {
                      onCurrencyChange(c.code);
                      setShowCurrencySelector(false);
                    }}
                    className={`
                      w-full flex items-center justify-between px-4 py-3 text-sm font-medium
                      hover:bg-background-secondary transition-colors
                      ${currency === c.code ? 'text-needs bg-needs/5' : 'text-text-secondary'}
                    `}
                  >
                    <span className="text-lg">{c.symbol}</span>
                    <span className="font-mono text-xs opacity-60">{c.code}</span>
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
        
        <input
          id="income-input"
          type="text"
          inputMode="decimal"
          value={displayValue}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onKeyDown={handleKeyDown}
          placeholder="0"
          className="
            font-mono text-4xl sm:text-5xl font-semibold 
            text-text-primary bg-transparent border-none outline-none 
            text-center w-full max-w-[300px] 
            placeholder:text-text-muted
          "
          aria-label="Monthly income amount"
        />
      </div>
      
      <p className="text-center text-text-muted text-sm mt-3">
        Enter your monthly take-home pay
      </p>
    </div>
  );
}
