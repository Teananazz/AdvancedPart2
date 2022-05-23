import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { useState, useEffect } from 'react'
import IconHandle from "../CommonComponents/IconHandler"
import UserContacts from "../CommonComponents/UserContacts"
import useInput from "../hooks/UserInput";
const AddGroupButton =
    ({ Input, Contacts, GroupHook, UpdateCycleLog, UpdateIndex, Index }) => {
        const [show, setShow] = useState(false)
    
        const handleClose = () => setShow(false);
        const handleShow = () => setShow(true);


        const [Cycle, UpdateCycle] = useState("0"); 


        

        var [Mapping, setMapping] = useState(null);


        // every time we update the messages in chat we call this function by updating CycleLog.
        useEffect(() => {

            var User = UserName.value;
            var Nick = NickName.value;
            var Serv = Server.value;

         

            async function checkData() {

                if (User == "") {
                    return;
                }
              

                await GroupHook.UpdateGroups({ User, Nick, Serv });
                
                UpdateIndex([..."0"]); // re-render GroupListing when Groups is updated.
            
            }
            checkData();



        }, [Cycle]); 





      


        const UserName = useInput("");
        const NickName = useInput("");
        const Server = useInput("");


        var List = Contacts;
       

        {/*  added value so that we can use e.target.value to know which user was focused
         *  OnClick we can't know the target value (i think) so i have to use focus.*/}
        //var Lisiting = Input.ContactList.map((value) =>
        //    <Button id={value.id} key={value.id}
        //        onFocus={(e) => {
        //            Input.UpdateGroups({ value })
        //          }
        //        }
        //        variant="outline-secondary">
        //        <div className="GroupCanditate">

        //            {value.nickname} <br /> <img src={value.img} height="50" width="50" /> <br />


        //        </div>  </Button>)

       
        //var Filtering = Contacts.Listing.filter(value => value.userName != Contacts.CurrentUser)

        //var Lisiting = Filtering.map((value) =>
        //    <Button id={value.userName} key={value.userName}
        //        onFocus={ async (e) => {
        //            console.log( await Input.UpdateGroups({ value }));
        //        }
        //        }
        //        variant="outline-secondary">
        //        <div className="GroupCanditate">

        //           <div className = "Design_Button">  {value.nickname} </div> 


        //        </div>  </Button>)


        return (
            <>
                <Button variant="outline-secondary" id="AddGroup" onClick={handleShow} >
                    {IconHandle("FiUserPlus")}
                </Button>

                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton id="ModalStyle">
                        <Modal.Title id="ModalType" >Adding Users to the Group </Modal.Title>
                    </Modal.Header>
                    <Modal.Body id="ModalBody">{/* {Lisiting}*/}
                        <div className="row-lg-3" />

                        <div className="input-group mb-3">
                           
                            <input type="text" value={UserName.value} onChange={UserName.onChange} className="form-control" placeholder="Username" />

      

                        </div>

                        <div className="input-group mb-3">

                            <input type="text" value={NickName.value} onChange={NickName.onChange} className="form-control" placeholder="NickName" />



                        </div>

                        <div className="input-group mb-3">

                            <input type="text" value={Server.value} onChange={Server.onChange} className="form-control" placeholder="ServerIP" />



                        </div>


                    </Modal.Body>
                    <Modal.Footer>

                        <Button variant="secondary" onClick={
                            () => {
                                console.log("render groups");
                                
                                UpdateCycle([..."2"]);

                              
                                handleClose()
                            }
                        }
                        >
                            Add User
                        </Button>

                    </Modal.Footer>
                </Modal>
            </>


        )
    }

export default AddGroupButton;