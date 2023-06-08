"use client"
import React from 'react'
import {Range} from 'react-date-range';
import Calender from '@/app/components/inputs/Calender';

interface ListingReservationProps {
    price: number;
    totalPrice: number;
    dateRange: Range;
    onChangeDate: (value: Range) => void;
    onSubmit: () => void;
    disabledDates: Date[];
    disabled: boolean;
}

const ListingReservation: React.FC<ListingReservationProps> = ({
    price,
    totalPrice,
    dateRange,
    onChangeDate,
    onSubmit,
    disabledDates,
    disabled,
}) => {
  return (
    <div className="
      bg-white rounded-xl border-[1px] border-neutral-500 overflow-hidden 
    ">
      <div className="
        flex 
        flex-row
        items-center
        gap-1
        p-4
      ">
        <div className="
        text-2xl font-semibold
        ">
          $ {price}
        </div>
        <div className="
          font-light
          text-neutral-600

        ">/ night</div>
      </div>
      <hr />
      <Calender 
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => onChangeDate(value.selection)}
      />
    </div>
  )
}

export default ListingReservation
