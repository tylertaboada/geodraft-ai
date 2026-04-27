import { useState, useRef } from 'react';
import { FormData, GeneratedReport, ReportAudience } from '../types';
import { generateReport } from '../reportEngine';

const SAMPLE_DATA: FormData = {
  projectName: 'Ridgeline Commons — Building B',
  projectType: 'Commercial Mixed-Use (5-story, podium construction)',
  location: 'Bethlehem, PA 18015 (Northampton County)',
  boringLogs: `B-1 (0–30 ft): 0–3 ft topsoil/fill; 3–12 ft silty clay till (N=6–10, CL); 12–22 ft dense sandy gravel outwash (N=28–45); 22–30 ft weathered diabase bedrock (N>50/6").
B-2 (0–25 ft): 0–2 ft fill; 2–8 ft soft to medium clay (N=4–8); 8–18 ft medium dense glacial outwash sand (N=18–30); 18–25 ft refusal on bedrock at 25 ft.
B-3 (0–20 ft): 0–4 ft existing fill/rubble; 4–14 ft glacial till (sandy silt, N=12–22); 14–20 ft partially weathered rock (N>50).`,
  groundwater: 'Groundwater encountered at 9.5 ft bgs in B-1 and 11 ft bgs in B-2 during drilling. Seasonal high estimated at 7–8 ft based on soil staining and site history.',
  siteObservations: 'Former light industrial site. Evidence of prior foundation remnants in northwest corner. Moderate surface slopes (~6%). No evidence of active seepage. Proximity to Lehigh River floodplain noted (~400 ft east).',
  knownConstraints: '30-inch water main along south property line. Existing retaining wall (unknown footing depth) along north boundary. Owner requires basement level at -12 ft finished floor.',
  reportAudience: 'Developer',
};

const BLANK_DATA: FormData = {
  projectName: '',
  projectType: '',
  location: '',
  boringLogs: '',
  groundwater: '',
  siteObservations: '',
  knownConstraints: '',
  reportAudience: 'Internal Engineer',
};

const AUDIENCES: ReportAudience[] = ['Internal Engineer', 'Developer', 'Architect', 'Client'];

function renderBold(text: string): string {
  return text.replace(/\*\*(.*?)\*\*/g, '<strong class="text-slate-800 font-semibold">$1</strong>');
}

function RenderContent({ text }: { text: string }) {
  if (text.startsWith('⚠')) {
    const rest = text.slice(1).trim();
    return (
      <div className="flex items-start gap-2 mt-2 bg-amber-50 border border-amber-200 rounded-md px-3 py-2.5">
        <span className="text-amber-500 flex-shrink-0">⚠</span>
        <p className="font-body text-amber-800 text-xs leading-relaxed"
          dangerouslySetInnerHTML={{ __html: renderBold(rest) }} />
      </div>
    );
  }
  if (text.trim().startsWith('B-') || text.trim().startsWith('GW')) {
    return (
      <pre className="font-mono text-xs text-slate-600 bg-slate-50 border border-slate-100 rounded p-3 whitespace-pre-wrap leading-relaxed overflow-x-auto">
        {text}
      </pre>
    );
  }
  return (
    <p className="font-body text-slate-700 text-sm leading-relaxed"
      dangerouslySetInnerHTML={{ __html: renderBold(text) }} />
  );
}

const RISK_COLORS: Record<string, string> = {
  high: 'bg-red-500/10 border-red-500/30 text-red-400',
  elevated: 'bg-orange-500/10 border-orange-500/30 text-orange-400',
  medium: 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400',
  low: 'bg-green-500/10 border-green-500/30 text-green-400',
  info: 'bg-blue-500/10 border-blue-500/30 text-blue-400',
};

const RISK_LABELS: Record<string, string> = {
  high: 'HIGH',
  elevated: 'ELEVATED',
  medium: 'MODERATE',
  low: 'LOW',
  info: 'INFO',
};

export default function ReportTool() {
  const [formData, setFormData] = useState<FormData>(BLANK_DATA);
  const [report, setReport] = useState<GeneratedReport | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleLoadSample = () => {
    setFormData(SAMPLE_DATA);
    setReport(null);
  };

  const handleReset = () => {
    setFormData(BLANK_DATA);
    setReport(null);
    setCopied(false);
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setReport(null);
    setTimeout(() => {
      const result = generateReport(formData);
      setReport(result);
      setIsGenerating(false);
      setTimeout(() => {
        reportRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 100);
    }, 1200);
  };

  const handleCopy = () => {
    if (!report) return;
    const text = report.sections
      .map(s => {
        const header = `\n${'='.repeat(60)}\n${s.title.toUpperCase()}\n${'='.repeat(60)}\n`;
        const body = s.content.join('\n\n');
        const flags = s.flags
          ? '\n\nRisk Flags:\n' + s.flags.map(f => `[${f.level.toUpperCase()}] ${f.label}: ${f.description}`).join('\n')
          : '';
        return header + body + flags;
      })
      .join('\n\n');
    const full = `GEODRAFT AI — PRELIMINARY GEOTECHNICAL ASSESSMENT DRAFT\n${'='.repeat(60)}\nProject: ${report.projectName}\nLocation: ${report.location}\nGenerated: ${report.generatedAt}\nReport ID: ${report.reportId}\nOverall Risk: ${report.overallRisk}\n\nDRAFT FOR ENGINEERING REVIEW ONLY — NOT A STAMPED REPORT\n${text}`;
    navigator.clipboard.writeText(full).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const isFormValid = formData.projectName.trim() && formData.boringLogs.trim();

  return (
    <section id="tool" className="bg-slate-950 border-t border-slate-800 py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-14">
          <p className="section-label">Interactive Demo</p>
          <h2 className="font-display text-3xl md:text-4xl text-white mb-4 leading-snug">
            Generate a preliminary assessment.
          </h2>
          <p className="font-body text-slate-400 text-lg">
            Enter your site data below or load a sample boring log from the Lehigh Valley, PA.
          </p>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 items-start">
          {/* Form */}
          <div className="card-base overflow-hidden">
            <div className="bg-slate-800/50 px-6 py-4 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-amber-500 rounded-full" />
                <span className="font-mono text-xs text-slate-400 uppercase tracking-widest">Site Data Input</span>
              </div>
              <button onClick={handleLoadSample} className="btn-ghost text-xs py-1.5 px-3 text-amber-400 hover:text-amber-300">
                Load Sample Data
              </button>
            </div>

            <div className="p-6 space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block font-body text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">
                    Project Name <span className="text-amber-500">*</span>
                  </label>
                  <input type="text" className="input-field" placeholder="e.g. Ridgeline Commons — Bldg B"
                    value={formData.projectName} onChange={e => handleChange('projectName', e.target.value)} />
                </div>
                <div>
                  <label className="block font-body text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">
                    Project Type
                  </label>
                  <input type="text" className="input-field" placeholder="e.g. Commercial Mixed-Use, 5-story"
                    value={formData.projectType} onChange={e => handleChange('projectType', e.target.value)} />
                </div>
              </div>

              <div>
                <label className="block font-body text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">Location</label>
                <input type="text" className="input-field" placeholder="e.g. Bethlehem, PA 18015"
                  value={formData.location} onChange={e => handleChange('location', e.target.value)} />
              </div>

              <div>
                <label className="block font-body text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">
                  Subsurface Data / Boring Logs <span className="text-amber-500">*</span>
                </label>
                <textarea className="input-field min-h-[130px] resize-y font-mono text-xs leading-relaxed"
                  placeholder="Paste boring log summaries, SPT N-values, soil classifications..."
                  value={formData.boringLogs} onChange={e => handleChange('boringLogs', e.target.value)} />
              </div>

              <div>
                <label className="block font-body text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">Groundwater Conditions</label>
                <textarea className="input-field min-h-[70px] resize-y"
                  placeholder="Observed GW depths, seasonal variability..."
                  value={formData.groundwater} onChange={e => handleChange('groundwater', e.target.value)} />
              </div>

              <div>
                <label className="block font-body text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">Site Observations</label>
                <textarea className="input-field min-h-[70px] resize-y"
                  placeholder="Topography, surface drainage, adjacent structures, former use..."
                  value={formData.siteObservations} onChange={e => handleChange('siteObservations', e.target.value)} />
              </div>

              <div>
                <label className="block font-body text-xs font-medium text-slate-400 mb-1.5 uppercase tracking-wider">Known Constraints</label>
                <textarea className="input-field min-h-[70px] resize-y"
                  placeholder="Utilities, adjacent foundations, owner requirements..."
                  value={formData.knownConstraints} onChange={e => handleChange('knownConstraints', e.target.value)} />
              </div>

              <div>
                <label className="block font-body text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">Report Audience</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {AUDIENCES.map(a => (
                    <button key={a} type="button" onClick={() => handleChange('reportAudience', a)}
                      className={`px-3 py-2 rounded-md text-xs font-body font-medium border transition-all duration-150 ${
                        formData.reportAudience === a
                          ? 'bg-amber-500/20 border-amber-500/60 text-amber-300'
                          : 'bg-slate-800 border-slate-700 text-slate-400 hover:border-slate-500'
                      }`}>
                      {a}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 pt-2">
                <button onClick={handleGenerate} disabled={!isFormValid || isGenerating}
                  className={`btn-primary flex-1 justify-center ${!isFormValid ? 'opacity-50 cursor-not-allowed' : ''}`}>
                  {isGenerating ? (
                    <>
                      <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Structuring Data...
                    </>
                  ) : (
                    <>
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Generate Preliminary Assessment
                    </>
                  )}
                </button>
                <button onClick={handleReset} className="btn-secondary text-xs py-3 px-4">Reset</button>
              </div>
              {!isFormValid && (
                <p className="text-xs text-slate-600 font-body">* Project Name and Boring Log data are required.</p>
              )}
            </div>
          </div>

          {/* Report Output */}
          <div ref={reportRef}>
            {!report && !isGenerating && (
              <div className="card-base border-dashed flex flex-col items-center justify-center text-center py-20 px-8 min-h-[500px]">
                <div className="w-16 h-16 bg-slate-800 rounded-full flex items-center justify-center mb-5">
                  <svg className="w-7 h-7 text-slate-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <p className="font-body text-slate-500 text-sm mb-1">No report generated yet.</p>
                <p className="font-body text-slate-600 text-xs">Enter site data or load a sample, then click Generate.</p>
              </div>
            )}

            {isGenerating && (
              <div className="card-base flex flex-col items-center justify-center text-center py-20 px-8 min-h-[500px]">
                <div className="w-16 h-16 bg-amber-500/10 border border-amber-500/20 rounded-full flex items-center justify-center mb-5">
                  <svg className="w-7 h-7 text-amber-500 animate-spin" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                </div>
                <p className="font-body text-slate-300 text-sm font-medium mb-1">Interpreting subsurface data...</p>
                <p className="font-body text-slate-500 text-xs">Structuring assessment against regional geological context</p>
              </div>
            )}

            {report && (
              <div className="card-base overflow-hidden">
                <div className="bg-white text-slate-900 px-6 py-5 border-b border-slate-200">
                  <div className="flex items-start justify-between gap-4 mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="font-mono text-[10px] text-slate-400 uppercase tracking-widest">GeoDraft AI</span>
                        <span className="font-mono text-[10px] text-slate-300">·</span>
                        <span className="font-mono text-[10px] text-amber-600 uppercase tracking-widest">Draft for Review</span>
                      </div>
                      <h3 className="font-display text-lg font-bold text-slate-900 leading-tight">Preliminary Geotechnical Assessment</h3>
                      <p className="font-body text-slate-600 text-sm mt-0.5">{report.projectName}</p>
                    </div>
                    <div className={`flex-shrink-0 px-3 py-1.5 rounded-md border font-mono text-xs font-semibold uppercase tracking-wider ${
                      report.overallRisk === 'High' ? 'bg-red-50 border-red-300 text-red-600' :
                      report.overallRisk === 'Elevated' ? 'bg-orange-50 border-orange-300 text-orange-600' :
                      report.overallRisk === 'Moderate' ? 'bg-yellow-50 border-yellow-300 text-yellow-600' :
                      'bg-green-50 border-green-300 text-green-600'
                    }`}>
                      {report.overallRisk} Risk
                    </div>
                  </div>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-3 border-t border-slate-100">
                    <div>
                      <p className="font-mono text-[9px] text-slate-400 uppercase tracking-widest mb-0.5">Location</p>
                      <p className="font-body text-xs text-slate-600">{report.location}</p>
                    </div>
                    <div>
                      <p className="font-mono text-[9px] text-slate-400 uppercase tracking-widest mb-0.5">Generated</p>
                      <p className="font-body text-xs text-slate-600">{report.generatedAt}</p>
                    </div>
                    <div>
                      <p className="font-mono text-[9px] text-slate-400 uppercase tracking-widest mb-0.5">Report ID</p>
                      <p className="font-mono text-xs text-slate-600">{report.reportId}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-amber-50 border-b border-amber-200 px-5 py-2.5 flex items-center gap-2">
                  <svg className="w-3.5 h-3.5 text-amber-600 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  <p className="font-body text-amber-800 text-xs leading-tight">
                    <strong>Draft for engineering review only.</strong> Not a final stamped report. Requires review by a licensed Professional Engineer.
                  </p>
                </div>

                <div className="bg-white p-6 max-h-[680px] overflow-y-auto">
                  {report.sections.map((section) => (
                    <div key={section.id} className={`mb-7 pb-7 border-b border-slate-100 last:border-0 last:mb-0 last:pb-0 ${
                      section.isDisclaimer ? 'bg-slate-50 -mx-6 px-6 py-5' : ''
                    }`}>
                      <div className="flex items-center gap-2 mb-3">
                        {section.isClientSummary && (
                          <span className="inline-flex px-2 py-0.5 bg-blue-100 border border-blue-200 text-blue-700 font-mono text-[9px] uppercase tracking-widest rounded">Stakeholder</span>
                        )}
                        {section.isDisclaimer && (
                          <span className="inline-flex px-2 py-0.5 bg-red-100 border border-red-200 text-red-700 font-mono text-[9px] uppercase tracking-widest rounded">Legal Notice</span>
                        )}
                        <h4 className={`font-display text-sm font-bold ${section.isDisclaimer ? 'text-slate-500' : 'text-slate-900'}`}>
                          {section.title}
                        </h4>
                      </div>
                      <div className="space-y-3">
                        {section.content.map((para, i) => (
                          <RenderContent key={i} text={para} />
                        ))}
                      </div>
                      {section.flags && section.flags.length > 0 && (
                        <div className="mt-4 space-y-2">
                          {section.flags.map((flag, i) => (
                            <div key={i} className={`border rounded-md px-4 py-3 ${RISK_COLORS[flag.level]}`}>
                              <div className="flex items-start gap-2">
                                <span className={`font-mono text-[9px] font-bold uppercase tracking-widest px-1.5 py-0.5 rounded border ${RISK_COLORS[flag.level]} flex-shrink-0 mt-0.5`}>
                                  {RISK_LABELS[flag.level]}
                                </span>
                                <div>
                                  <p className="font-body text-xs font-semibold mb-0.5">{flag.label}</p>
                                  <p className="font-body text-xs opacity-80 leading-relaxed">{flag.description}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className="bg-slate-50 border-t border-slate-200 px-6 py-4 flex items-center justify-between gap-3">
                  <p className="font-mono text-[10px] text-slate-400 uppercase tracking-widest">{report.reportId} · GeoDraft AI Draft</p>
                  <button onClick={handleCopy}
                    className="inline-flex items-center gap-2 bg-slate-800 hover:bg-slate-700 text-slate-200 font-body text-xs px-4 py-2 rounded-md transition-colors duration-150">
                    {copied ? (
                      <>
                        <svg className="w-3.5 h-3.5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Copied!
                      </>
                    ) : (
                      <>
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        Copy to Clipboard
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
