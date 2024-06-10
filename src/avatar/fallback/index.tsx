import { forwardRef } from "react";

import { Slot } from "@/slot";
import { mergeProps } from "@/utils/react";

import { useAvatarContext } from "../root";

import type { AvatarFallbackProps } from "../avatar.types";
import type { ForwardedRef } from "react";

export const AvatarFallback = forwardRef((props: AvatarFallbackProps, forwardedRef: ForwardedRef<HTMLSpanElement>) => {
  const { asChild, ...avatarFallbackProps } = props;
  const Comp = asChild ? Slot : "span";

  const avatarContext = useAvatarContext();

  return avatarContext?.avatarMachineState.value !== "loaded" ? (
    <Comp ref={forwardedRef} {...mergeProps(avatarFallbackProps, avatarContext?.api.fallbackProps)} />
  ) : null;
});

AvatarFallback.displayName = "Avatar.Fallback";

export const Fallback = AvatarFallback;
