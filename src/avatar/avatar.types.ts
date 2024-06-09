import type { avatarConnector } from "./machine/avatar-connector";
import type { avatarMachine } from "./machine/avatar-machine";
import type { EventFromLogic, SnapshotFrom } from "xstate";

export type AvatarMachine = typeof avatarMachine;
export type AvatarMachineState = SnapshotFrom<AvatarMachine>;
export type AvatarMachineSend = (event: EventFromLogic<AvatarMachine>) => void;

export type AvatarConnectorApi = ReturnType<typeof avatarConnector>;

export type AvatarContext = {
  avatarMachineState: AvatarMachineState;
  send: AvatarMachineSend;
  api: AvatarConnectorApi;
};

export interface AvatarProps extends ComponentPropsWithoutRefWithAsChild<"span"> {}

export interface AvatarImageProps extends ComponentPropsWithoutRefWithAsChild<"img"> {}
