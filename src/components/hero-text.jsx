"use client";
import React from "react";
import { cn } from "@/lib/utils";
import TextTransition, { presets } from "react-text-transition";
const TEXTS = ["Instagram", "Twitter(X)", "Linkedin", "Github", "Facebook"];

export default function Hero() {
  const [index, setIndex] = React.useState(0);
  const [currentFramework, setCurrentFramework] = React.useState(TEXTS[0]);

  React.useEffect(() => {
    let currentIndex = 0;
    const rotateFrameworks = () => {
      setCurrentFramework(TEXTS[currentIndex]);
      currentIndex = (currentIndex + 1) % TEXTS.length;
    };
    const intervalId = setInterval(rotateFrameworks, 2000);
    return () => clearInterval(intervalId);
  }, []);

  React.useEffect(() => {
    const intervalId = setInterval(
      () => setIndex((index) => index + 1),
      2000, // every 3 seconds
    );
    return () => clearTimeout(intervalId);
  }, []);

  return (
    <h1
      className={cn("transition-color  duration-700", {
        "text-indigo-600": currentFramework === "Instagram",
        "text-red-600": currentFramework === "Twitter(X)",
        "text-yellow-600": currentFramework === "Linkedin",
        "text-sky-600": currentFramework === "Github",
        "text-lime-600": currentFramework === "Facebook",
      })}
    >
      <TextTransition springConfig={presets.wobbly}>
        {TEXTS[index % TEXTS.length]}
      </TextTransition>
    </h1>
  );
}
