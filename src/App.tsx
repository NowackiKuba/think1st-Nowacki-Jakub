import { ChangeEvent, useState } from 'react';
import './App.css';
import Input from './components/Input';
import Label from './components/Label';
import Button from './components/Button';

import 'react-datepicker/dist/react-datepicker.css';
import Slider from './components/Slider';
import ImageUpload from './components/ImageUpload';
import Calendar from './components/DatePicker';
import TimePicker from './components/TimePicker';

interface FormValues {
  firstName: string;
  lastName: string;
  email: string;
  age: number;
  photo: File | null;
  date: Date | undefined;
  time: string;
}

interface Errors {
  firstName: string;
  lastName: string;
  email: string;
  age: string;
  photo: string;
  date: string;
  time: string;
}

function App() {
  const [formData, setFormData] = useState<FormValues>({
    firstName: '',
    lastName: '',
    email: '',
    age: 0,
    photo: null,
    date: undefined,
    time: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>, type?: string) => {
    let name: string;
    let value: string | File | number;
    if (type === 'photo') {
      name = 'photo';
      value = e.target.files![0];
    } else {
      name = e.target.name;
      value = e.target.value;
    }
    setFormData({ ...formData, [name]: value });

    setErrors({ ...errors, [name]: '' });
  };

  const [errors, setErrors] = useState<Errors>({
    firstName: '',
    lastName: '',
    email: '',
    age: '',
    date: '',
    time: '',
    photo: '',
  });

  const handleSubmit = async (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validate()) {
      await fetch('http://letsworkout.pl/submit', {
        method: 'POST',
        body: JSON.stringify(formData),
      });
    }
  };

  const validate = (): boolean => {
    const newErrors = {
      firstName: '',
      lastName: '',
      email: '',
      age: '',
      date: '',
      time: '',
      photo: '',
    };
    let isValid = true;

    if (!formData.firstName) {
      newErrors.firstName = 'First Name is required';
      isValid = false;
    }
    if (!formData.firstName) {
      newErrors.lastName = 'Last Name is required';
      isValid = false;
    }
    if (!formData.email) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Please use correct formatting.';
      isValid = false;
    }

    if (!formData.age) {
      newErrors.age = 'Age is required';
      isValid = false;
    }
    if (!formData.photo) {
      newErrors.photo = 'Photo is required';
      isValid = false;
    }
    if (!formData.date) {
      newErrors.photo = 'Date is required';
      isValid = false;
    }
    if (!formData.time) {
      newErrors.photo = 'Date is required';
      isValid = false;
    }

    setErrors(newErrors);

    return isValid;
  };

  return (
    <div className='flex flex-col items-center justify-start w-full py-8 bg-background text-text-primary'>
      <form
        onSubmit={handleSubmit}
        className='w-full px-4 sm:px-0 sm:w-[426px] flex flex-col items-start justify-start gap-5'
      >
        <p className='text-2xl font-[500]'>Personal Info</p>
        <div className='flex flex-col w-full gap-1'>
          <Label htmlFor='firstname'>First Name</Label>
          <Input
            name='firstName'
            onChange={handleChange}
            errorMessage={errors.firstName}
            type='text'
          />
        </div>
        <div className='flex flex-col w-full gap-1'>
          <Label htmlFor='lastName'>Last Name</Label>
          <Input
            name='lastName'
            onChange={handleChange}
            errorMessage={errors.lastName}
            type='text'
          />
        </div>
        <div className='flex flex-col w-full gap-1'>
          <Label htmlFor='email'>Email Address</Label>
          <Input
            name='email'
            onChange={handleChange}
            errorMessage={errors.email}
            type='email'
          />
        </div>
        <div className='flex flex-col w-full gap-1'>
          <Label>Age</Label>
          <Slider min={8} max={100} />
        </div>
        <div className='flex flex-col w-full gap-1'>
          <Label htmlFor='photo'>Photo </Label>
          <ImageUpload
            name='photo'
            id='photo'
            value={formData.photo}
            errorMessage={errors.photo}
            handleDelete={() => setFormData({ ...formData, photo: null })}
            onChange={(e) => handleChange(e, 'photo')}
          />
        </div>
        <div className='flex flex-col items-start w-full sm:flex-row'>
          <div className='flex flex-col w-full gap-1'>
            <Label>Date</Label>
            <Calendar
              id='calendar'
              selectedDate={formData.date}
              onChange={(d: Date) => setFormData({ ...formData, date: d })}
            />
          </div>
          {formData.date && (
            <div className='flex flex-col gap-0.5 sm:mt-0 mt-6'>
              <Label htmlFor='time'>Time</Label>
              <div className='flex flex-row flex-1 gap-2 sm:flex-col'>
                <TimePicker
                  selectedTime={formData.time}
                  setSelectedTime={(time: string) =>
                    setFormData({ ...formData, time })
                  }
                  value='10:00'
                />
                <TimePicker
                  selectedTime={formData.time}
                  setSelectedTime={(time: string) =>
                    setFormData({ ...formData, time })
                  }
                  value='13:40'
                />
                <TimePicker
                  selectedTime={formData.time}
                  setSelectedTime={(time: string) =>
                    setFormData({ ...formData, time })
                  }
                  value='15:10'
                />
                <TimePicker
                  selectedTime={formData.time}
                  setSelectedTime={(time: string) =>
                    setFormData({ ...formData, time })
                  }
                  value='16:22'
                />
              </div>
            </div>
          )}
        </div>
        <Button
          disabled={
            !formData.firstName ||
            !formData.lastName ||
            !formData.email ||
            !formData.photo ||
            !formData.time ||
            !formData.date
          }
          onClick={async (e) => await handleSubmit(e)}
        >
          Send Application
        </Button>
      </form>
    </div>
  );
}

export default App;
