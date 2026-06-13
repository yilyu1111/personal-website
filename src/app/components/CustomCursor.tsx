import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "motion/react";

export function CustomCursor() {
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);
  const [clicking, setClicking] = useState(false);
  const [hovering, setHovering] = useState(false);

  /* 小点即时，大圆弹性跟随 */
  const ringX = useSpring(mouseX, { stiffness: 100, damping: 22, mass: 0.4 });
  const ringY = useSpring(mouseY, { stiffness: 100, damping: 22, mass: 0.4 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      const t = e.target as HTMLElement;
      setHovering(!!t.closest("button, a, [role='button']"));
    };
    const onDown = () => setClicking(true);
    const onUp   = () => setClicking(false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup",   onUp);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup",   onUp);
    };
  }, [mouseX, mouseY]);

  return (
    <>
      {/* 跟随圆环 — 弹性慢跟 */}
      <motion.div
        style={{
          position: "fixed", top: 0, left: 0,
          x: ringX, y: ringY,
          translateX: "-50%", translateY: "-50%",
          pointerEvents: "none", zIndex: 9998,
          borderRadius: "50%",
          border: "1.5px solid rgba(255,255,255,0.7)",
          boxShadow: "0 0 8px rgba(255,255,255,0.2)",
        }}
        animate={{
          width:   clicking ? 20 : hovering ? 48 : 32,
          height:  clicking ? 20 : hovering ? 48 : 32,
          opacity: clicking ? 0.4 : hovering ? 0.85 : 0.55,
          background: hovering
            ? "rgba(255,255,255,0.08)"
            : "transparent",
        }}
        transition={{ type: "spring", stiffness: 260, damping: 20 }}
      />

      {/* 中心小点 — 即时跟随 */}
      <motion.div
        style={{
          position: "fixed", top: 0, left: 0,
          x: mouseX, y: mouseY,
          translateX: "-50%", translateY: "-50%",
          pointerEvents: "none", zIndex: 9999,
          borderRadius: "50%",
          background: "white",
        }}
        animate={{
          width:   clicking ? 3 : hovering ? 5 : 6,
          height:  clicking ? 3 : hovering ? 5 : 6,
          opacity: hovering ? 0.6 : 1,
        }}
        transition={{ type: "spring", stiffness: 600, damping: 30 }}
      />
    </>
  );
}
