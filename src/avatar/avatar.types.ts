import type { getAvatarExtraProps } from "./get-avatar-extra-props";
import type { Dispatch, ReactNode } from "react";

export type AvatarExtraProps = ReturnType<typeof getAvatarExtraProps>;

export type AvatarContext = {
  imageLoadingStatus: ImageLoadingStatus;
  onImageLoadingStatusChange: Dispatch<ImageLoadingStatus>;
  extraProps: AvatarExtraProps;
};

export interface AvatarProps extends ComponentPropsWithoutRefWithAsChild<"span"> {}

export interface AvatarImageProps extends ComponentPropsWithoutRefWithAsChild<"img"> {
  onImageLoadingStatusChange?: (status: ImageLoadingStatus) => void;
}

export interface UseImageLoadingStatusArgs {
  src?: HTMLImageElement["src"];
  srcSet?: HTMLImageElement["srcset"];
  crossOrigin?: HTMLImageElement["crossOrigin"];
  referrerPolicy?: HTMLImageElement["referrerPolicy"];
}

export type ImageLoadingStatus = "IDLE" | "LOADING" | "SUCCESS" | "ERROR";

export interface AvatarFallbackProps
  extends ComponentPropsWithoutRefWithAsChild<
    "span",
    { children?: ReactNode | ((status?: ImageLoadingStatus) => ReactNode) }
  > {}
