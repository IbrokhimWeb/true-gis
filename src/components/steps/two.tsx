"use client";

import React, { ChangeEvent, useCallback } from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Button } from "../ui/button";
import Image from "next/image";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useDispatch, useSelector } from "react-redux";
import { State } from "@/store";
import { setChange, setSuccess, setToggle } from "@/store/steperSlice";
import { formatPhoneNumber } from "@/lib/utils";
import ImageUpload from "../ui/image-upload";

const Two = () => {
  const dispatch = useDispatch();

  const { active, step } = useSelector(({ steper }: State) => ({
    active: steper?.active_step,
    step: steper?.steps?.find((step) => step.id === steper?.active_step),
  }));

  const store = useSelector((store: State) => store);

  console.log(store);

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      e.currentTarget.type === "tel"
        ? dispatch(
            setChange({
              id: active,
              key: e.target.name,
              value: e.target.value.replace(/[^0-9]+/g, "").substring(0, 12),
            }),
          )
        : dispatch(
            setChange({
              id: active,
              key: e.target.name,
              value: e.target.value,
            }),
          );
    },
    [active, dispatch],
  );

  const handleSubmit = () => {
    const isSuccess =
      step?.data?.name?.length > 0 &&
      step?.data?.phone?.length > 0 &&
      step?.data?.main_phone?.length > 0;

    if (isSuccess) {
      dispatch(setSuccess({ id: active, success: true }));
      dispatch(setToggle(active + 1));
    } else {
      dispatch(setSuccess({ id: active, success: false }));
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-3">
          <span>Joy rasmlari</span>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Image
                  src="/info.svg"
                  alt="Logo"
                  width="0"
                  height="0"
                  sizes="100%"
                  className="size-auto"
                />
              </TooltipTrigger>
              <TooltipContent className="w-[320px]">
                <h1 className="text-white mb-2">This is a tooltip</h1>
                <p className="text-[#CECFD2]">
                  Tooltips are used to describe or identify an element. In most
                  scenarios, tooltips help the user understand meaning, function
                  or alt-text.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </CardTitle>
      </CardHeader>
      <CardContent className="w-full grid grid-cols-3 gap-5 max-xl:grid-cols-2 max-sm:grid-cols-1">
        <ImageUpload />

        <div className="w-full h-full relative">
          <Image
            src="/upload.png"
            alt="Logo"
            width="0"
            height="0"
            sizes="100%"
            className="size-full mb-5"
          />
          <button className="w-4 h-4 p-2 box-content absolute top-3 right-3 bg-white rounded-full">
            <Image
              src="/delete.svg"
              alt="Logo"
              width="0"
              height="0"
              sizes="100%"
              className="size-full mb-5"
            />
          </button>
        </div>
      </CardContent>
      <CardFooter className="w-full flex items-center justify-end mt-5">
        <Button className="flex items-center gap-2" onClick={handleSubmit}>
          Keyingisi
          <Image
            src="/right.svg"
            alt="Logo"
            width="0"
            height="0"
            sizes="100%"
            className="size-auto"
          />
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Two;
