import CalendarIcon from '@rsuite/icons/Calendar';
import { useEffect, useState } from "react";
import { Button, ButtonToolbar, Tabs } from 'rsuite';
import HabitBuilderUI from "../components/HabitBuilderUI";
import Message from "../components/Message";
import MessageToaster from '../components/MessageToaster';
import useMessageToaster from '../hooks/useMessageToaster';
import useWindowDimensions from '../hooks/useWindowDimensions';

const Home = () => {
    const toaster = useMessageToaster();

    const [habits, setHabits] = useState([
        "Habit 1"
    ]);

    const [width] = useWindowDimensions();

    const [showCalendar, setShowCalendar] = useState(true);
    const [showFullHabitText, setShowFullHabitText] = useState(true);

    const [tabActive, setTabActive] = useState("1");

    useEffect(() => {
        setShowCalendar(width > 500);
        setShowFullHabitText(width > 400)
    }, [width])

    function createNewHabit() {
        if (habits.length >= 5) {
            toaster.push(
                <Message type={"warning"} closable duration={2000}>
                    <strong>Warning!</strong> You can only have 5 habits.
                </Message>
            );
            return;
        }

        setHabits([...habits, "Habit " + (habits.length + 1)]);
        setTabActive(String(habits.length + 1));
    }

    return (
        <main className="p-4 main">
            <MessageToaster {...toaster} />
            <div className="flex justify-end">
                <ButtonToolbar>
                    <Button appearance="ghost" onClick={createNewHabit}>Create Habit</Button>
                    {/* <Button appearance="ghost" color="red">Remove Habit</Button> */}
                </ButtonToolbar>
            </div>
            <Tabs defaultActiveKey={"1"} activeKey={tabActive} onSelect={(tabEventKey) => setTabActive(tabEventKey)}>
                {
                    habits.map((habit, index) => {
                        const tabTitle = showFullHabitText ? habit : habit.charAt(0).toUpperCase() + " " + habit.charAt(habit.length - 1);
                        return (
                            <Tabs.Tab key={habit} eventKey={String(index + 1)} title={tabTitle} icon={showCalendar && <CalendarIcon />}>
                                <HabitBuilderUI />
                            </Tabs.Tab>

                        )
                    })
                }
            </Tabs>

        </main>
    )
}

export default Home