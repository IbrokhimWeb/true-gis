"use client";

import Image from "next/image";
import Link from "next/link";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";

const Header = () => {
  const [lng, setLng] = React.useState("uz");

  return (
    <section className="w-full h-full flex items-center justify-between border-b border-[#FDFDFD]/10">
      <Link href="/" className="flex items-center gap-2">
        <Image
          src="/logo.svg"
          alt="Logo"
          width="0"
          height="0"
          sizes="100%"
          className="size-[40px]"
        />
        <h1 className="text-base font-medium">TrueGis</h1>
      </Link>
      <ul className="hidden items-center gap-10 font-medium text-base lg:flex">
        <li>
          <Link href="#">Bot xususiyatlari</Link>
        </li>
        <li>
          <Link href="#">Bizning mijozlar</Link>
        </li>
        <li>
          <Link href="#">Fikrlar</Link>
        </li>
        <li>
          <Link href="#">Ko’p beriladigan savollar</Link>
        </li>
      </ul>
      <span />
      <span />
      <div className="flex items-center gap-10">
        <div className="hidden md:block">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="outline"
                className="flex items-center gap-2 px-2 rounded-full"
              >
                <Image
                  src="/uz.png"
                  alt="Flag"
                  width="0"
                  height="0"
                  sizes="100%"
                  className="size-6 rounded-full"
                />
                {"O'zbek"}
                <Image
                  src="/bottom.svg"
                  alt="Bottom Icon"
                  width="0"
                  height="0"
                  sizes="100%"
                  className="size-5"
                />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuRadioGroup value={lng} onValueChange={setLng}>
                <DropdownMenuRadioItem disabled value="uz">
                  {"O'zbek"}
                </DropdownMenuRadioItem>
              </DropdownMenuRadioGroup>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
        <Button variant="ghost" className="block lg:hidden">
          <Image
            src="/hamburger.svg"
            alt="Hamburger Icon"
            width="0"
            height="0"
            sizes="100%"
            className="size-7 p-0 box-content"
          />
        </Button>
      </div>
    </section>
  );
};

export default Header;
