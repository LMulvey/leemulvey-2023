import { execFileSync } from "child_process";
import { readFileSync, writeFileSync } from "fs";
import path from "path";

const CHANGELOG_FILE = path.join(
  process.cwd(),
  "__changelog",
  "changelog.json",
);

const CONVENTIONAL_PREFIX =
  /^(feat|fix|chore|docs|refactor|style|test|perf|build|ci)(\([^)]*\))?!?:\s*/i;

const SELF_COMMIT_MESSAGE = "docs: update changelog";

function git(args) {
  return execFileSync("git", args, { encoding: "utf-8" }).trim();
}

function cleanSubject(subject) {
  const withoutPrefix = subject.replace(CONVENTIONAL_PREFIX, "").trim();
  const capitalized =
    withoutPrefix.charAt(0).toUpperCase() + withoutPrefix.slice(1);

  return /[.!?]$/.test(capitalized) ? capitalized : `${capitalized}.`;
}

function loadChangelog() {
  const raw = readFileSync(CHANGELOG_FILE, "utf-8");

  return JSON.parse(raw);
}

function saveChangelog(data) {
  writeFileSync(CHANGELOG_FILE, `${JSON.stringify(data, null, 2)}\n`);
}

function main() {
  const changelog = loadChangelog();
  const headSha = git(["rev-parse", "HEAD"]);

  if (headSha === changelog.lastCommit) {
    return;
  }

  const log = git([
    "log",
    `${changelog.lastCommit}..HEAD`,
    "--no-merges",
    "--reverse",
    "--date=short",
    "--pretty=%H|%ad|%s",
  ]);

  const commits = log
    ? log
        .split("\n")
        .filter(Boolean)
        .map((line) => {
          const [sha, date, subject] = line.split("|");

          return { date, sha, subject };
        })
        .filter((commit) => commit.subject.trim() !== SELF_COMMIT_MESSAGE)
    : [];

  // Nothing new to record — leave lastCommit alone so a future run still
  // sees (and filters out) any self-commits sitting ahead of it, rather
  // than committing an empty changelog bump on every push.
  if (commits.length === 0) {
    return;
  }

  for (const commit of commits) {
    const entry = cleanSubject(commit.subject);
    const existingDay = changelog.days.find((day) => day.date === commit.date);

    if (existingDay) {
      if (!existingDay.entries.includes(entry)) {
        existingDay.entries.push(entry);
      }
    } else {
      changelog.days.push({ date: commit.date, entries: [entry] });
    }
  }

  changelog.days.sort((a, b) => (a.date < b.date ? 1 : -1));
  changelog.lastCommit = headSha;

  saveChangelog(changelog);
  git(["add", CHANGELOG_FILE]);
  git(["commit", "-m", SELF_COMMIT_MESSAGE]);
}

try {
  main();
} catch (error) {
  console.warn("[generate-changelog] skipped due to error:", error.message);
}
