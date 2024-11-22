import React, { ReactElement } from "react";
import { Meta, StoryObj, StoryFn } from "@storybook/react";
import Layout from "..";

const meta: Meta<typeof Layout> = {
  title: "Components/Layout",
  component: Layout,
};

export default meta;

type Story = StoryObj<typeof Layout>;

const Templete: StoryFn<typeof Layout> = (args): ReactElement => {
  return (
    <Layout {...args}>
      <h1>Layout</h1>
    </Layout>
  );
};

export const Default: Story = {
  render: Templete,
  args: {
    variant: "small"
  }
};
