import { useId, useRef, useState } from 'react';
import './DatePicker.css';
import { Modal } from '../Modal/Modal';

export const DatePicker = ({ dates }) => {
    const fromDateRef = useRef(null);
    const toDateRef = useRef(null);
    const singleDateRef = useRef(null);
    const fromDateId = useId();
    const toDateId = useId();
    const singleDateId = useId();
    const [modal, setModal] = useState(null);
    const [dateMode, setDateMode] = useState('single');
    const [fromDate, setFromDate] = useState('');
    const [toDate, setToDate] = useState('');
    const today = new Date().toISOString().slice(0, 10);

    const handleDateClick = (rangeVal, ref) => {
        if (ref.current && ref.current.showPicker) {
            ref.current.showPicker();
        }
    };

    const handleModeChange = (e) => {
        setDateMode(e.target.value);
        dates.setFrom('');
        dates.setTo('');
        setModal(null);
        setFromDate('');
        setToDate('');
    };

    const handleFromChange = (e) => {
        setFromDate(e.target.value);
    };

    const handleToChange = (e) => {
        setToDate(e.target.value);
    };

    const explore = () => {
        const today = new Date().toISOString().slice(0, 10);
        if (dateMode === 'range') {
            const fromDateVal = fromDateRef.current.value;
            const toDateVal = toDateRef.current.value;
            if (!fromDateVal || !toDateVal) {
                setModal({ title: 'Enter Dates', body: 'Enter from and to dates' });
                return;
            } else if (fromDateVal > today || toDateVal > today) {
                setModal({ title: 'Future Date', body: 'Please select a date that is not in the future.' });
                return;
            } else if (fromDateVal > toDateVal) {
                setModal({ title: 'Invalid Range', body: 'From date cannot be after To date.' });
                return;
            }
            dates.setFrom(fromDateVal);
            dates.setTo(toDateVal);
        } else if (dateMode === 'single') {
            const singleDateVal = singleDateRef.current.value;
            if (!singleDateVal) {
                setModal({ title: 'Enter Date', body: 'Enter a date' });
                return;
            } else if (singleDateVal > today) {
                setModal({ title: 'Future Date', body: 'Please select a date that is not in the future.' });
                return;
            }
            dates.setFrom(singleDateVal);
            dates.setTo(singleDateVal);
        }
        setModal(null);
    };
    
    return (
        <>
        <div>
            <div className="mode-selector">
                     <label>
                        <input
                            type="radio"
                            name="dateMode"
                            value="single"
                            checked={dateMode === 'single'}
                            onChange={handleModeChange}
                        />
                        Single Date
                    </label>
                    <label>
                        <input
                            type="radio"
                            name="dateMode"
                            value="range"
                            checked={dateMode === 'range'}
                            onChange={handleModeChange}
                        />
                        Range
                    </label>
                    
                </div>
        </div>
            <div className="wrapper">
                

                {dateMode === 'range' && (
                    <>
                        <span className="color1"><strong>From Date</strong></span>
                        <input
                            type="date"
                            placeholder="Select a Date"
                            id={fromDateId}
                            ref={fromDateRef}
                            max={toDate || today}
                            onChange={handleFromChange}
                            onClick={() => handleDateClick('from', fromDateRef)}
                        />

                        <span className="color1"><strong>To Date</strong></span>
                        <input
                            type="date"
                            placeholder="Select a Date"
                            id={toDateId}
                            ref={toDateRef}
                            min={fromDate}
                            max={today}
                            onChange={handleToChange}
                            onClick={() => handleDateClick('to', toDateRef)}
                        />
                    </>
                )}

                {dateMode === 'single' && (
                    <>
                        <span className="color1"><strong>Select Date</strong></span>
                        <input
                            type="date"
                            placeholder="Select a Date"
                            id={singleDateId}
                            ref={singleDateRef}
                            max={today}
                            onClick={() => handleDateClick('single', singleDateRef)}
                        />
                    </>
                )}

                <button onClick={explore}>Explore</button>
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
};