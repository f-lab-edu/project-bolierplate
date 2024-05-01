import type { ComponentPropsWithoutRef } from "react";

export interface SlotProps extends ComponentPropsWithoutRef<"element"> {
  postProcessClassName?: (className: string) => string;
}
