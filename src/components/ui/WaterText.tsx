"use client";

import { useCallback, useEffect, useRef } from "react";

import { cn } from "~/utils/cn";

interface Point {
  x: number;
  y: number;
}

interface CharacterState {
  intensity: number;
  angle: number;
}

interface WaterTextProps {
  text: string;
  className?: string;
  maxDistance?: number;
  decaySpeed?: number;
  minIntensity?: number;
}

const DEFAULT_MAX_DISTANCE = 100;
const DEFAULT_DECAY_SPEED = 0.015;
const DEFAULT_MIN_INTENSITY = 0;
const FRAME_RATE = 1000 / 60; // 60 FPS

export function WaterText({
  text,
  className,
  maxDistance = DEFAULT_MAX_DISTANCE,
  decaySpeed = DEFAULT_DECAY_SPEED,
  minIntensity = DEFAULT_MIN_INTENSITY,
}: WaterTextProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef<Point>({ x: 0, y: 0 });
  const frameRef = useRef<number>();
  const lastUpdateRef = useRef<number>(0);

  const calculateCharacterState = useCallback(
    (charRect: DOMRect, containerRect: DOMRect, mouse: Point): CharacterState => {
      const charX = charRect.left - containerRect.left + charRect.width / 2;
      const charY = charRect.top - containerRect.top + charRect.height / 2;

      const distanceX = mouse.x - charX;
      const distanceY = mouse.y - charY;
      const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);

      return {
        intensity: Math.max(minIntensity, 1 - distance / maxDistance),
        angle: Math.atan2(distanceY, distanceX),
      };
    },
    [maxDistance, minIntensity]
  );

  const updateRipple = useCallback((e: MouseEvent) => {
    const container = containerRef.current;
    if (!container) return;

    const rect = container.getBoundingClientRect();
    mouseRef.current = {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    };
  }, []);

  const animate = useCallback(
    (timestamp: number) => {
      const container = containerRef.current;
      if (!container) return;

      // Throttle updates to target frame rate
      if (timestamp - lastUpdateRef.current < FRAME_RATE) {
        frameRef.current = requestAnimationFrame(animate);
        return;
      }

      const chars = container.querySelectorAll<HTMLElement>(".water-char");
      const containerRect = container.getBoundingClientRect();

      chars.forEach((char) => {
        const charRect = char.getBoundingClientRect();
        const { intensity, angle } = calculateCharacterState(
          charRect,
          containerRect,
          mouseRef.current
        );

        // Only update DOM if intensity has changed significantly
        const currentIntensity = parseFloat(
          char.style.getPropertyValue("--water-intensity") || "0"
        );
        const newIntensity = Math.max(minIntensity, currentIntensity - decaySpeed);

        if (
          Math.abs(intensity - currentIntensity) > 0.01 ||
          Math.abs(newIntensity - currentIntensity) > 0.01
        ) {
          char.style.setProperty("--water-intensity", Math.max(intensity, newIntensity).toString());
          char.style.setProperty("--water-angle", angle.toString());
        }
      });

      lastUpdateRef.current = timestamp;
      frameRef.current = requestAnimationFrame(animate);
    },
    [calculateCharacterState, decaySpeed, minIntensity]
  );

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    container.addEventListener("mousemove", updateRipple, { passive: true });
    frameRef.current = requestAnimationFrame(animate);

    return () => {
      container.removeEventListener("mousemove", updateRipple);
      if (frameRef.current) {
        cancelAnimationFrame(frameRef.current);
      }
    };
  }, [animate, updateRipple]);

  return (
    <div
      ref={containerRef}
      className={cn("relative select-none cursor-pointer", className)}
      aria-label={text}
    >
      {text.split(" ").map((word, wordIndex) => (
        <span key={`word-${wordIndex}`} className="inline-block">
          {word.split("").map((char, charIndex) => (
            <span
              key={`${char}-${charIndex}`}
              className="water-char inline-block"
              style={
                {
                  "--char-index": charIndex,
                  "--water-intensity": "0",
                  "--water-angle": "0",
                } as React.CSSProperties
              }
              aria-hidden="true"
            >
              {char}
            </span>
          ))}
          {wordIndex < text.split(" ").length - 1 && (
            <span className="inline-block" style={{ width: "0.3em" }} />
          )}
        </span>
      ))}
    </div>
  );
}
