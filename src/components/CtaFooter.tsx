export default function CtaFooter() {
  return (
    <>
      <section style={{ borderTop: '1px solid #e8e6e1', background: '#ffffff' }} className="py-20 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <p className="label mb-3">Get started</p>
            <h2 className="font-serif text-2xl md:text-3xl text-charcoal mb-2">Ready to run a pilot?</h2>
            <p className="font-sans text-sm text-muted max-w-sm leading-relaxed">
              Available for geotechnical and civil engineering firms in the Northeast US.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a href="#tool" className="btn-primary">
              Try the demo
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </a>
            <button className="btn-outline">Request enterprise pilot</button>
          </div>
        </div>
      </section>

      <footer style={{ borderTop: '1px solid #e8e6e1' }} className="py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <span className="font-mono text-xs text-muted">GeoDraft AI</span>
          <span className="font-sans text-xs text-muted">All output requires licensed PE review before use in design or construction.</span>
          <span className="font-mono text-xs text-muted">© {new Date().getFullYear()}</span>
        </div>
      </footer>
    </>
  );
}