import type { checkboxMachineConnector } from "./machine/checkbox-connector";
import type { checkboxMachine } from "./machine/checkbox-machine";
import type { FocusEventHandler, KeyboardEventHandler, MouseEventHandler, PointerEventHandler } from "react";
import type { EventFromLogic, SnapshotFrom } from "xstate";

export type CheckboxMachine = typeof checkboxMachine;
export type CheckboxMachineState = SnapshotFrom<CheckboxMachine>;
export type CheckboxMachineSend = (event: EventFromLogic<CheckboxMachine>) => void;

export type CheckboxConnectorApi = ReturnType<typeof checkboxMachineConnector>;

export type CheckStatus = boolean | "indeterminate";

export interface CheckboxMachineInput {
  disabled?: boolean;
  checked?: CheckStatus;
  onPointerMove?: PointerEventHandler<HTMLButtonElement>;
  onPointerLeave?: PointerEventHandler<HTMLButtonElement>;
  onKeyDown?: KeyboardEventHandler<HTMLButtonElement>;
  onFocus?: FocusEventHandler<HTMLButtonElement>;
  onBlur?: FocusEventHandler<HTMLButtonElement>;
  onClick?: MouseEventHandler<HTMLButtonElement>;
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
