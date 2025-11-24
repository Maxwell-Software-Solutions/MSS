const FALLBACK_BASE_URL = 'https://www.maxwellsoftwaresolutions.com';

const normalizeBaseUrl = (candidate?: string | null): string | undefined => {
  if (!candidate) {
    return undefined;
  }

  try {
    const normalized = new URL(candidate);
    return normalized.origin;
  } catch {
    return undefined;
  }
};

const fromSiteUrl = normalizeBaseUrl(process.env.NEXT_PUBLIC_SITE_URL);
const fromCanonicalHost = normalizeBaseUrl(
  process.env.NEXT_PUBLIC_CANONICAL_HOST ? `https://${process.env.NEXT_PUBLIC_CANONICAL_HOST}` : undefined
);

export const CANONICAL_BASE_URL = fromSiteUrl ?? fromCanonicalHost ?? FALLBACK_BASE_URL;
export const CANONICAL_HOST = new URL(CANONICAL_BASE_URL).host;
export const CANONICAL_PROTOCOL = new URL(CANONICAL_BASE_URL).protocol.replace(':', '');
