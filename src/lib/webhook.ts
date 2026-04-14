export const WEBHOOK_URL =
  "https://hook.us2.make.com/9o9ochens7qmabdk28xuomt0lfp4zg1u";

declare global {
  interface Window {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    gtag?: (...args: any[]) => void;
  }
}

/**
 * Fire a Google Analytics form_submission event.
 * Safe to call even if gtag hasn't loaded yet.
 */
export function trackFormSubmission(label: string) {
  if (typeof window === "undefined" || typeof window.gtag !== "function") return;
  window.gtag("event", "form_submission", {
    event_category: "lead",
    event_label: label,
    value: 1,
  });
}

/**
 * POST a JSON payload to the Make.com webhook.
 * Never throws — on failure the promise still resolves so UI flows don't break.
 * Fires a GA form_submission event on success, using payload.type as the label.
 */
export async function postToWebhook(
  payload: Record<string, unknown>
): Promise<boolean> {
  try {
    const res = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (res.ok) {
      const label = typeof payload.type === "string" ? payload.type : "unknown";
      trackFormSubmission(label);
    }
    return res.ok;
  } catch {
    return false;
  }
}
