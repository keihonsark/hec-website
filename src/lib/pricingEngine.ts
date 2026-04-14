const SQ_FT_PER_M2 = 10.764;

export interface RoofSegmentInput {
  pitchDegrees: number;
  azimuthDegrees: number;
  areaMeters2: number;
  groundAreaMeters2: number;
}

export interface AnalyzedSegment {
  areaSqFt: number;
  pitchDegrees: number;
  pitchRatio: string;
  direction: string;
}

export type Complexity = "Simple" | "Standard" | "Complex" | "Very Complex";

export interface RoofAnalysis {
  totalRoofAreaSqFt: number;
  totalGroundAreaSqFt: number;
  segmentCount: number;
  segments: AnalyzedSegment[];
  averagePitch: number;
  averagePitchRatio: string;
  complexity: Complexity;
  roofingSquares: number;
  wasteFactor: number;
  totalSquaresWithWaste: number;
  estimatedRidgeFt: number;
  estimatedHipFt: number;
  estimatedValleyFt: number;
  estimatedEaveFt: number;
  estimatedRakeFt: number;
  // Material quantities
  shingleBundles: number;
  starterStripBundles: number;
  hipRidgeBundles: number;
  underlaymentRolls: number;
  dripEdgeSections: number;
}

export interface PriceEstimate {
  low: number;
  mid: number;
  high: number;
  monthlyLow: number;
  monthlyMid: number;
  monthlyHigh: number;
  solarCost: number;
  totalLow: number;
  totalMid: number;
  totalHigh: number;
  totalMonthlyLow: number;
  totalMonthlyMid: number;
  totalMonthlyHigh: number;
}

export const SOLAR_COST_PER_PANEL = 190;

function pitchDegreesToRatio(degrees: number): string {
  const rise = Math.round(Math.tan((degrees * Math.PI) / 180) * 12);
  return `${rise}/12`;
}

function azimuthToDirection(azimuth: number): string {
  const a = ((azimuth % 360) + 360) % 360;
  if (a >= 315 || a < 45) return "North-facing";
  if (a >= 45 && a < 135) return "East-facing";
  if (a >= 135 && a < 225) return "South-facing";
  return "West-facing";
}

function getComplexity(segmentCount: number): Complexity {
  if (segmentCount <= 2) return "Simple";
  if (segmentCount <= 6) return "Standard";
  if (segmentCount <= 15) return "Complex";
  return "Very Complex";
}

function getWasteFactor(complexity: Complexity): number {
  switch (complexity) {
    case "Simple":
      return 0.12;
    case "Standard":
      return 0.15;
    case "Complex":
      return 0.18;
    case "Very Complex":
      return 0.2;
  }
}

export function analyzeRoof(segments: RoofSegmentInput[]): RoofAnalysis {
  const analyzed: AnalyzedSegment[] = segments.map((s) => ({
    areaSqFt: Math.round(s.areaMeters2 * SQ_FT_PER_M2),
    pitchDegrees: s.pitchDegrees,
    pitchRatio: pitchDegreesToRatio(s.pitchDegrees),
    direction: azimuthToDirection(s.azimuthDegrees),
  }));

  const totalRoofAreaSqFt = analyzed.reduce((sum, s) => sum + s.areaSqFt, 0);
  const totalGroundAreaSqFt = Math.round(
    segments.reduce((sum, s) => sum + s.groundAreaMeters2, 0) * SQ_FT_PER_M2
  );

  const avgPitch =
    segments.length > 0
      ? segments.reduce((sum, s) => sum + s.pitchDegrees, 0) / segments.length
      : 0;

  const complexity = getComplexity(segments.length);
  const wasteFactor = getWasteFactor(complexity);
  const roofingSquares = totalRoofAreaSqFt / 100;
  const totalSquaresWithWaste =
    Math.round(roofingSquares * (1 + wasteFactor) * 10) / 10;

  const sqrtGround = Math.sqrt(totalGroundAreaSqFt);
  const avgSegArea =
    analyzed.length > 0
      ? totalRoofAreaSqFt / analyzed.length
      : 0;

  // Linear footage estimates
  const ridgeFt = Math.round(sqrtGround * 0.5);
  const hipFt =
    segments.length > 2
      ? Math.round((segments.length - 2) * Math.sqrt(avgSegArea) * 0.4)
      : 0;
  const valleyFt = segments.length > 2 ? Math.round(sqrtGround * 0.3) : 0;
  const eaveFt = Math.round(sqrtGround * 2.2);
  const rakeFt = Math.round(sqrtGround * 1.0);

  // Material quantities
  const shingleBundles = Math.ceil(totalSquaresWithWaste * 3);
  const starterStripBundles = Math.ceil((eaveFt + rakeFt) / 105);
  const hipRidgeBundles = Math.ceil((ridgeFt + hipFt) / 20);
  const underlaymentRolls = Math.ceil(totalRoofAreaSqFt / 1000);
  const dripEdgeSections = Math.ceil((eaveFt + rakeFt) / 10);

  return {
    totalRoofAreaSqFt,
    totalGroundAreaSqFt,
    segmentCount: segments.length,
    segments: analyzed,
    averagePitch: Math.round(avgPitch * 10) / 10,
    averagePitchRatio: pitchDegreesToRatio(avgPitch),
    complexity,
    roofingSquares: Math.round(roofingSquares * 10) / 10,
    wasteFactor,
    totalSquaresWithWaste,
    estimatedRidgeFt: ridgeFt,
    estimatedHipFt: hipFt,
    estimatedValleyFt: valleyFt,
    estimatedEaveFt: eaveFt,
    estimatedRakeFt: rakeFt,
    shingleBundles,
    starterStripBundles,
    hipRidgeBundles,
    underlaymentRolls,
    dripEdgeSections,
  };
}

export function calculatePricing(
  analysis: RoofAnalysis,
  solarPanelCount = 0
): PriceEstimate {
  const sq = analysis.totalSquaresWithWaste;
  const MIN_PRICE = 12000;
  const TERM = 180;

  const raw = {
    low: Math.round(sq * 900),
    mid: Math.round(sq * 1200),
    high: Math.round(sq * 1500),
  };

  const low = Math.max(raw.low, MIN_PRICE);
  const mid = Math.max(raw.mid, MIN_PRICE);
  const high = Math.max(raw.high, MIN_PRICE);
  const solarCost = solarPanelCount * SOLAR_COST_PER_PANEL;

  const totalLow = low + solarCost;
  const totalMid = mid + solarCost;
  const totalHigh = high + solarCost;

  return {
    low,
    mid,
    high,
    monthlyLow: Math.round(low / TERM),
    monthlyMid: Math.round(mid / TERM),
    monthlyHigh: Math.round(high / TERM),
    solarCost,
    totalLow,
    totalMid,
    totalHigh,
    totalMonthlyLow: Math.round(totalLow / TERM),
    totalMonthlyMid: Math.round(totalMid / TERM),
    totalMonthlyHigh: Math.round(totalHigh / TERM),
  };
}
