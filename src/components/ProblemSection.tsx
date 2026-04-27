const problems = [
  { n: '01', title: 'Drafting consumes senior time', body: 'Experienced PEs spend hours on boilerplate — work that doesn\'t require their expertise.' },
  { n: '02', title: 'Junior engineers lack structure', body: 'Early-career staff produce inconsistent prelim assessments without a reliable framework.' },
  { n: '03', title: 'Inconsistency across offices', body: 'Multi-office firms produce reports with varying format, risk framing, and language.' },
  { n: '04', title: 'Developers want faster answers', body: 'Project owners can\'t wait weeks for a preliminary geotechnical opinion during feasibility.' },
];

export default function ProblemSection() {
  return (
    <section style={{ borderTop: '1px solid #e8e6e1', background: '#ffffff' }} className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <p className="label mb-10">The problem</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {problems.map((p) => (
            <div key={p.n}>
              <p className="font-mono text-xs text-muted mb-3">{p.n}</p>
              <p className="font-serif text-base text-charcoal mb-2">{p.title}</p>
              <p className="font-sans text-sm text-muted leading-relaxed">{p.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
