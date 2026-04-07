import { jsPDF } from "jspdf";
import type { RoofAnalysis, PriceEstimate } from "./pricingEngine";
import { loadPdfImages, type PdfImages } from "./pdfImages";

export interface ReportData {
  customerName: string;
  email: string;
  phone: string;
  address: string;
  coords: { lat: number; lng: number };
  analysis: RoofAnalysis;
  pricing: PriceEstimate;
  hasSolarPanels: boolean | "unknown";
  solarPanelCount: number;
  couponCode: string;
  imageryDate?: { month: number; year: number };
}

type C = [number, number, number];
const NAVY: C = [27, 45, 79];
const NAVY_DARK: C = [15, 29, 51];
const ORANGE: C = [245, 166, 35];
const DARK: C = [45, 52, 66];
const GRAY: C = [107, 114, 128];
const LIGHT: C = [248, 249, 250];
const LIGHT_GRAY: C = [240, 241, 243];
const WHITE: C = [255, 255, 255];
const LIGHT_ORANGE: C = [255, 248, 240];
const MUTED: C = [180, 190, 210];

function fmt(n: number) { return "$" + n.toLocaleString("en-US"); }
function slugify(s: string) { return s.replace(/[^a-zA-Z0-9\s-]/g, "").trim().replace(/\s+/g, "-").substring(0, 40); }

function rect(d: jsPDF, x: number, y: number, w: number, h: number, fill: C, border?: C) {
  d.setFillColor(fill[0], fill[1], fill[2]);
  d.rect(x, y, w, h, "F");
  if (border) {
    d.setDrawColor(border[0], border[1], border[2]);
    d.setLineWidth(0.3);
    d.rect(x, y, w, h, "S");
  }
}
function tc(d: jsPDF, c: C) { d.setTextColor(c[0], c[1], c[2]); }
function addImg(d: jsPDF, src: string | null, x: number, y: number, w: number, h: number) {
  if (!src) return;
  try { d.addImage(src, "PNG", x, y, w, h); } catch { /* skip */ }
}

/** Draw the text-based HEC logo */
function drawLogo(d: jsPDF, x: number, y: number, scale: number = 1) {
  // Lightning bolt
  const s = scale;
  d.setFillColor(ORANGE[0], ORANGE[1], ORANGE[2]);
  d.triangle(x + 3 * s, y, x, y + 5 * s, x + 4 * s, y + 4.5 * s, "F");
  d.triangle(x + 1.5 * s, y + 4.5 * s, x + 5 * s, y + 4 * s, x + 2 * s, y + 9 * s, "F");
  // Text
  const tx = x + 8 * s;
  d.setFontSize(14 * s); d.setFont("helvetica", "bold");
  tc(d, WHITE); d.text("HOME", tx, y + 5.5 * s);
  const hw = d.getTextWidth("HOME");
  tc(d, ORANGE); d.text("ENERGY", tx + hw + 1.5, y + 5.5 * s);
  d.setFontSize(5.5 * s); d.setFont("helvetica", "normal");
  tc(d, MUTED); d.text("CONSTRUCTION", tx, y + 9 * s);
}

function pageNum(d: jsPDF, n: number, total: number, W: number) {
  tc(d, GRAY); d.setFontSize(7.5); d.setFont("helvetica", "normal");
  d.text("Page " + n + " of " + total, W / 2, 272, { align: "center" });
}

/* ═══════════════════════════════════════════
   GENERATE PDF REPORT (5 pages)
   ═══════════════════════════════════════════ */
export async function generateRoofReport(data: ReportData): Promise<void> {
  const { customerName, address, coords, analysis: a, pricing: p, hasSolarPanels, solarPanelCount, couponCode, imageryDate } = data;

  const imgs: PdfImages = await loadPdfImages(coords.lat, coords.lng);
  const doc = new jsPDF({ unit: "mm", format: "letter" });
  const W = doc.internal.pageSize.getWidth();
  const H = doc.internal.pageSize.getHeight();
  const M = 19;
  const CW = W - M * 2;
  const today = new Date();
  const dateStr = today.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  const TOTAL = 5;

  /* ═══════ PAGE 1 -- BRANDED COVER ═══════ */
  rect(doc, 0, 0, W, H, NAVY_DARK);

  // Logo centered
  drawLogo(doc, W / 2 - 30, 40, 1.3);

  // Title
  let y = 90;
  doc.setFontSize(34); doc.setFont("helvetica", "bold"); tc(doc, WHITE);
  doc.text("ROOF ANALYSIS", W / 2, y, { align: "center" });
  y += 13;
  doc.text("REPORT", W / 2, y, { align: "center" });

  // Orange rule
  y += 8;
  rect(doc, W / 2 - 35, y, 70, 1.2, ORANGE);

  // Address
  y += 16;
  doc.setFontSize(16); doc.setFont("helvetica", "normal"); tc(doc, WHITE);
  doc.text(address, W / 2, y, { align: "center", maxWidth: CW });

  // Customer name
  y += 14;
  doc.setFontSize(14); tc(doc, ORANGE);
  doc.text("Prepared exclusively for " + customerName, W / 2, y, { align: "center" });

  // Date
  y += 10;
  doc.setFontSize(10); tc(doc, MUTED);
  doc.text(dateStr, W / 2, y, { align: "center" });

  // Bottom badges
  const bY = H - 40;
  let bx = W / 2 - 50;
  if (imgs.owensCorning) { addImg(doc, imgs.owensCorning, bx, bY, 28, 9); bx += 33; }
  if (imgs.bbb) { addImg(doc, imgs.bbb, bx, bY, 28, 9); bx += 33; }
  if (imgs.anlin) { addImg(doc, imgs.anlin, bx, bY, 28, 9); }
  doc.setFontSize(8); tc(doc, MUTED);
  doc.text("CA License #1086515", W / 2, bY + 15, { align: "center" });

  pageNum(doc, 1, TOTAL, W);

  /* ═══════ PAGE 2 -- PROPERTY ANALYSIS ═══════ */
  doc.addPage();
  // Header bar
  rect(doc, 0, 0, W, 18, NAVY);
  drawLogo(doc, M, 3, 0.9);
  doc.setFontSize(8); tc(doc, MUTED);
  doc.text("(559) 797-6081", W - M, 9, { align: "right" });
  doc.text("homeenergyconstruction.com", W - M, 14, { align: "right" });

  y = 28;
  doc.setFontSize(20); doc.setFont("helvetica", "bold"); tc(doc, NAVY);
  doc.text("PROPERTY ANALYSIS", M, y);
  y += 3;
  rect(doc, M, y, 40, 0.8, ORANGE);
  y += 8;
  doc.setFontSize(11); doc.setFont("helvetica", "normal"); tc(doc, GRAY);
  doc.text(address, M, y);

  // Satellite image OR styled fallback
  y += 10;
  if (imgs.satellite) {
    const iW = 150;
    const iH = 100;
    const iX = (W - iW) / 2;
    doc.setDrawColor(200, 200, 205); doc.setLineWidth(0.3);
    doc.rect(iX - 0.5, y - 0.5, iW + 1, iH + 1, "S");
    addImg(doc, imgs.satellite, iX, y, iW, iH);
    y += iH + 3;
    if (imageryDate) {
      doc.setFontSize(7.5); tc(doc, GRAY);
      doc.text("Satellite imagery from " + imageryDate.month + "/" + imageryDate.year, W / 2, y, { align: "center" });
    }
    y += 6;
  } else {
    // Styled fallback card instead of empty space
    rect(doc, M, y, CW, 40, NAVY, ORANGE);
    doc.setFontSize(14); doc.setFont("helvetica", "bold"); tc(doc, WHITE);
    doc.text(address, W / 2, y + 16, { align: "center", maxWidth: CW - 20 });
    doc.setFontSize(9); doc.setFont("helvetica", "normal"); tc(doc, MUTED);
    doc.text("Satellite image not available for this address", W / 2, y + 28, { align: "center" });
    y += 48;
  }

  // Stats grid -- 4 boxes in a row
  const statW = (CW - 9) / 4;
  const statH = 28;
  const statsData = [
    { label: "Total Roof Area", value: a.totalRoofAreaSqFt.toLocaleString(), unit: "sq ft", highlight: true },
    { label: "Roof Type", value: a.complexity, unit: "", highlight: false },
    { label: "Primary Pitch", value: a.averagePitchRatio, unit: "", highlight: false },
    { label: "Segments", value: String(a.segmentCount), unit: "faces", highlight: false },
  ];
  statsData.forEach((s, i) => {
    const sx = M + (statW + 3) * i;
    rect(doc, sx, y, statW, statH, LIGHT, [220, 220, 225]);
    doc.setFontSize(s.highlight ? 18 : 16); doc.setFont("helvetica", "bold");
    tc(doc, s.highlight ? ORANGE : NAVY);
    doc.text(s.value, sx + statW / 2, y + 12, { align: "center" });
    if (s.unit) {
      doc.setFontSize(7); tc(doc, GRAY);
      doc.text(s.unit, sx + statW / 2, y + 17, { align: "center" });
    }
    doc.setFontSize(7); doc.setFont("helvetica", "normal"); tc(doc, GRAY);
    doc.text(s.label, sx + statW / 2, y + 23, { align: "center" });
  });

  // Badges at bottom
  const p2bY = 240;
  bx = W / 2 - 50;
  if (imgs.owensCorning) { addImg(doc, imgs.owensCorning, bx, p2bY, 28, 9); bx += 33; }
  if (imgs.bbb) { addImg(doc, imgs.bbb, bx, p2bY, 28, 9); bx += 33; }
  if (imgs.anlin) { addImg(doc, imgs.anlin, bx, p2bY, 28, 9); }
  doc.setFontSize(7.5); tc(doc, GRAY);
  doc.text("CA License #1086515", W / 2, p2bY + 14, { align: "center" });

  pageNum(doc, 2, TOTAL, W);

  /* ═══════ PAGE 3 -- ESTIMATE ═══════ */
  doc.addPage();
  rect(doc, 0, 0, W, 14, NAVY);
  doc.setFontSize(12); doc.setFont("helvetica", "bold"); tc(doc, WHITE);
  doc.text("YOUR ESTIMATED COST", W / 2, 10, { align: "center" });

  y = 24;
  const tiers = [
    { label: "GOOD", sub: "Standard Shingle", total: p.totalLow, monthly: p.totalMonthlyLow, rec: false, bg: LIGHT_GRAY, bdr: [200, 200, 205] as C },
    { label: "BETTER", sub: "Owens Corning Duration", total: p.totalMid, monthly: p.totalMonthlyMid, rec: true, bg: LIGHT_ORANGE, bdr: ORANGE },
    { label: "BEST", sub: "Premium / Tile", total: p.totalHigh, monthly: p.totalMonthlyHigh, rec: false, bg: LIGHT_GRAY, bdr: [200, 200, 205] as C },
  ];

  tiers.forEach((t) => {
    const bh = 28;
    rect(doc, M, y, CW, bh, t.bg, t.bdr);
    // Left accent
    rect(doc, M, y, 2, bh, t.rec ? ORANGE : NAVY);

    if (t.rec) {
      doc.setFontSize(8); doc.setFont("helvetica", "bold"); tc(doc, ORANGE);
      doc.text("RECOMMENDED", M + CW - 5, y + 6, { align: "right" });
    }

    doc.setFontSize(11); doc.setFont("helvetica", "bold"); tc(doc, NAVY);
    doc.text(t.label, M + 8, y + 9);
    doc.setFontSize(9); doc.setFont("helvetica", "normal"); tc(doc, GRAY);
    doc.text("- " + t.sub, M + 8 + doc.getTextWidth(t.label + " "), y + 9);

    doc.setFontSize(22); doc.setFont("helvetica", "bold");
    tc(doc, t.rec ? ORANGE : NAVY);
    doc.text(fmt(t.total), M + 8, y + 21);

    doc.setFontSize(9); doc.setFont("helvetica", "normal"); tc(doc, GRAY);
    doc.text("~" + fmt(t.monthly) + "/mo with $0 down financing", M + 65, y + 21);

    y += bh + 5;
  });

  // Solar
  if (hasSolarPanels === true && solarPanelCount > 0) {
    y += 2;
    rect(doc, M, y, CW, 16, [255, 243, 224]);
    rect(doc, M, y, 2, 16, ORANGE);
    doc.setFontSize(9.5); doc.setFont("helvetica", "bold"); tc(doc, NAVY);
    doc.text("Solar Panel Removal & Reinstallation (" + solarPanelCount + " panels): " + fmt(p.solarCost), M + 8, y + 7);
    doc.setFont("helvetica", "normal"); tc(doc, DARK);
    doc.text("Total Estimated Cost: " + fmt(p.totalLow) + " - " + fmt(p.totalHigh), M + 8, y + 13);
    y += 22;
  } else if (hasSolarPanels === "unknown") {
    y += 2;
    doc.setFontSize(8); tc(doc, GRAY);
    doc.text("* Solar panel removal not included - will be quoted at in-person inspection.", M, y);
    y += 10;
  }

  // Financing columns
  y += 4;
  doc.setFontSize(13); doc.setFont("helvetica", "bold"); tc(doc, NAVY);
  doc.text("FINANCING OPTIONS", M, y);
  y += 8;
  const fW = (CW - 6) / 3;
  [
    { title: "$0 Down", desc: "Nothing out of pocket" },
    { title: "Deferred Payments", desc: "Up to 18 months" },
    { title: "Low Monthly", desc: "From " + fmt(p.totalMonthlyLow) + "/mo" },
  ].forEach((f, i) => {
    const fx = M + (fW + 3) * i;
    rect(doc, fx, y, fW, 20, LIGHT, [220, 220, 225]);
    doc.setFontSize(10); doc.setFont("helvetica", "bold"); tc(doc, NAVY);
    doc.text(f.title, fx + fW / 2, y + 8, { align: "center" });
    doc.setFontSize(8); doc.setFont("helvetica", "normal"); tc(doc, GRAY);
    doc.text(f.desc, fx + fW / 2, y + 14, { align: "center" });
  });

  y += 30;
  doc.setFontSize(7.5); tc(doc, GRAY);
  doc.text("* Estimates based on satellite roof analysis. Final cost determined by free in-person inspection.", M, y, { maxWidth: CW });
  doc.text("Includes materials, labor, permits, and cleanup.", M, y + 4);
  pageNum(doc, 3, TOTAL, W);

  /* ═══════ PAGE 4 -- WHY HEC ═══════ */
  doc.addPage();
  rect(doc, 0, 0, W, 14, NAVY);
  doc.setFontSize(11); doc.setFont("helvetica", "bold"); tc(doc, WHITE);
  doc.text("WHY CHOOSE HOME ENERGY CONSTRUCTION", W / 2, 10, { align: "center" });

  y = 26;
  const benefits = [
    { title: "20+ Years of Experience", text: "We have upgraded hundreds of homes across Central Valley. We stand behind every job.", logo: null as string | null },
    { title: "Owens Corning Preferred Contractor", text: "Only 5% of roofers earn this certification. Premium materials, factory-trained crews, and manufacturer-backed warranties.", logo: imgs.owensCorning },
    { title: "BBB A+ Rated", text: "Our A+ rating reflects our commitment to customer satisfaction. 228+ Google reviews with a 4.7 star average.", logo: imgs.bbb },
    { title: "Licensed & Insured", text: "CA License #1086515. Fully insured, fully permitted. Every job is done to code.", logo: null },
    { title: "$0 Down Financing", text: "Multiple plans for every budget. Get approved in minutes. Checking rates will not affect your credit score.", logo: null },
  ];

  benefits.forEach((b) => {
    doc.setFillColor(ORANGE[0], ORANGE[1], ORANGE[2]);
    doc.rect(M, y - 1.5, 3, 3, "F");
    doc.setFontSize(11); doc.setFont("helvetica", "bold"); tc(doc, NAVY);
    doc.text(b.title, M + 7, y);
    if (b.logo) addImg(doc, b.logo, W - M - 28, y - 4, 28, 9);
    y += 6;
    doc.setFontSize(9); doc.setFont("helvetica", "normal"); tc(doc, DARK);
    const lines = doc.splitTextToSize(b.text, CW - 40);
    doc.text(lines, M + 7, y);
    y += lines.length * 4.5 + 8;
  });

  // Reviews callout
  y += 4;
  rect(doc, M, y, CW, 28, LIGHT);
  rect(doc, M, y, 2, 28, ORANGE);
  doc.setFontSize(13); doc.setFont("helvetica", "bold"); tc(doc, NAVY);
  doc.text("4.7 out of 5.0 stars - 228+ Google Reviews", M + 8, y + 9);
  doc.setFontSize(9); doc.setFont("helvetica", "italic"); tc(doc, DARK);
  doc.text('"Best contractor experience we have ever had." - Maria G., Fresno', M + 8, y + 17);
  doc.text('"Fair pricing, quality work, and they answer the phone." - Robert K., Madera', M + 8, y + 23);

  pageNum(doc, 4, TOTAL, W);

  /* ═══════ PAGE 5 -- COUPON + NEXT STEPS ═══════ */
  doc.addPage();
  rect(doc, 0, 0, W, 14, ORANGE);
  doc.setFontSize(12); doc.setFont("helvetica", "bold"); tc(doc, WHITE);
  doc.text("YOUR EXCLUSIVE OFFER", W / 2, 10, { align: "center" });

  // Coupon box
  y = 28;
  doc.setDrawColor(NAVY[0], NAVY[1], NAVY[2]);
  doc.setLineWidth(0.6);
  doc.setLineDashPattern([3, 2], 0);
  doc.rect(W / 2 - 48, y, 96, 36, "S");
  doc.setLineDashPattern([], 0);

  doc.setFontSize(30); doc.setFont("helvetica", "bold"); tc(doc, NAVY);
  doc.text("$500 OFF", W / 2, y + 12, { align: "center" });
  doc.setFontSize(11); doc.setFont("helvetica", "normal"); tc(doc, DARK);
  doc.text("Your Roofing Project", W / 2, y + 19, { align: "center" });
  doc.setFontSize(22); doc.setFont("helvetica", "bold"); tc(doc, ORANGE);
  doc.text(couponCode, W / 2, y + 28, { align: "center" });
  doc.setFontSize(8); doc.setFont("helvetica", "normal"); tc(doc, GRAY);
  doc.text("Present this code to your estimator or mention when you call", W / 2, y + 34, { align: "center" });

  y += 42;
  const expDate = new Date(today);
  expDate.setDate(expDate.getDate() + 30);
  const expStr = expDate.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  doc.setFontSize(9); tc(doc, GRAY);
  doc.text("Valid through: " + expStr, W / 2, y, { align: "center" });

  // Next Steps
  y += 14;
  doc.setFontSize(14); doc.setFont("helvetica", "bold"); tc(doc, NAVY);
  doc.text("YOUR NEXT STEPS", M, y);
  y += 9;

  [
    "Call (559) 797-6081 - Schedule your free inspection",
    "We visit your home - Verify measurements and inspect your roof",
    "Get your exact quote - Choose materials and financing",
    "We install your new roof - Most jobs done in 1-2 days",
  ].forEach((s, i) => {
    doc.setFontSize(10); doc.setFont("helvetica", "bold"); tc(doc, NAVY);
    doc.text((i + 1) + ".", M + 2, y);
    doc.setFont("helvetica", "normal"); tc(doc, DARK);
    doc.text(s, M + 10, y);
    y += 8;
  });

  // Thank you line
  y += 6;
  doc.setFontSize(9); doc.setFont("helvetica", "italic"); tc(doc, GRAY);
  doc.text("Thank you for considering Home Energy Construction. We look forward to protecting your home.", W / 2, y, { align: "center", maxWidth: CW });

  // Footer box
  const fy = 210;
  rect(doc, 0, fy, W, H - fy, NAVY);
  doc.setFontSize(13); doc.setFont("helvetica", "bold"); tc(doc, WHITE);
  doc.text("Home Energy Construction", W / 2, fy + 10, { align: "center" });
  doc.setFontSize(9); doc.setFont("helvetica", "normal"); tc(doc, MUTED);
  doc.text("7194 N Abby St, Fresno CA 93720", W / 2, fy + 17, { align: "center" });
  doc.text("(559) 797-6081  |  homeenergyconstruction.com", W / 2, fy + 23, { align: "center" });
  doc.text("CA License #1086515", W / 2, fy + 29, { align: "center" });
  let fbX = W / 2 - 45;
  if (imgs.owensCorning) { addImg(doc, imgs.owensCorning, fbX, fy + 33, 25, 8); fbX += 30; }
  if (imgs.bbb) { addImg(doc, imgs.bbb, fbX, fy + 33, 25, 8); fbX += 30; }
  if (imgs.anlin) { addImg(doc, imgs.anlin, fbX, fy + 33, 25, 8); }

  pageNum(doc, 5, TOTAL, W);

  /* Save */
  doc.save("Roof-Report-" + slugify(address) + "-" + today.toISOString().split("T")[0] + ".pdf");
}
