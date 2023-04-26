import React, {useEffect, useState} from "react";
import Day from "../day/Day.jsx";

const Month = (props) => {
    // const [selectedDays, setSelectedDays] = useState([])
    // const [savedDaysRange, setSavedDayRange] = useState([{
    // }])

    const firstDayOfMonth = new Date(props.year, props.month, 1);
    const lastDayOfMonth = new Date(props.year, props.month + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();
    const startOffset = firstDayOfMonth.getDay() - 1;
    const endOffset = 6 - lastDayOfMonth.getDay();

    const days = Array.from({length: daysInMonth}, (v, i) => i + 1).map(
        (day) => new Date(props.year, props.month, day)
    );

    const emptyDaysBefore = Array.from(
        {length: startOffset < 0 ? 6 : startOffset},
        (v, i) => (
            <td key={`before-${i}`} className="empty">
                &nbsp;
            </td>
        )
    );

    const emptyDaysAfter = Array.from(
        {length: endOffset < 0 ? 0 : endOffset},
        (v, i) => (
            <td key={`after-${i}`} className="empty">
                &nbsp;
            </td>
        )
    );

    let cells = [
        ...emptyDaysBefore,
        ...days.map(day => <Day savedDayRange={props.savedDaysRange}  mouseDown={props.mouseDown} selectedDays={props.selectedDays} setSelectedDays={props.setSelectedDays} day={day}/>),
        ...emptyDaysAfter
    ]


    // useEffect(() => {
    //     if(!props.mouseDown){
    //         setSavedDayRange([{
    //             start: selectedDays[0],
    //             end: selectedDays[selectedDays.length - 1]
    //         }])
    //         setSelectedDays([])
    //     }
    // }, [props.mouseDown])



    return (
        <div className='month'>
            <h2>{firstDayOfMonth.toLocaleString("default", {month: "long"})}</h2>
            <table>
                <thead>
                <tr>
                    {props.weeks.map(week => {
                        return (
                            <td key={`week-${week}`}>
                                {week}
                            </td>
                        )
                    })}
                </tr>
                </thead>
                <tbody>
                        {[...Array(Math.ceil(cells.length / 7)).keys()].map((week) => (
                  <tr key={`cell-${week}`}>
                      {cells.slice(week * 7, (week + 1) * 7)}
                   </tr>
                ))}
                </tbody>
            </table>

            {/*{props.selectedDays.map(item => {*/}
            {/*    return <p>{item}</p>*/}
            {/*})}*/}
        </div>
    )
}

export default Month