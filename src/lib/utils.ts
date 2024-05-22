import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const formatPhoneNumber = (value: string): string => {
  let formattedValue =
    value?.replace(/\D/g, "").length <= 0
      ? ""
      : value?.replace(/\D/g, "").length === 1
      ? "998" + value?.replace(/\D/g, "")
      : value?.replace(/\D/g, "");
  if (formattedValue?.length > 12) {
    formattedValue = formattedValue?.substring(0, 12);
  }
  const match = formattedValue?.match(
    /^(\d{0,3})(\d{0,2})(\d{0,3})(\d{0,2})(\d{0,2})$/,
  );

  if (match) {
    const [_, countryCode, firstGroup, secondGroup, thirdGroup, fourthGroup] =
      match;

    let result = "";

    if (countryCode) {
      result += `+${countryCode}`;
    }

    if (firstGroup) {
      result += ` (${firstGroup}`;
    }

    if (secondGroup) {
      result += `) ${secondGroup}`;
    }

    if (thirdGroup) {
      result += `-${thirdGroup}`;
    }

    if (fourthGroup) {
      result += `-${fourthGroup}`;
    }

    return result;
  }

  return formattedValue;
};
