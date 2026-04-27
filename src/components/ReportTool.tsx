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
  groundwater: 'Groundwater encountered at 9.5 ft bgs in B-1 and 11 ft bgs in B-2. Seasonal high estimated at 7–8 ft based on soil staining.',
  siteObservations: 'Former light industrial site. Foundation remnants in NW corner. Slopes ~6%. Proximity to Lehigh River floodplain (~400 ft east).',
  knownConstraints: '30-inch water main along south property line. Retaining wall (unknown footing) along north boundary. Basement required at -12 ft FFE.',
  reportAudience: 'Developer',
};

const BLANK_DATA: FormData = {
  projectName: '', projectType: '', location: '', boringLogs: '',
  groundwater: '', siteObservations: '', knownConstraints: '', reportAudience: 'Internal Engineer',
};

const AUDIENCES: ReportAudience[] = ['Internal Engineer', 'Developer', 'Architect', 'Client'];

const RISK_BG: Record<string, string> = {
  high: '#fef2f2', elevated: '#fff7ed', medium: '#fefce8', low: '#f0fdf4', info: '#eff6ff',
};
const RISK_BORDER: Record<string, string> = {
  high: '#fecaca', elevated: '#fed7aa', medium: '#fef08a', low: '#bbf7d0', info: '#bfdbfe',
};
const RISK_TEXT: Record<string, string> = {
  high: '#dc2626', elevated: '#ea580c', medium: '#ca8a04', low: '#16a34a', info: '#2563eb',
};
const RISK_LABELS: Record<string, string> = {
  high: 'HIGH', elevated: 'ELEVATED', medium: 'MODERATE', low: 'LOW', info: 'INFO',
};

function renderBold(text: string): string {
  return text.replace(/\*\*(.*?)\*\*/g, '<strong style="color:#1c1c1c;font-weight:600">$1</strong>');
}

function RenderContent({ text }: { text: string }) {
  if (text.startsWith('⚠')) {
    const rest = text.slice(1).trim();
    return (
      <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 4 }}
        className="flex items-start gap-2 px-3 py-2.5 mt-1">
        <span style={{ color: '#d97706' }} className="flex-shrink-0 text-sm">⚠</span>
        <p style={{ color: '#92400e', fontSize: '0.75rem', lineHeight: '1.5' }}
          dangerouslySetInnerHTML={{ __html: renderBold(rest) }} />
      </div>
    );
  }
  if (text.trim().match(/^B-\d|^GW/)) {
    return (
      <pre style={{ background: '#f7f6f3', border: '1px solid #e8e6e1', borderRadius: 4, fontSize: '0.7rem', color: '#374151' }}
        className="font-mono p-3 whitespace-pre-wrap leading-relaxed overflow-x-auto">
        {text}
      </pre>
    );
  }
  return (
    <p style={{ color: '#374151', fontSize: '0.825rem', lineHeight: '1.65' }}
      dangerouslySetInnerHTML={{ __html: renderBold(text) }} />
  );
}

export default function ReportTool() {
  const [formData, setFormData] = useState<FormData>(BLANK_DATA);
  const [report, setReport] = useState<GeneratedReport | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const reportRef = useRef<HTMLDivElement>(null);

  const handleChange = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleGenerate = () => {
    setIsGenerating(true);
    setReport(null);
    setTimeout(() => {
      setReport(generateReport(formData));
      setIsGenerating(false);
      setTimeout(() => reportRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 100);
    }, 1000);
  };

  const handleCopy = () => {
    if (!report) return;
    const text = report.sections.map(s => {
      const flags = s.flags ? '\n\n' + s.flags.map(f => `[${f.level.toUpperCase()}] ${f.label}: ${f.description}`).join('\n') : '';
      return `\n${'─'.repeat(50)}\n${s.title.toUpperCase()}\n${'─'.repeat(50)}\n${s.content.join('\n\n')}${flags}`;
    }).join('\n\n');
    navigator.clipboard.writeText(`GEODRAFT AI — PRELIMINARY ASSESSMENT DRAFT\nProject: ${report.projectName}\nLocation: ${report.location}\nGenerated: ${report.generatedAt} · ${report.reportId}\nRisk: ${report.overallRisk}\n\nDRAFT FOR ENGINEERING REVIEW ONLY\n${text}`).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const isValid = formData.projectName.trim() && formData.boringLogs.trim();

  return (
    <section id="tool" style={{ borderTop: '1px solid #e8e6e1' }} className="py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="label mb-3">Report generator</p>
            <h2 className="font-serif text-2xl md:text-3xl text-charcoal">Generate a preliminary assessment.</h2>
          </div>
          <button onClick={() => { setFormData(SAMPLE_DATA); setReport(null); }}
            className="btn-outline text-xs hidden sm:flex">
            Load sample data
          </button>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 items-start">
          <div className="card overflow-hidden">
            <div style={{ borderBottom: '1px solid #e8e6e1', background: '#f7f6f3' }}
              className="px-5 py-3 flex items-center justify-between">
              <p className="label">Site data input</p>
              <button onClick={() => { setFormData(SAMPLE_DATA); setReport(null); }}
                style={{ color: '#4a7c6f', fontSize: '0.75rem', fontFamily: 'IBM Plex Sans', background: 'none', border: 'none', cursor: 'pointer' }}
                className="sm:hidden">Load sample</button>
            </div>

            <div className="p-5 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="label block mb-1.5">Project name <span style={{ color: '#4a7c6f' }}>*</span></label>
                  <input className="input-field" placeholder="Ridgeline Commons"
                    value={formData.projectName} onChange={e => handleChange('projectName', e.target.value)} />
                </div>
                <div>
                  <label className="label block mb-1.5">Project type</label>
                  <input className="input-field" placeholder="Commercial, 5-story"
                    value={formData.projectType} onChange={e => handleChange('projectType', e.target.value)} />
                </div>
              </div>

              <div>
                <label className="label block mb-1.5">Location</label>
                <input className="input-field" placeholder="Bethlehem, PA 18015"
                  value={formData.location} onChange={e => handleChange('location', e.target.value)} />
              </div>

              <div>
                <label className="label block mb-1.5">Boring logs / subsurface data <span style={{ color: '#4a7c6f' }}>*</span></label>
                <textarea className="input-field font-mono text-xs leading-relaxed"
                  style={{ minHeight: 120, resize: 'vertical' }}
                  placeholder="Paste SPT N-values, soil classifications, depth intervals..."
                  value={formData.boringLogs} onChange={e => handleChange('boringLogs', e.target.value)} />
              </div>

              <div>
                <label className="label block mb-1.5">Groundwater conditions</label>
                <textarea className="input-field" style={{ minHeight: 64, resize: 'vertical' }}
                  placeholder="Observed depths, seasonal variability..."
                  value={formData.groundwater} onChange={e => handleChange('groundwater', e.target.value)} />
              </div>

              <div>
                <label className="label block mb-1.5">Site observations</label>
                <textarea className="input-field" style={{ minHeight: 64, resize: 'vertical' }}
                  placeholder="Topography, drainage, adjacent structures, former use..."
                  value={formData.siteObservations} onChange={e => handleChange('siteObservations', e.target.value)} />
              </div>

              <div>
                <label className="label block mb-1.5">Known constraints</label>
                <textarea className="input-field" style={{ minHeight: 64, resize: 'vertical' }}
                  placeholder="Utilities, adjacent foundations, owner requirements..."
                  value={formData.knownConstraints} onChange={e => handleChange('knownConstraints', e.target.value)} />
              </div>

              <div>
                <label className="label block mb-2">Report audience</label>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  {AUDIENCES.map(a => (
                    <button key={a} onClick={() => handleChange('reportAudience', a)}
                      style={{
                        border: `1px solid ${formData.reportAudience === a ? '#4a7c6f' : '#d1cfc9'}`,
                        background: formData.reportAudience === a ? '#f0f7f5' : '#ffffff',
                        color: formData.reportAudience === a ? '#4a7c6f' : '#6b7280',
                        borderRadius: 4, padding: '0.5rem', fontSize: '0.72rem',
                        fontFamily: 'IBM Plex Sans', cursor: 'pointer', transition: 'all 0.15s',
                      }}>
                      {a}
                    </button>
                  ))}
                </div>
              </div>

              <div className="flex items-center gap-3 pt-1">
                <button onClick={handleGenerate} disabled={!isValid || isGenerating}
                  className="btn-primary flex-1 justify-center"
                  style={{ opacity: !isValid ? 0.5 : 1, cursor: !isValid ? 'not-allowed' : 'pointer' }}>
                  {isGenerating ? (
                    <>
                      <svg className="w-3.5 h-3.5 animate-spin" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                      </svg>
                      Structuring...
                    </>
                  ) : 'Generate assessment'}
                </button>
                <button onClick={() => { setFormData(BLANK_DATA); setReport(null); }}
                  className="btn-outline text-xs px-4">Reset</button>
              </div>
              {!isValid && <p className="font-sans text-xs text-muted">Project name and boring log data required.</p>}
            </div>
          </div>

          <div ref={reportRef}>
            {!report && !isGenerating && (
              <div className="card flex flex-col items-center justify-center text-center py-20 px-8"
                style={{ minHeight: 480, borderStyle: 'dashed' }}>
                <svg className="w-8 h-8 mb-4" style={{ color: '#d1cfc9' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="font-sans text-sm text-muted mb-1">No report yet.</p>
                <p className="font-sans text-xs" style={{ color: '#9ca3af' }}>Enter site data or load the sample to begin.</p>
              </div>
            )}

            {isGenerating && (
              <div className="card flex flex-col items-center justify-center text-center py-20 px-8"
                style={{ minHeight: 480 }}>
                <svg className="w-6 h-6 animate-spin mb-4" style={{ color: '#4a7c6f' }} fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                <p className="font-sans text-sm text-muted">Interpreting subsurface data...</p>
              </div>
            )}

            {report && (
              <div className="card overflow-hidden">
                <div style={{ borderBottom: '1px solid #e8e6e1' }} className="px-6 py-5">
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div>
                      <p className="label mb-1">Preliminary Geotechnical Assessment</p>
                      <h3 className="font-serif text-lg text-charcoal">{report.projectName}</h3>
                      <p className="font-sans text-xs text-muted mt-0.5">{report.location}</p>
                    </div>
                    <span style={{
                      background: report.overallRisk === 'High' ? '#fef2f2' : report.overallRisk === 'Elevated' ? '#fff7ed' : report.overallRisk === 'Moderate' ? '#fefce8' : '#f0fdf4',
                      border: `1px solid ${report.overallRisk === 'High' ? '#fecaca' : report.overallRisk === 'Elevated' ? '#fed7aa' : report.overallRisk === 'Moderate' ? '#fef08a' : '#bbf7d0'}`,
                      color: report.overallRisk === 'High' ? '#dc2626' : report.overallRisk === 'Elevated' ? '#ea580c' : report.overallRisk === 'Moderate' ? '#ca8a04' : '#16a34a',
                      borderRadius: 4, padding: '0.25rem 0.625rem', fontSize: '0.65rem',
                      fontFamily: 'IBM Plex Mono', letterSpacing: '0.1em', textTransform: 'uppercase',
                      whiteSpace: 'nowrap', flexShrink: 0,
                    }}>
                      {report.overallRisk} risk
                    </span>
                  </div>

                  <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 4 }}
                    className="px-4 py-2.5 flex items-center gap-2">
                    <svg className="w-3.5 h-3.5 flex-shrink-0" style={{ color: '#d97706' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <p style={{ color: '#92400e', fontSize: '0.72rem' }} className="font-sans">
                      Draft for engineering review only — not a stamped report. Requires licensed PE review before use.
                    </p>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mt-4 pt-4" style={{ borderTop: '1px solid #e8e6e1' }}>
                    <div>
                      <p className="label mb-0.5">Generated</p>
                      <p className="font-sans text-xs text-muted">{report.generatedAt}</p>
                    </div>
                    <div>
                      <p className="label mb-0.5">Audience</p>
                      <p className="font-sans text-xs text-muted">{report.audience}</p>
                    </div>
                    <div>
                      <p className="label mb-0.5">Report ID</p>
                      <p className="font-mono text-xs text-muted">{report.reportId}</p>
                    </div>
                  </div>
                </div>

                <div className="p-6 overflow-y-auto" style={{ maxHeight: 600 }}>
                  {report.sections.map((section) => (
                    <div key={section.id} className="mb-7 pb-7" style={{ borderBottom: '1px solid #e8e6e1' }}>
                      <div className="flex items-center gap-2 mb-3">
                        {(section.isClientSummary || section.isDisclaimer) && (
                          <span style={{
                            background: section.isDisclaimer ? '#fef2f2' : '#eff6ff',
                            border: `1px solid ${section.isDisclaimer ? '#fecaca' : '#bfdbfe'}`,
                            color: section.isDisclaimer ? '#dc2626' : '#2563eb',
                            borderRadius: 3, padding: '0.15rem 0.4rem',
                            fontSize: '0.6rem', fontFamily: 'IBM Plex Mono',
                            letterSpacing: '0.1em', textTransform: 'uppercase' as const,
                          }}>
                            {section.isDisclaimer ? 'Notice' : 'Stakeholder'}
                          </span>
                        )}
                        <h4 className="font-serif text-sm text-charcoal">{section.title}</h4>
                      </div>
                      <div className="space-y-3">
                        {section.content.map((para, i) => <RenderContent key={i} text={para} />)}
                      </div>
                      {section.flags && section.flags.length > 0 && (
                        <div className="mt-4 space-y-2">
                          {section.flags.map((flag, i) => (
                            <div key={i} style={{
                              background: RISK_BG[flag.level],
                              border: `1px solid ${RISK_BORDER[flag.level]}`,
                              borderRadius: 4,
                            }} className="px-4 py-3">
                              <div className="flex items-start gap-2">
                                <span style={{
                                  color: RISK_TEXT[flag.level], fontSize: '0.6rem',
                                  fontFamily: 'IBM Plex Mono', letterSpacing: '0.1em',
                                  textTransform: 'uppercase' as const, flexShrink: 0, marginTop: 2,
                                }}>
                                  {RISK_LABELS[flag.level]}
                                </span>
                                <div>
                                  <p style={{ fontSize: '0.75rem', color: '#1c1c1c', fontWeight: 500 }} className="font-sans mb-0.5">{flag.label}</p>
                                  <p style={{ fontSize: '0.72rem', color: '#6b7280', lineHeight: 1.5 }} className="font-sans">{flag.description}</p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div style={{ borderTop: '1px solid #e8e6e1', background: '#f7f6f3' }}
                  className="px-6 py-3 flex items-center justify-between">
                  <p className="font-mono text-xs text-muted">{report.reportId}</p>
                  <button onClick={handleCopy} style={{
                    background: copied ? '#f0fdf4' : '#1c1c1c',
                    color: copied ? '#16a34a' : '#f7f6f3',
                    border: `1px solid ${copied ? '#bbf7d0' : '#1c1c1c'}`,
                    borderRadius: 4, padding: '0.375rem 0.875rem',
                    fontSize: '0.75rem', fontFamily: 'IBM Plex Sans',
                    display: 'flex', alignItems: 'center', gap: '0.375rem',
                    cursor: 'pointer', transition: 'all 0.15s',
                  }}>
                    {copied ? (
                      <>
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                        Copied
                      </>
                    ) : (
                      <>
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        Copy to clipboard
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
