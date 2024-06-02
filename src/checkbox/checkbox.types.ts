export type CheckStatus = boolean | "indeterminate";

export interface CheckboxMachineInput {
  checked?: CheckStatus;
}

export interface CheckboxMachineContext extends CheckboxMachineInput {
  isControlled?: boolean;
  hover: boolean;
}
