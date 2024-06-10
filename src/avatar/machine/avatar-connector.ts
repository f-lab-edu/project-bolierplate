import type { AvatarMachineSend, AvatarMachineState } from "../avatar.types";

export const avatarConnector = (_state: AvatarMachineState, send: AvatarMachineSend) => {
  return {
    rootProps: {},

    imageProps: {
      onLoad: () => {
        send({ type: "AVATAR.LOADED" });
      },
      onError: () => {
        send({ type: "AVATAR.ERROR" });
      },
    },

    fallbackProps: {},
  } as const;
};

export const connector = avatarConnector;
