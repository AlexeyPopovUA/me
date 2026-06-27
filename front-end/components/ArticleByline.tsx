import { content } from '@/app/configuration/content';

type ArticleBylineProps = {
  author?: string;
  date: string;
  lastMod?: string;
};

function toIsoDate(value: string) {
  return new Date(value).toISOString().split('T')[0];
}

function formatDisplayDate(value: string) {
  return new Date(value).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

export function ArticleByline({ author, date, lastMod }: ArticleBylineProps) {
  const authorName = author || content.authorName;
  const showUpdated = Boolean(lastMod && lastMod !== date);

  return (
    <p className="text-sm text-muted-foreground mb-6">
      By {authorName}
      {' · '}
      <time dateTime={toIsoDate(date)}>{formatDisplayDate(date)}</time>
      {showUpdated ? (
        <>
          {' · Updated '}
          <time dateTime={toIsoDate(lastMod!)}>{formatDisplayDate(lastMod!)}</time>
        </>
      ) : null}
    </p>
  );
}
