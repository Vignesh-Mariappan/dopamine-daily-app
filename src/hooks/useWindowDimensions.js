import { useEffect, useState } from "react";

function useWindowDimensions() {
    const [ windowDimensions, setWindowDimensions ] = useState([
        window.innerWidth,
        window.innerHeight
    ]);

    useEffect(() => {
        function setNewDimensions() {
            setWindowDimensions([
                window.innerWidth,
                window.innerHeight
            ])
        }

        window.addEventListener("resize", setNewDimensions);
        setNewDimensions();

        return () => {
            window.removeEventListener("resize", setNewDimensions);
        }
    }, []);

    return windowDimensions;
}

export default useWindowDimensions;