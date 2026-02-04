export function track(event: string, props?: Record<string, any>) {
  // Später: PostHog/GA/Segment
  // eslint-disable-next-line no-console
  console.log(`[track] ${event}`, props || {});
}
