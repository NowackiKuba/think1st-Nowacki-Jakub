import React, { useEffect, useState } from 'react';
const Slider = ({ min, max }: { min: number; max: number }) => {
  const [value, onChange] = useState(1);
  useEffect(() => {
    const range = document.querySelector('input[type="range"]');
    const bubble = document.querySelector('output');
    if (range && bubble) {
      const setBubble = (range: any, bubble: any) => {
        const val = range.value;
        const min = range.min ? range.min : 0;
        const max = range.max ? range.max : 100;
        const newVal = Number(((val - min) * 100) / (max - min));
        bubble.textContent = val;
        bubble.style.left = `calc(${newVal}% + (${8 - newVal * 0.35}px))`;
      };
      range.addEventListener('input', () => {
        setBubble(range, bubble);
      });
      setBubble(range, bubble);
    }
  }, []);
  return (
    <div className='relative flex flex-col w-full gap-1'>
      <div className='flex items-center justify-between w-full'>
        <p className='text-xs text-text-primary'>{min}</p>
        <p className='text-xs text-text-primary'>{max}</p>
      </div>
      <input
        name='range'
        id='range'
        type='range'
        className='w-full'
        min={min}
        max={max}
        value={value}
        onChange={({ target: { value: radius } }) => {
          onChange(+radius);
        }}
      />
      <div className='flex mt-2 -ml-3'>
        <output
          htmlFor='range'
          className='relative arrow_box -translate-x-2.5 text-sm font-[500] px-4 py-1 text-center bg-white border text-primary rounded-md border-secondary'
        ></output>
      </div>
    </div>
  );
};

export default Slider;
