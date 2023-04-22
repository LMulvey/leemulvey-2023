import { Fredoka_One } from "next/font/google";
import { cx } from "class-variance-authority";
import Link from "next/link";

const fredoka = Fredoka_One({
  subsets: ["latin"],
  weight: "400",
});

const descriptors = [
  "Weird Dad 👨🏼‍💻",
  "Super Weird Dad 💁🏼‍♂️",
  "Bike Dad 🚲",
  "Ask Me About GraphQL 🤓",
  "Secretly Loves AWS 🌤️",
  "Full Stacker 🥞",
  "Description Writer 📝",
  "Edmonton > Calgary 🌁",
  "Lover of All Love 🏳️‍🌈",
  "Jazz Hands 🤗",
  "Manatee Researcher 🐋",
  "Five-time 10km Runner 🏃🏼‍♂️",
  "Sweat of the Seas 🏴‍☠️",
];

const randomDescriptor = (() => {
  const descriptor = descriptors[Math.floor(Math.random() * descriptors.length)];
  return descriptor;
})();

export const Logo = ({ className }: { className?: string }) => {
  return (
    <Link className="focus:bg-slate-300/50 rounded-md hover:scale-105 transition-transform" href="/">
    <header className={`${className} select-none`}>
      <h1
        className={cx([
          fredoka.className,
          "text-4xl",
          "lg:text-5xl",
          "font-extrabold",
          "text-transparent",
          "bg-clip-text",
          "bg-gradient-to-r",
          "from-orange",
          "to-salsa",
          "pb-2",
          "m-0",
        ])}
      >
        Lee Mulvey
      </h1>
      <p className="font-mono text-xl font-extrabold p-0 -mt-2 text-slate-700/80">
        {randomDescriptor}
      </p>
    </header>
    </Link>
  );
};
