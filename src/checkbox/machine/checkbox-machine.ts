import { and, assign, not, raise, setup } from "xstate";

import type {
  CheckStatus,
  CheckboxMachineContext,
  CheckboxMachineEvent,
  CheckboxMachineInput,
} from "../checkbox.types";

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
    isEnabled: ({ context }) => !context.disabled,
    isClickable: and(["isEnabled", not("isControlled")]),
  },

  actions: {
    setContext: assign(({ event, context }) => {
      return event.type === "SET_CONTEXT" ? { ...context, ...event.context } : context;
    }),
    syncControlledState: raise(({ context }) => getStateTransitionEventType(context.checked)),
  },
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QGMAWZkGsBGB7AHgMQDCAEgKLEDSAQgPIAaAdAMrkAqA+sXQHLvkG7ANoAGALqJQAB1ywAlgBd5uAHZSQ+RAA4ArE20B2XQBoQAT0QBGAEwBfO2bQYcBEhWr1mbLj36CRK0kkEFkFZTUNLQQATismABYrBNEANhtTC0RdbRsmGLSMhyd0LDwiMkpaRiZK6nIAETFgmTklFXUQ6N1DM0sEAGZDVKZU3XTdYpBnMrc66uYAVV55xuaNMPbIruzerIQEwxjR8aLHadLXCo8FpgBJXgaOcgAlAFkHgEEBdZDNiM6oG6e36NkMAxOEwc51UuAgcA0MyuGzaAKiiBifWsVkMiUKk3OSPKTCRkBR4Q66MGNmOMRsViMmX6A10CXy+KmRIITAArqpSRByVtAZpEAMafl6YysQceuyoYTLsT5Kp4YowAAnAC2KoAhuqhWidtTaVLjDKMvECgqHEA */
  id: "checkbox",

  context: ({ input }) => {
    return {
      disabled: input?.disabled ?? false,
      checked: input?.checked,
      hover: false,
      isControlled: input?.checked !== undefined,
    };
  },

  on: {
    SET_CONTEXT: [
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
      on: {
        "CHECKBOX.TOGGLE": {
          guard: "isClickable",
          target: "unchecked",
        },
      },
    },

    unchecked: {
      description: "체크되지 않은 상태",
      on: {
        "CHECKBOX.TOGGLE": {
          guard: "isClickable",
          target: "checked",
        },
      },
    },

    indeterminate: {
      description: "부분적으로 체크된 상태",
      on: {
        "CHECKBOX.TOGGLE": {
          guard: "isClickable",
          target: "checked",
        },
      },
    },
  },
});

export const machine = checkboxMachine;
