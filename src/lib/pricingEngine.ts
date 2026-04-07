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

export interface RoofAnalysis {
  totalRoofAreaSqFt: number;
  totalGroundAreaSqFt: number;
  segmentCount: number;
  segments: AnalyzedSegment[];
  averagePitch: number;
  averagePitchRatio: string;
  complexity: "Simple" | "Standard" | "Complex";
  roofingSquares: number;
  wasteFactor: number;
  totalSquaresWithWaste: number;
  estimatedRidgeFt: number;
  estimatedValleyFt: number;
  estimatedEaveFt: number;
}

export interface PriceEstimate {
  low: number;
  mid: number;
  high: number;
  monthlyLow: number;
  monthlyMid: number;
  monthlyHigh: number;
}

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

function getComplexity(
  segmentCount: number
): "Simple" | "Standard" | "Complex" {
  if (segmentCount <= 2) return "Simple";
  if (segmentCount <= 4) return "Standard";
  return "Complex";
}

function getWasteFactor(complexity: "Simple" | "Standard" | "Complex"): number {
  if (complexity === "Simple") return 0.1;
  if (complexity === "Standard") return 0.15;
  return 0.2;
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
    estimatedRidgeFt: Math.round(sqrtGround * 0.6),
    estimatedValleyFt: segments.length > 2 ? Math.round(sqrtGround * 0.3) : 0,
    estimatedEaveFt: Math.round(sqrtGround * 2.2),
  };
}

export function calculatePricing(analysis: RoofAnalysis): PriceEstimate {
  const sq = analysis.totalSquaresWithWaste;
  const MIN_PRICE = 8000;
  const TERM = 180;

  const raw = {
    low: Math.round(sq * 350),
    mid: Math.round(sq * 450),
    high: Math.round(sq * 550),
  };

  const low = Math.max(raw.low, MIN_PRICE);
  const mid = Math.max(raw.mid, MIN_PRICE);
  const high = Math.max(raw.high, MIN_PRICE);

  return {
    low,
    mid,
    high,
    monthlyLow: Math.round(low / TERM),
    monthlyMid: Math.round(mid / TERM),
    monthlyHigh: Math.round(high / TERM),
  };
}
