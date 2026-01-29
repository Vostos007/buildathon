# 💰 Smart Salary Slicer

**An intelligent salary distribution calculator** based on the 50/30/20 rule with flexible percentage adjustments and multi-currency support.

![Smart Salary Slicer Preview](https://img.shields.io/badge/React-18-blue) ![TypeScript](https://img.shields.io/badge/TypeScript-5-blue) ![Vite](https://img.shields.io/badge/Vite-5-purple) ![Tailwind](https://img.shields.io/badge/Tailwind-3-cyan)

---

## 🚀 Quick Start

### Installation

```bash
# Clone the repository
git clone https://github.com/Vostos007/buildathon.git

# Navigate to directory
cd buildathon

# Install dependencies
npm install
```

### Running

```bash
# Start dev server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm run preview
```

---

## ✨ Features

- **📊 Budget Visualization** — interactive donut chart with animations
- **💱 Multi-Currency** — switch between USD ($), EUR (€), GBP (£)
- **🎚️ Independent Sliders** — adjust percentages without automatic changes to other categories
- **🔒 100% Limiter** — total percentage sum cannot exceed 100%
- **🎯 Ready-Made Presets** — Student, Balanced, Aggressive Saver, Family
- **💾 Auto-Save** — all settings persist in localStorage
- **🌙 Dark Theme** — modern dark-mode interface
- **📱 Responsive** — adaptive design for all devices

---

## 🛠️ Tech Stack

- **React 18** — UI library
- **TypeScript** — type safety
- **Vite** — build tool and dev server
- **Tailwind CSS** — styling
- **Recharts** — data visualization
- **Radix UI** — components (Slider)
- **Lucide Icons** — icons

---

## 📁 Project Structure

```
buildathon/
├── src/
│   ├── components/
│   │   ├── charts/
│   │   │   └── BudgetDonutChart.tsx
│   │   ├── layout/
│   │   │   └── Layout.tsx
│   │   └── ui/
│   │       ├── CategoryCard.tsx
│   │       ├── DailySafeToSpend.tsx
│   │       ├── IncomeInput.tsx
│   │       └── PercentageSlider.tsx
│   ├── constants/
│   │   └── budget.ts
│   ├── hooks/
│   │   ├── useBudget.ts
│   │   └── useBudgetCalculations.ts
│   ├── state/
│   │   ├── budgetActions.ts
│   │   └── budgetReducer.ts
│   ├── styles/
│   │   └── globals.css
│   ├── types/
│   │   └── budget.ts
│   ├── utils/
│   │   ├── formatters.ts
│   │   ├── storage.ts
│   │   └── percentageValidator.ts
│   ├── App.tsx
│   └── main.tsx
├── package.json
├── tsconfig.json
├── vite.config.ts
└── tailwind.config.ts
```

---

## 🎨 Core Components

### IncomeInput
Monthly income input field with currency selector.

### PercentageSlider
Independent sliders for adjusting percentage distribution across categories:
- **Needs** — rent, groceries, utilities
- **Wants** — entertainment, subscriptions, hobbies
- **Savings** — investments, emergency fund

### BudgetDonutChart
Interactive circular chart with legend and central total display.

### CategoryCard
Category cards with amounts, percentages, and progress bars.

### DailySafeToSpend
Calculates safe daily spending (Wants / 30 days).

---

## 🔧 State Management

The app uses **React Hooks** with `useReducer` for state management:

- `useBudget` — main hook for state management
- `useBudgetCalculations` — computing derived values (amounts, daily spending, chart data)
- `budgetReducer` — reducer for handling actions
- Persistence via `localStorage`

---

## 💡 Implementation Highlights

### Independent Sliders
Unlike classic 50/30/20 calculators where changing one slider automatically adjusts others, here:
- Each slider moves **independently**
- Movement stops when sum reaches 100%
- Remainder shown at bottom: **"Available to distribute: X%"**

### 100% Precision
Fixed bug with getting stuck at 99.99% — now sum correctly reaches exactly 100%.

### Currency Formatting
Whole numbers display without cents (`.00`), fractional amounts show two decimal places.

---

## 📝 Available Commands

```bash
npm run dev       # Start dev server
npm run build     # Build for production
npm run preview   # Preview production build
npm run lint      # Run ESLint check
```

---

## 🐛 Known Limitations

- Maximum income: **999,999,999**
- Minimum category percentage: **0%**
- Maximum total percentage: **100%** (hard limit)

---

## 📄 License

MIT

---

## 👤 Author

**Vostos007**

- GitHub: [@Vostos007](https://github.com/Vostos007)
- Repository: [buildathon](https://github.com/Vostos007/buildathon)

---

## 🙏 Acknowledgments

Project created as part of **Buildathon 2026** using modern technology stack.

---

**💡 Tip:** After first launch, try different presets (Student, Balanced, etc.) to see how budget distribution changes!
