export default function CtaFooter() {
  return (
    <>
      {/* CTA Section */}
      <section className="bg-slate-950 border-t border-slate-800 py-24 relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-amber-500/5 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-3xl mx-auto px-6 text-center">
          <p className="section-label">Get Started</p>
          <h2 className="font-display text-4xl md:text-5xl text-white mb-5 leading-snug">
            Ready to accelerate your{' '}
            <span className="italic text-amber-400">geotechnical workflow?</span>
          </h2>
          <p className="font-body text-slate-400 text-lg mb-10 max-w-xl mx-auto">
            GeoDraft AI enterprise pilots are available for qualifying geotechnical and civil
            engineering firms in the Northeast US. Contact us to discuss your firm's workflow
            and reporting needs.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-10">
            <button className="btn-primary text-base px-10 py-4 w-full sm:w-auto">
              Request Enterprise Pilot
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </button>
            <button className="btn-secondary text-base px-10 py-4 w-full sm:w-auto">
              Schedule a Demo
            </button>
          </div>

          {/* Reassurance row */}
          <div className="flex flex-wrap items-center justify-center gap-6 text-slate-600 text-xs font-mono uppercase tracking-widest">
            <span className="flex items-center gap-1.5">
              <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              No commitment required
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Enterprise security
            </span>
            <span className="flex items-center gap-1.5">
              <svg className="w-3 h-3 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              PA · NY · NJ expertise
            </span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-slate-950 border-t border-slate-800 py-8">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-6 h-6">
                <svg viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="4" width="28" height="4" rx="1" fill="#f59e0b" opacity="0.9"/>
                  <rect x="2" y="11" width="28" height="3" rx="1" fill="#92400e" opacity="0.7"/>
                  <rect x="2" y="17" width="28" height="5" rx="1" fill="#44403c" opacity="0.6"/>
                  <rect x="2" y="25" width="28" height="4" rx="1" fill="#292524" opacity="0.8"/>
                </svg>
              </div>
              <span className="font-display text-sm text-slate-500">
                GeoDraft <span className="text-amber-600/60">AI</span>
              </span>
            </div>

            <div className="flex flex-wrap items-center gap-6 text-xs font-mono text-slate-600 uppercase tracking-widest">
              <span>Enterprise Geotechnical Intelligence</span>
              <span>·</span>
              <span>PA · NY · NJ</span>
              <span>·</span>
              <span>MVP Demo Build</span>
            </div>

            <p className="font-body text-slate-700 text-xs text-center">
              © {new Date().getFullYear()} GeoDraft AI. All output requires licensed PE review.
            </p>
          </div>

          <div className="mt-6 pt-6 border-t border-slate-900 text-center">
            <p className="font-body text-slate-700 text-xs leading-relaxed max-w-3xl mx-auto">
              GeoDraft AI generates preliminary assessment drafts for internal engineering team use only.
              All output must be reviewed and accepted by a licensed geotechnical engineer before use in
              design, permitting, or construction. GeoDraft AI does not practice engineering.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
}
