import React, {memo, useEffect, useState} from "react";
import './App.css'

const Calendar = () => {
    const [mouseDown, setMouseDown] = useState(false)
    const [selectedArr, setSelectedArr] = useState([])

    const [year] = useState(new Date().getFullYear());

    const months = Array.from({ length: 12 }, (v, i) => i);
    const weeks = ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"];


    useEffect(() => {
        console.log(selectedArr)
    }, [selectedArr])
    return (
        <div     onMouseDown={() => setMouseDown(true)}
                 onMouseUp={() => setMouseDown(false)} className="calendar">
            <div className="months">
                {months.map((month) => (
                    <Month setSelectedArr={setSelectedArr} setMouseDown={setMouseDown} mouseDown={mouseDown} key={month} year={year} month={month} weeks={weeks} />
                ))}
            </div>
        </div>
    );
};

const Month = ({ year, month, weeks, mouseDown, setMouseDown, setSelectedArr }) => {
    const firstDayOfMonth = new Date(year, month, 1);
    const lastDayOfMonth = new Date(year, month + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();
    const startOffset = firstDayOfMonth.getDay();
    const endOffset = 6 - lastDayOfMonth.getDay();

    const days = Array.from(
        { length: daysInMonth },
        (v, i) => i + 1
    ).map((day) => new Date(year, month, day));

    const emptyDaysBefore = Array.from({ length: startOffset }, (v, i) => (
        <td key={`before-${i}`} className="empty">
            &nbsp;
        </td>
    ));

    const emptyDaysAfter = Array.from({ length: endOffset }, (v, i) => (
        <td key={`after-${i}`} className="empty">
            &nbsp;
        </td>
    ));

    const cells = [
        ...emptyDaysBefore,
        ...days.map((day) => <Day setSelectedArr={setSelectedArr} setMouseDown={setMouseDown} mouseDown={mouseDown} key={day.getTime()} day={day} />),
        ...emptyDaysAfter,
    ];

    return (
        <div className="month">
            <h2>{firstDayOfMonth.toLocaleString("default", { month: "long" })}</h2>
            <table>
                <thead>
                <tr>
                    {weeks.map((week) => (
                        <th key={week}>{week}</th>
                    ))}
                </tr>
                </thead>
                <tbody>
                {[...Array(Math.ceil(cells.length / 7)).keys()].map((week) => (
                    <tr key={week}>
                        {cells.slice(week * 7, (week + 1) * 7)}
                    </tr>
                ))}
                </tbody>
            </table>
        </div>
    );
};

const Day = memo(({ day, mouseDown, setSelectedArr }) => {
    const [selected, setSelected] = useState(false);

    const handleSelectDay =() => {
        setSelected(!selected)
    }

    const handleMouseEnter = () => {
        if (mouseDown) {
            handleSelectDay()
            setSelectedArr(n => [...n, day.toLocaleString('ru-RU', {day: 'numeric', month: 'numeric'})])
        }
    }



    return (
        <td
            onMouseEnter={handleMouseEnter}
            onMouseDown={handleSelectDay}
            className={day.getDay() === 0 || day.getDay() === 6 ? "weekend" : null}
            style={{ backgroundColor: selected ? "lightblue" : null}}
        >
            {day.getDate()}
        </td>
    );
});

export default Calendar;
