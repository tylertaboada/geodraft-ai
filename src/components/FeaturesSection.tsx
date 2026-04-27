const features = [
  {
    title: 'Structured risk flags',
    body: 'Weak soils, fill, shallow groundwater, floodplain proximity — flagged by severity so the reviewing engineer knows where to look first.',
  },
  {
    title: 'Audience-aware output',
    body: 'The same data generates a technical draft for the internal engineer and a plain-language summary for the developer — without you writing it twice.',
  },
  {
    title: 'Northeast geology built in',
    body: 'Glacial till, outwash, varved clays, diabase, carbonate rock, frost depth — the regional context is already part of the interpretation.',
  },
  {
    title: 'Consistent format, every time',
    body: 'New hire or 20-year veteran — the draft structure is the same. Reviewers know exactly where to find the risk summary, the groundwater section, the foundation discussion.',
  },
  {
    title: 'Plain-text output',
    body: 'No proprietary format, no locked-in templates. The output copies cleanly into whatever report format your firm already uses.',
  },
  {
    title: 'Built around PE review',
    body: 'The draft is designed to make engineer review faster, not to skip it. Every section is structured to support judgment, not replace it.',
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" style={{ borderTop: '1px solid #e8e6e1' }} className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <p className="label mb-10">What it does</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-10">
          {features.map((f, i) => (
            <div key={i}>
              <p className="font-serif text-base text-charcoal mb-2">{f.title}</p>
              <p className="font-sans text-sm text-muted leading-relaxed">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
