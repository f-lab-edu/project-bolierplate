import { createVar, style } from "@vanilla-extract/css";
import { calc } from "@vanilla-extract/css-utils";

export const ratio = createVar();

export const base_aspect_ratio_root_wrapper = style({
  position: "relative",
  height: 0,
  overflow: "hidden",
  paddingTop: calc.multiply(ratio, "100%").toString(),
});
