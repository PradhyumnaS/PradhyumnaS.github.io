"use client";

import { FaLocationArrow } from "react-icons/fa6";

import { socialMedia } from "@/data";
import MagicButton from "./ui/MagicButton";

const Footer = () => {
  return (
    <footer className="w-full pb-10 mb-[100px]" id="contact">
      

      <div className="flex flex-col items-center">
        <h1 className="heading lg:max-w-[45vw]">
          Contact Me 
        </h1>
        <p className="text-white-200 md:mt-10 my-5 text-center">
          Reach out to me today and let&apos;s discuss how I can help
        </p>
        <a href="mailto:pradycod@gmail.com">
          <MagicButton
            title="Let's get in touch"
            icon={<FaLocationArrow />}
            position="right"
          />
        </a>
      </div>
      <div className="flex mt-16 justify-center items-center">
  <div className="flex items-center gap-6">
    {socialMedia.map((info) => (
      <a
        key={info.id}
        href={info.link}
        target="_blank"
        rel="noopener noreferrer"
        className="w-10 h-10 cursor-pointer flex justify-center items-center backdrop-filter backdrop-blur-lg saturate-180 bg-opacity-75 bg-black-200 rounded-lg border border-black-300"
      >
        <img src={info.img} alt="icons" width={20} height={20} />
      </a>
    ))}
  </div>
</div>

    </footer>
  );
};

export default Footer;