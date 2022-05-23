import { useState } from 'react'

const RegisterAuth =

    ({ Contacts, user, password, passwordvalid }) => {


        // maybe there is no need for most of the function 
        // there is form check for html5 need to look at it.

        var myListU = Contacts.Users.map(
            (user) => (
                user.id
            )

        )
        if (myListU.indexOf(user.value) != -1) {

            alert("this username is already taken ")
            return false;

        }








        // check if password is different from passwordvalid
        if (!(password.value === passwordvalid.value)) {
            alert("Your Password is diferent from passwordvalid")
            return false;
        }
        // if the password is all numbers
        var check = false
        for (let i = 0; i < password.value.length; i++) {
            if (isNaN(password.value[i])) {
                check = true;
            }
        }
        if (check === false) {
            alert("Need letters in password")
            return false;
        }
        // if the password has no numbers
        check = false
        for (let i = 0; i < password.value.length; i++) {
            if (!isNaN(password.value[i])) {
                check = true;
            }
        }
        if (check === false) {
            alert("Need numbers in password")
        }
        return check;
    }

export default RegisterAuth