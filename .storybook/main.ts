import type { StorybookConfig } from "@storybook/react-webpack5";
const path = require("path");

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-webpack5-compiler-swc",
    "@storybook/addon-essentials",
    "@chromatic-com/storybook",
    "@storybook/addon-interactions",
  ],
  typescript: {
    check: false,
    checkOptions: {},
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      shouldRemoveUndefinedFromOptional: true,
      propFilter: (prop) => prop.parent ? !/node_modules/.test(prop.parent.fileName) : true,
    },
  },
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  webpackFinal: async( config ) => {
    config.module?.rules?.push(
      {
        //Module CSS
        test: /\.module\.(css|scss)$/,
        exclude: [path.resolve(__dirname, "node_modules")],
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          { loader: "sass-loader" },
        ],
      },
      {
        // Global CSS
        test: /\.css|\.scss$/,
        exclude: [path.resolve(__dirname, "node_modules")],
        use: [
          { loader: "style-loader" },
          { loader: "css-loader" },
          { loader: "sass-loader" },
        ],
      }
    );
    return config;
  },
};
export default config;
