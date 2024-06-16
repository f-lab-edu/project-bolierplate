import { forwardRef } from "react";

import { Slot } from "@/slot";

import type { AspectRatioProps } from "../aspect-ratio-types";
import type { ForwardedRef } from "react";

export const AspectRatio = forwardRef((props: AspectRatioProps, forwardedRef: ForwardedRef<HTMLDivElement>) => {
  const { asChild, ...aspectRatioProps } = props;

  const Comp = asChild ? Slot : "div";

  return (
    <div>
      <Comp ref={forwardedRef} {...aspectRatioProps} />
    </div>
  );
});

AspectRatio.displayName = "AspectRation.Root";

export const Root = AspectRatio;
