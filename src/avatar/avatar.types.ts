import type { avatarConnector } from "./machine/avatar-connector";
import type { avatarMachine } from "./machine/avatar-machine";
import type { EventFromLogic, SnapshotFrom } from "xstate";

export type AvatarMachine = typeof avatarMachine;
export type AvatarMachineState = SnapshotFrom<AvatarMachine>;
export type AvatarMachineSend = (event: EventFromLogic<AvatarMachine>) => void;

export type AvatarConnectorApi = ReturnType<typeof avatarConnector>;

export interface AvatarMachineInput {}

export interface AvatarMachineContext extends AvatarMachineInput {}

export type AvatarMachineEvent = { type: "AVATAR.LOADED" } | { type: "AVATAR.ERROR" };

export type AvatarContext = {
  avatarMachineState: AvatarMachineState;
  send: AvatarMachineSend;
  api: AvatarConnectorApi;
};

export interface AvatarProps extends ComponentPropsWithoutRefWithAsChild<"span">, AvatarMachineInput {}

export interface AvatarImageProps extends ComponentPropsWithoutRefWithAsChild<"img"> {}
