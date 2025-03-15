"use client";

import { useState } from "react";
import { IoCopyOutline } from "react-icons/io5";
import Lottie from "react-lottie";
import { cn } from "@/lib/utils";
import animationData from "@/data/confetti.json";
import MagicButton from './MagicButton';

type TitleItem = {
  label: string;
  value: string;
};

export const BentoGrid = ({
  className,
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) => {
  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-6 lg:grid-cols-5 md:grid-row-7 gap-4 lg:gap-6 mx-auto",
        className
      )}
    >
      {children}
    </div>
  );
};

export const BentoGridItem = ({
  className,
  id,
  title,
  description,
  img,
  imgClassName,
  titleClassName,
  spareImg,
}: {
  className?: string;
  id: number;
  title?: string | TitleItem[];
  description?: string | React.ReactNode;
  img?: string;
  imgClassName?: string;
  titleClassName?: string;
  spareImg?: string;
}) => {
  const leftLists = ["NextJS", "Firebase", "TypeScript", "React", "Tailwind"];
  const rightLists = ["TensorFlow", "PyTorch", "Langchain", "Scikit-Learn", "OpenCV"];

  const [copied, setCopied] = useState(false);

  const defaultOptions = {
    loop: copied,
    autoplay: copied,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const handleCopy = () => {
    const text = "";
    navigator.clipboard.writeText(text);
    setCopied(true);
  };

  return (
    <div
      className={cn(
        "row-span-1 relative overflow-hidden rounded-xl border border-neutral-800 group/bento hover:shadow-xl transition duration-200 shadow-input dark:shadow-none justify-between flex flex-col",
        className
      )}
      style={{
        background: 'rgb(17,17,17)',
        backgroundColor: 'linear-gradient(145deg, rgba(17,17,17,1) 0%, rgba(35,35,35,1) 100%)',
      }}
    >
      <div className={`${id === 6 && "flex justify-center"} h-full`}>
        <div className="w-full h-full absolute">
          {img && (
            <img
              src={img}
              alt={img}
              className={cn(imgClassName, "object-cover object-center ")}
            />
          )}
        </div>
        <div
          className={`absolute right-0 -bottom-5 ${id === 5 && "w-full opacity-80"
            } `}
        >
          {spareImg && (
            <img
              src={spareImg}
              alt={spareImg}
              className="object-cover object-center w-full h-full"
            />
          )}
        </div>
        

        <div
          className={cn(
            titleClassName,
            "group-hover/bento:translate-x-2 transition duration-200 relative md:h-full flex flex-col px-4 py-3 lg:px-6 lg:py-4"
          )}
        >
          <div className="font-sans font-extralight md:max-w-32 md:text-xs lg:text-base text-sm text-neutral-400 z-10 mb-3">
            {description}
          </div>
          <div className="font-sans text-lg lg:text-3xl max-w-96 text-neutral-200 z-10">
            {Array.isArray(title) ? (
              title.map((item, index) => (
                <div key={index} className="mb-4">
                  <span className="font-bold text-2xl">{item.label} </span>
                  <span className="font-normal text-xl text-neutral-300">{item.value}</span>
                </div>
              ))
            ) : (
              title
            )}
          </div>


          {id === 5 && (
            <div className="flex flex-col gap-2 mt-2">
              <div className="grid grid-cols-5 gap-2">
                {[...leftLists, ...rightLists].map((item, i) => (
                  <span
                    key={i}
                    className="py-1.5 px-2 text-xs text-neutral-300
                    rounded-lg text-center bg-neutral-900/50 backdrop-blur-sm
                    hover:bg-neutral-800/50 transition-colors whitespace-nowrap font-bold"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          )}
          {id === 6 && (
            <div className="mt-5 relative">
              <div
                className={`absolute -bottom-5 right-0 ${copied ? "block" : "block"
                  }`}
              >
                <Lottie options={defaultOptions} height={200} width={400} />
              </div>

              <MagicButton
                title={copied ? "Email is Copied!" : "Copy my email address"}
                icon={<IoCopyOutline />}
                position="left"
                handleClick={handleCopy}
                otherClasses="!bg-[#161A31]"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};