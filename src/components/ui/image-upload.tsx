import React from "react";
import { Card } from "./card";
import Image from "next/image";
import { useDropzone } from "react-dropzone";
import { cn } from "@/lib/utils";
import { useSelector } from "react-redux";
import { State } from "@/store";

const ImageUpload = ({ onDrop, label, error }: any) => {
  const { getRootProps, getInputProps } = useDropzone({ onDrop }); // maxFiles: 1

  const { step } = useSelector(({ steper }: State) => ({
    step: steper?.steps?.find((step) => step.id === steper?.active_step),
  }));

  return (
    <Card
      {...getRootProps()}
      className={cn(
        "w-full h-full flex flex-col items-center justify-center !p-6 border hover:border-dashed cursor-cell hover:border-[#2970FF]",
        error && !(step?.data?.location_images?.length > 0)
          ? "border-red-500 border-dashed"
          : "",
      )}
    >
      <Image
        src="/upload.svg"
        alt="Logo"
        width="0"
        height="0"
        sizes="100%"
        className="size-auto mb-5"
      />
      <input id={label} {...getInputProps()} />
      <h1
        className={cn(
          "w-full text-center text-sm font-medium text-[#FDFDFD] mb-2",
          error && !(step?.data?.location_images?.length > 0)
            ? "text-red-500"
            : "",
        )}
      >
        Rasm yuklang
      </h1>
      <p
        className={cn("w-full text-center text-sm font-normal text-[#94969C]")}
      >
        PNG yoki JPG (max. <br /> 800x400px)
      </p>
    </Card>
  );
};

export default ImageUpload;
