import React, {memo, useCallback, useEffect, useState} from 'react';

const Day = (props) => {


    const handleSelectDay = () => {
        if(!props.selectedDays.includes(+props.day)) {
            props.setSelectedDays([...props.selectedDays, +props.day])
        }else {
            props.selectedDays.filter(date  => date !== +props.day)
        }
    }

    const handleMouseEnter = () => {
        if (props.mouseDown) {
            handleSelectDay()
        }
    }

    const isSelected = (state) => {
        if(state.start && state.end) {
            if(state.end - state.start >= 0) {
              return   state.start <= +props.day && state.end >= +props.day
            }else {
                return  state.start >= +props.day && state.end <= +props.day
            }

        }

    }


    return (
        <td style={{
            backgroundColor:
                props.savedDayRange.some(isSelected)
                    ? 'blue' :
                    null
        }}
            onClick={handleSelectDay}
            onMouseDown={handleSelectDay}
            onMouseEnter={handleMouseEnter}

        >
            {props.day.getDate()}

        </td>
    );
};


export default Day;