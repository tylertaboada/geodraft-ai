import { useState } from 'react';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <nav style={{ background: '#f7f6f3', borderBottom: '1px solid #e8e6e1' }}
      className="fixed top-0 left-0 right-0 z-50">
      <div className="max-w-6xl mx-auto px-6 h-14 flex items-center justify-between">
        <a href="#" className="flex items-center gap-2">
          <span className="font-mono text-sm font-medium text-charcoal tracking-tight">GeoDraft AI</span>
        </a>

        <div className="hidden md:flex items-center gap-8">
          <a href="#how" className="font-sans text-sm text-muted hover:text-charcoal transition-colors">How it works</a>
          <a href="#tool" className="font-sans text-sm text-muted hover:text-charcoal transition-colors">Try it</a>
          <a href="#features" className="font-sans text-sm text-muted hover:text-charcoal transition-colors">Features</a>
          <a href="#tool" className="btn-primary">Get started</a>
        </div>

        <button className="md:hidden text-muted" onClick={() => setOpen(!open)}>
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {open
              ? <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              : <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 6h16M4 12h16M4 18h16" />}
          </svg>
        </button>
      </div>
      {open && (
        <div style={{ borderTop: '1px solid #e8e6e1', background: '#f7f6f3' }} className="md:hidden px-6 py-4 flex flex-col gap-4">
          <a href="#how" className="font-sans text-sm text-muted" onClick={() => setOpen(false)}>How it works</a>
          <a href="#tool" className="font-sans text-sm text-muted" onClick={() => setOpen(false)}>Try it</a>
          <a href="#features" className="font-sans text-sm text-muted" onClick={() => setOpen(false)}>Features</a>
          <a href="#tool" className="btn-primary w-fit" onClick={() => setOpen(false)}>Get started</a>
        </div>
      )}
    </nav>
  );
}
