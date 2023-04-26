import React from "react";
import Calendar from "./calendar/Calendar.jsx";


const App = () => {
    return (
        <Calendar/>
    )
}

export default App


// import React, {memo, useEffect, useState} from "react";
// import './App.css'
//
// const calendar = () => {
//     const [mouseDown, setMouseDown] = useState(false)
//     const [selectedArr, setSelectedArr] = useState([])
//     const [savedSelections, setSavedSelections] = useState([])
//
//     const [year] = useState(new Date().getFullYear());
//     //year = 2023
//
//     const months = Array.from({length: 12}, (v, i) => i);
//     //months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
//     const weeks = ["Пн", "Вт", "Ср", "Чт", "Пт", "Сб", "Вс"];
//
//
//     const handleSaveSelections = () => {
//         setSavedSelections([...savedSelections, {
//             title: `test`,
//             min: selectedArr[0],
//             max: selectedArr[selectedArr.length - 1]
//         }])
//         setSelectedArr([])
//     }
//
//     useEffect(() => {
//         console.log(selectedArr)
//     }, [selectedArr])
//
//     useEffect(() => {
//         console.log(savedSelections)
//     }, [savedSelections])
//     return (
//         <div onMouseDown={() => setMouseDown(true)}
//              onMouseUp={() => {
//                  setMouseDown(false)
//                  handleSaveSelections()
//              }} className="calendar">
//             {/*Когда отпускается внопка мыши за пределами блока, не вызывается он маус ап*/}
//             <div className="months">
//                 {months.map((month) => (
//                     <Month savedSelections={savedSelections} setSelectedArr={setSelectedArr} setMouseDown={setMouseDown}
//                            mouseDown={mouseDown} key={month}
//                            year={year} month={month} weeks={weeks}/>
//                 ))}
//             </div>
//         </div>
//     );
// };
//
// const Month = ({year, month, weeks, mouseDown, setMouseDown, setSelectedArr, savedSelections}) => {
//     const firstDayOfMonth = new Date(year, month, 1);
//     const lastDayOfMonth = new Date(year, month + 1, 0);
//     const daysInMonth = lastDayOfMonth.getDate();
//     const startOffset = firstDayOfMonth.getDay() - 1;
//     //Определяем длинну путых дней в начале месяца
//     const endOffset = 6 - lastDayOfMonth.getDay();
//     //Определяем длину пустых дней в конце месяца
//
//     const days = Array.from({length: daysInMonth}, (v, i) => i + 1).map(
//         (day) => new Date(year, month, day)
//     );
//
//     //Создаем массив всех дней в месяце, передаем текущий день в компонент Day
//
//     const emptyDaysBefore = Array.from(
//         {length: startOffset < 0 ? 6 : startOffset},
//         (v, i) => (
//             <td key={`before-${i}`} className="empty">
//                 &nbsp;
//             </td>
//         )
//     );
//
//     const emptyDaysAfter = Array.from(
//         {length: endOffset < 0 ? 0 : endOffset},
//         (v, i) => (
//             <td key={`after-${i}`} className="empty">
//                 &nbsp;
//             </td>
//         )
//     );
//
//     let cells = []
//
//     if (emptyDaysAfter.length >= 6) {
//         cells = [
//             ...emptyDaysBefore,
//             ...days.map((day) =>
//                     <Day savedSelections={savedSelections} setSelectedArr={setSelectedArr}
//                          setMouseDown={setMouseDown} mouseDown={mouseDown}
//                          key={day.getTime()} day={day}/>
//
//             ),
//         ];
//     } else {
//         cells = [
//             ...emptyDaysBefore,
//             ...days.map((day) => {
//                     return (
//                         <Day test={'true'} savedSelections={savedSelections} setSelectedArr={setSelectedArr} setMouseDown={setMouseDown}
//                              mouseDown={mouseDown}
//                              key={day.getTime()} day={day}/>)
//
//
//             }),
//             ...emptyDaysAfter,
//         ];
//     }
//
//     return (
//         <div className="month">
//             <h2>{firstDayOfMonth.toLocaleString("default", {month: "long"})}</h2>
//             <table>
//                 <thead>
//                 <tr>
//                     {weeks.map((week) => (
//                         <th key={week}>{week}</th>
//                     ))}
//                 </tr>
//                 </thead>
//                 <tbody>
//                 {[...Array(Math.ceil(cells.length / 7)).keys()].map((week) => (
//                     <tr key={week}>
//                         {cells.slice(week * 7, (week + 1) * 7)}
//                     </tr>
//                 ))}
//                 {/*Определяем количество недель, отрисовываем каждую неделю исходя из номера недели*/}
//                 </tbody>
//             </table>
//         </div>
//     );
// };
//
// const Day = memo(({day, mouseDown, setSelectedArr, savedSelections}) => {
//     const [selected, setSelected] = useState(false);
//     const [test, setTest] = useState(false)
//     const handleSelectDay = () => {
//         setSelected(!selected)
//         if (!selected) {
//             setSelectedArr(n => [...n, day.toLocaleString('ru-RU', {day: 'numeric', month: 'numeric'})])
//         } else {
//             setSelectedArr(n => n.filter(item => item !== day.toLocaleString('ru-RU', {
//                 day: 'numeric',
//                 month: 'numeric'
//             })))
//         }
//     }
//
//     const handleMouseEnter = () => {
//         if (mouseDown) {
//             handleSelectDay()
//         }
//     }
//
//     useEffect(() => {
//         if(!test) {
//             savedSelections.forEach(item => {
//                 if(item.min === day.toLocaleString('ru-RU', {day: 'numeric', month: 'numeric'}) || item.max === day.toLocaleString('ru-RU', {day: 'numeric', month: 'numeric'})) {
//                     console.log('done')
//                     setSelected(false)
//                     setTest(true)
//                 }
//
//             })
//         }
//
//     }, [savedSelections])
//
//     return (
//         <td
//             onMouseEnter={handleMouseEnter}
//             onMouseDown={handleSelectDay}
//
//             className={day.getDay() === 0 || day.getDay() === 6 ? "weekend" : null}
//             style={{
//                 backgroundColor: selected ? "lightblue" : test ? 'green' : null
//             }}
//         >
//             {day.getDate()}
//         </td>
//     );
// });
//
// export default calendar;
