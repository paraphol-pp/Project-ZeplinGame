import React from "react";
import { Link } from "react-router-dom";

type Props = {
  title: string;
  to?: string;
  buttonLabel?: string; 
  className?: string;
};

const SectionHeader: React.FC<Props> = ({
  title,
  to = "/games",
  buttonLabel = "View Top Game",
  className = "",
}) => {
  return (
    <div className={`flex items-center justify-between mb-4 ${className}`}>
      <h2 className="text-2xl font-bold text-white">{title}</h2>

      <Link
        to={to}
        className="relative group inline-flex items-center text-sm text-indigo-400 hover:text-indigo-200"
        aria-label={buttonLabel}
      >
        <span className="px-2 py-1">{buttonLabel}</span>
        <span className="absolute bottom-0 left-0 w-0 h-[3px] bg-indigo-500 group-hover:w-full transition-all duration-300"></span>
      </Link>
    </div>
  );
};

export default SectionHeader;