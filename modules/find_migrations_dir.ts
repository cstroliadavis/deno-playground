import { path } from "./third_party.ts";
import { pathExists } from "./third_party.ts";

const { cwd } = Deno;

export const injectables = {
  cwd,
  resolvePath: path.resolve,
  pathExists,
};

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
  const { cwd, resolvePath, pathExists } = injectables;
  let baseDir: string = cwd();

  while (!(await pathExists(resolvePath(baseDir, "migrations", "legacy")))) {
    if (baseDir === "/") {
      throw new Error(
        `Cannot find migrations folder. Current working directory is "${cwd()}".`,
      );
    }
    baseDir = resolvePath(baseDir, "..");
  }
  return resolvePath(baseDir, "migrations", "legacy");
}

if (import.meta.main) {
  console.log(await findMigrationsDir());
}
