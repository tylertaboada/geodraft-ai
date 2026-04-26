import { FormData, GeneratedReport, ReportSection, RiskFlag } from './types';

function generateId(): string {
  return 'GD-' + Math.random().toString(36).substring(2, 8).toUpperCase();
}

function detectConditions(data: FormData) {
  const allText = [data.boringLogs, data.groundwater, data.siteObservations, data.knownConstraints].join(' ').toLowerCase();

  return {
    hasGlacialTill: /till|glacial|outwash|varved|moraine/.test(allText),
    hasBedrock: /bedrock|diabase|schist|gneiss|limestone|shale|refusal|rock/.test(allText),
    hasWeakSoils: /soft|loose|n=[1-6][^0-9]|very loose|very soft|peat|organic|muck/.test(allText),
    hasFill: /fill|rubble|debris|disturbed|dump|waste|existing fill/.test(allText),
    hasHighGW: /shallow ground|seasonal high|7 ft|8 ft|9 ft|6 ft|5 ft|4 ft|3 ft|2 ft|perched/.test(allText),
    hasDeepGW: /deep groundwater|20 ft|25 ft|30 ft|below anticipated/.test(allText),
    hasFloodplain: /flood|river|stream|wetland|riparian|floodplain/.test(allText),
    hasSlope: /slope|grade|steep|cut|fill slope|embankment|hillside/.test(allText),
    hasExistingStructures: /existing structure|existing foundation|existing wall|retaining wall|adjacent building|neighboring/.test(allText),
    hasUtilities: /utility|utilities|water main|sewer|gas line|electric|underground/.test(allText),
    hasClayey: /clay|cl|ch|silty clay|sandy clay|fat clay|lean clay/.test(allText),
    hasSandy: /sand|sp|sw|gravel|gp|gw|outwash|coarse/.test(allText),
    hasBasement: /basement|below grade|sub-grade|-\d+ ft|sub-basement/.test(allText),
    hasCommercial: /commercial|office|retail|mixed.use|hotel|industrial/.test(allText),
    hasResidential: /residential|house|home|townhome|apartment|single.family/.test(allText),
    isPennsylvania: /pa|pennsylvania|bethlehem|allentown|philadelphia|pittsburgh|harrisburg|scranton|chester|delaware county/.test(allText),
    isNewYork: /ny|new york|manhattan|brooklyn|queens|bronx|westchester|long island|nassau|suffolk/.test(allText),
    isNewJersey: /nj|new jersey|newark|jersey city|trenton|camden|hackensack/.test(allText),
    hasFrostSensitive: /silt|ml|frost|heave|fine.grained/.test(allText),
    hasOldIndustrial: /industrial|manufacturing|former|brownfield|underground storage/.test(allText),
  };
}

export function generateReport(data: FormData): GeneratedReport {
  const cond = detectConditions(data);
  const date = new Date();
  const reportId = generateId();

  const formattedDate = date.toLocaleDateString('en-US', {
    year: 'numeric', month: 'long', day: 'numeric',
  });
  const formattedTime = date.toLocaleTimeString('en-US', {
    hour: '2-digit', minute: '2-digit',
  });

  // Determine overall risk
  let riskScore = 0;
  if (cond.hasWeakSoils) riskScore += 2;
  if (cond.hasFill) riskScore += 2;
  if (cond.hasHighGW) riskScore += 2;
  if (cond.hasFloodplain) riskScore += 2;
  if (cond.hasSlope) riskScore += 1;
  if (cond.hasExistingStructures) riskScore += 1;
  if (cond.hasOldIndustrial) riskScore += 1;
  if (cond.hasBedrock) riskScore -= 1;

  const overallRisk =
    riskScore >= 6 ? 'High' :
    riskScore >= 4 ? 'Elevated' :
    riskScore >= 2 ? 'Moderate' : 'Low';

  // Build risk flags
  const riskFlags: RiskFlag[] = [];

  if (cond.hasWeakSoils) riskFlags.push({
    level: 'high',
    label: 'Weak Near-Surface Soils',
    description: 'Low SPT N-values suggest compressible or settlement-prone soils near anticipated foundation bearing elevations.',
  });
  if (cond.hasFill) riskFlags.push({
    level: 'high',
    label: 'Existing Fill / Disturbed Ground',
    description: 'Variable fill materials may require removal, improvement, or special foundation design. Extent and composition require further evaluation.',
  });
  if (cond.hasHighGW) riskFlags.push({
    level: 'elevated',
    label: 'Shallow Groundwater / Seasonal Variability',
    description: 'Groundwater within or near planned excavation depths. Dewatering and excavation stability require engineering evaluation.',
  });
  if (cond.hasFloodplain) riskFlags.push({
    level: 'elevated',
    label: 'Floodplain Proximity',
    description: 'Site may be subject to regulatory flood constraints, seasonal inundation risk, or scour effects. FEMA FIRM panel review recommended.',
  });
  if (cond.hasOldIndustrial) riskFlags.push({
    level: 'medium',
    label: 'Former Industrial Activity',
    description: 'Evidence of prior industrial use warrants Phase I ESA and possible subsurface environmental investigation prior to construction.',
  });
  if (cond.hasSlope) riskFlags.push({
    level: 'medium',
    label: 'Slope / Grade Variability',
    description: 'Site topography may affect lateral earth pressures, drainage patterns, and construction sequencing.',
  });
  if (cond.hasExistingStructures) riskFlags.push({
    level: 'medium',
    label: 'Adjacent Structures / Utilities',
    description: 'Nearby structures or underground utilities may be affected by planned excavation and construction activities.',
  });
  if (cond.hasFrostSensitive) riskFlags.push({
    level: 'info',
    label: 'Frost-Susceptible Soils Present',
    description: 'Fine-grained soils at or near the surface are susceptible to frost heave. Minimum frost depth of 36–42 inches applies to this region.',
  });

  if (riskFlags.length === 0) riskFlags.push({
    level: 'info',
    label: 'No Critical Flags Identified',
    description: 'Based on data provided, no critical geotechnical risk conditions have been identified at this preliminary stage. Standard investigation and design procedures apply.',
  });

  // Build region context
  const regionText = cond.isPennsylvania
    ? 'The Lehigh Valley / southeastern Pennsylvania region is underlain by a mix of diabase and carbonate rock units of Triassic-Jurassic age, overlain by glacially influenced residual soils and local alluvial deposits. Seasonal frost depth in this region is typically 36–42 inches.'
    : cond.isNewYork
    ? 'The project area is within the glacially overridden terrain of the northeastern United States. Soils commonly include dense till, outwash sands and gravels, and in lower-lying areas, soft lacustrine deposits including varved clays. Frost depth typically ranges from 36 to 48 inches.'
    : cond.isNewJersey
    ? 'New Jersey subsurface conditions vary significantly from the Piedmont in the northwest (residual soils, shale, and gneiss) to the Coastal Plain in the south (sands, silts, and clays of varying consistency). Frost depth is generally 36–42 inches for northern NJ and shallower southward.'
    : 'The project is located in the northeastern United States, a region characterized by glacially deposited and residual soils over sedimentary and metamorphic bedrock. Seasonal frost depth generally ranges from 36 to 48 inches depending on locale.';

  const sections: ReportSection[] = [];

  // ── 1. Executive Summary ──
  sections.push({
    id: 'exec-summary',
    title: 'Executive Summary',
    content: [
      `This Preliminary Geotechnical Assessment has been prepared for the proposed ${data.projectType || 'development project'} located at ${data.location || 'the subject site'}. This assessment is based on the subsurface data, boring logs, groundwater observations, and site information provided by the project team as described herein.`,

      `${cond.hasGlacialTill
        ? 'Subsurface conditions encountered during site investigation are consistent with glacially deposited soils typical of the northeastern United States, including sequences of till and outwash materials overlying bedrock. '
        : ''}${cond.hasBedrock
        ? 'Competent bedrock was indicated at varying depths across the site, providing potential bearing for deep foundation systems. '
        : ''}${cond.hasWeakSoils
        ? 'Zones of weak or compressible soils were identified in the boring data and will require careful consideration during foundation system selection. '
        : ''}This assessment identifies the primary geotechnical considerations relevant to the proposed development and provides preliminary recommendations for foundation type, site preparation, and additional investigation.`,

      `Overall geotechnical risk at this stage is characterized as **${overallRisk}** based on data provided. ${overallRisk === 'High' || overallRisk === 'Elevated' ? 'Certain conditions warrant additional investigation and geotechnical engineering input prior to advancing design.' : 'Conditions appear generally suitable for the proposed development subject to standard geotechnical engineering practice and the recommendations contained herein.'}`,

      '⚠ This document is a preliminary draft generated to support internal engineering review. It does not constitute a final geotechnical report and has not been sealed by a licensed professional engineer. All findings and recommendations must be reviewed, validated, and accepted by a qualified geotechnical engineer of record prior to use in design or construction.',
    ],
  });

  // ── 2. Subsurface Conditions ──
  const subsurfaceContent = [
    `**Regional Geology & Context:** ${regionText}`,
  ];

  if (data.boringLogs.trim()) {
    subsurfaceContent.push(
      `**Boring Log Summary:** Based on the boring data provided, the following generalized subsurface profile is interpreted for the site:\n\n${data.boringLogs}`
    );
  } else {
    subsurfaceContent.push(
      'No boring log data was provided. The subsurface conditions described below are based on regional geology and general site observations only. Site-specific boring data is required before any foundation recommendations can be considered reliable.'
    );
  }

  if (cond.hasGlacialTill) {
    subsurfaceContent.push(
      'Glacially deposited till typically encountered in this region consists of a heterogeneous, poorly sorted mixture of silt, sand, gravel, and cobbles in a clay matrix. Consistency and bearing capacity can vary significantly over short horizontal distances, and isolated boulders are commonly encountered. SPT N-values in dense till typically range from 15 to >50 blows/ft.'
    );
  }

  if (cond.hasBedrock) {
    subsurfaceContent.push(
      'Bedrock was indicated at varying depths across the boring program. The degree of weathering and RQD (where available) should be reviewed to assess rock quality for bearing or anchoring purposes. Transition zones between soil and rock may exhibit erratic weathering profiles and variable engineering properties.'
    );
  }

  if (cond.hasClayey) {
    subsurfaceContent.push(
      'Cohesive soils (clays and silts) are present within the subsurface profile. These materials are susceptible to long-term consolidation settlement under sustained loading and to strength reduction when remolded or exposed to moisture. Laboratory testing (Atterberg limits, consolidation, and unconfined compression) is recommended to quantify engineering properties.'
    );
  }

  sections.push({
    id: 'subsurface',
    title: 'Subsurface Conditions',
    content: subsurfaceContent,
  });

  // ── 3. Groundwater Conditions ──
  const gwContent = [];

  if (data.groundwater.trim()) {
    gwContent.push(`**Observed Groundwater:** ${data.groundwater}`);
  }

  gwContent.push(
    'Groundwater levels observed during drilling represent a snapshot in time and may not reflect seasonal high or low conditions. Groundwater elevations in the northeastern United States are subject to significant seasonal fluctuation, typically ranging 2 to 6 feet between wet and dry seasons.',
    cond.hasHighGW
      ? 'Shallow groundwater conditions indicated by the data will require evaluation of dewatering requirements for any planned below-grade construction. Perched groundwater conditions may exist in zones of contrasting permeability within the soil profile. Long-term groundwater monitoring via installed piezometers is recommended prior to final design of below-grade systems.'
      : 'Groundwater is not anticipated to significantly constrain the proposed construction based on data provided; however, this should be confirmed with seasonal monitoring and re-evaluated during final design.',
    cond.hasBasement
      ? 'For the planned below-grade construction, permanent waterproofing and/or drainage systems will likely be required. The need for a dewatering system during construction should be evaluated by the geotechnical engineer of record based on final design grades.'
      : ''
  );

  sections.push({
    id: 'groundwater',
    title: 'Groundwater Conditions',
    content: gwContent.filter(Boolean),
  });

  // ── 4. Geotechnical Risks ──
  sections.push({
    id: 'risks',
    title: 'Geotechnical Risk Summary',
    content: [
      'The following conditions have been identified as warranting geotechnical engineering attention during design and construction. Risk characterizations are based solely on data provided and are subject to revision upon completion of a thorough geotechnical investigation.',
    ],
    flags: riskFlags,
  });

  // ── 5. Foundation Recommendations ──
  const foundContent = [];

  if (cond.hasBedrock && !cond.hasWeakSoils && !cond.hasFill) {
    foundContent.push(
      '**Shallow Foundations (Spread Footings):** Based on the subsurface data provided, shallow spread footings may be feasible for the proposed structure where competent native soils or bedrock are encountered at or near planned bearing elevation. Allowable bearing capacities and minimum frost depth setbacks should be confirmed by the geotechnical engineer of record based on laboratory testing and final design loads.',
      'Footing design should account for a minimum frost penetration depth of approximately 36–42 inches below finished grade in this region. Where fill or weak soils are present at bearing elevation, removal and replacement with engineered fill, or alternative foundation support, will be required.'
    );
  } else if (cond.hasWeakSoils || cond.hasFill) {
    foundContent.push(
      '**Shallow Foundations — Conditional:** Shallow foundations may be feasible only after removal and replacement of existing fill and/or weak near-surface soils with properly compacted engineered fill. The extent of unsuitable materials and required over-excavation depth should be verified through additional exploration.',
      '**Deep Foundations (Driven Piles or Drilled Piers):** If weak soils extend to significant depth or if site constraints limit over-excavation, a deep foundation system bearing in competent native soils or bedrock may be warranted. Pile type, capacity, and installation method should be determined based on load requirements and final subsurface data.'
    );
  } else {
    foundContent.push(
      '**Foundation System:** Based on preliminary subsurface data, conventional shallow foundations (spread footings or mat foundation) may be feasible subject to verification of bearing conditions and soil strength parameters. Allowable bearing pressure and settlement criteria must be established by a licensed geotechnical engineer based on project-specific loads and final investigation results.'
    );
  }

  foundContent.push(
    '**Settlement:** Differential and total settlement analyses should be performed by the geotechnical engineer once structural loads and final subsurface conditions are established. Long-term consolidation settlement is a consideration where cohesive soils are present beneath or adjacent to loaded areas.',
    '**Seismic Considerations:** The project site is located in a region of low to moderate seismic hazard per ASCE 7. Site class determination should be performed based on average shear wave velocity (Vs30) or SPT N-values within the upper 100 feet of the soil profile. This determination affects seismic design category and structural design requirements.',
    `⚠ The above represents a preliminary discussion only. Foundation type, dimensions, bearing capacity, and settlement limits must be established by a licensed geotechnical engineer through a complete geotechnical investigation and report.`
  );

  sections.push({
    id: 'foundation',
    title: 'Preliminary Foundation Recommendations',
    content: foundContent,
  });

  // ── 6. Site Preparation ──
  const siteContent = [
    data.siteObservations.trim()
      ? `**Site Observations:** ${data.siteObservations}`
      : 'No specific site observations were provided.',
  ];

  if (cond.hasFill) {
    siteContent.push(
      '**Existing Fill Removal:** Existing fill, rubble, and other unsuitable materials identified during investigation should be removed from all planned structural areas to the extent practical. The base of excavation should be evaluated by the geotechnical engineer during construction to confirm suitability of bearing soils.'
    );
  }

  siteContent.push(
    '**Engineered Fill and Subgrade Preparation:** Any fill placed within the building footprint or below paved areas should be properly characterized, placed in controlled lifts, and compacted to a minimum of 95% of the maximum dry density as determined by ASTM D698 or D1557 as applicable. Subgrade soils should be proofrolled prior to fill placement.',
    '**Drainage:** Positive drainage away from all structures should be established and maintained. Stormwater management design should account for the variable permeability of the soils encountered. Areas of impeded drainage may develop perched water conditions that affect subgrade performance.',
    cond.hasFrostSensitive
      ? '**Frost Protection:** Frost-susceptible soils (silts and fine-grained materials) are present at or near the surface in portions of the site. Where these soils occur at foundation bearing level, they must be protected from freezing during construction and consideration given to heave potential in final design.'
      : '',
    cond.hasSlope
      ? '**Slopes and Grading:** Site grading should be designed to avoid creating unstable cut or fill slopes. Temporary slope stability during construction should be evaluated, and permanent slope protection measures included in the design as appropriate.'
      : '',
  );

  if (data.knownConstraints.trim()) {
    siteContent.push(`**Known Site Constraints:** ${data.knownConstraints}`);
  }

  sections.push({
    id: 'site-prep',
    title: 'Site Preparation Considerations',
    content: siteContent.filter(Boolean),
  });

  // ── 7. Additional Investigation ──
  const addlContent = [
    'The following additional investigation and analyses are recommended prior to finalizing geotechnical design parameters and preparing a final geotechnical report:',
  ];

  const investigations = [
    'Complete a full geotechnical investigation program with borings spaced and located per the project footprint and ASTM D420 guidance. Borings should extend to competent bearing materials or to a depth sufficient to evaluate settlement under proposed loads.',
    'Perform laboratory testing on representative soil samples including: classification tests (grain size, Atterberg limits), moisture content and unit weight, and strength testing (unconfined compression or triaxial) for cohesive soils.',
    cond.hasBedrock ? 'Obtain rock cores (NX or BX diameter) in borings encountering bedrock, with RQD measurements and unconfined compressive strength testing on representative core samples.' : null,
    cond.hasHighGW ? 'Install piezometers or monitoring wells in representative borings to monitor groundwater levels through at least one seasonal cycle (minimum 3 months) prior to final design.' : null,
    cond.hasOldIndustrial ? 'Conduct Phase I Environmental Site Assessment (ESA) per ASTM E1527 to identify recognized environmental conditions. Phase II subsurface investigation may be warranted based on Phase I findings.' : null,
    cond.hasFloodplain ? 'Obtain FEMA Flood Insurance Rate Map (FIRM) panel for the site. Evaluate regulatory flood zone designation and, if applicable, coordinate with local floodplain administrator regarding permitting and design requirements.' : null,
    'Perform seismic site class determination per ASCE 7 Chapter 20 using measured or estimated Vs30 or weighted average SPT N-values.',
    'Prepare a final geotechnical engineering report, sealed by a licensed Professional Engineer, presenting subsurface findings, laboratory test results, and final geotechnical design parameters for foundation design, earthwork, and drainage.',
  ].filter(Boolean) as string[];

  addlContent.push(...investigations.map((item, i) => `${i + 1}. ${item}`));

  sections.push({
    id: 'additional',
    title: 'Additional Investigation Needed',
    content: addlContent,
  });

  // ── 8. Client / Stakeholder Summary (audience-specific) ──
  if (data.reportAudience === 'Developer' || data.reportAudience === 'Client' || data.reportAudience === 'Architect') {
    const audienceLabel = data.reportAudience === 'Developer'
      ? 'Development Team'
      : data.reportAudience === 'Architect'
      ? 'Project Architect'
      : 'Client';

    sections.push({
      id: 'plain-summary',
      title: `Plain-Language Summary — ${audienceLabel}`,
      isClientSummary: true,
      content: [
        `This section provides a non-technical summary for the ${audienceLabel}. All technical decisions must be made by a licensed geotechnical engineer.`,
        `**What we know so far:** The site investigation data indicates that the ground beneath ${data.projectName || 'the project site'} includes ${cond.hasGlacialTill ? 'dense glacially deposited soils' : 'native soils'} ${cond.hasBedrock ? 'underlain by bedrock' : ''}${cond.hasWeakSoils ? ' with some softer, weaker zones near the surface' : ''}. ${cond.hasHighGW ? 'Groundwater is relatively shallow and may require management during construction. ' : ''}${cond.hasFill ? 'Some areas show evidence of existing fill or disturbed ground that will need to be addressed. ' : ''}`,
        `**What this means for your project:** ${overallRisk === 'Low'
          ? 'The site appears to present manageable geotechnical conditions for the proposed development. Standard engineering procedures are expected to address the conditions identified.'
          : overallRisk === 'Moderate'
          ? 'The site presents some geotechnical conditions that will need to be carefully managed. With proper engineering design and standard construction practices, the project should be achievable.'
          : 'The site presents several geotechnical conditions that warrant careful attention and thorough engineering evaluation before finalizing design. Additional investigation is recommended before committing to a final design approach.'
        }`,
        `**Timeline & next steps:** Before detailed design can proceed, your engineering team will need to complete a full geotechnical investigation (typically 2–4 weeks for field work, plus lab testing and report preparation). Budget and schedule planning should account for the geotechnical scope as an early critical path item.`,
        `**Cost implications (general guidance):** ${cond.hasWeakSoils || cond.hasFill ? 'The presence of weak or fill soils may increase foundation costs relative to conventional assumptions. Your geotechnical engineer can provide preliminary cost-range estimates once the investigation is complete.' : 'No unusual foundation cost drivers have been identified at this preliminary stage, though this is subject to confirmation through a complete investigation.'}`,
      ],
    });
  }

  // ── 9. Disclaimer ──
  sections.push({
    id: 'disclaimer',
    title: 'Important Disclaimers',
    isDisclaimer: true,
    content: [
      'DRAFT FOR ENGINEERING REVIEW ONLY — This document has been generated as a preliminary assessment draft to support internal engineering team review. It is not a final geotechnical report.',
      'NOT A STAMPED ENGINEERING DOCUMENT — This assessment has not been reviewed, signed, or sealed by a licensed Professional Engineer. It does not constitute professional engineering advice and may not be used as the basis for design or construction decisions.',
      'REQUIRES LICENSED ENGINEER REVIEW — All findings, interpretations, and recommendations contained herein must be reviewed, validated, and accepted by a licensed geotechnical engineer registered in the state where the project is located prior to use in design or construction.',
      'DATA LIMITATIONS — This assessment is based solely on the subsurface data, boring logs, and site information provided by the project team. GeoDraft AI has not independently verified the accuracy or completeness of the input data. Subsurface conditions may vary from those indicated by the available data.',
      'GeoDraft AI is a productivity and report-drafting tool intended for use by qualified engineering professionals. It is not a substitute for professional geotechnical engineering judgment.',
    ],
  });

  return {
    projectName: data.projectName || 'Unnamed Project',
    projectType: data.projectType || 'Development Project',
    location: data.location || 'Location Not Specified',
    generatedAt: `${formattedDate} at ${formattedTime}`,
    reportId,
    audience: data.reportAudience,
    sections,
    overallRisk,
    riskFlags,
  };
}
