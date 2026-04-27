export default function Hero() {
  return (
    <section className="pt-32 pb-24 px-6 max-w-6xl mx-auto">
      <div className="max-w-3xl">
        <p className="label mb-6 fade-up delay-1">Geotechnical report drafting · Enterprise</p>

        <h1 className="font-serif text-4xl md:text-5xl text-charcoal leading-tight mb-6 fade-up delay-2">
          Turn site data into<br />
          <span className="italic">report drafts. Faster.</span>
        </h1>

        <p className="font-sans text-base text-muted leading-relaxed mb-10 max-w-xl fade-up delay-3">
          GeoDraft AI structures boring logs, SPT values, and site observations
          into preliminary assessment drafts — ready for engineer review.
          Built for geotechnical teams in PA, NY, and NJ.
        </p>

        <div className="flex flex-wrap items-center gap-3 fade-up delay-4">
          <a href="#tool" className="btn-primary">
            Generate a report
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
          <a href="#how" className="btn-outline">See how it works</a>
        </div>
      </div>

      <div className="mt-20 pt-8 rule grid grid-cols-2 md:grid-cols-4 gap-8 fade-up delay-4">
        {[
          { val: '60–80%', desc: 'Less time drafting' },
          { val: 'PA · NY · NJ', desc: 'Regional soil context' },
          { val: 'Draft only', desc: 'PE review required' },
          { val: 'Enterprise', desc: 'Firm-wide deployment' },
        ].map((s, i) => (
          <div key={i}>
            <p className="font-mono text-sm font-medium text-charcoal mb-1">{s.val}</p>
            <p className="font-sans text-xs text-muted">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}