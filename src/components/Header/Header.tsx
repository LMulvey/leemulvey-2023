import { Fredoka_One } from "@next/font/google";
import { useEffect, useState } from "react";
import { Wordmark } from "./Header.styles";

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

const randomDescriptor = (currentDescriptor?: string) => {
  let descriptor = descriptors[Math.floor(Math.random() * descriptors.length)];
  if (descriptor === currentDescriptor) {
    descriptor = randomDescriptor(currentDescriptor);
  }
  return descriptor;
};

export const Header = () => {
  const [descriptor, setDescriptor] = useState<string>(randomDescriptor());

  useEffect(() => {
    const interval = setInterval(() => {
      setDescriptor(randomDescriptor(descriptor));
    }, 5_000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <header>
      <Wordmark className={fredoka.className}>Lee Mulvey</Wordmark>
    </header>
  );
};
