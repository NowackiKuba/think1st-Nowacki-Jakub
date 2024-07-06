import React, { Dispatch, SetStateAction } from 'react';

const TimePicker = ({
  selectedTime,
  setSelectedTime,
  value,
}: {
  selectedTime?: string;
  setSelectedTime: (time: string) => void;
  value: string;
}) => {
  return (
    <div
      className={`${
        selectedTime === value ? 'border-primary' : 'border-secondary'
      } w-full px-4 py-2 bg-white border-[2px] cursor-pointer rounded-md `}
      onClick={() => {
        setSelectedTime(value);
      }}
    >
      {value}
    </div>
  );
};

export default TimePicker;
