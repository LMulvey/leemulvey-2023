import { readFileSync } from "fs";
import { Metadata } from "next";
import { CHANGELOG_FILE } from "@/constants/directories";

export const metadata: Metadata = {
  title: "Changelog",
};

type ChangelogDay = {
  date: string;
  entries: string[];
};

type ChangelogData = {
  lastCommit: string;
  days: ChangelogDay[];
};

const dateFormatter = new Intl.DateTimeFormat("en-US", {
  day: "numeric",
  month: "long",
  timeZone: "UTC",
  year: "numeric",
});

function formatDate(date: string) {
  return dateFormatter.format(new Date(`${date}T00:00:00Z`));
}

export default function Changelog() {
  const fileContent = readFileSync(CHANGELOG_FILE, "utf-8");
  const { days } = JSON.parse(fileContent) as ChangelogData;

  return (
    <section className="w-full max-w-3xl mx-auto pb-8">
      <h2 className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] leading-tight m-0">
        Changelog
      </h2>
      <p className="mt-3 mb-7 text-[15px] leading-7 text-foreground-muted max-w-2xl">
        A rough list of updates to the site over time ✌🏻
      </p>

      <div className="space-y-6">
        {days.map((day) => (
          <div
            key={day.date}
            className="w-full p-5 md:p-6 rounded-xl bg-gradient-to-br from-card via-card to-link/20 shadow-sm"
          >
            <span className="text-[11px] uppercase tracking-[0.08em] text-foreground-muted whitespace-nowrap block">
              {formatDate(day.date)}
            </span>
            <ul className="mt-3 mb-0 pl-5 space-y-2 list-disc">
              {day.entries.map((entry) => (
                <li
                  key={entry}
                  className="text-foreground-muted text-[15px] leading-7"
                >
                  {entry}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </section>
  );
}
