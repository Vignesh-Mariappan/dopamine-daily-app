import { Tooltip, Whisper } from 'rsuite';

// eslint-disable-next-line react/prop-types
const WithTooltip = ({ placement, content, children, trigger = "hover" }) => (
  <Whisper
    trigger={trigger}
    placement={placement}
    controlId={`control-id-${placement}`}
    speaker={
      <Tooltip>{ content }</Tooltip>
    }
  >
    { children }
  </Whisper>
);

export default WithTooltip;