import { forwardRef, useState } from "react";

import { Slot } from "@/slot";
import { createContext } from "@/utils/react";

import type { AvatarContext, AvatarProps, ImageLoadingStatus } from "../avatar.types";
import type { ForwardedRef } from "react";

const [AvatarProvider, useContext] = createContext<AvatarContext>({
  contextName: "AvatarContext",
  consumerHookName: "useAvatarContext",
});

export const useAvatarContext = useContext;

export const Avatar = forwardRef((props: AvatarProps, forwardedRef: ForwardedRef<HTMLSpanElement>) => {
  const { asChild, ...avatarProps } = props;

  const Comp = asChild ? Slot : "span";

  const [imageLoadingStatus, setLoadingStatus] = useState<ImageLoadingStatus>("IDLE");

  return (
    <AvatarProvider value={{ imageLoadingStatus, onImageLoadingStatusChange: setLoadingStatus }}>
      <Comp ref={forwardedRef} {...avatarProps} />
    </AvatarProvider>
  );
});

Avatar.displayName = "Avatar.Root";

export const Root = Avatar;
