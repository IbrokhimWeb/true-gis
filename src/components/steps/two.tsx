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
import {
  setChange,
  setRemuveFile,
  setSuccess,
  setToggle,
  setUpload,
} from "@/store/steperSlice";
import { formatPhoneNumber } from "@/lib/utils";
import ImageUpload from "../ui/image-upload";

const Two = () => {
  const dispatch = useDispatch();

  const { active, step } = useSelector(({ steper }: State) => ({
    active: steper?.active_step,
    step: steper?.steps?.find((step) => step.id === steper?.active_step),
  }));

  const handleSubmit = () => {
    if (step?.data?.location_images?.length > 0) {
      dispatch(setSuccess({ id: active, success: true }));
      dispatch(setToggle(active + 1));
    } else {
      dispatch(setSuccess({ id: active, success: false }));
    }
  };

  const handleUpload = (files: Array<File>) => {
    dispatch(setUpload(files));
  };

  const handleRemuve = (index: number) => {
    dispatch(setRemuveFile(index));
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
        <ImageUpload error={step?.success === false} onDrop={handleUpload} />

        {step?.data?.location_images?.map((img: File, i: number) => (
          <div
            key={i}
            className="w-auto h-auto max-w-[300px] max-h-[200px] mx-auto relative rounded-2xl overflow-hidden"
          >
            <Image
              src={img ? URL.createObjectURL(img) : "/upload.png"}
              alt="Logo"
              width="0"
              height="0"
              sizes="100%"
              className="size-full mb-5 flex"
            />
            <button
              className="w-4 h-4 p-2 box-content absolute top-3 right-3 bg-white rounded-full"
              onClick={() => handleRemuve(i)}
            >
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
        ))}
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
