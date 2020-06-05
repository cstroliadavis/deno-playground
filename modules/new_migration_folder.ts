import findMigrationsDir from "./find_migrations_dir.ts";
import getGitBranch from "./get_git_branch.ts";
import { ensureDir, path, sprintf } from "./third_party.ts";

/**
 * Creates a new folder in the format YYYYMMDDHHMM00-on-NNNN-your-branch-name in the
 * migrations/legacy folder of the unity app you are editing and returns the path to
 * that directory when done.
 *
 * @returns {Promise<string>}
 *
 * @example
 * // if you are in the /Users/username/projects/clay-radio/app folder on 2/2/2020 at 2:02 AM
 * // and you have branch ON-12345-Some-Amazing-Update checked out
 * console.log(await newMigrationFolder());
 * // creates folder /Users/username/projects/clay-radio/migrations/legacy/20200202020200-on-12345-some-amazing-update
 * // and logs the path to stdout
 */
export default async function newMigrationFolder(): Promise<string> {
  const time = new Date();
  const folderPrefix = sprintf(
    "%1.4d%1.2d%1.2d%1.2d%1.2d00",
    time.getFullYear(),
    time.getMonth() + 1,
    time.getDate(),
    time.getHours(),
    time.getMinutes(),
  );
  const gitBranch = await getGitBranch();
  const migrationDir = await findMigrationsDir();
  const newDir = path.resolve(
    migrationDir,
    `${folderPrefix}-${gitBranch.toLocaleLowerCase()}`,
  );
  ensureDir(newDir);
  return newDir;
}

if (import.meta.main) {
  console.log("Created:", await newMigrationFolder());
}
