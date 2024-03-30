import { ButtonToolbar, IconButton } from 'rsuite'
import WithTooltip from '../utils/WithTooltip'
import CheckRoundIcon from '@rsuite/icons/CheckRound';
import WarningRoundIcon from '@rsuite/icons/WarningRound';

const HabitBuilderButtons = ({ btnSelected, setBtnSelected }) => {
    return (
        <ButtonToolbar className="justify-end btns">
            <WithTooltip placement={"top"} content={"Finished"}>
                <IconButton style={{ background: btnSelected === "Finished" && "rgba(234, 234, 234, 0.1)" }} onClick={() => setBtnSelected("Finished")} className="flex justify-center items-center menu-icon rs-theme-dark" icon={<CheckRoundIcon color="green" />} size="lg" appearance="default"></IconButton>
            </WithTooltip>
            <WithTooltip placement={"top"} content={"Not Finished"}>
                <IconButton style={{ background: btnSelected === "Not Finished" && "rgba(234, 234, 234, 0.1)" }} onClick={() => setBtnSelected("Not Finished")} className="flex justify-center items-center menu-icon rs-theme-dark" icon={<WarningRoundIcon color="orange" />} size="lg" appearance="default" />
            </WithTooltip>
        </ButtonToolbar>
    )
}

export default HabitBuilderButtons