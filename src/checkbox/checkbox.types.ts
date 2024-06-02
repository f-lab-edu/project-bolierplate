export type CheckStatus = boolean | "indeterminate";

export interface CheckboxMachineInput {
  checked?: CheckStatus;
}

export interface CheckboxMachineContext extends CheckboxMachineInput {
  isControlled?: boolean;
  hover: boolean;
}

export type CheckboxMachineEvent =
  | { type: "CHECKBOX.SET_CONTEXT"; context: Partial<CheckboxMachineContext> }
  | { type: "CHECKBOX.CHECKED" }
  | { type: "CHECKBOX.UNCHECKED" }
  | { type: "CHECKBOX.INDETERMINATE" };
