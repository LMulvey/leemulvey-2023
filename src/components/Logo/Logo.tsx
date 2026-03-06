"use client";

import { cvu } from "@/utilities/cvu";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useEffect, useRef, useState } from "react";
import "./Logo.scss";
import Image from "next/image";
import { LogoSVG } from "./LogoSVG";

const descriptors = [
  "Weird Dad 👨🏼‍💻",
  "Bike Dad 🚲",
  "Secretly Loves AWS 🌤️",
  "Full Stacker 🥞",
  "Description Writer 📝",
  "Lover of All Love 🏳️‍🌈",
  "Five-time 10km Runner 🏃🏼‍♂️",
  "Sweat of the Seas 🏴‍☠️",
  "Malenia now knows defeat 🗡️",
];

const randomDescriptor = (currentDescriptor?: string): string => {
  const filteredDescriptors = descriptors.filter(
    (descriptor) => descriptor !== currentDescriptor,
  );
  const randomIndex = Math.floor(Math.random() * filteredDescriptors.length);
  const newDescriptor = filteredDescriptors[randomIndex];
  return newDescriptor;
};

export const Logo = ({ className }: { className?: string }) => {
  const interval = useRef<ReturnType<typeof setInterval> | undefined>(
    undefined,
  );
  const [descriptor, setDescriptor] = useState(descriptors[0]);
  const descriptorClasses = cvu([
    "font-mono",
    "font-extrabold",
    "p-0",
    "m-0",
    "descriptor",
  ]);

  const onMouseOver = useCallback(() => {
    if (interval.current) {
      clearInterval(interval.current);
    }

    interval.current = setInterval(() => {
      setDescriptor(randomDescriptor());
    }, 800);
  }, []);

  const onMouseOut = useCallback(() => {
    if (interval.current) {
      clearInterval(interval.current);
    }
  }, []);

  useEffect(() => {
    // no-op
    return () => {
      // clear interval on unmount - helps with hot reloading
      if (interval.current) {
        clearInterval(interval.current);
      }
    };
  }, []);

  return (
    <Link
      className="rounded-md hover:scale-105 transition-transform"
      href="/"
      onMouseOver={onMouseOver}
      onMouseOut={onMouseOut}
    >
      <header className={`${className} select-none`}>
        <LogoSVG
          pathFillClass="fill-background"
          outlineFillClass="fill-foreground-muted"
          width={228}
          height={89}
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
