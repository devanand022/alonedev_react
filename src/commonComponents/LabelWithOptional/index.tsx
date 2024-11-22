import React, { ReactElement } from 'react';

type LabelWithOptionalType = {
  label?: string;
  required?: boolean;
  wrapWithLabelElement ?: boolean;
  id?: string;
}

const LabelWithOptional = ({
  label,
  id,
  required,
  wrapWithLabelElement = true
}: LabelWithOptionalType): ReactElement => {
  const LabelText = () => (
    <>
      {label} {required ? <span style={{color: "red"}}>*</span> : ""}
    </>
  );
  if(wrapWithLabelElement){
    return (
      <label htmlFor={id}>
        <LabelText />
      </label>
    );
  }
  return <LabelText />;
};

export default LabelWithOptional;
