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

/* ─── Colors ─── */
const NAVY: [number, number, number] = [27, 45, 79];
const ORANGE: [number, number, number] = [245, 166, 35];
const DARK: [number, number, number] = [45, 52, 66];
const GRAY: [number, number, number] = [107, 114, 128];
const LIGHT: [number, number, number] = [248, 249, 250];
const WHITE: [number, number, number] = [255, 255, 255];
const LIGHT_ORANGE: [number, number, number] = [255, 248, 240];

type C = [number, number, number];

function fmt(n: number) {
  return "$" + n.toLocaleString("en-US");
}

function slugify(s: string) {
  return s.replace(/[^a-zA-Z0-9\s-]/g, "").trim().replace(/\s+/g, "-").substring(0, 40);
}

/* Helpers */
function fill(d: jsPDF, x: number, y: number, w: number, h: number, c: C) {
  d.setFillColor(c[0], c[1], c[2]);
  d.rect(x, y, w, h, "F");
}

function color(d: jsPDF, c: C) {
  d.setTextColor(c[0], c[1], c[2]);
}

function addImg(d: jsPDF, src: string | null, x: number, y: number, w: number, h: number) {
  if (!src) return;
  try {
    d.addImage(src, "PNG", x, y, w, h);
  } catch { /* skip if image fails */ }
}

function pageFooter(d: jsPDF, page: number, W: number) {
  color(d, GRAY);
  d.setFontSize(8);
  d.setFont("helvetica", "normal");
  d.text(`Page ${page}`, W / 2, 272, { align: "center" });
}

/* ═══════════════════════════════════════════
   GENERATE PDF REPORT
   ═══════════════════════════════════════════ */
export async function generateRoofReport(data: ReportData): Promise<void> {
  const { customerName, address, coords, analysis: a, pricing: p, hasSolarPanels, solarPanelCount, couponCode, imageryDate } = data;

  // Load images
  const imgs: PdfImages = await loadPdfImages(coords.lat, coords.lng);

  const doc = new jsPDF({ unit: "mm", format: "letter" });
  const W = doc.internal.pageSize.getWidth();
  const M = 19;
  const CW = W - M * 2;
  const today = new Date();
  const dateStr = today.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });

  /* ═══════ PAGE 1 — COVER ═══════ */
  // Navy header
  fill(doc, 0, 0, W, 22, NAVY);
  if (imgs.logo) {
    addImg(doc, imgs.logo, M, 4, 50, 14);
  } else {
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    color(doc, WHITE);
    doc.text("HOME", M, 13);
    color(doc, ORANGE);
    doc.text("ENERGY", M + doc.getTextWidth("HOME") + 2, 13);
    doc.setFontSize(6);
    color(doc, [180, 190, 210]);
    doc.text("CONSTRUCTION", M, 18);
  }
  doc.setFontSize(9);
  color(doc, [180, 190, 210]);
  doc.text("(559) 797-6081", W - M, 11, { align: "right" });
  doc.text("homeenergyconstruction.com", W - M, 16, { align: "right" });

  // Title block
  let y = 40;
  doc.setFontSize(26);
  doc.setFont("helvetica", "bold");
  color(doc, NAVY);
  doc.text("ROOF ANALYSIS REPORT", W / 2, y, { align: "center" });
  y += 4;
  fill(doc, W / 2 - 30, y, 60, 1, ORANGE);

  y += 10;
  doc.setFontSize(14);
  doc.setFont("helvetica", "normal");
  color(doc, GRAY);
  doc.text(address, W / 2, y, { align: "center", maxWidth: CW });
  y += 8;
  doc.setFontSize(12);
  color(doc, NAVY);
  doc.text(`Prepared for ${customerName}`, W / 2, y, { align: "center" });
  y += 6;
  doc.setFontSize(10);
  color(doc, GRAY);
  doc.text(`Date: ${dateStr}`, W / 2, y, { align: "center" });

  // Satellite image
  y += 10;
  if (imgs.satellite) {
    const imgW = CW * 0.85;
    const imgH = imgW * (400 / 600);
    const imgX = (W - imgW) / 2;
    doc.setDrawColor(220, 220, 225);
    doc.setLineWidth(0.3);
    doc.rect(imgX - 0.5, y - 0.5, imgW + 1, imgH + 1, "S");
    addImg(doc, imgs.satellite, imgX, y, imgW, imgH);
    y += imgH + 4;
    if (imageryDate) {
      doc.setFontSize(7.5);
      color(doc, GRAY);
      doc.text(`Satellite imagery from ${imageryDate.month}/${imageryDate.year}`, W / 2, y, { align: "center" });
    }
    y += 8;
  } else {
    y += 8;
  }

  // Stats summary box
  fill(doc, M, y, CW, 30, LIGHT);
  doc.setDrawColor(220, 220, 225);
  doc.rect(M, y, CW, 30, "S");
  // Left: big area number
  doc.setFontSize(28);
  doc.setFont("helvetica", "bold");
  color(doc, ORANGE);
  doc.text(`${a.totalRoofAreaSqFt.toLocaleString()}`, M + CW * 0.25, y + 15, { align: "center" });
  doc.setFontSize(9);
  color(doc, GRAY);
  doc.text("Total Roof Area (sq ft)", M + CW * 0.25, y + 22, { align: "center" });
  // Right: type + pitch
  doc.setFontSize(16);
  doc.setFont("helvetica", "bold");
  color(doc, NAVY);
  doc.text(a.complexity, M + CW * 0.6, y + 12);
  doc.text(a.averagePitchRatio, M + CW * 0.6, y + 24);
  doc.setFontSize(8);
  doc.setFont("helvetica", "normal");
  color(doc, GRAY);
  doc.text("Roof Type", M + CW * 0.82, y + 12);
  doc.text("Primary Pitch", M + CW * 0.82, y + 24);

  // Trust badges footer
  y += 38;
  const badgeY = y;
  const badgeH = 10;
  let bx = W / 2 - 55;
  if (imgs.owensCorning) { addImg(doc, imgs.owensCorning, bx, badgeY, 30, badgeH); bx += 35; }
  if (imgs.bbb) { addImg(doc, imgs.bbb, bx, badgeY, 30, badgeH); bx += 35; }
  if (imgs.anlin) { addImg(doc, imgs.anlin, bx, badgeY, 30, badgeH); }
  y += badgeH + 4;
  doc.setFontSize(7.5);
  color(doc, GRAY);
  doc.text("CA License #1086515", W / 2, y, { align: "center" });

  pageFooter(doc, 1, W);

  /* ═══════ PAGE 2 — YOUR ESTIMATE ═══════ */
  doc.addPage();
  fill(doc, 0, 0, W, 14, NAVY);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  color(doc, WHITE);
  doc.text("YOUR ESTIMATED COST", W / 2, 10, { align: "center" });

  y = 24;

  const tiers = [
    { label: "GOOD", sub: "Standard Shingle", price: p.low, monthly: p.monthlyLow, total: p.totalLow, totalMonthly: p.totalMonthlyLow, rec: false },
    { label: "BETTER", sub: "Owens Corning Duration", price: p.mid, monthly: p.monthlyMid, total: p.totalMid, totalMonthly: p.totalMonthlyMid, rec: true },
    { label: "BEST", sub: "Premium / Tile", price: p.high, monthly: p.monthlyHigh, total: p.totalHigh, totalMonthly: p.totalMonthlyHigh, rec: false },
  ];

  tiers.forEach((t) => {
    const bh = 24;
    const bg = t.rec ? LIGHT_ORANGE : WHITE;
    const border = t.rec ? ORANGE : NAVY;
    fill(doc, M, y, CW, bh, bg);
    // Left border accent
    fill(doc, M, y, 1.5, bh, border);
    doc.setDrawColor(220, 220, 225);
    doc.setLineWidth(0.2);
    doc.rect(M, y, CW, bh, "S");

    if (t.rec) {
      doc.setFontSize(7);
      doc.setFont("helvetica", "bold");
      color(doc, ORANGE);
      doc.text("★ RECOMMENDED", M + CW - 4, y + 5, { align: "right" });
    }

    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    color(doc, NAVY);
    doc.text(t.label, M + 6, y + 7);
    doc.setFontSize(8.5);
    doc.setFont("helvetica", "normal");
    color(doc, GRAY);
    doc.text(t.sub, M + 6 + doc.getTextWidth(t.label + "  "), y + 7);

    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    color(doc, t.rec ? ORANGE : NAVY);
    doc.text(fmt(t.total), M + 6, y + 17);

    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    color(doc, GRAY);
    doc.text(`~${fmt(t.totalMonthly)}/mo with $0 down financing`, M + 55, y + 17);

    y += bh + 4;
  });

  // Solar
  if (hasSolarPanels === true && solarPanelCount > 0) {
    y += 2;
    fill(doc, M, y, CW, 16, [255, 243, 224]);
    fill(doc, M, y, 1.5, 16, ORANGE);
    doc.setFontSize(9.5);
    doc.setFont("helvetica", "bold");
    color(doc, NAVY);
    doc.text(`Solar Panel Removal & Reinstallation (${solarPanelCount} panels): ${fmt(p.solarCost)}`, M + 6, y + 7);
    doc.setFont("helvetica", "normal");
    color(doc, DARK);
    doc.text(`Total Estimated Cost: ${fmt(p.totalLow)} – ${fmt(p.totalHigh)}`, M + 6, y + 13);
    y += 20;
  } else if (hasSolarPanels === "unknown") {
    y += 2;
    doc.setFontSize(8);
    color(doc, GRAY);
    doc.text("* Solar panel removal not included — will be quoted at in-person inspection.", M, y);
    y += 8;
  }

  // Financing section
  y += 6;
  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");
  color(doc, NAVY);
  doc.text("FINANCING OPTIONS", M, y);
  y += 8;

  const finW = CW / 3;
  const finItems = [
    { title: "$0 Down", desc: "Nothing out of pocket" },
    { title: "Deferred Payments", desc: "Up to 18 months" },
    { title: "Low Monthly", desc: `From ${fmt(p.totalMonthlyLow)}/mo` },
  ];
  finItems.forEach((f, i) => {
    const fx = M + finW * i;
    fill(doc, fx, y, finW - 3, 18, LIGHT);
    doc.setFontSize(10);
    doc.setFont("helvetica", "bold");
    color(doc, NAVY);
    doc.text(f.title, fx + (finW - 3) / 2, y + 7, { align: "center" });
    doc.setFontSize(8);
    doc.setFont("helvetica", "normal");
    color(doc, GRAY);
    doc.text(f.desc, fx + (finW - 3) / 2, y + 13, { align: "center" });
  });

  y += 28;
  doc.setFontSize(7.5);
  color(doc, GRAY);
  doc.text(
    "* Estimates based on satellite roof analysis. Final cost determined by free in-person inspection. Includes materials, labor, permits, and cleanup.",
    M, y, { maxWidth: CW }
  );

  pageFooter(doc, 2, W);

  /* ═══════ PAGE 3 — WHY HEC ═══════ */
  doc.addPage();
  fill(doc, 0, 0, W, 14, NAVY);
  doc.setFontSize(11);
  doc.setFont("helvetica", "bold");
  color(doc, WHITE);
  doc.text("WHY CHOOSE HOME ENERGY CONSTRUCTION", W / 2, 10, { align: "center" });

  y = 26;
  const benefits = [
    {
      title: "20+ Years of Experience",
      text: "We've upgraded hundreds of homes across Central Valley. We're not a fly-by-night operation — we stand behind every job.",
      img: null,
    },
    {
      title: "Owens Corning Preferred Contractor",
      text: "Only 5% of roofers earn this certification. It means premium materials, factory-trained crews, and manufacturer-backed warranties.",
      img: imgs.owensCorning,
    },
    {
      title: "BBB A+ Rated",
      text: "Our A+ rating reflects our commitment to customer satisfaction. 228+ Google reviews with a 4.7 star average.",
      img: imgs.bbb,
    },
    {
      title: "Licensed & Insured",
      text: "CA License #1086515. Fully insured, fully permitted. Every job is done to code — no shortcuts.",
      img: null,
    },
    {
      title: "$0 Down Financing",
      text: "Multiple plans for every budget. Get approved in minutes. Checking rates won't affect your credit score.",
      img: null,
    },
  ];

  benefits.forEach((b) => {
    // Orange bullet
    fill(doc, M, y - 1, 3, 3, ORANGE);
    doc.setFontSize(11);
    doc.setFont("helvetica", "bold");
    color(doc, NAVY);
    doc.text(b.title, M + 7, y + 1);
    if (b.img) {
      addImg(doc, b.img, W - M - 25, y - 3, 25, 8);
    }
    y += 6;
    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    color(doc, DARK);
    doc.text(b.text, M + 7, y, { maxWidth: CW - 40 });
    y += 14;
  });

  // Google reviews callout
  y += 6;
  fill(doc, M, y, CW, 24, LIGHT);
  doc.setDrawColor(ORANGE[0], ORANGE[1], ORANGE[2]);
  doc.setLineWidth(0.5);
  doc.line(M, y, M, y + 24);

  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  color(doc, NAVY);
  doc.text("4.7 ★★★★★ from 228+ homeowners", M + 6, y + 8);

  doc.setFontSize(9);
  doc.setFont("helvetica", "italic");
  color(doc, DARK);
  doc.text('"Best contractor experience we\'ve ever had." — Maria G.', M + 6, y + 15);
  doc.text('"Fair pricing, quality work, and they answer the phone." — Robert K.', M + 6, y + 21);

  pageFooter(doc, 3, W);

  /* ═══════ PAGE 4 — COUPON + NEXT STEPS ═══════ */
  doc.addPage();
  fill(doc, 0, 0, W, 14, ORANGE);
  doc.setFontSize(12);
  doc.setFont("helvetica", "bold");
  color(doc, WHITE);
  doc.text("YOUR EXCLUSIVE OFFER", W / 2, 10, { align: "center" });

  // Coupon box
  y = 32;
  doc.setDrawColor(NAVY[0], NAVY[1], NAVY[2]);
  doc.setLineWidth(0.6);
  doc.setLineDashPattern([3, 2], 0);
  doc.rect(W / 2 - 55, y, 110, 42, "S");
  doc.setLineDashPattern([], 0);

  doc.setFontSize(34);
  doc.setFont("helvetica", "bold");
  color(doc, NAVY);
  doc.text("$500 OFF", W / 2, y + 14, { align: "center" });

  doc.setFontSize(12);
  color(doc, DARK);
  doc.text("Your Roofing Project", W / 2, y + 22, { align: "center" });

  doc.setFontSize(24);
  doc.setFont("helvetica", "bold");
  color(doc, ORANGE);
  doc.text(couponCode, W / 2, y + 33, { align: "center" });

  doc.setFontSize(8.5);
  doc.setFont("helvetica", "normal");
  color(doc, GRAY);
  doc.text("Present this code to your estimator or mention when you call", W / 2, y + 39, { align: "center" });

  y += 48;
  const expDate = new Date(today);
  expDate.setDate(expDate.getDate() + 30);
  const expStr = expDate.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
  doc.setFontSize(9);
  color(doc, GRAY);
  doc.text(`Valid through: ${expStr}`, W / 2, y, { align: "center" });

  // Next Steps
  y += 18;
  doc.setFontSize(14);
  doc.setFont("helvetica", "bold");
  color(doc, NAVY);
  doc.text("YOUR NEXT STEPS", M, y);
  y += 9;

  const steps = [
    { icon: "📞", text: "Call (559) 797-6081 — Schedule your free inspection" },
    { icon: "🏠", text: "We visit your home — Verify measurements & inspect your roof" },
    { icon: "📋", text: "Get your exact quote — Choose materials & financing" },
    { icon: "✅", text: "We install your new roof — Most jobs done in 1-2 days" },
  ];
  doc.setFontSize(10);
  doc.setFont("helvetica", "normal");
  steps.forEach((s, i) => {
    color(doc, NAVY);
    doc.setFont("helvetica", "bold");
    doc.text(`${i + 1}.`, M + 2, y);
    doc.setFont("helvetica", "normal");
    color(doc, DARK);
    doc.text(`${s.icon}  ${s.text}`, M + 10, y);
    y += 8;
  });

  // Footer box
  y = 225;
  fill(doc, 0, y, W, 47, NAVY);
  doc.setFontSize(13);
  doc.setFont("helvetica", "bold");
  color(doc, WHITE);
  doc.text("Home Energy Construction", W / 2, y + 10, { align: "center" });
  doc.setFontSize(9);
  doc.setFont("helvetica", "normal");
  color(doc, [180, 190, 210]);
  doc.text("7194 N Abby St, Fresno CA 93720", W / 2, y + 17, { align: "center" });
  doc.text("(559) 797-6081  |  homeenergyconstruction.com", W / 2, y + 23, { align: "center" });
  doc.text("CA License #1086515", W / 2, y + 29, { align: "center" });

  // Badge images in footer
  const fbY = y + 33;
  let fbX = W / 2 - 45;
  if (imgs.owensCorning) { addImg(doc, imgs.owensCorning, fbX, fbY, 25, 8); fbX += 30; }
  if (imgs.bbb) { addImg(doc, imgs.bbb, fbX, fbY, 25, 8); fbX += 30; }
  if (imgs.anlin) { addImg(doc, imgs.anlin, fbX, fbY, 25, 8); }

  pageFooter(doc, 4, W);

  /* ─── Save ─── */
  const dateSlug = today.toISOString().split("T")[0];
  doc.save(`Roof-Report-${slugify(address)}-${dateSlug}.pdf`);
}
