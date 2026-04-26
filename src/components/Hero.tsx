export default function Hero() {
  const scrollToTool = () => {
    document.getElementById('tool')?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollToWorkflow = () => {
    document.getElementById('workflow')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden strata-bg grid-overlay pt-16">
      {/* Strata layer lines */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-[30%] left-0 right-0 h-px bg-amber-500/10" />
        <div className="absolute top-[45%] left-0 right-0 h-px bg-amber-500/5" />
        <div className="absolute top-[60%] left-0 right-0 h-px bg-amber-500/10" />
        <div className="absolute top-[75%] left-0 right-0 h-px bg-amber-500/5" />
        {/* Ambient glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-amber-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto px-6 text-center">
        {/* Badge */}
        <div className="animate-fade-in-up animation-delay-100 inline-flex items-center gap-2 border border-amber-500/30 bg-amber-500/10 rounded-full px-4 py-1.5 mb-8">
          <span className="w-1.5 h-1.5 bg-amber-500 rounded-full animate-pulse" />
          <span className="font-mono text-xs text-amber-400 tracking-widest uppercase">Enterprise · Northeast US</span>
        </div>

        {/* Headline */}
        <h1 className="animate-fade-in-up animation-delay-200 font-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-white leading-[1.1] mb-6">
          Geotechnical Reports,{' '}
          <br className="hidden sm:block" />
          <span className="italic text-amber-400">Drafted Faster.</span>
        </h1>

        {/* Subheadline */}
        <p className="animate-fade-in-up animation-delay-300 font-body text-slate-400 text-lg md:text-xl max-w-2xl mx-auto leading-relaxed mb-12">
          GeoDraft AI helps enterprise engineering teams turn site investigation data into
          structured preliminary report drafts — without sacrificing technical rigor
          or licensed engineer oversight.
        </p>

        {/* CTAs */}
        <div className="animate-fade-in-up animation-delay-400 flex flex-col sm:flex-row items-center justify-center gap-4">
          <button onClick={scrollToTool} className="btn-primary text-base px-8 py-4 w-full sm:w-auto">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            Generate Sample Report
          </button>
          <button onClick={scrollToWorkflow} className="btn-secondary text-base px-8 py-4 w-full sm:w-auto">
            View Enterprise Workflow
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
        </div>

        {/* Trust line */}
        <p className="animate-fade-in-up animation-delay-500 mt-10 font-mono text-xs text-slate-600 tracking-widest uppercase">
          For licensed geotechnical engineering teams · PA · NY · NJ
        </p>

        {/* Strata visualization */}
        <div className="animate-fade-in-up animation-delay-500 mt-16 max-w-2xl mx-auto">
          <div className="relative rounded-lg overflow-hidden border border-slate-800 bg-slate-900/50">
            <div className="px-4 py-3 border-b border-slate-800 flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-slate-700" />
                <div className="w-3 h-3 rounded-full bg-slate-700" />
                <div className="w-3 h-3 rounded-full bg-slate-700" />
              </div>
              <span className="font-mono text-xs text-slate-600 ml-2">boring_log_preview.txt</span>
            </div>
            <div className="p-5 text-left font-mono text-xs leading-relaxed">
              <div className="flex gap-3 text-slate-600 mb-1"><span className="text-amber-600/60">B-1</span><span className="text-slate-500">0–3 ft</span><span className="text-earth-300/60">Topsoil / Fill</span></div>
              <div className="flex gap-3 mb-1"><span className="text-amber-600/60">B-1</span><span className="text-slate-400">3–12 ft</span><span className="text-amber-300/80">Silty Clay Till (CL) · N=6–10</span></div>
              <div className="flex gap-3 mb-1"><span className="text-amber-600/60">B-1</span><span className="text-slate-400">12–22 ft</span><span className="text-green-400/70">Dense Sandy Gravel Outwash · N=28–45</span></div>
              <div className="flex gap-3 mb-1"><span className="text-amber-600/60">B-1</span><span className="text-slate-400">22–30 ft</span><span className="text-blue-300/70">Weathered Diabase Bedrock · N&gt;50/6"</span></div>
              <div className="mt-3 pt-3 border-t border-slate-800 text-slate-600 text-[10px] tracking-wider uppercase">
                GW Depth: 9.5 ft bgs · Seasonal High Est: 7–8 ft
              </div>
            </div>
          </div>
          <div className="mt-2 flex items-center justify-center gap-2 text-slate-600 text-xs font-mono">
            <span className="animate-pulse">▶</span> AI structuring & interpreting...
          </div>
        </div>
      </div>
    </section>
  );
}
