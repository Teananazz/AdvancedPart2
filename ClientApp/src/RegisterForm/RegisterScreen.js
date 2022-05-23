import React from 'react'
import useState from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Button from 'react-bootstrap/Button';

import useInput from "../hooks/UserInput";
import IconHandle from "../CommonComponents/IconHandler"
import Eyehook from "../hooks/Eyehook"
import RegisterAuth from './RegisterAuth';
import Filehook from '../hooks/Filehook';
import { Link } from 'react-router-dom';
import {InputGroup, FormControl, Form} from 'react-bootstrap'
import UserContacts from '../CommonComponents/UserContacts'

import { useNavigate } from "react-router-dom";
const RegisterScreen =
    ({ Contacts }) => {
      
        const user = useInput("")
        const password = useInput("")
        const passwordvalid = useInput("")
        const passType = Eyehook("FillEye")
        const passTypeR = Eyehook("FillEye")
        const display = useInput("")
        const photo = Filehook("")
        let navigate = useNavigate();

        const func =
            async () => {
                const object = user.value;
           
                var res;
                const r = await fetch('https://localhost:44459/api/Users/Details', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'dataType': "json"
                        // 'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: JSON.stringify(object),

                })

                // we handle null so we don't send it to r.json 
                var text = await r.text();
                if (text.length == 0) {
                    return null;
                }

                res = await JSON.parse(text);


                return res;
            }

        const updateUsers =
            async () => {
                var img = photo.value
                var displayval = display.value;
                var userid = user.value;
                var passwordid = password.value;
                const arr = [userid, passwordid, img, displayval];
               

                var res;
                const r = await fetch('https://localhost:44459/api/Users/1', {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                        'dataType': "json"
                        // 'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: JSON.stringify(arr),

                })

                console.log(r);
          
                return r;
            }


        const onAttempt =
           async () => {
                if (user.value === '' || password.value === '' || passwordvalid.value === '' || display.value === '' || photo.value ==='') {
                    alert("One or more fields empty")
                    return;
                }
                var img = photo.value
                var displayval = display.value;
            //    var check = RegisterAuth({Contacts, user, password, passwordvalid })

               var result = await func(); 
               console.log(result);
               var check = false;
               if (result != null) {
                   alert("this username is already taken ");
                   check = false;
               } else {
                   check = true;
               }


               console.log(check);
                if (check === false) {
                    user.setValue("")
                    password.setValue("")
                    passwordvalid.setValue("")
                    display.setValue("")
                    photo.setValue("")
                    return;
                }

                alert("Register Complete ") // just for checking - later will change
                var userinfo = user.value;

               

               var userpassword = password.value;
               var status = await updateUsers();
               if (!status) {
                   alert("Failure creating user");
               }

               // Contacts.UpdateList({ userinfo, userpassword, img, displayval})

                user.setValue("")
                password.setValue("")
                passwordvalid.setValue("")
                display.setValue("")


                let path = '/'
                // this will teleport to the login screen without reloading.
                navigate(path);
                
               return;
               
            }

     
        return (
            <>
                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">
                        {IconHandle("FiUser")}
                    </InputGroup.Text>
                    <Form.Control type="text"
                        value={user.value}
                        onChange={user.onChange}
                        className="form-control"
                        placeholder="UserName"
                       />
                    </InputGroup>

                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">
                        {IconHandle("FillLock")}
                    </InputGroup.Text>
                    <Form.Control type={passType.m}
                        value={password.value}
                        onChange={password.onChange}
                        className="form-control"
                        placeholder="Password"
                    />
                    
                    <Button variant="outline-secondary"
                        onClick={passType.onChange}
                        id="button-addon2"
                        className="eyebutton-login2"
                    >
                        {IconHandle(passType.value)}
                        </Button>
                        
                </InputGroup>


                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">
                        {IconHandle("ArrowRepeat")}
                    </InputGroup.Text>
                    <Form.Control type={passTypeR.m}
                        value={passwordvalid.value}
                        onChange={passwordvalid.onChange}
                        className="form-control"
                        placeholder="Password validation"
                    />

                    <Button variant="outline-secondary"
                        onClick={passTypeR.onChange}
                        id="button-addon2"
                        className="eyebutton-login2"
                    >
                        {IconHandle(passTypeR.value)}
                    </Button>

                </InputGroup>

               
             
                <InputGroup className="mb-3">
                    <InputGroup.Text id="basic-addon1">
                        {IconHandle("FiUser")}
                    </InputGroup.Text>
                    <Form.Control type="text"
                        value={display.value}
                        onChange={display.onChange}
                        className="form-control"
                        placeholder="Displayname"
                    />
                </InputGroup>

           

             
                <>
                    <InputGroup className="mb-3">
                        <InputGroup.Text id="basic-addon1">
                            <img src={photo.value} width="200" height="200" />
                        </InputGroup.Text>
                        <Form.Control type="file"
                   
                            onChange={photo.onChange}
                            className="form-control"
                            placeholder="Displayname"
                            aria-label="Upload"
                        />
                    </InputGroup>

                    
                 
                    <div class="flexbuttons">

                        <Link to="/">
                            <Button as="input" type="button" variant="btn btn-outline-warning" value="Back" className="Test2" />
                        </Link>                       

                     

                        <Button
                            onClick={onAttempt}
                            as="input"
                            type="button"
                            variant="btn btn-outline-warning"
                            value="Register"
                            className="Test2"
                        />{''}
                    </div>
                </>

            </>

        )
    }

export default RegisterScreen;