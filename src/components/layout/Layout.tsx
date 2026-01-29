/**
 * Smart Salary Slicer - Layout Component
 * 
 * Root layout wrapper with dark mode theme and header.
 */

import type { ReactNode } from 'react';
import { Wallet } from 'lucide-react';

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  return (
    <div className="min-h-screen bg-background-primary text-text-primary">
      {/* Header */}
      <header className="border-b border-border-subtle">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-needs to-needs-dark flex items-center justify-center shadow-glow-needs">
              <Wallet className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">
                Smart Salary Slicer
              </h1>
              <p className="text-sm text-text-secondary">
                Budget smarter with the 50/30/20 rule
              </p>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-border-subtle mt-auto">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <p className="text-center text-sm text-text-muted">
            Smart Salary Slicer • Built with React & Recharts
          </p>
        </div>
      </footer>
    </div>
  );
}
