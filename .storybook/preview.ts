import { withConsole } from "@storybook/addon-console";

import type { Preview } from "@storybook/react";

const preview: Preview = {
  decorators: [(storyFn, context) => withConsole()(storyFn)(context)],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    docs: {
      canvas: {
        sourceState: "shown",
      },
      source: {
        format: true,
      },
    },
  },
};

export default preview;
