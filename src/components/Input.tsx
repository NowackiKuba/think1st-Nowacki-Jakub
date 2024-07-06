import React, { ChangeEvent } from 'react';

const Input = ({
  onChange,
  defaultValue,
  type,
  placeholder,
  errorMessage,
  required,
  pattern,
  name,
}: {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  name: string;
  defaultValue?: any;
  type: string;
  placeholder?: string;
  errorMessage?: string;
  required?: boolean;
  pattern?: string;
}) => {
  return (
    <div className='flex group flex-col gap-0.5 w-full'>
      <input
        name={name}
        placeholder={placeholder}
        pattern={pattern}
        onChange={onChange}
        required={required}
        className={`${
          errorMessage
            ? 'border-red-500 bg-red-100'
            : 'border-secondary bg-white'
        } w-full p-2.5  border  rounded-lg  focus:border-fuchsia-600 focus:bg-gray-100  focus:outline-none`}
      />
      {errorMessage && (
        <div className='flex items-center gap-2'>
          <img src='/error.svg' alt='error_icon' height={14} width={14} />
          <p className='flex flex-col text-sm'>{errorMessage}</p>
        </div>
      )}
    </div>
  );
};

export default Input;
