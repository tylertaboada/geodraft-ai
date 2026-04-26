const features = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    title: 'Internal Report Standardization',
    description: 'Enforce firm-wide report structure, section order, and disclaimer language across all offices and projects. Eliminate formatting variability at scale.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'Senior Engineer Review Workflows',
    description: 'Built-in review assignment, comment threads, and acceptance tracking so senior engineers can efficiently review and approve AI-drafted sections.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: 'Firm-Specific Prompt Templates',
    description: 'Customize the AI\'s default language, risk framing, section depth, and disclaimer text to match your firm\'s technical standards and liability posture.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
      </svg>
    ),
    title: 'Regional Soil Knowledge Libraries',
    description: 'Pre-loaded with geological context for Pennsylvania, New York, and New Jersey — including glacial soil sequences, bedrock type maps, and frost depth standards.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Audit Trail & Version History',
    description: 'Every draft, revision, and engineer review action is logged with timestamps and user attribution. Maintain a full chain of custody for all report drafts.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
      </svg>
    ),
    title: 'Secure Enterprise Data Handling',
    description: 'Client site data and boring logs never leave your firm\'s secure environment. SSO integration, role-based access, and enterprise data residency options.',
  },
];

export default function FeaturesSection() {
  return (
    <section id="features" className="bg-slate-950 border-t border-slate-800 py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Left: heading */}
          <div className="lg:col-span-1">
            <p className="section-label">Enterprise Platform</p>
            <h2 className="font-display text-3xl md:text-4xl text-white mb-5 leading-snug">
              Built for engineering firms, not just engineers.
            </h2>
            <p className="font-body text-slate-400 leading-relaxed mb-6">
              GeoDraft AI is designed for the operational realities of multi-office geotechnical
              practice — where consistency, accountability, and defensible documentation matter.
            </p>
            <div className="inline-flex items-center gap-2 border border-slate-700 rounded-lg px-4 py-3 bg-slate-900">
              <span className="w-2 h-2 bg-green-500 rounded-full" />
              <span className="font-mono text-xs text-slate-400 uppercase tracking-widest">SOC 2 Type II · In Progress</span>
            </div>
          </div>

          {/* Right: feature grid */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-5">
            {features.map((f, i) => (
              <div
                key={i}
                className="card-base p-5 hover:border-slate-700 transition-colors duration-200 group"
              >
                <div className="w-9 h-9 bg-slate-800 border border-slate-700 group-hover:border-amber-500/30 rounded-lg flex items-center justify-center text-amber-500/80 mb-4 transition-colors">
                  {f.icon}
                </div>
                <h3 className="font-body font-semibold text-white text-sm mb-2">{f.title}</h3>
                <p className="font-body text-slate-400 text-xs leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
