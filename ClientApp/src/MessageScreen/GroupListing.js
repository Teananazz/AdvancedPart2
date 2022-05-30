


import Button from 'react-bootstrap/Button'

import TextScreen from './TextScreen'
import Texthook from '../hooks/Texthook'
import Logs from '../CommonComponents/Logs'
import { Container, Row, Col } from 'react-bootstrap'
import { useState, useEffect } from 'react'

const GroupListing =


    // TODO  20/05:  I managed to make it work so now groups appear if you add them as friends.
    // Now need to handle Logs.
     



    ({ Groups, Contacts, Chat_log, UpdateCycleLog, func, result, Input, Index, IndexGroup }) => {

        var [Mapping, setMapping] = useState(null);
        var [GroupCycle, UpdateGroups] = useState("0");

         //TODO : problems with signalR

        var connection = Contacts.Connection;
        connection.on('ReceivedContact',
            async function () {
               
                try {
                    async function checkData() {
                       
                        const data = await Groups.getChatWindows();

                        setMapping(data);
                        Mapping = data;
                          /*UpdateIndex("1");*/

                    }
                    checkData();

                }
                catch (e) {
                    return;
                }
            });

    

      
      

       
        useEffect(() => {

       
            async function checkData() {

                const data = await Groups.getChatWindows();
                setMapping(data);
                Mapping = data;
                /*UpdateIndex("1");*/

            }
            checkData();


        }, [GroupCycle, Index, IndexGroup]);


        const Updates =
            () => {
                UpdateGroups([..."1"]);
              
            }

       const GiveMapping =
           () => {
               Mapping = Groups.ChatList;
              
              
               if (Mapping == null) {
                   Mapping = "";
               }


               else if (Mapping.length == 0) {

                   Mapping = "";
               }

               else {
                   Mapping = Mapping.map((value) =>
                       <div key={Math.random(1000) + 500} className="flex-down left margin-top">
                           <Button id="flex" key={value.id} onClick={() => {
                               func(value)
                             
                           }} variant="outline-secondary" size="lg"   >

                               <div >    {value.name}   </div>
                            

                               <div className="Block">   {value.last} <br /> {value.lastdate}  </div>
                           </Button>
                       </div>
                   )
               }


               
               return Mapping;

           }




       

      /*  const [Index, UpdateIndex] = useState("0");*/

     /*   const Input = Texthook("");*/

      /* const Chat_log = Logs(Input)*/

       //var Screen = TextScreen({ Input, Chat_log, UpdateIndex, Contacts });
       // var result = Screen.GiveScreen();

       


        const GiveTime =
            (id) => {

                return Chat_log?.LastMessageTime.get(id);


            }
        const GiveLastMessage =
            (id) => {
                return Chat_log?.LastMessage.get(id);

           }

    

    
       //if (Groups.GroupUpdateFlag == "1") {
       //    UpdateGroups("1");
       //    Groups.UpdateFlag("0");
       //}



       

        return (

            <Container>
                <Row>

                   

                    <Col md="1" >
                        <div key={Math.random(1000) + 500}      >
                            <div className="LimitsMessages"  >
                                {
                                    GiveMapping() // need to find a way to force this to re-render once we update groups.

                                }
                                </div>
                        </div>

                      


                    </Col>

                    <Col md="8">

                        {result}

                    </Col>

                </Row>
            </Container>


        )

    }



export default GroupListing;