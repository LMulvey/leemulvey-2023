"use client";

import { cvu } from "@/utilities/cvu";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
import "./Logo.scss";
import Image from "next/image";

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

const randomDescriptor = (currentDescriptor?: string): string => {
  const descriptor =
    descriptors[Math.floor(Math.random() * descriptors.length)];

  if (descriptor === currentDescriptor) {
    return randomDescriptor(currentDescriptor);
  }

  return descriptor;
};

let interval: ReturnType<typeof setInterval> | undefined;

export const Logo = ({ className }: { className?: string }) => {
  const [descriptor, setDescriptor] = useState(descriptors[0]);
  const descriptorClasses = cvu([
    "font-mono",
    "font-extrabold",
    "p-0",
    "m-0",
    "descriptor",
  ]);

  const onMouseOver = useCallback(() => {
    if (interval) {
      clearInterval(interval);
    }

    interval = setInterval(() => {
      setDescriptor(randomDescriptor());
    }, 1_200);
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
        <Image
          className="wordmark-image"
          src="/logo-leemulvey.svg"
          width={228}
          height={89}
          alt="Lee Mulvey"
        />
        <div
          className={cvu([
            "overflow-hidden",
            "h-6",
            "relative",
            "text-center",
          ])()}
        >
          <AnimatePresence mode="popLayout">
            <motion.p
              animate="show"
              exit="hide"
              key={descriptor}
              className={descriptorClasses()}
              variants={{
                hide: {
                  opacity: [1, 0],
                  transition: {
                    duration: 0.1,
                  },
                  y: [0, -8],
                },
                show: {
                  opacity: [0, 1],
                  skew: [80, 0],
                  transition: {
                    duration: 0.1,
                  },
                  y: [8, 0],
                },
              }}
            >
              {descriptor}
            </motion.p>
          </AnimatePresence>
        </div>
      </header>
    </Link>
  );
};
