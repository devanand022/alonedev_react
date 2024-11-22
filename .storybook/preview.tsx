import React from "react";
import type { Preview } from "@storybook/react";

const preview: Preview = {
  decorators: [
    (Story) => (
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "100vh",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "600px",
          }}
        >
          <Story />
        </div>
      </div>
    ),
  ],
};

export default preview;
