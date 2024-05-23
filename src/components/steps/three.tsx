"use client";

import React from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { State } from "@/store";
import {
  setRemuveFile,
  setSuccess,
  setToggle,
  setUpload,
} from "@/store/steperSlice";
import YMap from "../ui/ymap";

const Three = () => {
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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Joylashuv ma’lumotlari</CardTitle>
      </CardHeader>
      <CardContent className="">
        <Label htmlFor="location">Joy manzilini kiriting</Label>
        <Input
          id="location"
          type="text"
          placeholder="Manzil"
          className="w-[350px] max-sm:w-full"
          name="main_phone"
          // value={step?.data?.main_phone}
          // onChange={handleChange}
          // error={
          //   step?.success === false && step?.data?.main_phone?.length !== 12
          // }
        />
        <br />
        <YMap onChange={() => {}} />
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

export default Three;
