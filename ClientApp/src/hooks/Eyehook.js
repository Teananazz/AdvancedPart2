
import { useState } from 'react'
const Eyehook =
    (defaultValue) => {

        const [value, setValue] = useState(defaultValue)
        const [m, setM] = useState("password")

        const onChange = (e) => {

            if (value == "FillEye") {
                setValue("FillEyeInv")
                setM("password")
            }
            else {
                setValue("FillEye")
                setM("text")
            }
   
        }

        return { value, setValue, onChange ,m , setM }
    }

export default Eyehook