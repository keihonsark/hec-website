import { jsPDF } from "jspdf";
import type { RoofAnalysis, PriceEstimate } from "./pricingEngine";

export interface ReportData {
  customerName: string;
  email: string;
  phone: string;
  address: string;
  analysis: RoofAnalysis;
  pricing: PriceEstimate;
  hasSolarPanels: boolean | "unknown";
  solarPanelCount: number;
  couponCode: string;
}

/* ─── Brand colors ─── */
const NAVY = [27, 45, 79] as const;
const ORANGE = [245, 166, 35] as const;
const DARK = [45, 52, 66] as const;
const GRAY = [107, 114, 128] as const;
const LIGHT_BG = [248, 249, 250] as const;
const WHITE = [255, 255, 255] as const;

type RGB = readonly [number, number, number];

function fmt(n: number): string {
  return "$" + n.toLocaleString("en-US");
}

function slugify(s: string): string {
  return s
    .replace(/[^a-zA-Z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-")
    .substring(0, 40);
}

/* ─── Helpers ─── */
function setColor(doc: jsPDF, c: RGB) {
  doc.setTextColor(c[0], c[1], c[2]);
}

function drawRect(
  doc: jsPDF,
  x: number,
  y: number,
  w: number,
  h: number,
  fill: RGB
) {
  doc.setFillColor(fill[0], fill[1], fill[2]);
  doc.rect(x, y, w, h, "F");
}

function drawTableRow(
  doc: jsPDF,
  y: number,
  label: string,
  value: string,
  alt: boolean,
  width: number,
  marginLeft: number
) {
  if (alt) {
    drawRect(doc, marginLeft, y - 4.5, width, 7.5, LIGHT_BG);
  }
  doc.setFontSize(9.5);
  setColor(doc, DARK);
  doc.setFont("helvetica", "normal");
  doc.text(label, marginLeft + 3, y);
  doc.setFont("helvetica", "bold");
  doc.text(value, marginLeft + width - 3, y, { align: "right" });
}

/* ═══════════════════════════════════════════
   GENERATE REPORT
   ═══════════════════════════════════════════ */
export function generateRoofReport(data: ReportData): void {
  const {
    customerName,
    address,
    analysis: a,
    pricing: p,
    hasSolarPanels,
    solarPanelCount,
    couponCode,
  } = data;

  const doc = new jsPDF({ unit: "mm", format: "letter" });
  const W = doc.internal.pageSize.getWidth(); // 215.9
  const M = 19; // margin
  const CW = W - M * 2; // content width
  const today = new Date();
  const dateStr = today.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  /* ══════════ PAGE 1 — COVER ══════════ */
  // Top navy bar
  drawRect(doc, 0, 0, W, 18, NAVY);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  setColor(doc, WHITE);
  doc.text("HOME", M, 11);
  const homeW = doc.getTextWidth("HOME");
  setColor(doc, ORANGE);
  doc.text("ENERGY", M + homeW + 2, 11);
  doc.setFontSize(6);
  setColor(doc, [180, 190, 210]);
  doc.text("CONSTRUCTION", M, 15);

  doc.setFontSize(8);
  setColor(doc, [180, 190, 210]);
  doc.text("(559) 797-6081 | homeenergyconstruction.com", W - M, 11, {
    align: "right",
  });

  // Title
  let y = 50;
  doc.setFontSize(28);
  doc.setFont("helvetica", "bold");
  setColor(doc, NAVY);
  doc.text("Your Roof Report", W / 2, y, { align: "center" });

  y += 12;
  doc.setFontSize(13);
  doc.setFont("helvetica", "normal");
  setColor(doc, GRAY);
  doc.text(address, W / 2, y, { align: "center", maxWidth: CW });

  y += 8;
  doc.setFontSize(10);
  doc.text(`Prepared ${dateStr}`, W / 2, y, { align: "center" });

  // Stats card
  y += 18;
  drawRect(doc, M, y, CW, 42, LIGHT_BG);
  doc.setDrawColor(220, 220, 225);
  doc.rect(M, y, CW, 42, "S");

  const statW = CW / 4;
  const stats = [
    { label: "Total Roof Area", value: `${a.totalRoofAreaSqFt.toLocaleString()} sq ft` },
    { label: "Roof Type", value: a.complexity },
    { label: "Primary Pitch", value: a.averagePitchRatio },
    { label: "Roof Segments", value: `${a.segmentCount} faces` },
  ];
  stats.forEach((s, i) => {
    const sx = M + statW * i + statW / 2;
    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    setColor(doc, NAVY);
    doc.text(s.value, sx, y + 18, { align: "center" });
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    setColor(doc, GRAY);
    doc.text(s.label, sx, y + 26, { align: "center" });
  });

  // Orange bar
  y += 60;
  drawRect(doc, M, y, CW, 1.5, ORANGE);

  // Prepared for
  y += 14;
  doc.setFontSize(12);
  doc.setFont("helvetica", "normal");
  setColor(doc, DARK);
  doc.text(`Prepared exclusively for ${customerName}`, W / 2, y, {
    align: "center",
  });

  y += 10;
  doc.setFontSize(8);
  setColor(doc, GRAY);
  doc.text(
    "Owens Corning Preferred Contractor  |  BBB A+ Rated  |  CA License #1086515",
    W / 2,
    y,
    { align: "center" }
  );

  /* ══════════ PAGE 2 — COST ESTIMATE ══════════ */
  doc.addPage();
  drawRect(doc, 0, 0, W, 18, NAVY);
  doc.setFontSize(8);
  setColor(doc, [180, 190, 210]);
  doc.text("Home Energy Construction — Roof Report", M, 11);
  doc.text(address, W - M, 11, { align: "right" });

  y = 32;
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  setColor(doc, NAVY);
  doc.text("Your Estimated Roofing Cost", M, y);

  const tiers = [
    { label: "GOOD", sub: "Standard Shingle", price: p.low, monthly: p.monthlyLow, rec: false },
    { label: "BETTER", sub: "Owens Corning Duration", price: p.mid, monthly: p.monthlyMid, rec: true },
    { label: "BEST", sub: "Premium / Tile", price: p.high, monthly: p.monthlyHigh, rec: false },
  ];

  y += 12;
  tiers.forEach((tier) => {
    const boxH = 22;
    if (tier.rec) {
      drawRect(doc, M, y, CW, boxH, [252, 245, 235]);
      doc.setDrawColor(ORANGE[0], ORANGE[1], ORANGE[2]);
      doc.setLineWidth(0.8);
      doc.rect(M, y, CW, boxH, "S");
      // Badge
      doc.setFontSize(7);
      doc.setFont("helvetica", "bold");
      setColor(doc, ORANGE);
      doc.text("★ RECOMMENDED", M + CW - 3, y + 5, { align: "right" });
    } else {
      drawRect(doc, M, y, CW, boxH, LIGHT_BG);
      doc.setDrawColor(220, 220, 225);
      doc.setLineWidth(0.3);
      doc.rect(M, y, CW, boxH, "S");
    }

    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    setColor(doc, NAVY);
    doc.text(`${tier.label} — ${tier.sub}`, M + 4, y + 8);

    doc.setFontSize(16);
    doc.setFont("helvetica", "bold");
    setColor(doc, tier.rec ? ORANGE : NAVY);
    doc.text(fmt(tier.price), M + 4, y + 17);

    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    setColor(doc, GRAY);
    doc.text(`~${fmt(tier.monthly)}/mo with $0 down`, M + 55, y + 17);

    y += boxH + 4;
  });

  // Solar
  if (hasSolarPanels === true && solarPanelCount > 0) {
    y += 4;
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    setColor(doc, NAVY);
    doc.text(
      `Solar Panel Removal & Reinstallation (${solarPanelCount} panels): ${fmt(p.solarCost)}`,
      M,
      y
    );
    y += 6;
    doc.setFont("helvetica", "normal");
    setColor(doc, DARK);
    doc.text(
      `Total Estimated Cost (with solar): ${fmt(p.totalLow)} – ${fmt(p.totalHigh)}`,
      M,
      y
    );
    y += 8;
  } else if (hasSolarPanels === "unknown") {
    y += 4;
    doc.setFontSize(9);
    setColor(doc, GRAY);
    doc.text(
      "* Solar panel removal not included — will be quoted at in-person inspection.",
      M,
      y
    );
    y += 8;
  }

  // Disclaimer
  y += 4;
  doc.setFontSize(7.5);
  setColor(doc, GRAY);
  doc.text(
    "* Estimates based on satellite roof measurements. Final cost determined by free in-person inspection.",
    M,
    y,
    { maxWidth: CW }
  );
  doc.text(
    "Pricing includes materials, labor, permits, and cleanup.",
    M,
    y + 4
  );

  // Financing
  y += 18;
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  setColor(doc, NAVY);
  doc.text("Financing Options Available", M, y);

  y += 8;
  const finOpts = [
    "$0 Down — Get started with nothing out of pocket",
    "Deferred Payments — Up to 18 months before first payment",
    "Low Monthly — Flexible terms to fit your budget",
  ];
  doc.setFontSize(9.5);
  doc.setFont("helvetica", "normal");
  setColor(doc, DARK);
  finOpts.forEach((opt) => {
    doc.text(`•  ${opt}`, M + 2, y);
    y += 6;
  });
  y += 2;
  doc.setFontSize(8.5);
  setColor(doc, GRAY);
  doc.text("Multiple lender options for all credit profiles.", M + 2, y);

  /* ══════════ PAGE 3 — ROOF DETAILS ══════════ */
  doc.addPage();
  drawRect(doc, 0, 0, W, 18, NAVY);
  doc.setFontSize(8);
  setColor(doc, [180, 190, 210]);
  doc.text("Home Energy Construction — Roof Report", M, 11);
  doc.text(address, W - M, 11, { align: "right" });

  y = 32;
  doc.setFontSize(22);
  doc.setFont("helvetica", "bold");
  setColor(doc, NAVY);
  doc.text("Detailed Roof Analysis", M, y);

  // Measurements table
  y += 12;
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  setColor(doc, NAVY);
  doc.text("Roof Measurements", M, y);

  y += 7;
  const measurements = [
    ["Total Roof Area", `${a.totalRoofAreaSqFt.toLocaleString()} sq ft`],
    ["Ground Footprint", `${a.totalGroundAreaSqFt.toLocaleString()} sq ft`],
    ["Roofing Squares", `${a.roofingSquares} squares`],
    ["Waste Factor", `${Math.round(a.wasteFactor * 100)}% (${a.complexity} roof)`],
    ["Total w/ Waste", `${a.totalSquaresWithWaste} squares`],
    ["Est. Ridge", `${a.estimatedRidgeFt} lin ft`],
    ["Est. Hip", `${a.estimatedHipFt} lin ft`],
    ["Est. Valley", `${a.estimatedValleyFt} lin ft`],
    ["Est. Eave", `${a.estimatedEaveFt} lin ft`],
    ["Est. Rake", `${a.estimatedRakeFt} lin ft`],
  ];
  measurements.forEach(([label, value], i) => {
    drawTableRow(doc, y, label, value, i % 2 === 0, CW, M);
    y += 7.5;
  });

  // Materials table
  y += 8;
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  setColor(doc, NAVY);
  doc.text("Materials Estimate (Owens Corning Duration)", M, y);

  y += 7;
  const materials = [
    ["Shingle Bundles", `${a.shingleBundles} bundles`],
    ["Starter Strip Bundles", `${a.starterStripBundles} bundles`],
    ["Hip & Ridge Cap Bundles", `${a.hipRidgeBundles} bundles`],
    ["Synthetic Underlayment Rolls", `${a.underlaymentRolls} rolls`],
    ["Drip Edge Sections", `${a.dripEdgeSections} pcs`],
  ];
  materials.forEach(([label, value], i) => {
    drawTableRow(doc, y, label, value, i % 2 === 0, CW, M);
    y += 7.5;
  });

  // Segment breakdown (top 10)
  y += 8;
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  setColor(doc, NAVY);
  doc.text("Segment Breakdown", M, y);

  y += 7;
  // Header row
  doc.setFontSize(8);
  doc.setFont("helvetica", "bold");
  setColor(doc, GRAY);
  doc.text("Segment", M + 3, y);
  doc.text("Area", M + 40, y);
  doc.text("Pitch", M + 75, y);
  doc.text("Direction", M + 105, y);
  y += 5;

  const sortedSegs = [...a.segments]
    .sort((a, b) => b.areaSqFt - a.areaSqFt)
    .slice(0, 10);

  doc.setFont("helvetica", "normal");
  sortedSegs.forEach((seg, i) => {
    if (i % 2 === 0) {
      drawRect(doc, M, y - 3.5, CW, 6, LIGHT_BG);
    }
    doc.setFontSize(8.5);
    setColor(doc, DARK);
    doc.text(`#${i + 1}`, M + 3, y);
    doc.text(`${seg.areaSqFt.toLocaleString()} sq ft`, M + 40, y);
    doc.text(seg.pitchRatio, M + 75, y);
    doc.text(seg.direction, M + 105, y);
    y += 6;
  });

  if (a.segments.length > 10) {
    y += 2;
    doc.setFontSize(8);
    setColor(doc, GRAY);
    doc.text(
      `+ ${a.segments.length - 10} additional smaller segments detected`,
      M + 3,
      y
    );
  }

  /* ══════════ PAGE 4 — COUPON + CTA ══════════ */
  doc.addPage();
  drawRect(doc, 0, 0, W, 18, NAVY);
  doc.setFontSize(8);
  setColor(doc, [180, 190, 210]);
  doc.text("Home Energy Construction — Roof Report", M, 11);
  doc.text(address, W - M, 11, { align: "right" });

  // Coupon section
  y = 50;
  doc.setFontSize(24);
  doc.setFont("helvetica", "bold");
  setColor(doc, ORANGE);
  doc.text("YOUR EXCLUSIVE OFFER", W / 2, y, { align: "center" });

  y += 18;
  // Dashed border box
  doc.setDrawColor(NAVY[0], NAVY[1], NAVY[2]);
  doc.setLineWidth(0.5);
  doc.setLineDashPattern([3, 2], 0);
  doc.rect(W / 2 - 45, y - 10, 90, 28, "S");
  doc.setLineDashPattern([], 0);

  doc.setFontSize(32);
  doc.setFont("helvetica", "bold");
  setColor(doc, NAVY);
  doc.text(couponCode, W / 2, y + 4, { align: "center" });

  doc.setFontSize(14);
  setColor(doc, ORANGE);
  doc.text("$500 OFF Your Roofing Project", W / 2, y + 14, {
    align: "center",
  });

  y += 30;
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  setColor(doc, DARK);
  doc.text(
    "Present this code to your estimator or mention it when you call.",
    W / 2,
    y,
    { align: "center" }
  );

  y += 7;
  doc.setFontSize(9);
  setColor(doc, GRAY);
  const expDate = new Date(today);
  expDate.setDate(expDate.getDate() + 30);
  const expStr = expDate.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  doc.text(`Valid for 30 days  ·  Offer expires: ${expStr}`, W / 2, y, {
    align: "center",
  });

  // Next Steps
  y += 24;
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  setColor(doc, NAVY);
  doc.text("NEXT STEPS", M, y);

  y += 9;
  const steps = [
    "Call us at (559) 797-6081 to schedule your free inspection",
    "Our team will verify measurements and provide your exact quote",
    "Choose your materials and financing plan",
    "We install your new roof — most jobs in 1-2 days!",
  ];
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  setColor(doc, DARK);
  steps.forEach((step, i) => {
    doc.text(`${i + 1}.  ${step}`, M + 2, y);
    y += 7;
  });

  // Footer
  y = 245;
  drawRect(doc, 0, y, W, 35, NAVY);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  setColor(doc, WHITE);
  doc.text("Home Energy Construction", W / 2, y + 9, { align: "center" });
  doc.setFontSize(8.5);
  doc.setFont("helvetica", "normal");
  setColor(doc, [180, 190, 210]);
  doc.text("7194 N Abby St, Fresno CA 93720", W / 2, y + 15, {
    align: "center",
  });
  doc.text(
    "(559) 797-6081  |  homeenergyconstruction.com",
    W / 2,
    y + 21,
    { align: "center" }
  );
  doc.text(
    "CA License #1086515  |  Owens Corning Preferred Contractor  |  BBB A+",
    W / 2,
    y + 27,
    { align: "center" }
  );

  /* ─── Save ─── */
  const dateSlug = today.toISOString().split("T")[0];
  const addrSlug = slugify(address);
  doc.save(`Roof-Report-${addrSlug}-${dateSlug}.pdf`);
}
