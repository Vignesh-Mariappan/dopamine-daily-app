import { useState } from "react";
import EnterHabitInput from '../components/EnterHabitInput';
import HabitBuilderButtons from '../components/HabitBuilderButtons';
import HabitBuilderCalendar from '../components/HabitBuilderCalendar';
import MessageToaster from '../components/MessageToaster';
import useMessageToaster from '../hooks/useMessageToaster';

const Home = () => {
    const [btnSelected, setBtnSelected] = useState("Finished");
    const toaster = useMessageToaster();

    return (
        <main className="font-bold p-4 main">
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
        </main>
    )
}

export default Home