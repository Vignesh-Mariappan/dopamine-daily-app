import CheckRoundIcon from '@rsuite/icons/CheckRound';
import WarningRoundIcon from '@rsuite/icons/WarningRound';
import EditIcon from '@rsuite/icons/Edit';
import PlusIcon from '@rsuite/icons/Plus';
import { useEffect, useReducer, useRef, useState } from "react";
import { isMobile } from "react-device-detect";
import { Badge, ButtonToolbar, Calendar, IconButton, Input } from "rsuite";
import useSound from "use-sound";
import bellSound from "../assets/sounds/finished-task-bell-sound.mp3";
import WithTooltip from "../utils/WithTooltip";
import { MONTHS } from "../utils/constants";
import { useFormInput } from '../hooks/useFormInput';
// import Message from '../components/Message';
// import useMessageToaster from '../hooks/useMessageToaster';

const Home = () => {
    const [days, setDays] = useState(new Map());
    const [btnSelected, setBtnSelected] = useState("Finished");
    const [_, forceUpdate] = useReducer(x => x + 1, 0);
    const [playSound] = useSound(bellSound);
    const habitInputRef = useRef(null);
    const habitInputProps = useFormInput("");
    const [readOnlyInput, setReadOnlyInput] = useState(false);
    // const [toaster, toastMessages] = useMessageToaster();

    // const message = (
    //     <Message type={"success"} closable>
    //         <strong>Success!</strong> Habit Edited Successfully.
    //     </Message>
    // );

    useEffect(() => {
        habitInputRef?.current && habitInputRef.current.focus();
    }, [])

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

    function activeButton(btn) {
        setBtnSelected(btn)
    }

    function onCalendarDateSelect(date) {

        const day = date.getDate();
        const month = MONTHS[date.getMonth()];

        setDays(prevDays => {
            if (btnSelected === "Finished") {
                prevDays.set(month + day, true)
            } else if (btnSelected === "Not Finished") {
                prevDays.set(month + day, false)
            }

            return prevDays
        })

        forceUpdate();

        if (btnSelected === "Finished") {
            playSound();
        }
    }

    function onEnterKeyPress(event) {
        // console.log(event);

        if (event.key === "Enter" || event.keyCode === 13) {
            setReadOnlyInput(true);
            // toaster.push(message, 5000);
        }
    }

    function editHabitIconHandler() {
        setReadOnlyInput(false);
        habitInputRef.current.focus();
    }



    return (
        <main className="font-bold p-4 main">
            <div className="show-grid flex justify-start items-center">
                <div className="flex items-center flex-wrap gap-2 w-[100%] mx-1">
                    <Input ref={habitInputRef} readOnly={readOnlyInput} style={{ maxWidth: "500px", userSelect: "none", border: "1px solid #3c3f43", cursor: readOnlyInput ? "default" : "auto" }} placeholder="Enter your habit to be built..." {...habitInputProps} onKeyUp={onEnterKeyPress} />
                    {readOnlyInput ? (
                        <WithTooltip placement={"top"} content={"Enter the habit"}>
                            <IconButton onClick={editHabitIconHandler} className="flex justify-center items-center rs-theme-dark" icon={<EditIcon />} size="lg" appearance="default"></IconButton>
                        </WithTooltip>
                    ) : (
                        <WithTooltip placement={"top"} content={"Edit the habit"}>
                            <IconButton onClick={() => setReadOnlyInput(true)} className="flex justify-center items-center rs-theme-dark" icon={<PlusIcon />} size="lg" appearance="default"></IconButton>
                        </WithTooltip>
                    )}
                    <ButtonToolbar className="justify-end btns">
                        <WithTooltip placement={"top"} content={"Finished"}>
                            <IconButton style={{ background: btnSelected === "Finished" && "rgba(234, 234, 234, 0.1)" }} onClick={() => activeButton("Finished")} className="flex justify-center items-center menu-icon rs-theme-dark" icon={<CheckRoundIcon color="green" />} size="lg" appearance="default"></IconButton>
                        </WithTooltip>
                        <WithTooltip placement={"top"} content={"Not Finished"}>
                            <IconButton style={{ background: btnSelected === "Not Finished" && "rgba(234, 234, 234, 0.1)" }} onClick={() => activeButton("Not Finished")} className="flex justify-center items-center menu-icon rs-theme-dark" icon={<WarningRoundIcon color="orange" />} size="lg" appearance="default" />
                        </WithTooltip>
                    </ButtonToolbar>
                </div>
            </div>
            <div className="flex justify-start items-start py-1">
                <div>
                    <Calendar compact={isMobile} cellClassName={date => date > new Date() && `rs-calendar-table-cell-un-same-month`} bordered onSelect={onCalendarDateSelect} renderCell={renderCell} />
                </div>
            </div>
        </main>
    )
}

export default Home