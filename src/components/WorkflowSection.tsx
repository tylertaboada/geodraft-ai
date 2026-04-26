const steps = [
  {
    number: '01',
    title: 'Upload or Enter Site Data',
    description: 'Paste boring logs, SPT values, soil classifications, groundwater observations, and site notes directly into the platform. Supports manual entry or structured data import.',
    detail: 'Works with standard geotechnical field formats including ASTM boring logs, SPT N-value records, and soil classification descriptions.',
  },
  {
    number: '02',
    title: 'AI Structures & Interprets',
    description: 'GeoDraft AI analyzes the subsurface data using regional geological context — including glacial soil sequences, bedrock characteristics, and seasonal groundwater patterns typical of the Northeast US.',
    detail: 'Applies knowledge of PA, NY, and NJ subsurface conditions, frost depth requirements, and common foundation practice in the region.',
  },
  {
    number: '03',
    title: 'Engineer Reviews Technical Assumptions',
    description: 'A structured preliminary assessment is generated for engineer review. Risk flags, foundation considerations, and investigation recommendations are clearly laid out for quick professional evaluation.',
    detail: 'Not a black box. Every section is transparently structured so the reviewing engineer can confirm, modify, or reject each element.',
  },
  {
    number: '04',
    title: 'Export Preliminary Report Draft',
    description: 'Copy the structured draft directly to your report template. Use it as a starting point for the final geotechnical report — not as a finished product.',
    detail: 'Includes section structure, technical language, risk characterizations, and investigation recommendations. Always marked as draft for review.',
  },
];

export default function WorkflowSection() {
  return (
    <section id="workflow" className="bg-slate-900 border-t border-slate-800 py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="section-label">How It Works</p>
          <h2 className="font-display text-3xl md:text-4xl text-white mb-4 leading-snug">
            Four steps from field data to report draft.
          </h2>
          <p className="font-body text-slate-400 text-lg">
            GeoDraft AI fits into your existing workflow — it doesn't replace it.
          </p>
        </div>

        <div className="relative">
          {/* Connector line */}
          <div className="hidden lg:block absolute top-10 left-0 right-0 h-px bg-gradient-to-r from-transparent via-amber-500/30 to-transparent" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => (
              <div key={i} className="relative">
                {/* Step card */}
                <div className="card-base p-6 h-full hover:border-amber-500/30 transition-all duration-200 group">
                  {/* Number badge */}
                  <div className="inline-flex items-center justify-center w-10 h-10 bg-slate-800 border border-slate-700 group-hover:border-amber-500/40 rounded-lg mb-4 transition-colors">
                    <span className="font-mono text-sm text-amber-500 font-medium">{step.number}</span>
                  </div>

                  <h3 className="font-body font-semibold text-white mb-3 leading-snug">{step.title}</h3>
                  <p className="font-body text-slate-400 text-sm leading-relaxed mb-4">{step.description}</p>
                  <p className="font-body text-slate-600 text-xs leading-relaxed border-t border-slate-800 pt-4">{step.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Note */}
        <div className="mt-10 flex items-start gap-3 bg-amber-500/5 border border-amber-500/20 rounded-lg px-5 py-4 max-w-3xl mx-auto">
          <svg className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="font-body text-amber-200/70 text-sm leading-relaxed">
            <strong className="text-amber-400 font-semibold">Engineering judgment is irreplaceable.</strong>{' '}
            GeoDraft AI is a drafting accelerator — not an engineering substitute. All output requires
            review and acceptance by a licensed Professional Engineer before use in design or construction.
          </p>
        </div>
      </div>
    </section>
  );
}
