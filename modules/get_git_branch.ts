import {decodeUtf8} from './third_party.ts'

/**
 * Gets the name of the git branch of the current working directory
 * @returns {Promise<string>}
 *
 * @example
 * // if on the main git branch
 * console.log(await getGitBranch());
 * // output: master
 */
export default async function getGitBranch(): Promise<string> {
  const proc = Deno.run({ cmd: ['git', 'rev-parse', '--abbrev-ref', 'HEAD'], stdout: 'piped'});
  return (await decodeUtf8(await proc.output())).split('\n')[0];
}

if (import.meta.main) {
  console.log(await getGitBranch());
}