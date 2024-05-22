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

const One = () => {
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
      step?.data?.name?.length > 5 &&
      step?.data?.phone?.length === 12 &&
      step?.data?.main_phone?.length === 12;

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
        <CardTitle className="">Joy haqida</CardTitle>
      </CardHeader>
      <CardContent>
        <Label htmlFor="name">Joy nomi</Label>
        <div className="relative w-[350px] max-sm:w-full">
          <Input
            id="name"
            required
            // error
            type="text"
            placeholder="Mini market"
            className="pr-10"
            name="name"
            value={step?.data?.name}
            onChange={handleChange}
            error={step?.success === false && step?.data?.name?.length < 6}
          />
          <div className="absolute top-3 right-3">
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Image
                    src="/quaere.svg"
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
                    Tooltips are used to describe or identify an element. In
                    most scenarios, tooltips help the user understand meaning,
                    function or alt-text.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        <br />
        <Label htmlFor="phone">Telefon raqami</Label>
        <Input
          id="phone"
          type="tel"
          placeholder="+998"
          className="w-[350px] max-sm:w-full"
          name="main_phone"
          value={formatPhoneNumber(step?.data?.main_phone)}
          onChange={handleChange}
          error={
            step?.success === false && step?.data?.main_phone?.length !== 12
          }
        />
        <br />
        <Label htmlFor="addition_phone">Qo’shimcha telefon raqami</Label>
        <Input
          id="addition_phone"
          type="tel"
          placeholder="+998"
          className="w-[350px] max-sm:w-full"
          name="phone"
          value={formatPhoneNumber(step?.data?.phone)}
          onChange={handleChange}
          error={step?.success === false && step?.data?.phone?.length !== 12}
        />
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

export default One;
