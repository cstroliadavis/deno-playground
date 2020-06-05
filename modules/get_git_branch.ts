import {decodeUtf8} from './third_party.ts'

export default async function getGitBranch() {
  const proc = Deno.run({ cmd: ['git', 'rev-parse', '--abbrev-ref', 'HEAD'], stdout: 'piped'});
  return (await decodeUtf8(await proc.output())).split('\n')[0];
}

if (import.meta.main) {
  console.log(await getGitBranch());
}