import { Children, cloneElement, forwardRef, isValidElement } from "react";

import { MergeProps } from "@/utils/services";

import type { SlotProps } from "../Slot/Slot.types";
import type { ComponentPropsWithRef, ForwardedRef, MutableRefObject, ReactElement, Ref } from "react";

const MAX_NUM_OF_SLOTTED_CHILDREN = 1;

function setRef<T>(node: T, ref?: Ref<T>) {
  if (typeof ref === "function") {
    ref(node);
  } else if (ref) {
    (ref as MutableRefObject<T>).current = node;
  }
}

function combineRefs<T>(...refs: (Ref<T> | undefined)[]) {
  return (node: T) => refs.forEach((ref) => setRef(node, ref));
}

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
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref: forwardedRef ? combineRefs(forwardedRef, (children as any)?.ref) : (children as any)?.ref,
    });
  }

  return null;
});

SlotClone.displayName = "SlotClone";
