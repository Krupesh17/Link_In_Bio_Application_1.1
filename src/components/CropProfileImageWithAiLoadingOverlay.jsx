import { CropIcon } from "lucide-react";
import React, { useEffect, useState } from "react";

const CropProfileImageWithAiLoadingOverlay = ({ icon, title, description }) => {
  const [sparkles, setSparkles] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newSparkle = {
        id: Date.now() + Math.random(),
        x: Math.random() * 100,
        y: Math.random() * 100,
        size: Math.random() * 8 + 4,
        duration: Math.random() * 1000 + 1000,
      };

      setSparkles((prev) => [...prev, newSparkle]);

      setTimeout(() => {
        setSparkles((prev) => prev.filter((s) => s.id !== newSparkle.id));
      }, newSparkle.duration);
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute inset-0 bg-black/60 backdrop-blur-md flex items-center">
      <div className="text-center px-4 space-y-1.5">
        <div className="mx-auto p-2 rounded-lg bg-gradient-to-br from-purple-700 via-blue-600 to-teal-600 bg-[length:200%_200%] animate-[gradient_3s_ease_infinite] size-10">
          {icon}
        </div>
        <h4 className="font-medium text-white">{title}</h4>
        <p className="text-sm text-neutral-400">{description}</p>
      </div>
      {sparkles.map((sparkle) => (
        <div
          key={sparkle.id}
          className="absolute pointer-events-none"
          style={{
            left: `${sparkle.x}%`,
            top: `${sparkle.y}%`,
            width: `${sparkle.size}px`,
            height: `${sparkle.size}px`,
            animation: `sparkle ${sparkle.duration}ms ease-out forwards`,
          }}
        >
          <svg viewBox="0 0 24 24" fill="none" className="w-full h-full">
            <path
              d="M12 2L13.5 8.5L20 10L13.5 11.5L12 18L10.5 11.5L4 10L10.5 8.5L12 2Z"
              fill="white"
              className="drop-shadow-lg"
            />
          </svg>
        </div>
      ))}
    </div>
  );
};

export default CropProfileImageWithAiLoadingOverlay;
