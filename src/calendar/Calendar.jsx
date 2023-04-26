import React, {useEffect, useState} from "react";
import Month from "./month/Month.jsx";
import '../App.css'

const Calendar = () => {
    const [mouseDown, setMouseDown] = useState(false)
    const [selectedDays, setSelectedDays] = useState([])
    const [savedDaysRange, setSavedDayRange] = useState([])


    const year = new Date().getFullYear()
    const months = Array.from({length: 12}, (value, index) => index)
    const weeks = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс']

    useEffect(() => {
        if(!mouseDown) {
            setSavedDayRange([...savedDaysRange, {
                start: selectedDays[0],
                end: selectedDays[selectedDays.length - 1]
            }])
            console.log(savedDaysRange)
            setSelectedDays([])
        }
    }, [mouseDown])
    return (
        <div onMouseDown={() => setMouseDown(true)} onMouseUp={() => {
            setMouseDown(false)

        }} className='calendar'>
            <div className='months'>
                {
                    months.map(month => {
                        return <Month selectedDays={selectedDays} setSelectedDays={setSelectedDays} setSavedDayRange={setSavedDayRange} savedDaysRange={savedDaysRange} mouseDown={mouseDown}
                                      year={year} month={month} weeks={weeks} key={month}/>
                    })
                }
            </div>
        </div>
    )
}

export default Calendar