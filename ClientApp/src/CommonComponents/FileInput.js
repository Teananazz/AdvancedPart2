


import Filehook from '../hooks/Filehook'

import IconHandle from "../CommonComponents/IconHandler"

import { useState } from 'react'
const FileInput =
    ({ Input, design, Logs, phone} ) => {
        const [File, SelectedFile] = useState("null")


        return (
            <>
                <input  
                  
                    type="file" onChange={(e) => {
                        
                        const Val= e.target.files[0];

                        const FinalVal = URL.createObjectURL(Val)
                        var FinalVal2 = <img key={1} src={FinalVal} loading="eager" width="200" height="200" alt={Val.name}/>

                        
                        Logs.UpdateFileLog({ phone, FinalVal2 });
                      
                        SelectedFile(FinalVal2)
                       
                    }}className={design} id="inputGroupFile01" />
                <label className="DropUpButtons" htmlFor="inputGroupFile01">{IconHandle("Picture")}</label>

            </>
            
            )







    }

export default FileInput