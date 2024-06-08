import type { AvatarMachineSend, AvatarMachineState } from "../avatar.types";

export const avatarConnector = (_state: AvatarMachineState, _send: AvatarMachineSend) => {
  _state;
  _send;

  return {
    rootProps: {},

    imageProps: {},

    fallbackProps: {},
  } as const;
};

export const connector = avatarConnector;
