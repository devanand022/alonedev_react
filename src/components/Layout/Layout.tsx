import React, { ReactNode } from "react";
import classnames from "classnames";

interface LayoutProps {
  children: ReactNode;
  className?: string;
  variant?: "small" | "medium" | "large";
}

const Layout = (props: LayoutProps) => {
  const { children, className, variant } = props;

  const pattern = "layout";

  const classes = classnames(`${pattern}-${variant}-container`, className);


  return (
    <div className={classes}>
      {children}
    </div>
  );
}

export type { LayoutProps };
export default Layout;
