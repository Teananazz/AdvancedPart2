
import 'bootstrap/dist/css/bootstrap.min.css';
import IconHandle from "../CommonComponents/IconHandler"
import AttachButton from './AttachButton'
import { useState, useEffect } from 'react'
import React from "react";
import SoundRecordButton from '../MessageScreen/SoundRecordComponents/SoundRecordButton'
import SavedLogs from '../CommonComponents/ScriptedLogs'
import SavedLogForProgram from '../CommonComponents/SavedLogForProgram'
import { Container, Row, Col } from 'react-bootstrap'

// TODO :
//1 . find out how to make blob work without activating createaddress.
// 2. create five logs for the users by converting to html from savedlogforprogram and then converting from html to jsx.
// 3. find out how to make blob work
// 4.???
// 5. profit.


const TextBox =

    ({ Input, id, GroupHook, Logs, name, ForceGroupListing, Contacts, Mapping, UpdateCycleLog, forceUpdate, forceUpdateTextScreen }) => {
     
      
        // this is used to generate differnet styles depending on who sent the message.
        var [MessID, updateID] = useState("0");
        var Log;
        var Chat_Log;

       /* const [CycleLog, UpdateCycleLog] = useState("0"); // we use it to activate the useeffect when we need it.*/


        var flag = 0;
        const GivesyncLogs =
           () => {

              /* UpdateCycleLog("1" +5); // re-renders Logs getting.*/
           
               UpdateCycleLog("1"); // re-renders Logs getting.
             

                 Log = Mapping?.map((value) => {


                     return <li key={Math.random().toString(36).substr(2, 9)} className={giveStyle(value)} >  {value.message}   </li>;


                }
                );
                return Log;
            }
     


        {/* using these two to force this componenet to re-render once an img/sound/video is sent  */ }
        const [Index, UpdatedIndex] = useState("0");
        const ChangeTextBox =
            () => {
                UpdatedIndex(Index.concat("1"));

            }


        const giveStyle =
            (value) => {

              

                if (value.sentMessage === false) {
                    return "HostMessages";
                }
                else {
                    return "ServerMessages"
                }

           

            }




        //var [Mapping, setMapping] = useState(null);


        //// every time we update the messages in chat we call this function by updating CycleLog.
        //useEffect(() => {

        //    async function checkData() {

        //        const data = await Logs.GiveLogs({ id, Contacts });
        //        console.log(data);

        //        setMapping(data);
        //        Mapping = data;
        //        ForceGroupListing();
        //    }
        //    checkData();



        //}, [CycleLog]);



        // for some reason when the log of user log is of size one it detects it as string and therfore my entire function not works when i call map so i had to fix it.
      /*  var Chat_Log = await Logs.GiveLogs({ id, Contacts })*/



        //  console.log(Chat_Log)
        //if (Chat_Log != undefined) {

        //}






        //var scripted = "";

        //if (SavedLogs().giveArr(id) != undefined) {

        //    var scripted = SavedLogs().giveArr(id);
        //    console.log(scripted);
        //    if (Log == undefined) {
        //        Log = "";
        //    }


        //}

        //SavedLogForProgram(Log);
        const Attempt =
            async () => {
                await Logs.UpdateLocalLogs({ Input, id, MessID, Contacts, GroupHook });
                console.log(Input);
                UpdateCycleLog([..."2"]);
           
        }


        return (

            <Container className ="ContainerText">

                <Row className="justify-content-md-center">
                    <Col md="auto">
                        <div className="TitleBar">
                            {name}
                        </div>
                    </Col>
                </Row>

                <Row className="justify-content-md-center">
                    <Col md="auto">
                        <div className="Messages ">
                            <div className="Down flexes" >
                                <ul className="list-group">  {/*{scripted}*/}  {GivesyncLogs()} </ul>


                            </div>
                        </div>
                    </Col>
                </Row>
                <Row className="justify-content-md-center" >
                    <Col md="auto">
                        <div className="background">



                            <div className="input-group">
                                <div className="input-group-prepend">
                                    
                                    {/*<button onClick={(e) => {
                                        // write to js file
                                        updateID(MessID == "0" ? "1" : "0");




                                    }}
                                className="dropbtn" id="button-72" > {IconHandle("FiUserPlus")}</button>}*/}


                                    <button onClick={() => {
                                        Attempt();
                                       // Logs.UpdateLogs(Logs.UpdateLocalLogs({ Input, id, MessID, Contacts }));
                                       // forceUpdateTextScreen();
                                       // Attempt();
                                        /*  Logs.UpdateLocalLogs({ Input, id, MessID, Contacts });*/
                                       
                                      //  forceUpdate(); // stupid way to force Groups to re-render.
                                       // stupid way so the useEffect will be activated in Groups in next re-render.
                                       
                                        
                                        // re-renders Logs getting.
                                      
                                      
                                    
                                    }} className="btn btn-outline-secondary" type="button" id="button-72">{IconHandle("Airplane")}</button>

                                </div>
                                <textarea onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        Logs.UpdateLocalLogs({ id, MessID, Contacts })
                                        ChangeTextBox();
                                    }
                                }
                                }
                                    value={Input.value} onChange={Input.onChange} name="check" autoCorrect="on" rows="1" cols=" 1" type="text" placeholder="Write your message" />

                                <div className="input-group-prepend">

                                    <div className="dropup">
                                        <button className="dropbtn" id="button-72"> {IconHandle("AttachFile")}</button>
                                        <div className="dropup-content">
                                            <AttachButton Logs={Logs} id={id} func={ChangeTextBox} forceGroupListing={ForceGroupListing} MessID={MessID} />

                                        </div>
                                    </div>


                                    <SoundRecordButton Logs={Logs} id={id} func={ChangeTextBox} forceGroupListing={ForceGroupListing} MessID={MessID} />

                                </div>
                            </div>


                        </div>




                    </Col>
                  
                </Row>











            </Container>
        )


    }
export default TextBox