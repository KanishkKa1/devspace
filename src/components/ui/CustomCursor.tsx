"use client";

import { useEffect, useRef, useState } from "react";

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  useEffect(() => {
    let animationFrameId: number;
    // initial state off screen
    let mouseX = -100;
    let mouseY = -100;
    let cursorX = -100;
    let cursorY = -100;

    // High speed for "light smooth follow" (avoids heavy lag)
    const speed = 0.5; 

    const updateCursor = () => {
      if (cursorRef.current) {
        cursorX += (mouseX - cursorX) * speed;
        cursorY += (mouseY - cursorY) * speed;
        cursorRef.current.style.transform = `translate3d(calc(${cursorX}px - 50%), calc(${cursorY}px - 50%), 0)`;
      }
      animationFrameId = requestAnimationFrame(updateCursor);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const clickable =
        ["A", "BUTTON"].includes(target.tagName) ||
        target.closest("a") ||
        target.closest("button") ||
        window.getComputedStyle(target).cursor === "pointer";
      
      setIsHovering(!!clickable);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseover", handleMouseOver);
    animationFrameId = requestAnimationFrame(updateCursor);

    return () => {
        window.removeEventListener("mousemove", handleMouseMove);
        window.removeEventListener("mouseover", handleMouseOver);
        cancelAnimationFrame(animationFrameId);
    };
  }, []);

  useEffect(() => {
    // Attempt to hide standard cursor on non-touch devices globally for better feel
    // But preserve text cursors
    document.documentElement.classList.add("custom-cursor-active");
    return () => {
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, []);

  return (
    <>
      <style dangerouslySetInnerHTML={{__html: `
        @media (pointer: fine) {
          .custom-cursor-active *, .custom-cursor-active {
             cursor: none !important;
          }
          /* Preserve native cursors for text inputs to not ruin UX */
          .custom-cursor-active p, 
          .custom-cursor-active h1, 
          .custom-cursor-active h2, 
          .custom-cursor-active h3, 
          .custom-cursor-active span,
          .custom-cursor-active input,
          .custom-cursor-active textarea {
             cursor: auto !important;
          }
          .custom-cursor-active a, 
          .custom-cursor-active button {
             cursor: none !important;
          }
        }
      `}} />
      <div
        ref={cursorRef}
        className={`pointer-events-none fixed top-0 left-0 z-[9999] hidden sm:block mix-blend-normal transition-[width,height,background-color,opacity,border-radius] duration-200 ease-out will-change-transform ${
          isHovering
            ? "w-8 h-8 bg-blue-500/20 border border-blue-500/50 opacity-100"
            : "w-2 h-2 bg-slate-800 dark:bg-white opacity-90"
        }`}
        style={{ borderRadius: "50%" }}
      />
    </>
  );
}
