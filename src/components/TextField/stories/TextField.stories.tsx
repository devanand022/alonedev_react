import React, { ChangeEvent, ReactElement, useState } from 'react';
import { Meta, StoryObj, StoryFn } from '@storybook/react';
import TextField from '..';

const meta: Meta<typeof TextField> = {
  title: "Components/TextField",
  component: TextField,
}

export default meta;

type Story = StoryObj<typeof TextField>;

const Template: StoryFn<typeof TextField> = (args): ReactElement => {
  const [value, setValue] = useState("");
  const events = {
    onChange: (e: ChangeEvent<HTMLInputElement>) => {
      console.log("On ChangeEvent Fired");
      setValue(e.target.value);
    },
  };
  return <TextField {...args} value={value} events={events} />;
};

export const Default: Story = {
  render: Template,
  args: {
    required: true,
    id: "TextFieldExample",
    invalid: false,
    inputHelper: "Name",
    label: "deva"
  },
  parameters: {
    controls: {
      include: [
        "label",
        "required",
        "invalid",
        "inputHelper"
      ],
    },
  },
};
