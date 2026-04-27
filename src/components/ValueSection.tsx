const items = [
  {
    val: 'Senior engineers',
    desc: 'Get back the hours you were spending on boilerplate. Spend them on the work that actually requires your judgment.',
  },
  {
    val: 'Junior engineers',
    desc: 'A structured starting point means less time staring at a blank document and more time learning what a good draft looks like.',
  },
  {
    val: 'Project managers',
    desc: 'Preliminary geotechnical opinions for early-stage feasibility — without pulling a senior engineer off billable work.',
  },
  {
    val: 'Firm leadership',
    desc: 'Consistent output quality across every office, every project type, and every experience level on staff.',
  },
];

export default function ValueSection() {
  return (
    <section style={{ borderTop: '1px solid #e8e6e1' }} className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <p className="label mb-10">Who it's for</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item, i) => (
            <div key={i} className="strata-accent">
              <p className="font-serif text-base text-charcoal mb-2">{item.val}</p>
              <p className="font-sans text-sm text-muted leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
