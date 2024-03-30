import { useState } from 'react'
import MessageToaster from './MessageToaster'
import EnterHabitInput from './EnterHabitInput'
import HabitBuilderButtons from './HabitBuilderButtons'
import HabitBuilderCalendar from './HabitBuilderCalendar'
import useMessageToaster from '../hooks/useMessageToaster'

const HabitBuilderUI = () => {
    const [btnSelected, setBtnSelected] = useState("Finished");
    const toaster = useMessageToaster();

    return (
        <>
            <MessageToaster {...toaster} />
            <div className="show-grid flex justify-start items-center">
                <div className="flex items-center flex-wrap gap-2 w-[100%] mx-1">
                    <EnterHabitInput toaster={toaster} />
                    <HabitBuilderButtons btnSelected={btnSelected} setBtnSelected={setBtnSelected} />
                </div>
            </div>
            <div className="flex justify-start items-start py-1">
                <HabitBuilderCalendar btnSelected={btnSelected} />
            </div>
        </>
    )
}

export default HabitBuilderUI