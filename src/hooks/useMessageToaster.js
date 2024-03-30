import { useEffect, useState } from "react";

const useMessageToaster = () => {
    const [toastMessages, setToastMessages] = useState([]);

    function push(message) {
        setToastMessages(oldToastMessages => [...oldToastMessages, message]);
    }

    function clear() {
        setToastMessages([])
    }

    function remove(indexToRemove) {
        const messages = [...toastMessages];
        if (indexToRemove) {
            messages.splice(indexToRemove, 1);
        } else {
            messages.shift();
        }
        setToastMessages(messages);
    }

    return {
        toastMessages,
        push,
        remove,
        clear
    }
}

export default useMessageToaster