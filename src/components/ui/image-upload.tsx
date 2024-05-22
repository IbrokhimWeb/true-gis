import React from "react";
import { Card } from "./card";
import Image from "next/image";

const ImageUpload = () => {
  return (
    <Card className="w-full h-full flex flex-col items-center justify-center !p-6 hover:border-dashed cursor-cell hover:border-[#2970FF]">
      <Image
        src="/upload.svg"
        alt="Logo"
        width="0"
        height="0"
        sizes="100%"
        className="size-auto mb-5"
      />
      <h1 className="w-full text-center text-sm font-medium text-[#FDFDFD] mb-2">
        Rasm yuklang
      </h1>
      <p className="w-full text-center text-sm font-normal text-[#94969C]">
        PNG yoki JPG (max. <br /> 800x400px)
      </p>
    </Card>
  );
};

export default ImageUpload;
