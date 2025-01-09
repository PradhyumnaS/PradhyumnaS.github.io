import React from 'react';
import MagicButton from './ui/MagicButton';
import { GrDocumentText } from "react-icons/gr";
import { motion } from 'framer-motion';

const Resume = () => {
  return (
    <section className="relative min-h-[60vh] w-full flex items-center justify-center py-20 mb-20" id="resume">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-gray-900/30" />
      
      <div className="relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center max-w-6xl mx-auto px-4">
        {/* Left side with animated text */}
        <div className="space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
            Resume
          </h2>
          <p className="text-gray-400 text-lg max-w-md">
            Here's a link to my full resume with all my experience, skills and certifications in detail.
          </p>
          <a href="https://drive.google.com/file/d/1TP9vqrjrZnxMtgPJN6dVUD91jRA6MECl/view?usp=share_link" 
             target="_blank"
             rel="noopener noreferrer"
             className="inline-block">
            <MagicButton
              title="View Resume"
              icon={<GrDocumentText className="text-xl" />}
              position="right"
            />
          </a>
        </div>

        {/* Right side with decorative elements */}
        <div className="relative h-72 md:h-96">
          {/* Decorative frame */}
          <div className="absolute inset-0 border-2 border-gray-700 rounded-lg transform rotate-3">
            <div className="absolute -inset-1 border-2 border-gray-600 rounded-lg transform -rotate-3" />
          </div>
          
          {/* Content inside frame */}
          <div className="absolute inset-4 bg-gray-900/80 backdrop-blur-sm rounded-lg p-6 transform -rotate-1">
            <div className="h-full flex flex-col justify-between">
              <div className="space-y-4">
                <div className="w-1/3 h-6 bg-gray-700 rounded animate-pulse" />
                <div className="w-2/3 h-4 bg-gray-800 rounded animate-pulse" />
                <div className="w-1/2 h-4 bg-gray-800 rounded animate-pulse" />
              </div>
              
              <div className="grid grid-cols-3 gap-3">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-8 bg-gray-800 rounded animate-pulse" 
                       style={{ animationDelay: `${i * 0.1}s` }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Resume;