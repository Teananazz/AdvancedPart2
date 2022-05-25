
import UserAuth from './UserAuth';
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';
import { useState } from 'react'
import useInput from "../hooks/UserInput";
import IconHandle from "../CommonComponents/IconHandler"
import Eyehook from "../hooks/Eyehook"
import { Link } from "react-router-dom";
import * as signalR from "@microsoft/signalr"
import { useNavigate } from "react-router-dom";

const LoginScreen =
    ({ Contacts }) => {
      
        const user = useInput("");
        const password = useInput("");
        const Eye = Eyehook("FillEye");


        const func =
            async () => {
                const object = user.value;
                const object2 = password.value;
                const arr = [object, object2];
                var res;
                const r = await fetch('https://localhost:44459/api/Users/Login', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'dataType': "json"
                        // 'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: JSON.stringify(arr),
                    

                })

                res = await r.text();
             
              
                
               
             
                return res
            }




        //const TestToken =
        //    async () => {
        //        const object = user.value;
        //        var bearer = 'Bearer ' + Contacts.Token;
        //        console.log(bearer); // for debugging
        //        var res;
        //        const r = await fetch('https://localhost:44459/api/contacts', {
        //            method: "GET",
        //            headers: {
        //                'Authorization': bearer,
        //                'Content-Type': 'application/json',
                       

        //                // 'Content-Type': 'application/x-www-form-urlencoded',
        //            },
                   

        //        })

        //        // we handle null so we don't send it to r.json 
        //        var text = await r.text();
        //        if (text.length == 0) {
        //            return null;
        //        }

        //        res = await JSON.parse(text);


        //        return res;

        //    }



        let navigate = useNavigate();
        const onAttempt =
           async () => {

             

               
                
                if (user.value === '' || password.value === '') {
                    alert(" One or more fields empty")
                    return;
               }
               var queryresult = await func();
             
               if (queryresult == "" || queryresult ==null) {

                    alert("Incorrect user/password")
                    return;
                }

                alert("Connecting ") // just for checking - later will change
               Contacts.UpdateCurrentUser(user.value);

           
               Contacts.UpdateToken(queryresult);
               console.log(queryresult);
            
               // Gives the list of contacts of the user.
               try {
                   var ListCheck = await Contacts.func({ queryresult })

               }
               catch (e) {
                   console.log(e);
               }
             
              


                   
                  
                           // const signalR = require('@microsoft/signalr');
              



              

               var connection = new signalR.HubConnectionBuilder().withUrl("https://localhost:7179/chat").configureLogging(signalR.LogLevel.Information).build();
               await connection.start();

               Contacts.UpdateConnection(connection);

           
       
               
                
                let path = 'App';
               navigate(path);

              


               // UpdateConnection(connection);




            }



        return (

            < div className="Login">
                 
                <div className="LoginBubble">
                    

                    
                    <div className="row ">
                       
                        <div className="row-lg-3" />
                        
                        <div className="input-group mb-3">
                            <span className="input-group-text" id="basic-addon2"> {IconHandle("FiUser")}  </span>
                            <input type="text" value={user.value} onChange={user.onChange} className="form-control" placeholder="Username" />



                        </div>

                        <div className="input-group mb-3 ">
                            <span className="input-group-text" id="basic-addon1">   {IconHandle("FillLock")}   </span>
                            <input type={Eye.m} value={password.value} onChange={password.onChange} className="form-control" placeholder="Password" />
                            <div className="input-group-btn">
                                <button variant="btn btn-outline-primary" onClick={Eye.onChange} className="eyebutton-login"  > {IconHandle(Eye.value)} </button>

                            </div>
                        </div>
                        <>



                            <div className="flexbuttons">
                                <Button onClick={onAttempt} as="input" type="button" variant="btn btn-outline-warning" value="login" className="Test1" />
                                <Link to="/Register">
                                    <Button as="input" type="button" variant="btn btn-outline-warning" value="Register" className="Test2" />
                                </Link>
                            </div>
                        </>


                    </div>
                </div>

            </div>

        )
    }

export default LoginScreen;