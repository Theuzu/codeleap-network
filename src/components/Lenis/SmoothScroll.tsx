"use client";
import { ReactLenis } from "lenis/react";

type SmoothScrollProps = {
  children: React.ReactNode;
};

const SmoothScroll: React.FC<SmoothScrollProps> = ({ children }) => {
  return ( <>
  <ReactLenis
      root
      options={{
          lerp: 0.075,
          duration: 1.4,
          smoothWheel: true,
          syncTouch: true,
          wheelMultiplier: 1.3,
          touchMultiplier: 2,
        }}
      >
      {children}
      </ReactLenis>
      </>
  );
};

export default SmoothScroll;
