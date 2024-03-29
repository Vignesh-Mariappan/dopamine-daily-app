import { useState } from "react";

export function useFormInput(initialValue) {
    const [ value, setValue ] = useState(initialValue);

    const handleInputChange = currentValue => setValue(currentValue);

    return {
        value,
        onChange: handleInputChange
    }
}