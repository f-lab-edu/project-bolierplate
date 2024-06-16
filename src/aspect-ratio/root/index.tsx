import { assignInlineVars } from "@vanilla-extract/dynamic";
import { forwardRef } from "react";

import { Slot } from "@/slot";

import { base_aspect_ratio_root_wrapper, ratio } from "./root.css";

import type { AspectRatioProps } from "../aspect-ratio-types";
import type { ForwardedRef } from "react";

export const AspectRatio = forwardRef((props: AspectRatioProps, forwardedRef: ForwardedRef<HTMLDivElement>) => {
  const { asChild, ratio: propsRatio = 1, ...aspectRatioProps } = props;

  const Comp = asChild ? Slot : "div";

  return (
    <div
      className={base_aspect_ratio_root_wrapper}
      style={assignInlineVars({
        [ratio]: propsRatio.toString(),
      })}
    >
      <Comp ref={forwardedRef} {...aspectRatioProps} />
    </div>
  );
});

AspectRatio.displayName = "AspectRation.Root";

export const Root = AspectRatio;
