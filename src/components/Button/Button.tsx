import classnames from 'classnames';

interface ButtonProps {
  type: "submit" | "button" | "reset";
  label: string;
}

const pattern = "button";

const classes = classnames(`${pattern}-container`)

const Button = (props: ButtonProps) => {
  const { type, label } = props;
  return (
    <button type={type} className={classes}>
      {label}
    </button>
  );
};

export type { ButtonProps };
export default Button;
