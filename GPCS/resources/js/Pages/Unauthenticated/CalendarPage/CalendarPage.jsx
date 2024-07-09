import './CalendarPage.less';

import { useForm } from '@inertiajs/inertia-react';
import { t } from 'i18next';
import { useCallback, useMemo } from 'react';

import SimpleButton from '@/Components/Buttons/SimpleButton';
import SimpleField from '@/Components/SimpleField';
import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';

const CalendarPage = ({ user }) => {
  const today = new Date();

  const { data, setData } = useForm({
    year: today.getFullYear(),
    month: today.getMonth() + 1,
    day: 1,
  });

  const cellHours = Array.from({ length: 24 }, (_, i) => `${i}:00`);

  const cellDays = useMemo(() => {
    const year = data.year;
    const month = data.month - 1;
    const day = data.day;

    const firstDayOfWeek = new Date(year, month, day);
    firstDayOfWeek.setDate(firstDayOfWeek.getDate() - firstDayOfWeek.getDay());

    const days = [];
    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(firstDayOfWeek);
      currentDate.setDate(currentDate.getDate() + i);
      const dayName = `${t(`date.day.${i}`)} ${currentDate.getDate()}`;
      days.push(dayName);
    }

    return days;
  }, [data, t]);

  const previousWeek = useCallback(() => {
    const newDate = new Date(data.year, data.month - 1, data.day);
    newDate.setDate(newDate.getDate() - 7);

    setData({
      year: newDate.getFullYear(),
      month: newDate.getMonth() + 1,
      day: newDate.getDate(),
    });
  }, [data, setData]);

  const nextWeek = useCallback(() => {
    const newDate = new Date(data.year, data.month - 1, data.day);
    newDate.setDate(newDate.getDate() + 7);

    setData({
      year: newDate.getFullYear(),
      month: newDate.getMonth() + 1,
      day: newDate.getDate(),
    });
  }, [data, setData]);

  const displayEvent = (start, end) => {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const dayOfWeek = startDate.getDay();
    const startHour = startDate.getHours();
    const endHour = endDate.getHours();

    return {
      gridColumnStart: dayOfWeek + 2,
      gridRowStart: startHour + 2,
      gridRowEnd: endHour + 2,
    };
  };

  return (
    <AuthenticatedLayout
      headTitle='Calendar'
      className='calendar'
      header={
        <h2 className='font-semibold text-xl text-gray-800 leading-tight'>
          Calendrier
        </h2>
      }
    >
      <div className='flex gap-2'>
        <div>
          Legend
          <div className='flex gap-1'>
            <p>a</p>
            <p>b</p>
          </div>
        </div>
        <SimpleButton onClick={previousWeek}>{'<'}</SimpleButton>
        <SimpleField
          id='year'
          type='number'
          setdata={setData}
          value={data.year}
          label={t('date.year')}
          min={0}
          max={9999}
        />
        <SimpleField
          id='month'
          type='number'
          setdata={setData}
          value={data.month}
          label={t('date.month.label')}
          min={1}
          max={12}
        />
        <SimpleButton onClick={nextWeek}>{'>'}</SimpleButton>
      </div>
      <div className='p-4 sm:p-8 bg-white shadow sm:rounded-lg'>
        <div className='wrapper'>
          <div />
          {cellDays.map((day, index) => (
            <div key={index}>{day}</div>
          ))}
          {cellHours.map((hour, index) => (
            <div key={index} className='hour-cell'>
              {hour}
            </div>
          ))}
          {user?.reservations?.map((event, index) => (
            <div
              key={index}
              className='event'
              style={displayEvent(event.dateStart, event.dateEnd)}
            >
              {event?.title}
            </div>
          ))}
        </div>
      </div>
    </AuthenticatedLayout>
  );
};

export default CalendarPage;
