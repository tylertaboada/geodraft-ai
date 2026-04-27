export default function CtaFooter() {
  return (
    <footer style={{ borderTop: '1px solid #e8e6e1', background: '#f0ede8' }} className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-16">
          <div style={{ maxWidth: 480 }}>
            <p className="label mb-4">Get started</p>
            <h2 className="font-serif text-2xl md:text-3xl text-charcoal leading-snug mb-4">
              Try it on a real project.<br />
              <span style={{ color: '#9c4a2a' }}>See what an hour of your time is worth.</span>
            </h2>
            <p className="font-sans text-sm text-muted leading-relaxed">
              Load the sample data or paste in your own boring logs. The draft generates in seconds — review it the same way you'd review a junior engineer's first pass.
            </p>
          </div>
          <a href="#tool" className="btn-primary" style={{ whiteSpace: 'nowrap' }}>
            Generate a report →
          </a>
        </div>

        <div style={{ borderTop: '1px solid #e8e6e1' }} className="pt-8 flex flex-col sm:flex-row justify-between gap-4">
          <p className="font-mono text-xs text-muted">GeoDraft AI — Preliminary draft tool for geotechnical engineers</p>
          <p className="font-sans text-xs text-muted" style={{ maxWidth: 400 }}>
            All output requires review by a licensed Professional Engineer. Not a substitute for a geotechnical investigation or stamped engineering report.
          </p>
        </div>
      </div>
    </footer>
  );
}
