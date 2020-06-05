import { pathExists } from './third_party.ts'
import { path } from  './third_party.ts'

/**
 * Looks for the migrations/legacy directory at the local or any higher level.
 * Will throw an error if the directory is not found.
 *
 * @returns {Promise<string>}
 *
 * @example
 * // if cwd is /Users/your-username/your-path-to-clay-radio/app/components
 * console.log(await findMigrationsDir());
 * // outputs: /Users/your-username/your-path-to-clay-radio/migrations/legacy
 */
export default async function findMigrationsDir(): Promise<string> {
  let baseDir: string = Deno.cwd();

  while( !(await pathExists(path.resolve(baseDir, 'migrations', 'legacy')))) {
    if(baseDir === '/') {
      throw new Error(`Cannot find migrations folder. Current working directory is "${Deno.cwd()}".`);
    }
    baseDir = path.resolve(baseDir, '..');
  }
  return path.resolve(baseDir, 'migrations', 'legacy');
}

if (import.meta.main) {
  console.log(await findMigrationsDir());
}