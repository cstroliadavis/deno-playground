const isUri = (url: string): boolean => url.includes("/_uris/");

/**
 * Given a clay uri that is a /_uris/ uri, this will find the related _page for that uri, otherwise it will return the
 * original uri given.
 * @param {string} uri
 * @returns {Promise<string>}
 */
export default async function resolvePageUri(uri: string): Promise<string> {
  const { protocol, pathname } = new URL(uri);

  if (isUri(pathname)) {
    try {
      const result = await fetch(uri);
      const nextUri = await result.text();

      return resolvePageUri(`${protocol}//${nextUri}`);
    } catch (error) {
      console.error(`Error: Could not resolve page uri for ${uri}\n`, error);
    }
  }
  return uri;
}

if (import.meta.main) {
  console.log(await resolvePageUri(Deno.args[0]));
}
