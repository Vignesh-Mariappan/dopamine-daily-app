import CheckRoundIcon from '@rsuite/icons/CheckRound';
import WarningRoundIcon from '@rsuite/icons/WarningRound';
import { useReducer, useState } from "react";
import { isMobile } from "react-device-detect";
import { Badge, ButtonToolbar, Calendar, Col, IconButton, Input, Row } from "rsuite";
import useSound from "use-sound";
import bellSound from "../assets/sounds/finished-task-bell-sound.mp3";
import WithTooltip from "../utils/WithTooltip";
import { MONTHS } from "../utils/constants";

const Home = () => {
    const [ days, setDays ] = useState(new Map());
    const [ btnSelected, setBtnSelected ] = useState("Finished");
    const [ _, forceUpdate] = useReducer(x => x + 1, 0);
    const [ playSound ] = useSound(bellSound)

  function renderCell(date) {
    const day = date.getDate();
    const month = MONTHS[date.getMonth()];
    const showFinished = isMobile ? <Badge color="green" /> : <CheckRoundIcon color="green" style={{ fontSize: "2rem", marginTop: "1rem" }} />;
    const showNotFinished = isMobile ? <Badge color="orange" /> : <WarningRoundIcon color="orange" style={{ fontSize: "2rem", marginTop: "1rem" }} />;

    if(days.get(month + day) === true) {
        return showFinished 
    } else if(days.get(month + day) === false) {
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
        } else if(btnSelected === "Not Finished") {
            prevDays.set(month + day, false)
        }

        return prevDays
    })

    forceUpdate();
    
    if(btnSelected === "Finished") {
        playSound();
    }
  }

  return (
    <main className="font-bold p-4 main">
        <Row className="show-grid flex justify-start items-center">
        <Col className="flex justify-between items-center flex-wrap gap-2 w-[100%] mx-1">
            <Input style={{ maxWidth: "500px" }} placeholder="Enter your habit to be built..." />
            <ButtonToolbar className="justify-end btns">
                <WithTooltip placement={"top"} content={"Finished"}>
                        <IconButton style={{ background: btnSelected === "Finished" && "rgba(234, 234, 234, 0.1)" }} onClick={ () => activeButton("Finished") } className="flex justify-center items-center menu-icon rs-theme-dark" icon={<CheckRoundIcon color="green" />} size="lg" appearance="default"></IconButton>
                    </WithTooltip>
                    <WithTooltip placement={"top"} content={"Not Finished"}>
                        <IconButton style={{ background: btnSelected === "Not Finished" && "rgba(234, 234, 234, 0.1)" }} onClick={ () => activeButton("Not Finished")} className="flex justify-center items-center menu-icon rs-theme-dark" icon={<WarningRoundIcon color="orange" />}  size="lg" appearance="default" />
                </WithTooltip>
            </ButtonToolbar>
        </Col>
        {/* <Col xs={12} className="habit-selection-btns">
        </Col> */}
        </Row>
        <Row className="flex justify-start items-start py-1">
            <Col /* xs={12} */>
                <Calendar compact={isMobile} cellClassName={ date => date > new Date() && `rs-calendar-table-cell-un-same-month` } bordered onSelect={onCalendarDateSelect} renderCell={renderCell} />
                </Col>
        </Row>
    </main>
  )
}

export default Home