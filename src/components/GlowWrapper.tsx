import { useState } from "react";
import type { ReactNode, MouseEvent } from "react";

type GlowWrapperProps = {
  children: ReactNode;
  type?: "card" | "button" | "section";
  className?: string;
  noPadding?: boolean;
};

const GlowWrapper = ({
  children,
//   type = "card",
  className = "",
  noPadding = false,
}: GlowWrapperProps) => {
  const [pos, setPos] = useState({ x: 0, y: 0 });

  const mouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  return (
    <div
      onMouseMove={mouseMove}
      className={`relative rounded-2xl p-[2px] group ${className}`}
    >
      <div
        className="absolute inset-0 opacity-0 rounded-2xl group-hover:opacity-100 transition duration-400 p-[2.5px]"
        style={{
          background: `radial-gradient(600px circle at ${pos.x}px ${pos.y}px, oklch(51.1% 0.262 276.966), transparent 50%)`,
        }}
      >
        <div className="w-full h-full rounded-2xl bg-neutral-900" />
      </div>

      <div
        className={`relative rounded-2xl bg-neutral-950 ${
          noPadding ? "" : "p-7"
        }`}
      >
        {children}
      </div>
    </div>
  );
};

export default GlowWrapper;
