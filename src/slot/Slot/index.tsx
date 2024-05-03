import { forwardRef } from "react";

import { SlotClone } from "../SlotClone";

import type { SlotProps } from "./Slot.types";
import type { ForwardedRef } from "react";

export const Slot = forwardRef((props: SlotProps, forwardedRef: ForwardedRef<HTMLElement>) => {
  const { children, ...slotProps } = props;

  return (
    <SlotClone {...slotProps} ref={forwardedRef}>
      {children}
    </SlotClone>
  );
});

Slot.displayName = "Slot";

export const Root = Slot;
