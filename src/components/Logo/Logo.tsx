import { Fredoka_One } from "@next/font/google";
import { cx } from "class-variance-authority";

const fredoka = Fredoka_One({
  subsets: ["latin"],
  weight: "400",
});

const descriptors = [
  "Weird Dad 👨🏼‍💻",
  "Super Weird Dad 💁🏼‍♂️",
  "Bike Dad 🚲",
  "Ask Me About GraphQL",
  "Secretly Loves AWS",
  "Full Stacker",
  "Master Description Writer",
  "Edmonton > Calgary",
  "Lover of All Love 🏳️‍🌈",
  "FIRE! Fire on the Mountain! 🔥",
  "Jazz Hands 🤗",
  "Manatee Researcher 🐋",
  "Five-time 10km Runner",
  "Sweat of the Seas 🏴‍☠️",
];

const randomDescriptor = (() => {
  let descriptor = descriptors[Math.floor(Math.random() * descriptors.length)];
  return descriptor;
})();

export const Logo = () => {
  return (
    <header>
      <h1
        className={cx([
          fredoka.className,
          "text-5xl",
          "lg:text-6xl",
          "font-extrabold",
          "text-transparent",
          "bg-clip-text",
          "bg-gradient-to-r",
          "from-orange",
          "to-salsa",
          "pb-2",
        ])}
      >
        Lee Mulvey
      </h1>
      <p className="font-mono text-2xl font-extrabold p-0 -mt-2 text-white">
        {randomDescriptor}
      </p>
    </header>
  );
};
