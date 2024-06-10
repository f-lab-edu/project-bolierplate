import { setup } from "xstate";

import type { AvatarMachineContext, AvatarMachineEvent, AvatarMachineInput } from "../avatar.types";

export const avatarMachine = setup({
  types: {
    input: {} as AvatarMachineInput,
    context: {} as AvatarMachineContext,
    events: {} as AvatarMachineEvent,
  },
}).createMachine({
  id: "avatar",

  initial: "loading",

  states: {
    loading: {
      description: "초기상태 / 이미지 로드 중인 상태",
      on: {
        "AVATAR.LOADED": {
          target: "loaded",
        },
        "AVATAR.ERROR": {
          target: "error",
        },
      },
    },
    loaded: {
      description: "이미지 로드 완료 상태",
    },
    error: {
      description: "이미지 로드 오류 상태",
    },
  },
});

export const machine = avatarMachine;
