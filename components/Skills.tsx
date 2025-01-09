"use client";

import React from "react";
import { InfiniteMovingCards } from "./ui/InfiniteMovingCards";

const Skills = () => {
  const skillDomains = [
    {
      title: "Machine Learning",
      icons: [
        "/tensor.png",
        "/keras.png",
        "/pytorch.png",
        "/sklearn.png",
        "/opencv.png",
        "/clarifai.png"
      ]
    },
    {
      title: "Full Stack",
      icons: [
        "/next.svg",
        "/tail.svg",
        "/firebase.png",
        "/ts.svg",
        "/re.svg"
      ]
    },
    {
      title: "Cybersecurity",
      icons: [
        "/kali.png",
        "/nmap.png",
        "/ghidra.png",
        "/wireshark.png",
        "/metasploit.png"
      ]
    }
  ];

  return (
    <section id="skills" className="py-5">
      <h1 className="heading">
        Technical
        <span className="text-neutral-400"> Skills</span>
      </h1>

      <div className="h-[300px] rounded-md flex items-center justify-center relative overflow-hidden mt-10">
        <InfiniteMovingCards
          items={skillDomains}
          direction="right"
          speed="fast"
        />
      </div>
    </section>
  );
};

export default Skills;