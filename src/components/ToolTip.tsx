import React from "react";
import { FC } from "react";

interface Props {
  children: React.ReactNode;
  tooltip?: string;
}

const ToolTip: FC<Props> = ({ children, tooltip }): JSX.Element => {
  const tooltipRef = React.useRef<HTMLSpanElement>(null);
  const container = React.useRef<HTMLDivElement>(null);

  return (
    <div
      ref={container}
      onMouseEnter={({ clientX }) => {
        if (!tooltipRef.current || !container.current) return;
        const { left } = container.current.getBoundingClientRect();
        tooltipRef.current.style.left = `${clientX - left}px`;
      }}
      className="group relative inline-block"
    >
      {children}
      <span
        ref={tooltipRef}
        className="invisible group-hover:visible opacity-0 group-hover:opacity-100 transition bg-black text-white p-2 rounded absolute top-full mt-2 whitespace-nowrap"
        dangerouslySetInnerHTML={{ __html: tooltip || "" }}
      />
    </div>
  );
};

export default ToolTip;
