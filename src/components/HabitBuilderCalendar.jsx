import CheckRoundIcon from '@rsuite/icons/CheckRound';
import WarningRoundIcon from '@rsuite/icons/WarningRound';
import { useReducer, useState } from 'react';
import { isMobile } from 'react-device-detect';
import { Badge, Calendar } from 'rsuite';
import useSound from 'use-sound';
import bellSound from "../assets/sounds/finished-task-bell-sound.mp3";
import { MONTHS } from '../utils/constants';

const HabitBuilderCalendar = ({ btnSelected }) => {
    const [days, setDays] = useState(new Map());
    const [_, forceUpdate] = useReducer(x => x + 1, 0);
    const [playSound] = useSound(bellSound);
    const [showCalendarAnim, setShowCalendarAnim] = useState(true);

    function renderCell(date) {
        const day = date.getDate();
        const month = MONTHS[date.getMonth()];
        const showFinished = isMobile ? <Badge color="green" /> : <CheckRoundIcon color="green" style={{ fontSize: "2rem", marginTop: "1rem" }} />;
        const showNotFinished = isMobile ? <Badge color="orange" /> : <WarningRoundIcon color="orange" style={{ fontSize: "2rem", marginTop: "1rem" }} />;
        if (days.get(month + day) === true) {
            return showFinished
        } else if (days.get(month + day) === false) {
            return showNotFinished;
        }

        return null;
    }

    function onCalendarDateSelect(date) {

        const day = date.getDate();
        const month = MONTHS[date.getMonth()];

        setDays(prevDays => {
            if (btnSelected === "Finished") {
                prevDays.set(month + day, true);
            } else if (btnSelected === "Not Finished") {
                prevDays.set(month + day, false);
            }

            return prevDays
        })

        forceUpdate();

        if (btnSelected === "Finished") {
            playSound();
        }
    }

    return (
        <Calendar className={showCalendarAnim && 'calendar-slide-in-up'} onAnimationEnd={() => setShowCalendarAnim(false)} compact={isMobile} cellClassName={date => date > new Date() && `rs-calendar-table-cell-un-same-month`} bordered onSelect={onCalendarDateSelect} renderCell={renderCell} />
    )
}

export default HabitBuilderCalendar