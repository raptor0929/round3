import React from 'react';

interface DateDisplayProps {
  date: string;
}

const DateDisplay: React.FC<DateDisplayProps> = ({ date }) => {
  const formattedDate = new Date(date).toLocaleDateString('es-AR', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  const formattedTime = new Date(date).toLocaleTimeString('es-AR', {
    hour: '2-digit',
    minute: '2-digit',
  });

  return (
    <div className="p-4 bg-white shadow-md rounded-lg">
      <p className="text-xl font-semibold text-gray-800">{formattedDate}</p>
      <p className="text-lg text-gray-600">
        {formattedTime} (Argentina Standard Time)
      </p>
    </div>
  );
};

export default DateDisplay;
