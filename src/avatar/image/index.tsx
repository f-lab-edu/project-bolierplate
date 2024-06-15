import { forwardRef } from "react";

import { Slot } from "@/slot";
import { mergeProps } from "@/utils/react";

import { useAvatarContext } from "../root";

import { useImageLoadingStatus } from "./use-image-loading-status";

import type { AvatarImageProps } from "../avatar.types";
import type { ForwardedRef } from "react";

export const AvatarImage = forwardRef((props: AvatarImageProps, forwardedRef: ForwardedRef<HTMLImageElement>) => {
  const { asChild, ...avatarImageProps } = props;
  const { src, srcSet, crossOrigin, referrerPolicy } = avatarImageProps;

  const Comp = asChild ? Slot : "img";

  const avatarContext = useAvatarContext();
  const imageLoadingStatus = useImageLoadingStatus({ src, srcSet, crossOrigin, referrerPolicy });

  return imageLoadingStatus === "SUCCESS" ? (
    <Comp ref={forwardedRef} {...mergeProps(avatarImageProps, avatarContext?.api.imageProps)} />
  ) : null;
});

AvatarImage.displayName = "Avatar.Image";

export const Image = AvatarImage;
