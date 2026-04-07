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
const ORANGE: C = [245, 166, 35];
const DARK: C = [45, 52, 66];
const GRAY: C = [107, 114, 128];
const LIGHT: C = [248, 249, 250];
const WHITE: C = [255, 255, 255];
const LIGHT_ORANGE: C = [255, 248, 240];

function fmt(n: number) {
  return "$" + n.toLocaleString("en-US");
}
function slugify(s: string) {
  return s.replace(/[^a-zA-Z0-9\s-]/g, "").trim().replace(/\s+/g, "-").substring(0, 40);
}
function box(d: jsPDF, x: number, y: number, w: number, h: number, fillC: C, borderC?: C) {
  d.setFillColor(fillC[0], fillC[1], fillC[2]);
  d.rect(x, y, w, h, "F");
  if (borderC) {
    d.setDrawColor(borderC[0], borderC[1], borderC[2]);
    d.setLineWidth(0.3);
    d.rect(x, y, w, h, "S");
  }
}
function tc(d: jsPDF, c: C) { d.setTextColor(c[0], c[1], c[2]); }
function img(d: jsPDF, src: string | null, x: number, y: number, w: number, h: number) {
  if (!src) return;
  try { d.addImage(src, "PNG", x, y, w, h); } catch { /* skip */ }
}
function footer(d: jsPDF, page: number, W: number) {
  tc(d, GRAY); d.setFontSize(8); d.setFont("helvetica", "normal");
  d.text(`Page ${page}`, W / 2, 272, { align: "center" });
}

// Header bar reused on pages 2-4
function pageHeader(d: jsPDF, text: string, W: number, bgColor: C = NAVY) {
  box(d, 0, 0, W, 14, bgColor);
  d.setFontSize(11); d.setFont("helvetica", "bold"); tc(d, WHITE);
  d.text(text, W / 2, 10, { align: "center" });
}

export async function generateRoofReport(data: ReportData): Promise<void> {
  const { customerName, address, coords, analysis: a, pricing: p, hasSolarPanels, solarPanelCount, couponCode, imageryDate } = data;

  const imgs: PdfImages = await loadPdfImages(coords.lat, coords.lng);
  const doc = new jsPDF({ unit: "mm", format: "letter" });
  const W = doc.internal.pageSize.getWidth();
  const M = 19;
  const CW = W - M * 2;
  const today = new Date();
  const dateStr = today.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

  /* ═══════ PAGE 1 -- COVER ═══════ */
  box(doc, 0, 0, W, 22, NAVY);
  // Lightning bolt icon (drawn as orange lines)
  const boltX = M;
  const boltY = 5;
  doc.setDrawColor(ORANGE[0], ORANGE[1], ORANGE[2]);
  doc.setFillColor(ORANGE[0], ORANGE[1], ORANGE[2]);
  doc.triangle(boltX + 4, boltY, boltX, boltY + 7, boltX + 5, boltY + 6, "F");
  doc.triangle(boltX + 2, boltY + 6, boltX + 6, boltY + 5, boltX + 3, boltY + 12, "F");
  // Logo text
  const logoTx = M + 9;
  doc.setFontSize(14); doc.setFont("helvetica", "bold");
  tc(doc, WHITE); doc.text("HOME", logoTx, 12);
  const homeW = doc.getTextWidth("HOME");
  tc(doc, ORANGE); doc.text("ENERGY", logoTx + homeW + 1.5, 12);
  doc.setFontSize(6); doc.setFont("helvetica", "normal");
  tc(doc, [180, 190, 210]); doc.text("CONSTRUCTION", logoTx, 17);
  doc.setFontSize(9); tc(doc, [180, 190, 210]);
  doc.text("(559) 797-6081", W - M, 11, { align: "right" });
  doc.text("homeenergyconstruction.com", W - M, 16, { align: "right" });

  let y = 36;
  doc.setFontSize(26); doc.setFont("helvetica", "bold"); tc(doc, NAVY);
  doc.text("ROOF ANALYSIS REPORT", W / 2, y, { align: "center" });
  y += 3;
  box(doc, W / 2 - 30, y, 60, 1, ORANGE);
  y += 8;
  doc.setFontSize(13); doc.setFont("helvetica", "normal"); tc(doc, GRAY);
  doc.text(address, W / 2, y, { align: "center", maxWidth: CW });
  y += 7;
  doc.setFontSize(11); tc(doc, NAVY);
  doc.text("Prepared for " + customerName, W / 2, y, { align: "center" });
  y += 6;
  doc.setFontSize(10); tc(doc, GRAY);
  doc.text("Date: " + dateStr, W / 2, y, { align: "center" });

  // Satellite image
  y += 8;
  if (imgs.satellite) {
    const iW = 150;
    const iH = iW * (400 / 600);
    const iX = (W - iW) / 2;
    doc.setDrawColor(200, 200, 205); doc.setLineWidth(0.3);
    doc.rect(iX - 0.5, y - 0.5, iW + 1, iH + 1, "S");
    img(doc, imgs.satellite, iX, y, iW, iH);
    y += iH + 3;
    if (imageryDate) {
      doc.setFontSize(7.5); tc(doc, GRAY);
      doc.text("Satellite imagery from " + imageryDate.month + "/" + imageryDate.year, W / 2, y, { align: "center" });
    }
    y += 6;
  } else {
    doc.setFontSize(9); tc(doc, GRAY);
    doc.text("Satellite image unavailable", W / 2, y + 5, { align: "center" });
    y += 14;
  }

  // Stats box
  box(doc, M, y, CW, 28, LIGHT, [220, 220, 225]);
  doc.setFontSize(26); doc.setFont("helvetica", "bold"); tc(doc, ORANGE);
  doc.text(a.totalRoofAreaSqFt.toLocaleString(), M + CW * 0.25, y + 13, { align: "center" });
  doc.setFontSize(8); doc.setFont("helvetica", "normal"); tc(doc, GRAY);
  doc.text("Total Roof Area (sq ft)", M + CW * 0.25, y + 20, { align: "center" });
  doc.setFontSize(15); doc.setFont("helvetica", "bold"); tc(doc, NAVY);
  doc.text(a.complexity, M + CW * 0.58, y + 11);
  doc.text(a.averagePitchRatio, M + CW * 0.58, y + 22);
  doc.setFontSize(8); doc.setFont("helvetica", "normal"); tc(doc, GRAY);
  doc.text("Roof Type", M + CW * 0.8, y + 11);
  doc.text("Primary Pitch", M + CW * 0.8, y + 22);

  // Badges -- anchored near bottom of page
  const badgeY = 240;
  let bx = W / 2 - 55;
  if (imgs.owensCorning) { img(doc, imgs.owensCorning, bx, badgeY, 30, 10); bx += 35; }
  if (imgs.bbb) { img(doc, imgs.bbb, bx, badgeY, 30, 10); bx += 35; }
  if (imgs.anlin) { img(doc, imgs.anlin, bx, badgeY, 30, 10); }
  doc.setFontSize(7.5); tc(doc, GRAY);
  doc.text("CA License #1086515", W / 2, badgeY + 14, { align: "center" });
  footer(doc, 1, W);

  /* ═══════ PAGE 2 -- ESTIMATE ═══════ */
  doc.addPage();
  pageHeader(doc, "YOUR ESTIMATED COST", W);

  y = 24;
  const tiers = [
    { label: "GOOD", sub: "Standard Shingle", total: p.totalLow, monthly: p.totalMonthlyLow, rec: false },
    { label: "BETTER", sub: "Owens Corning Duration", total: p.totalMid, monthly: p.totalMonthlyMid, rec: true },
    { label: "BEST", sub: "Premium / Tile", total: p.totalHigh, monthly: p.totalMonthlyHigh, rec: false },
  ];

  tiers.forEach((t) => {
    const h = 26;
    const bg = t.rec ? LIGHT_ORANGE : LIGHT;
    const bdr = t.rec ? ORANGE : [200, 200, 205] as C;
    // Background
    box(doc, M, y, CW, h, bg, bdr);
    // Left accent bar
    box(doc, M, y, 2, h, t.rec ? ORANGE : NAVY);

    if (t.rec) {
      doc.setFontSize(7.5); doc.setFont("helvetica", "bold"); tc(doc, ORANGE);
      doc.text("RECOMMENDED", M + CW - 5, y + 6, { align: "right" });
    }

    doc.setFontSize(10); doc.setFont("helvetica", "bold"); tc(doc, NAVY);
    doc.text(t.label, M + 8, y + 8);
    doc.setFontSize(8.5); doc.setFont("helvetica", "normal"); tc(doc, GRAY);
    doc.text("- " + t.sub, M + 8 + doc.getTextWidth(t.label + " "), y + 8);

    doc.setFontSize(20); doc.setFont("helvetica", "bold");
    tc(doc, t.rec ? ORANGE : NAVY);
    doc.text(fmt(t.total), M + 8, y + 19);

    doc.setFontSize(9); doc.setFont("helvetica", "normal"); tc(doc, GRAY);
    doc.text("~" + fmt(t.monthly) + "/mo with $0 down financing", M + 60, y + 19);

    y += h + 5;
  });

  // Solar
  if (hasSolarPanels === true && solarPanelCount > 0) {
    y += 2;
    box(doc, M, y, CW, 16, [255, 243, 224]);
    box(doc, M, y, 2, 16, ORANGE);
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
  const finItems = [
    { title: "$0 Down", desc: "Nothing out of pocket" },
    { title: "Deferred Payments", desc: "Up to 18 months" },
    { title: "Low Monthly", desc: "From " + fmt(p.totalMonthlyLow) + "/mo" },
  ];
  finItems.forEach((f, i) => {
    const fx = M + (fW + 3) * i;
    box(doc, fx, y, fW, 20, LIGHT, [220, 220, 225]);
    doc.setFontSize(10); doc.setFont("helvetica", "bold"); tc(doc, NAVY);
    doc.text(f.title, fx + fW / 2, y + 8, { align: "center" });
    doc.setFontSize(8); doc.setFont("helvetica", "normal"); tc(doc, GRAY);
    doc.text(f.desc, fx + fW / 2, y + 14, { align: "center" });
  });

  y += 30;
  doc.setFontSize(7.5); tc(doc, GRAY);
  doc.text("* Estimates based on satellite roof analysis. Final cost determined by free in-person inspection.", M, y, { maxWidth: CW });
  doc.text("Includes materials, labor, permits, and cleanup.", M, y + 4);
  footer(doc, 2, W);

  /* ═══════ PAGE 3 -- WHY HEC ═══════ */
  doc.addPage();
  pageHeader(doc, "WHY CHOOSE HOME ENERGY CONSTRUCTION", W);

  y = 26;
  const benefits = [
    { title: "20+ Years of Experience", text: "We have upgraded hundreds of homes across Central Valley. We stand behind every job.", logo: null as string | null },
    { title: "Owens Corning Preferred Contractor", text: "Only 5% of roofers earn this certification. Premium materials, factory-trained crews, and manufacturer-backed warranties.", logo: imgs.owensCorning },
    { title: "BBB A+ Rated", text: "Our A+ rating reflects our commitment to customer satisfaction. 228+ Google reviews with a 4.7 star average.", logo: imgs.bbb },
    { title: "Licensed & Insured", text: "CA License #1086515. Fully insured, fully permitted. Every job is done to code.", logo: null },
    { title: "$0 Down Financing", text: "Multiple plans for every budget. Get approved in minutes. Checking rates will not affect your credit score.", logo: null },
  ];

  benefits.forEach((b) => {
    // Orange bullet square
    doc.setFillColor(ORANGE[0], ORANGE[1], ORANGE[2]);
    doc.rect(M, y - 1.5, 3, 3, "F");
    doc.setFontSize(11); doc.setFont("helvetica", "bold"); tc(doc, NAVY);
    doc.text(b.title, M + 7, y);
    if (b.logo) img(doc, b.logo, W - M - 28, y - 4, 28, 9);
    y += 6;
    doc.setFontSize(9); doc.setFont("helvetica", "normal"); tc(doc, DARK);
    const lines = doc.splitTextToSize(b.text, CW - 40);
    doc.text(lines, M + 7, y);
    y += lines.length * 4.5 + 8;
  });

  // Reviews callout
  y += 4;
  box(doc, M, y, CW, 28, LIGHT);
  // Orange left accent
  box(doc, M, y, 2, 28, ORANGE);
  doc.setFontSize(13); doc.setFont("helvetica", "bold"); tc(doc, NAVY);
  doc.text("4.7 out of 5.0 stars - 228+ Google Reviews", M + 8, y + 9);
  doc.setFontSize(9); doc.setFont("helvetica", "italic"); tc(doc, DARK);
  doc.text('"Best contractor experience we have ever had." - Maria G., Fresno', M + 8, y + 17);
  doc.text('"Fair pricing, quality work, and they answer the phone." - Robert K., Madera', M + 8, y + 23);
  footer(doc, 3, W);

  /* ═══════ PAGE 4 -- COUPON + NEXT STEPS ═══════ */
  doc.addPage();
  pageHeader(doc, "YOUR EXCLUSIVE OFFER", W, ORANGE);

  // Coupon box
  y = 30;
  doc.setDrawColor(NAVY[0], NAVY[1], NAVY[2]);
  doc.setLineWidth(0.6);
  doc.setLineDashPattern([3, 2], 0);
  doc.rect(W / 2 - 50, y, 100, 38, "S");
  doc.setLineDashPattern([], 0);

  doc.setFontSize(32); doc.setFont("helvetica", "bold"); tc(doc, NAVY);
  doc.text("$500 OFF", W / 2, y + 13, { align: "center" });
  doc.setFontSize(11); doc.setFont("helvetica", "normal"); tc(doc, DARK);
  doc.text("Your Roofing Project", W / 2, y + 20, { align: "center" });
  doc.setFontSize(22); doc.setFont("helvetica", "bold"); tc(doc, ORANGE);
  doc.text(couponCode, W / 2, y + 30, { align: "center" });
  doc.setFontSize(8.5); doc.setFont("helvetica", "normal"); tc(doc, GRAY);
  doc.text("Present this code to your estimator or mention when you call", W / 2, y + 36, { align: "center" });

  y += 44;
  const expDate = new Date(today);
  expDate.setDate(expDate.getDate() + 30);
  const expStr = expDate.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  doc.setFontSize(9); tc(doc, GRAY);
  doc.text("Valid through: " + expStr, W / 2, y, { align: "center" });

  // Next Steps
  y += 16;
  doc.setFontSize(14); doc.setFont("helvetica", "bold"); tc(doc, NAVY);
  doc.text("YOUR NEXT STEPS", M, y);
  y += 10;

  const steps = [
    "Call (559) 797-6081 - Schedule your free inspection",
    "We visit your home - Verify measurements and inspect your roof",
    "Get your exact quote - Choose materials and financing",
    "We install your new roof - Most jobs done in 1-2 days",
  ];
  steps.forEach((s, i) => {
    doc.setFontSize(10); doc.setFont("helvetica", "bold"); tc(doc, NAVY);
    doc.text((i + 1) + ".", M + 2, y);
    doc.setFont("helvetica", "normal"); tc(doc, DARK);
    doc.text(s, M + 10, y);
    y += 8;
  });

  // Footer box
  const fy = 225;
  box(doc, 0, fy, W, 47, NAVY);
  doc.setFontSize(13); doc.setFont("helvetica", "bold"); tc(doc, WHITE);
  doc.text("Home Energy Construction", W / 2, fy + 10, { align: "center" });
  doc.setFontSize(9); doc.setFont("helvetica", "normal"); tc(doc, [180, 190, 210]);
  doc.text("7194 N Abby St, Fresno CA 93720", W / 2, fy + 17, { align: "center" });
  doc.text("(559) 797-6081  |  homeenergyconstruction.com", W / 2, fy + 23, { align: "center" });
  doc.text("CA License #1086515", W / 2, fy + 29, { align: "center" });
  let fbX = W / 2 - 45;
  if (imgs.owensCorning) { img(doc, imgs.owensCorning, fbX, fy + 33, 25, 8); fbX += 30; }
  if (imgs.bbb) { img(doc, imgs.bbb, fbX, fy + 33, 25, 8); fbX += 30; }
  if (imgs.anlin) { img(doc, imgs.anlin, fbX, fy + 33, 25, 8); }
  footer(doc, 4, W);

  /* Save */
  const dateSlug = today.toISOString().split("T")[0];
  doc.save("Roof-Report-" + slugify(address) + "-" + dateSlug + ".pdf");
}
