import { useState } from 'react'


const UserAuth =

    ({ Contacts, user, password }) => {

       

        var myListU = Contacts.Users.map(
            (user) => (
                user.id
            )

        )
        var myListP = Contacts.Users.map(
            (user) => (
                user.password
            )
        )

        var index1 = myListU.indexOf( user.value);
        var index2 = myListP.indexOf(password.value);

     
        return ( index1 == index2 && index1!= -1)

    }

export default UserAuth