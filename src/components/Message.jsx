import CloseIcon from '@rsuite/icons/Close';
import { useEffect } from 'react';

const Message = ({ type = "info", closable, children, duration = 2000, index, remove }) => {
    const toastMsgBg = {
        info: '#1499ef',
        success: '#58b15b',
        warning: '#ffc107',
        error: '#dc3545',
    }[type];

    useEffect(() => {
        const intervalId = setTimeout(() => {
            remove();
        }, duration);

        return () => clearTimeout(intervalId);
    }, [duration, remove])/*  */

    return (
        <div className={`message-toast`} style={{ backgroundColor: toastMsgBg }}>
            {children}
            {closable && <CloseIcon className="toast-message-close-icon" onClick={() => remove(index)} />}
        </div>
    );
};

export default Message;