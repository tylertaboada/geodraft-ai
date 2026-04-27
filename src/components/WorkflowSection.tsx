const steps = [
  {
    n: '01',
    title: 'Paste your site data',
    body: 'Boring logs, SPT N-values, groundwater observations, site notes. The same data you\'d hand a junior engineer to start a draft.',
  },
  {
    n: '02',
    title: 'Regional context applied automatically',
    body: 'Glacial soils, bedrock variability, frost depth, seasonal groundwater patterns — the geology of PA, NY, and NJ is already built in.',
  },
  {
    n: '03',
    title: 'Review the flagged conditions',
    body: 'Risk flags are structured and labeled so a PE can scan them in two minutes and decide what needs attention before design.',
  },
  {
    n: '04',
    title: 'Copy into your report template',
    body: 'The draft output is plain text, structured to match standard prelim assessment format. Drop it in, review it, stamp it when it\'s yours.',
  },
];

export default function WorkflowSection() {
  return (
    <section id="how" style={{ borderTop: '1px solid #e8e6e1' }} className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <p className="label mb-10">How it works</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {steps.map((s) => (
            <div key={s.n}>
              <p className="font-mono text-xs mb-3" style={{ color: '#9c4a2a' }}>{s.n}</p>
              <p className="font-serif text-base text-charcoal mb-2">{s.title}</p>
              <p className="font-sans text-sm text-muted leading-relaxed">{s.body}</p>
            </div>
          ))}
        </div>

        <div style={{ background: '#f7f6f3', border: '1px solid #e8e6e1', borderLeft: '2px solid #9c4a2a' }}
          className="px-5 py-4 flex items-start gap-3 max-w-2xl">
          <p className="font-sans text-sm text-muted leading-relaxed">
            Every output is a draft for internal use only. A licensed PE must review and accept all findings before anything gets near a design document or a client.
          </p>
        </div>
      </div>
    </section>
  );
}
