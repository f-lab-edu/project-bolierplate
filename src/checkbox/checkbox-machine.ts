import { setup, assign } from "xstate";

import type { CheckboxMachineInput, CheckboxMachineContext } from "./checkbox.types";

export const checkboxMachine = setup({
  types: {
    context: {} as CheckboxMachineContext,
    input: {} as CheckboxMachineInput,
  },

  actions: { initContext: assign(({ context }) => ({ ...context, isControlled: context.checked !== undefined })) },
}).createMachine({
  /** @xstate-layout N4IgpgJg5mDOIC5QGMAWZkGsBGB7AHgMQDCAEgKLEDSAQgPIAaAdAMrkAqA+sXQHLvkG7ANoAGALqJQAB1ywAlgBd5uAHZSQ+RAA4ArE20B2XQBoQAT0QBGAEwBfO2bQYcBEhWr1mbLj36CRK0kkEFkFZTUNLQQATismABYrBNEANhtTC0RdbRsmGLSbVN0Mo204hyd0LDwiMkpaRiZ66nIAETFgmTklFXUQ6N1DM0sEAGZDVKZi9OLSw3K0ypBnGrcWxuYAVV4N9s6NMN7IgezhrIQEwxjp3VmSnIWC1OXV1zqPTaYASV42jnIACUALK-ACCAgOISOEX6oEG51GNkMY1u6SG6RiYxiCV0YwcjhAqlwEDgGjetUOPVhUUQMRG1ishkShV0r2q7yYb0gVPCfVp4xsNxiNisRkyozGugS+UKc0eixehIpBCYAFdVNyILzjnDNIgxkL8qLxQzLkNZfd5or2S5akx5KpSYowAAnAC2joAhi6dTTToLhSbjGaMvFnhkCXYgA */
  id: "checkbox",

  context: ({ input }) => {
    return {
      checked: input?.checked,
      hover: false,
    };
  },

  entry: ["initContext"],

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
