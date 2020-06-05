import findMigrationsDir from "./find_migrations_dir.ts";
import getGitBranch from "./get_git_branch.ts";
import { ensureDir, path, sprintf } from "./third_party.ts";

export default async function newMigrationFolder() {
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
