import React, { ChangeEvent } from 'react';
import Label from './Label';
import DeleteIcon from './DeleteIcon';

const ImageUpload = ({
  onChange,
  className,
  id,
  value,
  handleDelete,
  name,
  errorMessage,
}: {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  id?: string;
  value: File | null;
  handleDelete: () => void;
  name: string;
  errorMessage?: string;
}) => {
  const handleDrop = (event: any) => {
    event.preventDefault();
    const droppedFiles = event.dataTransfer.files;
    if (droppedFiles.length > 0) {
      const newFiles = Array.from(droppedFiles);
      onChange({
        target: {
          name,
          files: newFiles,
        },
      } as unknown as ChangeEvent<HTMLInputElement>);
    }
  };
  return (
    <div className='flex flex-col w-full gap-1'>
      <Label
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        htmlFor={value ? '' : 'photo'}
        className={`flex items-center justify-center h-24 ${
          errorMessage
            ? 'bg-red-100 border-red-500'
            : 'bg-white border-secondary'
        } border rounded-lg`}
      >
        {value === null ? (
          <p className='text-gray-400'>
            <span className='text-purple-500 underline cursor-pointer'>
              Upload a file
            </span>{' '}
            or drag and drop here
          </p>
        ) : (
          <div className='flex items-center justify-center w-full gap-2'>
            <p className='font-[500] text-[16px]'>{value?.name}</p>
            <div onClick={handleDelete}>
              <DeleteIcon className='duration-100 ease-linear hover:text-red-500' />
            </div>
          </div>
        )}
      </Label>
      <input
        id={id}
        type='file'
        name='photo'
        className={`hidden ${className}`}
        onChange={onChange}
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

export default ImageUpload;
