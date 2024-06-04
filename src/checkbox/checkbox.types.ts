import type { checkboxMachine } from "./machine/checkbox-machine";
import type { EventFromLogic, SnapshotFrom } from "xstate";

export type CheckboxMachine = typeof checkboxMachine;
export type CheckboxMachineState = SnapshotFrom<CheckboxMachine>;
export type CheckboxMachineSend = (event: EventFromLogic<CheckboxMachine>) => void;

export type CheckStatus = boolean | "indeterminate";

export interface CheckboxMachineInput {
  disabled?: boolean;
  checked?: CheckStatus;
}

export interface CheckboxMachineContext extends CheckboxMachineInput {
  isControlled: boolean;
  hover: boolean;
  focus: boolean;
  disabled: boolean;
}

export type CheckboxMachineEvent =
  | { type: "SET_CONTEXT"; context: Partial<CheckboxMachineContext> }
  | { type: "CHECKBOX.TOGGLE" }
  | { type: "CHECKBOX.CHECKED" }
  | { type: "CHECKBOX.UNCHECKED" }
  | { type: "CHECKBOX.INDETERMINATE" };
