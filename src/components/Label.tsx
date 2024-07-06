import React, { ReactNode } from 'react';

const Label = ({
  htmlFor,
  children,
  className,
  onDragOver,
  onDrop,
}: {
  htmlFor?: string;
  children: ReactNode;
  className?: string;
  onDragOver?: (e: React.DragEvent<HTMLLabelElement>) => void;
  onDrop?: (e: React.DragEvent<HTMLLabelElement>) => void;
}) => {
  return (
    <label
      onDragOver={onDragOver}
      onDrop={onDrop}
      htmlFor={htmlFor}
      className={`${className} font-[400] text-sm text-text-primary`}
    >
      {children}
    </label>
  );
};

export default Label;
