
import { useState } from 'react'

const UserInput = (defaultValue) => {
    const [value, setValue] = useState(defaultValue);

    const onChange = (e) => setValue(e.target.value);

    return { value, setValue, onChange };
};

export default UserInput