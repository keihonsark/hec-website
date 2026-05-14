"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import confetti from "canvas-confetti";
import { Loader2, Star } from "lucide-react";
import {
  submitReviewEnrollment,
  type ReviewEnrollmentChannel,
} from "@/lib/reviewEnrollmentWebhook";

const SUCCESS_HEADLINES = [
  "Request sent!",
  "Nice work!",
  "Customer added to the pipeline!",
  "Another 5-star request out!",
] as const;

function pickHeadline(): string {
  return SUCCESS_HEADLINES[
    Math.floor(Math.random() * SUCCESS_HEADLINES.length)
  ];
}

function vibrate(ms: number) {
  try {
    if (typeof navigator !== "undefined" && "vibrate" in navigator) {
      navigator.vibrate(ms);
    }
  } catch {
    /* silent — unsupported */
  }
}

function fireConfetti() {
  try {
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { x: 0.5, y: 0.2 },
      colors: ["#1B2D4F", "#F5A623"],
      ticks: 90,
    });
  } catch {
    /* silent */
  }
}

const CHANNELS: ReviewEnrollmentChannel[] = ["SMS", "Email", "SMS+Email"];

function todayISO(): string {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

function formatPhone(raw: string): string {
  const digits = raw.replace(/\D/g, "").slice(0, 10);
  if (digits.length === 0) return "";
  if (digits.length < 4) return `(${digits}`;
  if (digits.length < 7) return `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
  return `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6)}`;
}

const labelClass = "block text-sm font-semibold text-gray-700 mb-2";
const inputClass =
  "w-full h-14 px-4 text-base text-navy bg-white border border-gray-300 rounded-lg placeholder:text-gray-400 focus:outline-none focus:border-orange focus:ring-2 focus:ring-orange/30 transition";

interface FormState {
  customerName: string;
  customerPhone: string;
  customerEmail: string;
  jobDate: string;
  channel: ReviewEnrollmentChannel;
  notes: string;
  honeypot: string;
}

function emptyForm(): FormState {
  return {
    customerName: "",
    customerPhone: "",
    customerEmail: "",
    jobDate: todayISO(),
    channel: "SMS",
    notes: "",
    honeypot: "",
  };
}

export default function EnrollPage() {
  const [form, setForm] = useState<FormState>(emptyForm);
  const [notesOpen, setNotesOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState<
    null | { customerName: string; headline: string }
  >(null);
  const today = useMemo(todayISO, []);
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const isValid =
    form.customerName.trim().length > 0 &&
    form.customerPhone.trim().length > 0;

  useEffect(() => {
    if (!submitted) return;
    resetTimer.current = setTimeout(() => {
      setForm(emptyForm());
      setSubmitted(null);
      setNotesOpen(false);
    }, 10_000);
    return () => {
      if (resetTimer.current) clearTimeout(resetTimer.current);
    };
  }, [submitted]);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((f) => ({ ...f, [key]: value }));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (submitting) return;
    setError(null);

    if (form.honeypot.trim().length > 0) {
      setSubmitted({
        customerName: form.customerName.trim() || "Customer",
        headline: pickHeadline(),
      });
      return;
    }

    if (!isValid) {
      setError("Please add a customer name and phone before sending.");
      return;
    }

    setSubmitting(true);
    const res = await submitReviewEnrollment({
      customer_name: form.customerName.trim(),
      customer_phone: form.customerPhone.trim(),
      customer_email: form.customerEmail.trim(),
      job_type: "Multiple Services",
      job_completion_date: form.jobDate,
      preferred_channel: form.channel,
      enrolled_by: "HEC Team",
      notes: form.notes.trim(),
    });
    setSubmitting(false);

    if (res.success) {
      vibrate(50);
      fireConfetti();
      setSubmitted({
        customerName: form.customerName.trim(),
        headline: pickHeadline(),
      });
    } else {
      setError(
        "Something went wrong. Please try again. If this keeps happening, text Keihon."
      );
    }
  }

  function handleEnrollAnother() {
    if (resetTimer.current) clearTimeout(resetTimer.current);
    setForm(emptyForm());
    setSubmitted(null);
    setNotesOpen(false);
    setError(null);
  }

  function handleDone() {
    if (resetTimer.current) clearTimeout(resetTimer.current);
  }

  return (
    <div className="min-h-screen bg-[#FAFAFA] pb-20">
      <header
        className="px-6 py-10 text-white"
        style={{
          background:
            "linear-gradient(135deg, #1B2D4F 0%, #0F1D33 100%)",
        }}
      >
        <div className="max-w-[480px] mx-auto">
          <div className="mb-6 inline-flex bg-white rounded-lg px-4 py-2">
            <Image
              src="/images/logos/hec-logo.png"
              alt="Home Energy Construction"
              width={168}
              height={48}
              priority
              className="h-auto w-auto"
              style={{ maxHeight: 48, width: "auto" }}
            />
          </div>
          <h1 className="text-[32px] leading-tight font-bold">
            5★ Review Campaign
          </h1>
          <p className="text-base text-white/80 mt-2">
            Let&apos;s add another happy customer to HEC&apos;s Google reviews.
          </p>
        </div>
      </header>

      <main className="max-w-[480px] mx-auto px-4">
        <GoogleReviewCard />

        {submitted ? (
          <SuccessCard
            customerName={submitted.customerName}
            headline={submitted.headline}
            onEnrollAnother={handleEnrollAnother}
            onDone={handleDone}
          />
        ) : (
          <form
            onSubmit={handleSubmit}
            noValidate
            className="bg-white rounded-xl shadow-[0_4px_20px_rgba(15,29,51,0.08)] p-6"
          >
            <input
              type="text"
              name="website_url"
              tabIndex={-1}
              aria-hidden="true"
              autoComplete="off"
              value={form.honeypot}
              onChange={(e) => update("honeypot", e.target.value)}
              style={{
                position: "absolute",
                left: "-9999px",
                opacity: 0,
                height: 0,
                width: 0,
              }}
            />

            {error && (
              <div
                role="alert"
                className="bg-red-50 text-red-700 text-sm rounded-lg px-3 py-3 mb-4"
              >
                {error}
              </div>
            )}

            <div className="mb-6">
              <label htmlFor="customerName" className={labelClass}>
                Customer Name
              </label>
              <input
                id="customerName"
                type="text"
                required
                aria-required="true"
                autoComplete="off"
                placeholder="Jane Smith"
                className={inputClass}
                value={form.customerName}
                onChange={(e) => update("customerName", e.target.value)}
              />
            </div>

            <div className="mb-6">
              <label htmlFor="customerPhone" className={labelClass}>
                Customer Phone
              </label>
              <input
                id="customerPhone"
                type="tel"
                inputMode="numeric"
                required
                aria-required="true"
                autoComplete="off"
                placeholder="(559) 555-1234"
                className={inputClass}
                value={form.customerPhone}
                onChange={(e) =>
                  update("customerPhone", formatPhone(e.target.value))
                }
              />
            </div>

            <div className="mb-6">
              <label htmlFor="customerEmail" className={labelClass}>
                Customer Email <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <input
                id="customerEmail"
                type="email"
                autoComplete="off"
                placeholder="jane@email.com"
                className={inputClass}
                value={form.customerEmail}
                onChange={(e) => update("customerEmail", e.target.value)}
              />
            </div>

            <div className="mb-6">
              <label htmlFor="jobDate" className={labelClass}>
                When did we finish?
              </label>
              <input
                id="jobDate"
                type="date"
                required
                aria-required="true"
                max={today}
                className={`${inputClass} appearance-none box-border`}
                value={form.jobDate}
                onChange={(e) => update("jobDate", e.target.value)}
              />
            </div>

            <div className="mb-6">
              <span className={labelClass}>How should we reach them?</span>
              <div role="radiogroup" className="flex gap-2">
                {CHANNELS.map((c) => {
                  const selected = form.channel === c;
                  const display = c === "SMS+Email" ? "Both" : c;
                  return (
                    <button
                      key={c}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      onClick={() => update("channel", c)}
                      className="flex-1 h-12 rounded-lg text-sm font-semibold transition focus:outline-none focus:ring-2 focus:ring-orange/40"
                      style={{
                        background: selected ? "#F5A623" : "#FFFFFF",
                        color: selected ? "#FFFFFF" : "#374151",
                        border: selected
                          ? "1px solid #F5A623"
                          : "1px solid #D1D5DB",
                      }}
                    >
                      {display}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mb-6">
              {!notesOpen ? (
                <button
                  type="button"
                  onClick={() => setNotesOpen(true)}
                  className="text-sm text-gray-500 font-medium hover:text-gray-700 focus:outline-none focus:underline"
                >
                  + Add notes (optional)
                </button>
              ) : (
                <>
                  <label htmlFor="notes" className={labelClass}>
                    Notes <span className="text-gray-400 font-normal">(optional)</span>
                  </label>
                  <textarea
                    id="notes"
                    rows={4}
                    placeholder="e.g. Customer prefers morning texts, job specifics, referral source, etc."
                    className={`${inputClass} h-auto py-3 leading-relaxed`}
                    value={form.notes}
                    onChange={(e) => update("notes", e.target.value)}
                  />
                </>
              )}
            </div>

            <button
              type="submit"
              disabled={!isValid || submitting}
              aria-busy={submitting}
              className={
                !isValid || submitting
                  ? "w-full h-14 rounded-xl text-white text-lg font-bold flex items-center justify-center gap-2 bg-gray-400 cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-orange/50"
                  : "w-full h-14 rounded-xl text-white text-lg font-bold flex items-center justify-center gap-2 transition shadow-md bg-gradient-to-r from-[#F5A623] to-[#E69820] hover:from-[#E69820] hover:to-[#D88B1A] focus:outline-none focus:ring-2 focus:ring-orange/50"
              }
            >
              {submitting ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Sending...
                </>
              ) : (
                "Send Request"
              )}
            </button>
          </form>
        )}

        <p className="text-center text-xs text-gray-400 mt-12 mb-8">
          Internal HEC Tool · Powered by SARK Agency
        </p>
      </main>
    </div>
  );
}

function GoogleReviewCard() {
  return (
    <div className="bg-white rounded-xl shadow-[0_4px_20px_rgba(15,29,51,0.08)] px-5 py-3 mt-0 mb-4">
      <div className="flex items-center justify-center gap-3">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="24"
          height="24"
          role="img"
          aria-label="Google"
        >
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
        </svg>

        <div
          className="flex items-center gap-0.5"
          role="img"
          aria-label="4.7 out of 5 stars"
        >
          {[0, 1, 2, 3, 4].map((i) => (
            <Star
              key={i}
              size={18}
              fill="#FBBC05"
              stroke="#FBBC05"
              strokeWidth={1.5}
              aria-hidden="true"
            />
          ))}
        </div>

        <div className="flex items-baseline gap-1">
          <span className="text-[24px] font-bold text-navy leading-none">
            4.7
          </span>
          <span className="text-base text-gray-400 leading-none">/ 5</span>
        </div>
      </div>
    </div>
  );
}

function SuccessCard({
  customerName,
  headline,
  onEnrollAnother,
  onDone,
}: {
  customerName: string;
  headline: string;
  onEnrollAnother: () => void;
  onDone: () => void;
}) {
  return (
    <div className="bg-white rounded-xl shadow-[0_4px_20px_rgba(15,29,51,0.08)] p-8 text-center">
      <div
        className="enroll-success-circle w-[60px] h-[60px] mx-auto rounded-full flex items-center justify-center"
        style={{ background: "#10B981" }}
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path className="enroll-success-check" d="M5 12.5l4 4 10-10" />
        </svg>
      </div>
      <h2 className="text-[32px] font-bold text-navy mt-4">{headline}</h2>
      <p className="text-base text-gray-600 mt-2">
        {customerName} is now in line for a 5-star review request.
      </p>
      <div className="flex flex-col gap-3 mt-8">
        <button
          type="button"
          onClick={onEnrollAnother}
          className="w-full h-14 rounded-xl text-white text-lg font-bold transition hover:brightness-95 focus:outline-none focus:ring-2 focus:ring-orange/50"
          style={{ background: "#F5A623" }}
        >
          Enroll Another
        </button>
        <button
          type="button"
          onClick={onDone}
          className="w-full h-14 rounded-xl text-navy text-lg font-bold border-2 border-navy transition hover:bg-navy hover:text-white focus:outline-none focus:ring-2 focus:ring-navy/30"
        >
          Done
        </button>
      </div>
    </div>
  );
}
