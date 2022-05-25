import Grouphook from '../hooks/Grouphook'
import GroupBar from './GroupBar';
import GroupListing from './GroupListing'
import TextScreen from './TextScreen'
import { Container, Row, Col } from 'react-bootstrap'
import { useState, useEffect, useCallback, useReducer} from 'react'
import Logs from '../CommonComponents/Logs'
import Texthook from '../hooks/Texthook'




const Groups =
    ({ Contacts }) => {

  



        const GroupHook = Grouphook({ Contacts });

  
     
           
            
        


        var [Mapping, setMapping] = useState(null);
        var [CycleLog, UpdateCycleLog] = useState("0"); // we use it to activate the useeffect when we need it.

        // every time we update the messages in chat we call this function by updating CycleLog.
        // i put function here because both components need the option to re-render logs.

       

        const forceUpdate = useReducer(bool => !bool)[1];
        const Input = Texthook("")
        const [TextReact, UpdateTextReact] = useState("0");
        const Chat_log = Logs(GroupHook)
        const [Index, UpdateIndex] = useState("0");
        var Screen = TextScreen({ GroupHook, Chat_log, UpdateIndex, Contacts, Mapping, Input, UpdateCycleLog, forceUpdate });
        var result = Screen.GiveScreen();

        //TODO : fix this 2

        //var connection = Contacts.Connection;
       
        //if (connection != null) {

        //    connection.on("ReceivedMessage",
        //        (username, nickname) => {


        //            async function checkData() {

        //                var id = Screen.Account;

        //                const data = await Chat_log.GiveLogs({ id, Contacts });

        //                console.log(data);
        //                Screen.setActivated(Screen.Activated_Group);
        //                setMapping(data);


        //            }
        //            checkData();


        //        }

        //    )

        //}


        useEffect(() => {

           
            async function checkData() {
                var id = Screen.Account;

                const data = await Chat_log.GiveLogs({ id, Contacts });

                console.log(data);
                Screen.setActivated(Screen.Activated_Group);
                setMapping(data);
            
                // ForceGroupListing();
            }
            checkData();



        }, [CycleLog]); 

     


      



        const func =
            (props) => {
               
                var id = props.id;
                var name = props.name;
              

                Screen.Activate({ id, name }) //re - render screen so id will be different;.
                             
                result = Screen.GiveScreen();
                UpdateCycleLog("1".length);
               

            }
       
        
        return (
            
          <>
                
                
                    
                <GroupBar Index={Index} UpdateIndex={UpdateIndex} Input={Input} result={result} func={func} GroupHook={GroupHook} Input={Input}  Contacts={Contacts} Mapping={Mapping} setMapping={setMapping} Chat_log={Chat_log} UpdateCycleLog={UpdateCycleLog} />

                   



                   
                <GroupListing Index={Index} UpdateIndex={UpdateIndex}  Input={Input} result={result} func={func} Groups={GroupHook} Contacts={Contacts} Mapping={Mapping} Chat_log={Chat_log} setMapping={setMapping} UpdateCycleLog={UpdateCycleLog}  />
                       
                
          
                </>

           
        )



                            
                       
                       
                   
               

   

        



        // need to return a small screen with around four buttons including adding a group.




    }



export default Groups;