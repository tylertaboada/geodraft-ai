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

const RISK_COLORS = {
  high: 'bg-red-500/10 border-red-500/30 text-red-400',
  elevated: 'bg-orange-500/10 border-orange-500/30 text-orange-400',
  medium: 'bg-yellow-500/10 border-yellow-500/30 text-yellow-400',
  low: 'bg-green-500/10 border-green-500/30 text-green-400',
  info: 'bg-blue-500/10 border-blue-500/30 text-blue-400',
};

const RISK_LABELS = {
  high: 'HIGH',
  elevated: 'ELEVATED',
  medium: 'MODERATE',
  low: 'LOW',
  info: 'INFO',
};
