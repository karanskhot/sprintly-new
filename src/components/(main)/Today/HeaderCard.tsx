import React from 'react';

interface IHeaderCardType {
  top: string;
  center: string;
  bottom: string;
}
const HeaderCard = ({ top, center, bottom }: IHeaderCardType) => {
  return (
    <div className='flex flex-col items-center justify-between rounded-xl border p-2 shadow'>
      <h1 className='text-xl uppercase'>{top}</h1>
      <h2 className='text-4xl font-extrabold'>{center}</h2>
      <h3 className='text-xl'>{bottom}</h3>
    </div>
  );
};

export default HeaderCard;
