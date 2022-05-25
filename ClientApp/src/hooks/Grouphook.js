

import UserContacts from '../CommonComponents/UserContacts'
import ScriptedLogs from '../CommonComponents/ScriptedLogs'
import { useState } from "react";

const Grouphook = ({ Contacts }) => {

    //var Filtered = UserContacts().ScriptedContacts.filter((value, index) => index >= 5);
    //var Filtered_else = UserContacts().ScriptedContacts.filter((value, index) => index < 5);

   

    //const [List, UpdateList] = useState(Contacts.CurrentUser === 'Teanana'? Filtered: Filtered_else); // current shown groups

    //console.log(Contacts.UserName);

    //const FilteredArray = Contacts.Listing.filter(value => value.userName != Contacts.CurrentUser)
  

    const [ContactList, UpdateContactList] = useState([]); // group canditates.
    const [ChatList, UpdateChatList] = useState([]);

    

   /* const UniqueContact = ContactList.map((value) =>  value.nickname );*/
      
    const fetchChatWindows =
        async () => {

         
              
         
           var bearer = 'Bearer ' + Contacts.Token;
               var res;
               const r = await fetch('https://localhost:44459/api/contacts', {
                   method: "GET",
                   headers: {
                       'Content-Type': 'application/json',
                       'Authorization': bearer,
                       // 'Content-Type': 'application/x-www-form-urlencoded',
                   },
            
               })

         


           var text = await r.text();
                if (text.length == 0) {
                    return "";
                }

                res = await JSON.parse(text);


                return res;

        }



    const getChatWindows =
        async () => {
            
            var List = await fetchChatWindows();
         
            UpdateChatList(List);

           
          return List;

        }

    const AddContact =
        async ({ User, Nick, Serv }) => {

          
            console.log(Serv);
            const object1 = User;
            const object2 = Nick
            const object3 = Serv; // TODO: Change the way we choose new contacts. Need to be able to write the details.
            //const object = value.userName;
            //const object2 = value.password;
            var bearer = 'Bearer ' + Contacts.Token;
            const arr = [object1, object2, object3];
           
            //  var res;
            const r = await fetch('https://localhost:44459/api/contacts', {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json',
                    'dataType': "json",
                    'Authorization': bearer,
                    // 'Content-Type': 'application/x-www-form-urlencoded',
                },
                body: JSON.stringify(arr)

            });

            //  })

            //  res = await r.text();

         
        }

    const SendInvitation =
        async ({ User, Nick, Serv }) => {

            var string = 'https://'.concat(Serv).concat("/api/invitations");
            var Current = Contacts.CurrentUser;
            var arr = [Current, User, Serv];
          
            const r = await fetch(string, {
                method: "POST",
                headers: {
                 'Content-Type': 'application/json',
                 'dataType': "json",
                  // 'Content-Type': 'application/x-www-form-urlencoded',
              },
                body: JSON.stringify(arr),



            })

          //const r = await fetch('https://localhost:44459/api/Users/Login', {
          //    method: "POST",
          //    headers: {
          //        'Content-Type': 'application/json',
          //        'dataType': "json"
          //        // 'Content-Type': 'application/x-www-form-urlencoded',
          //    },
          //    body: JSON.stringify(arr),


          //})

          //res = await r.text();



        }
    const getContact =
        async ({ id, Contacts }) => {

            console.log(Contacts);
            var bearer = 'Bearer ' + Contacts.Token;
            const string = "https://localhost:44459/api/contacts".concat("/").concat(id);
            var r;
            try {
                 r = await fetch(string, {
                    method: "GET",

                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': bearer,
                        //        // 'Content-Type': 'application/x-www-form-urlencoded',
                        //    },
                        //  
                    }
                });
            }
            catch (e) {
                console.log(e);
            }

          var  res = await r.text();
            if (res.length == 0) {
                return "";
            }
            res = await JSON.parse(res);
            return res;

        }

   


    const UpdateGroups =
        async ({ User, Nick, Serv } ) => {
          
            await AddContact({ User, Nick, Serv });

            await SendInvitation({ User, Nick, Serv }); // need to add this.

          
      /*     UpdateContactList( ContactList.filter(value => value.userName != value.userName));*/

           
          

        }

    //const UpdateGroups =
    //    ({ value }) => {

    //        if (value === "") {
    //            // need to change it.
    //            return;
    //        }
          
    //        var Index = UniqueContact.indexOf(value.id);
    //       // Indeed, splice actually changes the original array. Later will change when i can force re-render.

    //        var list = ContactList;
    //        list.splice(Index, 1);

    //        UpdateContactList(list)
           
    //        list = List;

    //        list = list.concat(value);
    //        UpdateList(list);

          

    //    }
    
    return { ChatList, getChatWindows, UpdateGroups, ContactList, UpdateContactList, getContact };
};

export default Grouphook