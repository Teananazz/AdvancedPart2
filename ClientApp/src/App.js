


import MessageScreen from './MessageScreen/MessageScreen'
import LoginScreen from './LoginScreen/LoginScreen';
import RegisterScreen from './RegisterForm/RegisterScreen';
import 'bootstrap/dist/css/bootstrap.min.css';
import UserContacts from './CommonComponents/UserContacts';
import { useRef } from 'react'
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

const App =
    () => {
        var Contacts = UserContacts();
        

        return (
        <BrowserRouter>
            <Routes>

                    {<Route path="/" element={<LoginScreen Contacts={Contacts} />} />}
                  
                    {<Route path="Register" element={<RegisterScreen Contacts={Contacts} />} />}

                    {<Route path="App" element={<MessageScreen Contacts={Contacts} />} />}
                 

            </Routes>
        </BrowserRouter>
       )
    }


export default App;
