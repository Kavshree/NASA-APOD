import { useId, useRef, useState } from 'react';
import './DatePicker.css';
import { Modal } from '../Modal/Modal';

export const DatePicker = ({dates}) => {
    const fromDateRef = useRef(null);
    const toDateRef = useRef(null);
    const fromDateId = useId();
    const toDateId = useId();
    const [modal, setModal] = useState(null);

    const handleDateClick = (rangeVal, ref) => {
        if (ref.current && ref.current.showPicker) {
            ref.current.showPicker();
        }
    };

    const explore = () => {
        const fromDateVal = fromDateRef.current.value;
        const toDateVal = toDateRef.current.value;
        const today = new Date().toISOString().slice(0, 10);
        if(!fromDateVal || !toDateVal) {
           return (
                setModal({ title: 'Enter Dates', body: 'Enter from and to dates' })
           )
        } else if(fromDateVal > today || toDateVal > today) {
            return (
                setModal({ title: 'Future Date', body: 'Please select a date that is not in the future.' })
            )
        } else if(fromDateVal > toDateVal) {
           return (
                setModal({ title: 'Invalid Range', body: 'From date cannot be after To date.' })
           )
        } else if(fromDateVal < toDateVal || fromDateVal === toDateVal) {
            dates.setFrom(fromDateRef.current.value);
            dates.setTo(toDateRef.current.value);
            setModal(null);
        } 
    }

    return (
        <>
        <div className="wrapper">
            From Date
            <input
                type="date"
                id={fromDateId}
                ref={fromDateRef}
                onClick={() => handleDateClick('from', fromDateRef)}
            />

            To Date
            <input
                type="date"
                id={toDateId}
                ref={toDateRef}
                onClick={() => handleDateClick('to', toDateRef)}
            />

            <button onClick={() => explore()}>Explore</button>
        </div>
        {modal && (
                <Modal
                    show={true}
                    title={modal.title}
                    body={modal.body}
                    onClose={() => setModal(null)}
                />
        )}
       </> 
    );
}