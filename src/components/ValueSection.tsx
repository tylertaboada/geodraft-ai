const items = [
  { val: 'Senior engineers', desc: 'Spend time on judgment and review — not formatting.' },
  { val: 'Junior engineers', desc: 'Structured drafts accelerate learning and consistency.' },
  { val: 'Project managers', desc: 'Faster prelim opinions for early-stage feasibility.' },
  { val: 'Firm leadership', desc: 'Consistent output quality across all offices and staff.' },
];

export default function ValueSection() {
  return (
    <section style={{ borderTop: '1px solid #e8e6e1' }} className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <p className="label mb-10">Who benefits</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item, i) => (
            <div key={i}>
              <p className="font-serif text-base text-charcoal mb-2">{item.val}</p>
              <p className="font-sans text-sm text-muted leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}