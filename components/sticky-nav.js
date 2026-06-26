"use client";
import { useState, useEffect } from "react";
import Nav from "./nav";

const StickyNav = ({ currentPage = "home" }) => {
  const [headerVisible, setHeaderVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const header = document.getElementById("header");
      if (header) {
        setHeaderVisible(header.getBoundingClientRect().bottom > 0);
      }
    };

    // Retry until #header exists
    const waitForHeader = () => {
      if (document.getElementById("header")) {
        handleScroll();
        window.addEventListener("scroll", handleScroll);
      } else {
        setTimeout(waitForHeader, 100);
      }
    };

    const t = setTimeout(waitForHeader, 50);
    return () => {
      clearTimeout(t);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [currentPage]);

  if (headerVisible) return null;

  return <Nav currentPage={currentPage} className="fixed top-0 left-0 w-full z-[200000]" />;
};

export default StickyNav;
