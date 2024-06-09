import { setup } from "xstate";

export const avatarMachine = setup({}).createMachine({
  id: "avatar",

  initial: "loading",

  states: {
    loading: {
      description: "초기상태 / 이미지 로드 중인 상태",
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
