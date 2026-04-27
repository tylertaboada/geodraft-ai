export default function Hero() {
  return (
    <section className="py-28 px-6">
      <div className="max-w-6xl mx-auto">
        <p className="label mb-6 fade-up delay-1">Geotechnical report drafting · Enterprise</p>
        <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-charcoal leading-tight mb-6 fade-up delay-2" style={{ maxWidth: 720 }}>
          You didn't spend 15 years learning soil behavior to spend Friday formatting bearing tables.
        </h1>
        <p className="font-sans text-base text-muted leading-relaxed mb-10 fade-up delay-3" style={{ maxWidth: 520 }}>
          GeoDraft AI turns boring logs, SPT values, and site observations into structured preliminary assessment drafts — ready for PE review, not ready to replace it.
        </p>
        <div className="flex flex-wrap gap-3 mb-20 fade-up delay-4">
          <a href="#tool" className="btn-primary">Generate a report →</a>
          <a href="#how" className="btn-outline">See how it works</a>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 pt-8" style={{ borderTop: '1px solid #e8e6e1' }}>
          {[
            { val: '60–80%', desc: 'Less time on boilerplate drafting' },
            { val: 'PA · NY · NJ', desc: 'Regional soil & geology context built in' },
            { val: 'Draft only', desc: 'PE review required before any use' },
            { val: 'Enterprise', desc: 'Consistent output across all staff' },
          ].map((s, i) => (
            <div key={i} className="strata-accent">
              <p className="font-serif text-lg text-charcoal mb-1">{s.val}</p>
              <p className="font-sans text-xs text-muted leading-relaxed">{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
