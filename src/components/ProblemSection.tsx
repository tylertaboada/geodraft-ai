const problems = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: 'Report Drafting Consumes Senior Time',
    body: 'Experienced geotechnical engineers spend hours formatting boilerplate language, structuring sections, and reconciling field data — work that doesn\'t require their expertise but demands their attention.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: 'Junior Engineers Lack Structured Guidance',
    body: 'Early-career engineers struggle to know what to include in preliminary assessments and how to frame geotechnical risk. Senior review backlogs slow project delivery.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    ),
    title: 'Inconsistency Across Office Locations',
    body: 'Multi-office firms produce reports with varying formats, language, and risk framing — making quality review and client communication difficult to standardize.',
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
    title: 'Developers Need Faster Feasibility Feedback',
    body: 'Real estate developers and project owners can\'t wait weeks for a preliminary geotechnical opinion. Early-stage feasibility decisions are being made without adequate technical input.',
  },
];

export default function ProblemSection() {
  return (
    <section className="bg-slate-950 border-t border-slate-800 py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="max-w-2xl mb-16">
          <p className="section-label">The Problem</p>
          <h2 className="font-display text-3xl md:text-4xl text-white mb-4 leading-snug">
            Geotechnical reporting is broken at the workflow level.
          </h2>
          <p className="font-body text-slate-400 text-lg leading-relaxed">
            The bottleneck isn't expertise. It's the time it takes to turn expert knowledge into
            structured, reviewable documents — repeatedly, across every project.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {problems.map((p, i) => (
            <div
              key={i}
              className="card-base p-6 hover:border-slate-700 transition-colors duration-200"
            >
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 bg-amber-500/10 border border-amber-500/20 rounded-lg flex items-center justify-center text-amber-500 flex-shrink-0 mt-0.5">
                  {p.icon}
                </div>
                <div>
                  <h3 className="font-body font-semibold text-white mb-2">{p.title}</h3>
                  <p className="font-body text-slate-400 text-sm leading-relaxed">{p.body}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
