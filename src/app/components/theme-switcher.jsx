"use client";

import React, { useEffect, useState } from "react";
import { useTheme } from "next-themes";
import { BsMoonFill, BsFillSunFill } from "react-icons/bs";
import { Button } from "@nextui-org/react";
import { WiMoonThirdQuarter } from "react-icons/wi";
import Image from "next/image";

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div>
      {theme == "dark" ? (
        <Button
          isIconOnly
          variant="light"
          color="primary"
          aria-label="Like"
          onClick={() => setTheme("light")}
        >
          <BsFillSunFill className="h-[1.2rem] w-[1.2rem] text-white" />
        </Button>
      ) : (
        <Button
          isIconOnly
          variant="light"
          color="primary"
          aria-label="Like"
          onClick={() => setTheme("dark")}
        >
          <Image
            src="./brightness_white.svg"
            width={25}
            height={10}
            alt="prop"
          />
          {/* <WiMoonThirdQuarter className="h-[1.2rem] w-[1.2rem] text-white" /> */}
        </Button>
      )}
    </div>
  );
}
