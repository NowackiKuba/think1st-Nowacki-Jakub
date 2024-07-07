import React, { MouseEvent, useEffect, useState } from 'react';
import {
  format,
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  addDays,
  isSameMonth,
  isSameDay,
} from 'date-fns';
import '../index.css';
import InfoIcon from './InfoIcon';

const Calendar = ({
  selectedDate,
  onChange,
  id,
}: {
  selectedDate?: Date;
  onChange: (d: Date) => void;
  id: 'calendar';
}) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [daysOff, setDaysOff] = useState<any[]>();
  useEffect(() => {
    if (daysOff) return;
    const fetchDays = async () => {
      await fetch(
        'https://api.api-ninjas.com/v1/holidays?country=PL&year=2023',
        {
          method: 'GET',
          headers: {
            'X-Api-Key': process.env.REACT_APP_DAYS_API_KEY!,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => setDaysOff(data));
    };
    fetchDays();
  }, [daysOff]);

  console.log(daysOff);
  const renderHeader = () => {
    const dateFormat = 'MMMM yyyy';

    return (
      <div className='flex items-center justify-between mb-4'>
        <button onClick={(e) => prevMonth(e)} className='p-1 text-xl'>
          &#10094;
        </button>
        <span className='text-xl font-bold'>
          {format(currentMonth, dateFormat)}
        </span>
        <button onClick={(e) => nextMonth(e)} className='p-1 text-xl'>
          &#10095;
        </button>
      </div>
    );
  };

  const renderDays = () => {
    const days = [];
    const dateFormat = 'EE';
    const startDate = startOfWeek(currentMonth, { weekStartsOn: 1 });

    for (let i = 0; i < 7; i++) {
      days.push(
        <div className='flex-1 gap-2 text-center' key={i}>
          {format(addDays(startDate, i), dateFormat)}
        </div>
      );
    }

    return <div className='flex'>{days}</div>;
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart, { weekStartsOn: 1 });
    const endDate = endOfWeek(monthEnd, { weekStartsOn: 1 });

    const rows = [];
    let days = [];
    let day = startDate;
    let formattedDate = '';

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, 'd');
        const cloneDay = day;

        days.push(
          <div
            className={`flex-1 h-8 flex justify-center items-center cursor-pointer ${
              !isSameMonth(day, monthStart)
                ? 'text-gray-300'
                : isSameDay(day, selectedDate!)
                ? 'bg-primary rounded-full text-white'
                : format(day, 'EE') === 'Sun'
                ? 'text-gray-300'
                : daysOff?.find(
                    (d) =>
                      d?.date ===
                        format(
                          new Date(day || new Date()).setFullYear(2023),
                          'yyyy-MM-dd'
                        ) && d?.type === 'NATIONAL_HOLIDAY'
                  )
                ? 'text-gray-300'
                : ''
            }`}
            key={day.toString()}
            onClick={() => onDateClick(cloneDay)}
          >
            <span>{formattedDate}</span>
          </div>
        );
        day = addDays(day, 1);
      }
      rows.push(
        <div className='flex' key={day.toString()}>
          {days}
        </div>
      );
      days = [];
    }

    return <div>{rows}</div>;
  };

  const onDateClick = async (day: Date) => {
    if (
      format(day, 'EE') === 'Sun' ||
      daysOff?.find(
        (d) =>
          d?.date ===
            format(
              format(
                new Date(day || new Date()).setFullYear(2023),
                'yyyy-MM-dd'
              ),
              'yyyy-MM-dd'
            ) && d?.type === 'NATIONAL_HOLIDAY'
      )
    ) {
      return;
    }
    onChange(day);
  };

  const nextMonth = (e: MouseEvent) => {
    e.preventDefault();
    setCurrentMonth(addMonths(currentMonth, 1));
  };

  const prevMonth = (e: MouseEvent) => {
    e.preventDefault();
    setCurrentMonth(subMonths(currentMonth, 1));
  };

  return (
    <div className='flex items-start w-full gap-2' id={id}>
      <div className='flex flex-col w-full gap-1'>
        <div className='p-2 bg-white border rounded-lg shadow-md w-full sm:w-[330px]'>
          {renderHeader()}
          {renderDays()}
          {renderCells()}
        </div>
        {daysOff?.find(
          (d) =>
            d?.date ===
              format(
                format(
                  new Date(selectedDate! || new Date()).setFullYear(2023),
                  'yyyy-MM-dd'
                ),
                'yyyy-MM-dd'
              ) && d.type === 'OBSERVANCE'
        ) && (
          <div className='flex items-center gap-1'>
            <InfoIcon />
            <p className='text-sm'>
              It is{' '}
              {
                daysOff?.find(
                  (d) =>
                    d?.date ===
                      format(
                        format(
                          new Date(selectedDate!).setFullYear(2023),
                          'yyyy-MM-dd'
                        ),
                        'yyyy-MM-dd'
                      ) && d.type === 'OBSERVANCE'
                ).name
              }
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Calendar;
