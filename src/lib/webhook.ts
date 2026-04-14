export const WEBHOOK_URL =
  "https://hook.us2.make.com/9o9ochens7qmabdk28xuomt0lfp4zg1u";

/**
 * POST a JSON payload to the Make.com webhook.
 * Never throws — on failure the promise still resolves so UI flows don't break.
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
    return res.ok;
  } catch {
    return false;
  }
}
