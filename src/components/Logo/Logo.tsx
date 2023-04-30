"use client";

import { Fredoka_One } from "next/font/google";
import { cx } from "class-variance-authority";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";

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

const randomDescriptor = () => {
  const descriptor =
    descriptors[Math.floor(Math.random() * descriptors.length)];
  return descriptor;
};

let interval: ReturnType<typeof setInterval> | undefined;

export const Logo = ({ className }: { className?: string }) => {
  const [descriptor, setDescriptor] = useState(descriptors[0]);

  const onMouseOver = useCallback(() => {
    if (interval) {
      clearInterval(interval);
    }

    interval = setInterval(() => {
      setDescriptor(randomDescriptor());
    }, 1_00);
  }, []);

  const onMouseOut = useCallback(() => {
    if (interval) {
      clearInterval(interval);
    }
  }, []);

  useEffect(() => {
    // no-op
    return () => {
      // clear interval on unmount - helps with hot reloading
      if (interval) {
        clearInterval(interval);
      }
    };
  }, []);

  return (
    <Link
      className="focus:bg-slate-300/50 rounded-md hover:scale-105 transition-transform"
      href="/"
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
    >
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
        <p className="font-mono text-;g font-extrabold p-0 -mt-2 text-slate-700/80">
          {descriptor}
        </p>
      </header>
    </Link>
  );
};
