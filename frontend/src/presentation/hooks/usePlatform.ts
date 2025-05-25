import { useEffect, useState } from "react";

interface UsePlatform {
  isMobile: boolean;
  isDesktop: boolean;
  isVerySmallDevice: boolean;
  windowHeight: number;
}

export function usePlatform(): UsePlatform {
  const [isMobile, setIsMobile] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);
  const [isVerySmallDevice, setIsVerySmallDevice] = useState(false);
  const [windowHeight, setWindowHeight] = useState(window.innerHeight);

  useEffect(() => {
    if (typeof window === "undefined") return;

    window.addEventListener("resize", updatePlatform);

    return () => {
      window.removeEventListener("resize", updatePlatform);
    };
  }, []);

  function updatePlatform() {
    const windowWidth = window.innerWidth;
    if (windowWidth > 768) {
      setIsDesktop(true);
      setIsMobile(false);
      setIsVerySmallDevice(false);
    } else if (windowWidth < 370) {
      setIsDesktop(false);
      setIsMobile(false);
      setIsVerySmallDevice(true);
    } else {
      setIsDesktop(false);
      setIsMobile(true);
      setIsVerySmallDevice(false);
    }
    setWindowHeight(window.innerHeight);
  }

  return {
    isDesktop,
    isMobile,
    isVerySmallDevice,
    windowHeight,
  };
}
