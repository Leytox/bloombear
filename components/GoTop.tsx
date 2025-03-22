"use client";

import { ArrowUpIcon } from "lucide-react";
import { Button } from "./ui/button";
import { useEffect, useState } from "react";

export default function GoTop() {
  const [isShown, setIsShown] = useState<boolean>(false);

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 1000) setIsShown(true);
      else setIsShown(false);
    }
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    isShown && (
      <Button
        className="fixed bottom-6 right-6"
        size={"lg"}
        variant="default"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <ArrowUpIcon />
      </Button>
    )
  );
}
