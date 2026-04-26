export interface FormData {
  projectName: string;
  projectType: string;
  location: string;
  boringLogs: string;
  groundwater: string;
  siteObservations: string;
  knownConstraints: string;
  reportAudience: ReportAudience;
}

export type ReportAudience = 'Internal Engineer' | 'Developer' | 'Architect' | 'Client';

export interface ReportSection {
  id: string;
  title: string;
  badge?: string;
  content: string[];
  flags?: RiskFlag[];
  isClientSummary?: boolean;
  isDisclaimer?: boolean;
}

export interface RiskFlag {
  level: 'high' | 'medium' | 'low' | 'info';
  label: string;
  description: string;
}

export interface GeneratedReport {
  projectName: string;
  projectType: string;
  location: string;
  generatedAt: string;
  reportId: string;
  audience: ReportAudience;
  sections: ReportSection[];
  overallRisk: 'Low' | 'Moderate' | 'Elevated' | 'High';
  riskFlags: RiskFlag[];
}
