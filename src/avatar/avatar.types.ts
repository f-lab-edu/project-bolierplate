import type { avatarMachine } from "./machine/avatar-machine";
import type { EventFromLogic, SnapshotFrom } from "xstate";

export type AvatarMachine = typeof avatarMachine;
export type AvatarMachineState = SnapshotFrom<AvatarMachine>;
export type AvatarMachineSend = (event: EventFromLogic<AvatarMachine>) => void;
