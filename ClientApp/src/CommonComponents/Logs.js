

import IconHandler from './IconHandler'
import SavedLogs from '../CommonComponents/ScriptedLogs'
import { useState, useEffect, useCallback, useReducer } from 'react'
const Logs =
    ( /*Input */) => {

        var today = new Date();
        var time;
        const [Logs, UpdateLogs] = useState(new Map());
       
      
      
        // TODO: ID : 0 -> host ID:1 -> from the contact.
        // for ease of making  a log example: do a button to switch ids
        // and also create a function that returns a different style depending on id.
        // gg

        const forceUpdate = useReducer(bool => !bool)[1];

        const [LastMessageTime, UpdateLastMessageTime] = useState(new Map())
        const [LastMessage, UpdateLastMessage] = useState(new Map());



        const GiveBackLogs =
            async ({ id, Contacts }) => {

                if (id == "") {
                    return null;
                }
             var bearer = 'Bearer ' + Contacts.Token;
             const string = 'https://localhost:44459/api/contacts/'.concat(id).concat("/messages");
               await console.log("string:"  + string);

             const r = await fetch(string, {
                 method: "GET",
                 headers: {
                     'Content-Type': 'application/json',
                     'Authorization': bearer,
                     // 'Content-Type': 'application/x-www-form-urlencoded',
                 },
                

             })

                const check = await r.text();

                if (check.length == 0) {
                    return "";
                }
             

                const res = await JSON.parse(check);

             return res;




            }





        const GiveLogs =
          async ({ id,Contacts }) => {


               const r =  await GiveBackLogs({ id,Contacts });
        
                
             
              UpdateLogs(r);
              forceUpdate();
              return r;
            


            }




     

        const AddServerLogs =
            async ({val, id, Contacts }) => {

                
            
               var bearer = 'Bearer ' + Contacts.Token;
                const string = 'https://localhost:44459/api/contacts/'.concat( id ).concat("/messages");
                console.log(string);

                const r = await fetch(string, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': bearer,
                       // 'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: JSON.stringify(val)

               })

                const res = await r.text();

                if (res.length == 0) {
                    return null;
                }
                const result = await JSON.parse(res);

                return result;
           }



            

        const SendTransferRequest =
            async ({ val, id, Contacts, contact }) => {

            
                // TODO : need to find the server .
                

                var server = contact.server;
               
                var Current = Contacts.CurrentUser;
                var arr = [Current, id, val];
                
                var string = 'https://'.concat(contact.server).concat("/api/transfer");
                await console.log(string);
                const r = await fetch(string, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'dataType': "json",
                       // 'Content-Type': 'application/x-www-form-urlencoded',
                  },
                    body: JSON.stringify(arr),



                })




            }



        const UpdateLocalLogs =
            async ({ Input, id, MessID, Contacts, GroupHook }) => {
             
                if (today.getMinutes() < 10) {
                    time = today.getHours() + ":0" + today.getMinutes();
                }
                else {
                    time = today.getHours() + ":" + today.getMinutes();
                }

            // last message time
              
                        if (Input.value === "") {
                            alert("empty message"); // need to change it.
                            return;
                        }

                

               
                  
                   
               var val = Input.value;
                const contact = await  GroupHook.getContact({ id, Contacts });
               await console.log(contact);

               const val1 = await AddServerLogs({ val, id, Contacts,  GroupHook });

               const val2 =  await SendTransferRequest({ val, id, Contacts, contact });
            //    await SendTransfeRequest({ val, id, Contacts });
                   
           
                 
               
               Input.setValue("")

               return;




                //Logs[id] = [[MessID, val]]






                    //        //console.log(MessageIDMap);




                    //        LastMessageTime.set(id, time);
                    //        LastMessage.set(id, Input.value);

              
                //Logs[id].push([MessID, val]);
               
             

               /*Input.UpdateListUser({ id })*/

                //LastMessageTime.set(id, time);
             
                //LastMessage.set(id, Input.value);

                //UpdateLastMessage(LastMessage);
                //UpdateLastMessageTime(LastMessageTime);
               
         
            }

        const UpdateFileLog =
            ({ id, FinalVal, MessID }) => {

                if (today.getMinutes() < 10) {
                    time = today.getHours() + ":0" + today.getMinutes();
                }
                else {
                    time = today.getHours() + ":" + today.getMinutes();
                }

                if (Logs[id] === undefined) {

              

                    Logs[id] = [[MessID, FinalVal]]



                    LastMessageTime.set(id, time);

                    LastMessage.set(id, <div> {IconHandler("AttachFile")} </div>);

                    UpdateLogs(Logs);
                    UpdateLastMessage(LastMessage);
                    UpdateLastMessageTime(LastMessageTime);
                   
                  
                   
                   
                    
                    return;

                }

                Logs[id].push([MessID, FinalVal]);
                LastMessageTime.set(id, time);
                LastMessage.set(id, <div> {IconHandler("AttachFile")} </div>);

                UpdateLogs(Logs)
                UpdateLastMessage(LastMessage);
                UpdateLastMessageTime(LastMessageTime);
                
               
                return;


               

            }

        const UpdateSoundLog =
            ({ id, FinalVal, MessID }) => {
                if (today.getMinutes() < 10) {
                    time = today.getHours() + ":0" + today.getMinutes();
                }
                else {
                    time = today.getHours() + ":" + today.getMinutes();
                }
                if (Logs[id] === undefined) {

                    LastMessageTime.set(id, time);
                    LastMessage.set(id, <div> {IconHandler("Voice")} </div>);

                    Logs[id] = [[MessID, FinalVal]]


                    UpdateLogs(Logs)
                    UpdateLastMessage(LastMessage);
                    UpdateLastMessageTime(LastMessageTime);

                    return;

                }



                LastMessageTime.set(id, time);
                LastMessage.set(id, <div> {IconHandler("Voice")} </div>);


                Logs[id].push([MessID, FinalVal]);
                UpdateLogs(Logs)
                UpdateLastMessage(LastMessage);
                UpdateLastMessageTime(LastMessageTime);
                return;



            }



        return ({ Logs, UpdateLogs, GiveLogs, UpdateLocalLogs, UpdateFileLog, UpdateSoundLog, LastMessage, LastMessageTime, forceUpdate } )



    }

export default Logs;