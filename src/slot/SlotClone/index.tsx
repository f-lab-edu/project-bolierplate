import { Children, cloneElement, forwardRef, isValidElement } from "react";

import { MergeProps } from "@/utils/services";

import type { SlotProps } from "../Slot/Slot.types";
import type { ComponentPropsWithRef, ForwardedRef, ReactElement } from "react";

const MAX_NUM_OF_SLOTTED_CHILDREN = 1;

export const SlotClone = forwardRef((props: SlotProps, forwardedRef: ForwardedRef<HTMLElement>) => {
  const { children, ...slotProps } = props;

  // children 의 갯수 검사
  if (Children.count(children) > MAX_NUM_OF_SLOTTED_CHILDREN) {
    return Children.only(null);
  }
  // children 이 ReactElement 인지 검사
  else if (isValidElement(children)) {
    return cloneElement<ComponentPropsWithRef<"element">>(children as ReactElement, {
      ...MergeProps.setProps(slotProps, children.props)
        .mergeEventHandlers()
        .mergeStyles()
        .mergeClassNames(slotProps.postProcessClassName)
        .build(),
      ref: forwardedRef,
    });
  }

  return null;
});

SlotClone.displayName = "SlotClone";
