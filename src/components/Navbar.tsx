import { useState } from 'react';

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-slate-950/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 relative">
            <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="4" width="28" height="4" rx="1" fill="#f59e0b" opacity="0.9"/>
              <rect x="2" y="11" width="28" height="3" rx="1" fill="#92400e" opacity="0.7"/>
              <rect x="2" y="17" width="28" height="5" rx="1" fill="#44403c" opacity="0.6"/>
              <rect x="2" y="25" width="28" height="4" rx="1" fill="#292524" opacity="0.8"/>
              <rect x="12" y="2" width="2" height="28" rx="1" fill="#f59e0b" opacity="0.5"/>
            </svg>
          </div>
          <span className="font-display text-lg font-bold text-white tracking-tight">
            GeoDraft<span className="text-amber-500"> AI</span>
          </span>
        </div>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          <a href="#workflow" className="text-slate-400 hover:text-slate-200 text-sm font-body transition-colors">Workflow</a>
          <a href="#tool" className="text-slate-400 hover:text-slate-200 text-sm font-body transition-colors">Try It</a>
          <a href="#features" className="text-slate-400 hover:text-slate-200 text-sm font-body transition-colors">Enterprise</a>
          <a href="#tool" className="btn-primary text-xs py-2 px-4">
            Generate Report
          </a>
        </div>

        {/* Mobile menu button */}
        <button
          className="md:hidden text-slate-400 hover:text-white"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {menuOpen
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            }
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-950 px-6 py-4 flex flex-col gap-4">
          <a href="#workflow" className="text-slate-300 font-body text-sm" onClick={() => setMenuOpen(false)}>Workflow</a>
          <a href="#tool" className="text-slate-300 font-body text-sm" onClick={() => setMenuOpen(false)}>Try It</a>
          <a href="#features" className="text-slate-300 font-body text-sm" onClick={() => setMenuOpen(false)}>Enterprise</a>
          <a href="#tool" className="btn-primary text-xs py-2 justify-center" onClick={() => setMenuOpen(false)}>Generate Report</a>
        </div>
      )}
    </nav>
  );
}
