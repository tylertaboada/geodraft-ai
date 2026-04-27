const steps = [
  { n: '01', title: 'Enter site data', body: 'Paste boring logs, SPT values, groundwater observations, and site notes.' },
  { n: '02', title: 'AI interprets', body: 'Regional geological context applied — glacial soils, bedrock, frost depth, groundwater patterns.' },
  { n: '03', title: 'Review assumptions', body: 'Structured risk flags and foundation considerations laid out for quick PE evaluation.' },
  { n: '04', title: 'Export draft', body: 'Copy the structured draft into your report template as a starting point.' },
];

export default function WorkflowSection() {
  return (
    <section id="how" style={{ borderTop: '1px solid #e8e6e1' }} className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <p className="label mb-10">How it works</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {steps.map((s) => (
            <div key={s.n}>
              <p className="font-mono text-xs text-muted mb-3">{s.n}</p>
              <p className="font-serif text-base text-charcoal mb-2">{s.title}</p>
              <p className="font-sans text-sm text-muted leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>

        <div style={{ background: '#f7f6f3', border: '1px solid #e8e6e1' }}
          className="rounded-md px-5 py-4 flex items-start gap-3 max-w-2xl">
          <svg className="w-4 h-4 flex-shrink-0 mt-0.5" style={{ color: '#4a7c6f' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="font-sans text-sm text-muted leading-relaxed">
            All output is a draft for internal use. A licensed PE must review and accept all findings before use in design or construction.
          </p>
        </div>
      </div>
    </section>
  );
}
