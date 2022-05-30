

import TextBox from './TextBox'
import {useState, useCallback, useReducer} from 'react'
import HoldScreen from './HoldScreen'

const TextScreen =

    ({ Input, GroupHook, Chat_log, UpdateIndex, Contacts, Mapping, UpdateCycleLog, forceUpdate, IndexGroups } ) => {
       
        {/* probably needs to activate the side bar that indicates the person above the chat here. */}
        const [Activated_Group, setActivated] = useState("-1");
        const [user, setUser] = useState("");
        const [Account, setAccount] = useState("");
        const forceUpdate2 = useReducer(bool => !bool)[1];

        const GiveScreen =
            () => {

                if (Activated_Group == -1) {
                    return <HoldScreen/> 

                }

                
                return (
              
                    <TextBox IndexGroups={IndexGroups}  forceUpdateTextScreen={forceUpdate2} forceUpdate={forceUpdate}  id={Activated_Group} Input={Input} Mapping={Mapping} GroupHook={GroupHook} Logs={Chat_log} name={user} ForceGroupListing={UpdateIndex} Contacts={Contacts} UpdateCycleLog={UpdateCycleLog} />
                 
                    )

            }

       

        const Activate =
            ({ id, name }) => {
                
              
              
                setUser(name);
                setAccount(id);
                setActivated(id);
                forceUpdate();
                
              //  setActivated(props.id);
              
            }
        





        return ({ Activate, GiveScreen, Activated_Group, setActivated, user, Account })




    }

export default TextScreen;