export function DraftPreviewBanner() {
  return (
    <div
      role="status"
      className="mb-8 rounded-lg border border-amber-500/40 bg-amber-500/10 px-4 py-3 text-center text-sm text-amber-900 dark:text-amber-200"
    >
      Draft preview — visible only in local development. This post is not published.
    </div>
  );
}
