import React, {
  ChangeEvent,
  forwardRef,
  MutableRefObject,
  useState,
  useRef,
  useEffect,
} from "react";
import classnames from "classnames";
import LabelWithOptional from "../../commonComponents/LabelWithOptional";
import { EmailValidation, MobileValidation } from "../../helpers/PatternValidation";

type InputModeType = "text" | "email" | "numeric" | "tel";

interface InputProps {
  className?: string;
  events?: Record<string, unknown>;
  id: string;
  label?: string;
  name: string;
  required?: boolean;
  type?: InputModeType;
  inputHelper?: "Name" | "Email" | "Mobile" | "none";
  value?: string;
  invalid?: boolean;
  defaultValue?: string;
  invalidInputText?: string;
  pattern?: string;
}

interface ValidationInterface {
  validateFunc: (value: string) => boolean;
  invalidInputText: string;
}

interface ChosenTypeInterface {
  label: string;
  type: string;
  inputMode: InputModeType;
  invalidInputText?: string;
  validation?: ValidationInterface;
}

type InputHelpers = {
  [key: string]: ChosenTypeInterface;
};

const InputHelpers: InputHelpers = {
  Name: {
    label: "Name",
    type: "text",
    inputMode: "text",
  },
  Email: {
    label: "Email",
    type: "email",
    inputMode: "email",
    validation: {
      validateFunc: EmailValidation,
      invalidInputText: "Invalid entry. Eamil must be in the format of 'user@example.com'."
    },
  },
  Mobile: {
    label: "Phone Number",
    type: "tel",
    inputMode: "tel",
    validation: {
      validateFunc: MobileValidation,
      invalidInputText: "Invalid entry. Phone number must have 10 digit."
    }
  }
};

const TextField = forwardRef<HTMLInputElement, InputProps>(
  (props: InputProps, forwardRef) => {
    const {
      className,
      events,
      id,
      label,
      defaultValue,
      name,
      required,
      type = "text",
      invalid = false,
      invalidInputText,
      pattern,
      inputHelper,
    } = props;

    const [finalvalue, setFinalValue] = useState('');
    const [isInputEmpty, setIsInputEmpty] = useState(false);
    const [useValidationInvalidInputText, setUseValidationInvalidInputText] = useState(false);
    const inputRef = useRef() as MutableRefObject<HTMLInputElement>;
    React.useImperativeHandle(forwardRef, () => inputRef.current);
    const emptyInputText = "Required Field.";

    const checkIsInputEmpty = (value: string) => {
      return !(
        (value && value.length > 0) ||
        typeof defaultValue !== "undefined"
      );
    };

    useEffect(() => {
      if(invalid){
        setUseValidationInvalidInputText(true);
      }
    }, [invalid]);

    const chosenType: ChosenTypeInterface | null = inputHelper ? InputHelpers[inputHelper] : null;

    const handleInputEvent = (event: ChangeEvent<HTMLInputElement>) => {
      setIsInputEmpty(checkIsInputEmpty(event.target.value));
      event.persist();
      if (events?.onChange) {
        if (events?.onChange instanceof Function) {
          events.onChange(event);
        }
      }
      setFinalValue(event.target.value);
    };

    const getInvalidInputText = () : string | undefined => {
      if(!isInputEmpty && chosenType){
        if(chosenType?.validation?.validateFunc){
          if(chosenType?.validation?.validateFunc(finalvalue)){
            return chosenType?.validation?.invalidInputText;
          }
        }
      }

      if(useValidationInvalidInputText){
        return chosenType?.invalidInputText;
      }
      return undefined;
    };

    const renderedLabel = chosenType?.label || label;
    const renderedInvalidInputText = getInvalidInputText() || invalidInputText;
    const renderType = chosenType?.type || type;

    const errorText = () => {
      if (renderedInvalidInputText && !isInputEmpty && finalvalue) {
        return renderedInvalidInputText;
      }
      if (isInputEmpty && required) {
        return emptyInputText;
      }
    };

    const elementId = id;
    const errorTextId = `${elementId}__errortext`;
    const classes = classnames("input-container", className);

    const renderedInputProps = {
      name,
      id,
      type : renderType,
      "aria-invalid": invalid,
      "aria-required": required,
      ...events,
    };

    return (
      <div className={classes}>
        <LabelWithOptional id={id} label={renderedLabel} required={required} />
        <input
          ref={inputRef}
          value={finalvalue}
          {...renderedInputProps}
          onChange={handleInputEvent}
        />
        {errorText && <p id={errorTextId}>{errorText()}</p>}
      </div>
    );
  }
);

TextField.displayName = "TextField";

export type { InputProps };
export default TextField;
