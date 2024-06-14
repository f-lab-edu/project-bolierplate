import { useLayoutEffect, useState } from "react";

import type { ImageLoadingStatus, UseImageLoadingStatusArgs } from "../avatar.types";

export const useImageLoadingStatus = ({ src, srcSet, crossOrigin, referrerPolicy }: UseImageLoadingStatusArgs) => {
  const [loadingStatus, setLoadingStatus] = useState<ImageLoadingStatus>("IDLE");

  useLayoutEffect(() => {
    if (!src && !srcSet) {
      setLoadingStatus("ERROR");
      return;
    }

    const updateLoadingStatus = (status: ImageLoadingStatus) => {
      if (ignore) return;
      setLoadingStatus(status);
    };

    let ignore = false;

    const image = new window.Image();

    updateLoadingStatus("LOADING");

    image.onload = () => updateLoadingStatus("SUCCESS");
    image.onerror = () => updateLoadingStatus("ERROR");
    image.crossOrigin = crossOrigin ?? null;
    image.referrerPolicy = referrerPolicy ?? "strict-origin-when-cross-origin";
    src && (image.src = src);
    srcSet && (image.srcset = srcSet);

    return () => {
      ignore = true;
    };
  }, [src, srcSet, crossOrigin, referrerPolicy]);

  return loadingStatus;
};
