/** Request header the middleware sets on pages that have one fixed language. Nothing else may set it. */
export const PAGE_LANGUAGE_HEADER = 'x-page-language';

/** Pages under /lt/ are Lithuanian whatever the visitor's language cookie says, so crawlers and shared links see the same text. */
export function isLithuanianPath(pathname: string | null | undefined): boolean {
  return pathname === '/lt' || (pathname?.startsWith('/lt/') ?? false);
}
