import { setup, assign } from "xstate";

import type { CheckboxMachineInput, CheckboxMachineContext, CheckboxMachineEvent } from "./checkbox.types";

export const checkboxMachine = setup({
  types: {
    context: {} as CheckboxMachineContext,
    input: {} as CheckboxMachineInput,
    events: {} as CheckboxMachineEvent,
  },

  actions: {
    initContext: assign(({ context }) => ({ ...context, isControlled: context.checked !== undefined })),
    setContext: assign(({ event, context }) => {
      return event.type === "CHECKBOX.SET_CONTEXT" ? { ...context, ...event.context } : context;
    }),
  },
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QGMAWZkGsBGB7AHgMQDCAEgKLEDSAQgPIAaAdAMrkAqA+sXQHLvkG7ANoAGALqJQAB1ywAlgBd5uAHZSQ+RAEYATABoQATx26AvhcOrcEOBrQYcBDbIXK1GrQgCcTPQA5vUQA2XQBWQxMfMKYAFjCAZj0wyxAHLDx8JnTMSBc5JRV1JE1Ef20mUQSw7TDQiONEBITdJm9E5NSczKYAV1UcvJLXQo8Sr2D-JgSAdgao2Oq2jvCu9AyCJnlVW0UwACcAW22AQz38tyLPRDCZv11AkPDIxF1dX3ak1YszIA */
  id: "checkbox",

  context: ({ input }) => {
    return {
      checked: input?.checked,
      hover: false,
    };
  },

  entry: ["initContext"],

  on: {
    "CHECKBOX.SET_CONTEXT": {
      actions: ["setContext"],
    },
  },

  initial: "unchecked",

  states: {
    checked: {
      description: "체크된 상태",
    },

    unchecked: {
      description: "체크되지 않은 상태",
    },

    indeterminate: {
      description: "부분적으로 체크된 상태",
    },
  },
});

export const machine = checkboxMachine;
