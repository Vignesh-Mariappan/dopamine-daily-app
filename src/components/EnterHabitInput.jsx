import { IconButton, Input } from "rsuite"
import WithTooltip from "../utils/WithTooltip"
import EditIcon from '@rsuite/icons/Edit';
import PlusIcon from '@rsuite/icons/Plus';
import { useEffect, useRef, useState } from "react";
import { useFormInput } from "../hooks/useFormInput";
import Message from "./Message";

const EnterHabitInput = ({ toaster }) => {
    const habitInputRef = useRef(null);
    const habitInputProps = useFormInput("");
    const [readOnlyInput, setReadOnlyInput] = useState(false);

    const message = (
        <Message type={"success"} closable duration={2000}>
            <strong>Success!</strong> Habit Edited Successfully.
        </Message>
    );

    useEffect(() => {
        habitInputRef?.current && habitInputRef.current.focus();
    }, [])

    function onEnterKeyPress(event) {
        if (event.key === "Enter" || event.keyCode === 13) {
            saveHabitInput();
        }
    }

    function saveHabitInput() {
        habitInputRef.current.setSelectionRange(0, 0);
        setReadOnlyInput(true);
        toaster.push(message);
    }

    function editHabitIconHandler() {
        const end = habitInputProps.value.length;
        habitInputRef.current.setSelectionRange(end, end);
        setReadOnlyInput(false);
        habitInputRef.current.focus();
    }

    return (
        <>
            <Input className='enter-habit-input' ref={habitInputRef} readOnly={readOnlyInput} style={{ pointerEvents: readOnlyInput ? "none" : "auto", cursor: readOnlyInput ? "default" : "auto" }} placeholder="Enter your habit to be built..." {...habitInputProps} onKeyUp={onEnterKeyPress} />
            {readOnlyInput ? (
                <WithTooltip placement={"top"} content={"Edit the habit"}>
                    <IconButton onClick={editHabitIconHandler} className="flex justify-center items-center rs-theme-dark" icon={<EditIcon />} size="lg" appearance="default"></IconButton>
                </WithTooltip>
            ) : (
                <WithTooltip placement={"top"} content={"Save the habit"}>
                    <IconButton disabled={habitInputProps.value.length === 0} onClick={saveHabitInput} className="flex justify-center items-center rs-theme-dark" icon={<PlusIcon />} size="lg" appearance="default"></IconButton>
                </WithTooltip>
            )}
        </>
    )
}

export default EnterHabitInput