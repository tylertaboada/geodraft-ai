const metrics = [
  { value: '60–80%', label: 'Reduction in initial report drafting time', sub: 'Based on pilot program feedback from geotechnical firms' },
  { value: '3–5×', label: 'More projects reviewed per senior engineer', sub: 'By shifting drafting to AI-assisted junior workflows' },
  { value: 'Day 1', label: 'Preliminary feasibility input for developers', sub: 'Instead of waiting 2–4 weeks for a manual prelim' },
];

const values = [
  {
    title: 'Free Senior Engineers for Higher-Value Work',
    body: 'When AI handles first-draft structuring, senior PEs focus their time on technical judgment, client relationships, and quality review — not formatting.',
  },
  {
    title: 'Accelerate Junior Engineer Development',
    body: 'Structured AI drafts show junior engineers what a complete preliminary assessment looks like — improving quality faster than unguided drafting experience.',
  },
  {
    title: 'Improve Consistency Across Offices',
    body: 'Every preliminary assessment follows the same structure, risk flagging logic, and disclaimer language — regardless of which engineer produced it or which office it came from.',
  },
  {
    title: 'Speed Up Early-Stage Feasibility Conversations',
    body: 'Give developers and project owners a credible, clearly-caveated preliminary opinion early in the project cycle — before they\'ve committed to a full geotechnical scope.',
  },
];

export default function ValueSection() {
  return (
    <section className="bg-slate-900 border-t border-slate-800 py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <p className="section-label">Business Value</p>
          <h2 className="font-display text-3xl md:text-4xl text-white mb-4 leading-snug">
            The ROI of faster, better-structured reporting.
          </h2>
          <p className="font-body text-slate-400 text-lg">
            Geotechnical report quality and speed shouldn't be in tension. GeoDraft AI resolves that tradeoff.
          </p>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {metrics.map((m, i) => (
            <div key={i} className="card-base p-8 text-center amber-glow">
              <div className="font-display text-4xl font-bold text-amber-400 mb-2">{m.value}</div>
              <div className="font-body text-white font-medium text-sm mb-2">{m.label}</div>
              <div className="font-body text-slate-500 text-xs">{m.sub}</div>
            </div>
          ))}
        </div>

        {/* Value props */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {values.map((v, i) => (
            <div key={i} className="flex items-start gap-4">
              <div className="w-8 h-8 bg-amber-500/10 border border-amber-500/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
                <svg className="w-4 h-4 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-body font-semibold text-white text-sm mb-1">{v.title}</h3>
                <p className="font-body text-slate-400 text-sm leading-relaxed">{v.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
