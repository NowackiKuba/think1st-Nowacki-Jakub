import React, { ChangeEvent, ReactNode } from 'react';

const Button = ({
  className,
  onClick,
  children,
  disabled,
  type,
}: {
  className?: string;
  onClick: (e: ChangeEvent<HTMLFormElement>) => void | Promise<void>;
  children: ReactNode;
  disabled?: boolean;
  type?: 'submit' | 'reset' | 'button';
}) => {
  return (
    <button
      type={type}
      disabled={disabled}
      className={`${className} duration-100 ease-linear hover:bg-[#6A19CD]  disabled:cursor-not-allowed disabled:bg-secondary text-center w-full bg-primary py-2 rounded-md text-white`}
    >
      {children}
    </button>
  );
};

export default Button;
