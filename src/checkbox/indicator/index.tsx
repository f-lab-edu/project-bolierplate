import { forwardRef } from "react";

import { Slot } from "@/slot";

import { useCheckboxContext } from "../root";

import type { CheckboxIndicatorProps } from "../checkbox.types";
import type { ForwardedRef } from "react";

export const CheckboxIndicator = forwardRef(
  (props: CheckboxIndicatorProps, forwardedRef: ForwardedRef<HTMLSpanElement>) => {
    const { asChild, ...CheckboxIndicatorProps } = props;

    const Comp = asChild ? Slot : "span";

    const checkboxContext = useCheckboxContext();

    if (
      checkboxContext?.checkboxMachineState.value === "indeterminate" ||
      checkboxContext?.checkboxMachineState.value === "checked"
    ) {
      return <Comp ref={forwardedRef} {...CheckboxIndicatorProps} {...checkboxContext?.api.indicatorProps} />;
    }

    return null;
  },
);

CheckboxIndicator.displayName = "Checkbox.Indicator";

export const Indicator = CheckboxIndicator;
