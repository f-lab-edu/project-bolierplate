import { forwardRef } from "react";

import { Slot } from "@/slot";

import { useCheckboxContext } from "../root";

import type { CheckboxIndicatorProps } from "../checkbox.types";
import type { ForwardedRef } from "react";

export const CheckboxIndicator = forwardRef(
  (props: CheckboxIndicatorProps, forwardedRef: ForwardedRef<HTMLSpanElement>) => {
    const { asChild, children, ...CheckboxIndicatorProps } = props;

    const Comp = asChild ? Slot : "span";

    const checkboxContext = useCheckboxContext();

    const currentCheckStatus =
      checkboxContext?.checkboxMachineState.value === "indeterminate"
        ? checkboxContext?.checkboxMachineState.value
        : checkboxContext?.checkboxMachineState.value === "checked";

    if (currentCheckStatus === "indeterminate" || currentCheckStatus) {
      return (
        <Comp ref={forwardedRef} {...CheckboxIndicatorProps} {...checkboxContext?.api.indicatorProps}>
          {typeof children === "function" ? children(currentCheckStatus) : children}
        </Comp>
      );
    }

    return null;
  },
);

CheckboxIndicator.displayName = "Checkbox.Indicator";

export const Indicator = CheckboxIndicator;
