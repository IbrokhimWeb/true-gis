"use client";

import { cn } from "@/lib/utils";
import Image from "next/image";
import { useCallback, useState } from "react";
import { Button } from "./button";
import { useDispatch, useSelector } from "react-redux";
import { State } from "@/store";
import { setToggle } from "@/store/steperSlice";

interface Step {
  id: number;
  title: string;
  success: null | boolean;
}

const MAX_COUNT = 8;

const Steper = () => {
  const dispatch = useDispatch();

  const { active_step, steps } = useSelector(({ steper }: State) => steper);

  const handleToggle = (id: number) => {
    id > MAX_COUNT || id < 1 ? null : dispatch(setToggle(id));
  };

  return (
    <div className="w-full h-[10vh] flex flex-col items-start justify-center mb-10">
      <div className="w-full flex items-center justify-between px-5 mb-10 md:hidden">
        <Button variant="ghost" onClick={() => handleToggle(active_step - 1)}>
          <Image
            src={`/left-icon.svg`}
            alt="Icon"
            width="0"
            height="0"
            sizes="100%"
            className="w-full h-full"
          />
        </Button>
        <div className="text-3xl font-medium">
          <span className="text-[#2970FF]">{active_step}</span>
          <span className="text-[#D0D5DD]">/{MAX_COUNT}</span>
        </div>
        <Button variant="ghost" onClick={() => handleToggle(active_step + 1)}>
          <Image
            src={`/left-icon.svg`}
            alt="Icon"
            width="0"
            height="0"
            sizes="100%"
            className="w-full h-full rotate-180"
          />
        </Button>
      </div>
      <ol className="w-full h-full flex items-center justify-center select-none px-10 max-md:px-0 max-md:gap-2 ">
        {steps?.map(({ id, title, success }) => (
          <div
            key={id}
            className={cn(
              "h-full",
              id === MAX_COUNT ? "w-8 max-md:w-full" : "w-full",
            )}
          >
            <li
              key={id}
              className={cn(
                "flex w-full items-center after:border-b-[1.5px] after:inline-block after:border-dashed max-md:after:hidden",
                id === MAX_COUNT
                  ? "w-8 max-md:w-full"
                  : "after:w-[calc(100%-2rem)]",
                active_step > id && success
                  ? "after:border-green-500 after:border-solid"
                  : "",
                active_step > id && !success
                  ? "after:border-red-500 after:border-dotted"
                  : "",
              )}
            >
              <span
                className={cn(
                  "flex items-center justify-center font-semibold rounded-full cursor-pointer w-8 h-8 max-md:w-full max-md:h-1",
                  active_step === id
                    ? "text-white bg-[#3B82F6]"
                    : "text-[#475467] bg-[#98A2B3]",
                  active_step > id && success ? "bg-green-500" : "",
                  active_step > id && !success ? "bg-red-500" : "",
                )}
                onClick={() => handleToggle(id)}
              >
                <span className="max-md:hidden">
                  {active_step > id ? (
                    <Image
                      src={`/${Boolean(success)}.svg`}
                      alt="Icon"
                      width="0"
                      height="0"
                      sizes="100%"
                      className="w-4 h-3"
                    />
                  ) : (
                    id
                  )}
                </span>
              </span>
            </li>
            <h1
              className={cn(
                "text-lg text-center -ml-[80%] font-semibold text-[#FDFDFD] max-md:hidden",
                active_step === id ? "" : "hidden",
              )}
            >
              {title}
            </h1>
          </div>
        ))}
      </ol>
    </div>
  );
};

export default Steper;
