



import { useState } from "react";

const Texthook = (defaultValue) => {
    {/* value is the current input that might go into the logs. */}
    const [value, setValue] = useState(defaultValue);
  
    const [ListUser, UpdateListUser] = useState( "-1" )

    const onChange = (e) => setValue(e.target.value);







    return { value, setValue, onChange, ListUser, UpdateListUser };
};

export default Texthook