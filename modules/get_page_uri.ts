import resolvePageUri from './resolve_page_uri.ts';

const isData = (url: string): boolean => /\/_(components|layouts|lists|users)\//.test(url);
const isPage = (uri: string): boolean => uri.includes('/_pages/');
const isUri = (uri: string): boolean => uri.includes('/_uris/');

/**
 * Given a url, gets the /_pages/ url for it. If it is already a _pages url it is returned as is
 * NOTE: if it is a data url other than pages or uris, this cannot resolve the owner page at this time
 * @param {string} url
 * @returns {Promise<string>}
 */
export default async function getPageUri(url: string): Promise<string> {
  const { protocol, host, pathname } = new URL(url);
  if(isPage(url)) {
    return url;
  }
  if(isUri(url)) {
    return resolvePageUri(url);
  }
  if(isData(url)) {
    console.error('Unable to get page uri for', url);
    return '';
  }
  return resolvePageUri(`${protocol}//${host}/_uris/${btoa(host + pathname)}`);
}

if (import.meta.main) {
  console.log(await getPageUri(Deno.args[0]))
}