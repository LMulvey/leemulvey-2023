import {
  BookOpenCheck,
  Cloud,
  Github,
  Layers,
  Linkedin,
  LucideIcon,
  MailCheck,
  Twitter,
} from "lucide-react";

export type ContactLink = {
  href: string;
  icon: LucideIcon;
  label: string;
  blurb: string;
};

export const CONTACT_LINKS: ContactLink[] = [
  {
    blurb: "Best way to reach me directly. I do read these.",
    href: "mailto:hello@leemulvey.com?subject=Hey, Lee, I promise I am not sending you spam",
    icon: MailCheck,
    label: "Email",
  },
  {
    blurb: "The official, boring-on-purpose rundown of my career.",
    href: "https://registry.jsonresume.org/lmulvey",
    icon: BookOpenCheck,
    label: "Resume",
  },
  {
    blurb: "Where most of the code lives. And a ton of empty repos.",
    href: "https://github.com/lmulvey",
    icon: Github,
    label: "GitHub",
  },
  {
    blurb: "The professional version of me, for professional reasons.",
    href: "https://www.linkedin.com/in/leemulvey/",
    icon: Linkedin,
    label: "LinkedIn",
  },
  {
    blurb: "Old questions and answers from the old Internet.",
    href: "https://stackoverflow.com/users/8246359/lmulvey",
    icon: Layers,
    label: "StackOverflow",
  },
  {
    blurb: "Where I sometimes post things half-formed.",
    href: "https://bsky.app/profile/leemulvey.com",
    icon: Cloud,
    label: "Bluesky",
  },
  {
    blurb: "I stubbornly will not call it X. I don't engage here much.",
    href: "https://x.com/leemulvey",
    icon: Twitter,
    label: "Twitter",
  },
];
