import { Metadata } from "next";
import { CONTACT_LINKS } from "@/constants/contactLinks";

export const metadata: Metadata = {
  title: "Contact",
};

export default function Contact() {
  return (
    <section className="w-full max-w-3xl mx-auto pb-6">
      <h1 className="text-3xl md:text-4xl font-semibold tracking-[-0.02em] leading-tight m-0">
        Let&apos;s talk
      </h1>
      <p className="mt-3 mb-7 text-[15px] leading-7 text-foreground-muted max-w-2xl">
        Here&apos;s every way to find me online. Email is generally the fastest
        contact route.
      </p>

      <div className="grid grid-cols-2 gap-4">
        {CONTACT_LINKS.map((item) => (
          <a
            key={item.label}
            href={item.href}
            rel="noopener noreferrer"
            target="_blank"
            className="group no-underline flex items-center first:col-span-2 gap-4 p-4 rounded-xl first:border md:p-5 shadow-sm transition-all duration-200 motion-safe:hover:-translate-y-0.5 hover:shadow-md"
          >
            <div className="shrink-0 p-2.5">
              <item.icon className="text-highlight/80" size={64} />
            </div>
            <div className="min-w-0">
              <p className="m-0 text-[24px] font-semibold tracking-[-0.01em] text-foreground transition-colors duration-200 group-hover:text-foreground">
                {item.label}
              </p>
              <p className="m-0 text-[14px] leading-6 text-foreground-muted">
                {item.blurb}
              </p>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
