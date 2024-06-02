import { setup, assign, raise } from "xstate";

import type { CheckStatus, CheckboxMachineInput, CheckboxMachineContext, CheckboxMachineEvent } from "./checkbox.types";

const getStateTransitionEventType = (checked?: CheckStatus): CheckboxMachineEvent => {
  switch (checked) {
    case "indeterminate": {
      return { type: "CHECKBOX.INDETERMINATE" };
    }
    case true: {
      return { type: "CHECKBOX.CHECKED" };
    }
    case false:
    default: {
      return { type: "CHECKBOX.UNCHECKED" };
    }
  }
};

export const checkboxMachine = setup({
  types: {
    context: {} as CheckboxMachineContext,
    input: {} as CheckboxMachineInput,
    events: {} as CheckboxMachineEvent,
  },

  guards: {
    isControlled: ({ context }) => !!context.isControlled,
  },

  actions: {
    initContext: assign(({ context }) => ({ ...context, isControlled: context.checked !== undefined })),
    setContext: assign(({ event, context }) => {
      return event.type === "CHECKBOX.SET_CONTEXT" ? { ...context, ...event.context } : context;
    }),
    syncControlledState: raise(({ context }) => getStateTransitionEventType(context.checked)),
  },
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QGMAWZkGsBGB7AHgMQDCAEgKLEDSAQgPIAaAdAMrkAqA+sXQHLvkG7ANoAGALqJQAB1ywAlgBd5uAHZSQ+RAA4ArE20B2XQBoQAT0QBGAEwBfO2bQYcBEhWr1mbLj36CRK0kkEFkFZTUNLQQATismABYrBNEANhtTC0RdbRsmGLSMhyd0LDwiMkpaRiZK6nIAETFgmTklFXUQ6N1DM0sEAGZDVKZU3XTdYpBnMrc66uYAVV55xuaNMPbIruzerIQEwxjR8aLHadLXCo8FpgBJXgaOcgAlAFkHgEEBdZDNiM6oG6e36NkMAxOEwc51UuAgcA0MyuGzaAKiiBifWsVkMiUKk3OSPKTCRkBR4Q66MGNmOMRsViMmX6A10CXy+KmRIITAArqpSRByVtAZpEAMafl6YysQceuyoYTLsT5Kp4YowAAnAC2KoAhuqhWidtTaVLjDKMvECgqHEA */
  id: "checkbox",

  context: ({ input }) => {
    return {
      checked: input?.checked,
      hover: false,
    };
  },

  entry: ["initContext"],

  on: {
    "CHECKBOX.SET_CONTEXT": [
      { guard: "isControlled", actions: ["setContext", "syncControlledState"] },
      { actions: ["setContext"] },
    ],
    "CHECKBOX.CHECKED": ".checked",
    "CHECKBOX.UNCHECKED": ".unchecked",
    "CHECKBOX.INDETERMINATE": ".indeterminate",
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
