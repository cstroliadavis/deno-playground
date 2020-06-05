import { pathExists } from './third_party.ts'
import { path } from  './third_party.ts'

export default async function findMigrationsDir() {
  let baseDir: string = Deno.cwd();

  while( !(await pathExists(path.resolve(baseDir, 'migrations', 'legacy')))) {
    if(baseDir === '/') throw new Error(`Cannot find migrations folder. Current working directory is "${Deno.cwd()}".`);
    baseDir = path.resolve(baseDir, '..');
  }
  return path.resolve(baseDir, 'migrations', 'legacy');
}

if (import.meta.main) {
  console.log(await findMigrationsDir());
}