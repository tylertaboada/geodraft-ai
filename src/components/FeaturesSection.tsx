const features = [
  { title: 'Report standardization', body: 'Enforce consistent structure, section order, and disclaimer language firm-wide.' },
  { title: 'Senior review workflows', body: 'Assign, comment, and approve AI-drafted sections before they leave the team.' },
  { title: 'Firm-specific templates', body: 'Customize language, risk framing, and section depth to match your standards.' },
  { title: 'Regional soil libraries', body: 'Pre-loaded context for PA, NY, NJ — glacial sequences, bedrock, frost depth.' },
  { title: 'Audit trail', body: 'Every draft and revision logged with timestamps and user attribution.' },
  { title: 'Secure data handling', body: 'SSO, role-based access, enterprise data residency. Client data stays protected.' },
];

export default function FeaturesSection() {
  return (
    <section id="features" style={{ borderTop: '1px solid #e8e6e1', background: '#ffffff' }} className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <p className="label mb-3">Enterprise features</p>
            <h2 className="font-serif text-2xl md:text-3xl text-charcoal max-w-md leading-snug">
              Built for the whole department, not just one engineer.
            </h2>
          </div>
          <a href="#tool" className="btn-primary w-fit">Request pilot</a>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: '#e8e6e1' }}>
          {features.map((f, i) => (
            <div key={i} style={{ background: '#ffffff' }} className="p-6">
              <p className="font-serif text-sm text-charcoal mb-2">{f.title}</p>
              <p className="font-sans text-sm text-muted leading-relaxed">{f.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}