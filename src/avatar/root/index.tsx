import { forwardRef } from "react";

import { Slot } from "@/slot";
import { createContext, mergeProps, useMachine } from "@/utils/react";

import { avatarConnector } from "../machine/avatar-connector";
import { avatarMachine } from "../machine/avatar-machine";

import type { AvatarContext, AvatarProps } from "../avatar.types";
import type { ForwardedRef } from "react";

const [AvatarProvider, useContext] = createContext<AvatarContext>({
  contextName: "AvatarContext",
  consumerHookName: "useAvatarContext",
});

export const useAvatarContext = useContext;

export const Avatar = forwardRef((props: AvatarProps, forwardedRef: ForwardedRef<HTMLSpanElement>) => {
  const { asChild, ...avatarProps } = props;
  const Comp = asChild ? Slot : "span";

  const [state, send] = useMachine(avatarMachine);
  const api = avatarConnector(state, send);

  return (
    <AvatarProvider value={{ avatarMachineState: state, send, api }}>
      <Comp ref={forwardedRef} {...mergeProps(avatarProps, api.rootProps)} />
    </AvatarProvider>
  );
});

Avatar.displayName = "Avatar.Root";

export const Root = Avatar;
