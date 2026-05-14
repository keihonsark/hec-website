export const REVIEW_ENROLLMENT_WEBHOOK_URL =
  "https://hook.us2.make.com/urpx4w10mqeeo9tp2xt9avdaccjh1dlz";

export type ReviewEnrollmentChannel = "SMS" | "Email" | "SMS+Email";

export interface ReviewEnrollmentPayload {
  customer_name: string;
  customer_phone: string;
  customer_email: string;
  job_type: string;
  job_completion_date: string;
  preferred_channel: ReviewEnrollmentChannel;
  enrolled_by: string;
  notes: string;
}

export interface ReviewEnrollmentResult {
  success: boolean;
  error?: string;
}

export async function submitReviewEnrollment(
  payload: ReviewEnrollmentPayload
): Promise<ReviewEnrollmentResult> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 10_000);

  try {
    const res = await fetch(REVIEW_ENROLLMENT_WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: controller.signal,
    });

    if (res.ok) return { success: true };
    return { success: false, error: `Request failed (${res.status}).` };
  } catch (err) {
    const aborted = err instanceof DOMException && err.name === "AbortError";
    return {
      success: false,
      error: aborted ? "Request timed out." : "Network error.",
    };
  } finally {
    clearTimeout(timeout);
  }
}
