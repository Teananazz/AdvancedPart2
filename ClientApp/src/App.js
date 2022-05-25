


import MessageScreen from './MessageScreen/MessageScreen'
import LoginScreen from './LoginScreen/LoginScreen';
import RegisterScreen from './RegisterForm/RegisterScreen';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserContacts from './CommonComponents/UserContacts';
import { useRef, useEffect, useState } from 'react'
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

import * as signalR from "@microsoft/signalr"


const App =
    () => {
        var Contacts = UserContacts();

        
        const [Connection, UpdateConnection] = useState(null);

        useEffect(() => {

            const func =
                async () => {
                   // const signalR = require('@microsoft/signalr');
                    var connection = new signalR.HubConnectionBuilder().withUrl("https://localhost:7179/chat").build();
                    await connection.start();
                    UpdateConnection(connection);

                }
            func();
        


        }, []); 
          

        return (
        <BrowserRouter>
            <Routes>

                    {<Route path="/" element={<LoginScreen Contacts={Contacts} />} />}
                  
                    {<Route path="Register" element={<RegisterScreen Contacts={Contacts}  />} />}

                    {<Route path="App" element={<MessageScreen Contacts={Contacts}  />} />}
                 

            </Routes>
        </BrowserRouter>
       )
    }


export default App;
