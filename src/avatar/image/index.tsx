import { forwardRef } from "react";

import { Slot } from "@/slot";
import { mergeProps } from "@/utils/react";

import { useAvatarContext } from "../root";

import type { AvatarImageProps } from "../avatar.types";
import type { ForwardedRef } from "react";

export const AvatarImage = forwardRef((props: AvatarImageProps, forwardedRef: ForwardedRef<HTMLImageElement>) => {
  const { asChild, ...avatarImageProps } = props;
  const Comp = asChild ? Slot : "img";

  const avatarContext = useAvatarContext();

  return <Comp ref={forwardedRef} {...mergeProps(avatarImageProps, avatarContext?.api.imageProps)} />;
});

AvatarImage.displayName = "Avatar.Image";

export const Image = AvatarImage;
