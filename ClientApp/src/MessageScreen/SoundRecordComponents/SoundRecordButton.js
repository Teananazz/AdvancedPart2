


import IconHandle from '../../CommonComponents/IconHandler'

import {  useState } from 'react'

// needs to be outside function in order to be recognized from deactivate.
var mediaRecorder;

const SoundRecordButton =

    

    


    (props) => {

        

        
        var Obj = {
            audio: true,
            video: false
        };
        
      
        var chunks = [];
        var AudioURL;


        const [RecordButton, UpdateButton] = useState(0);

        const Activate =
            () => {

                navigator.mediaDevices.getUserMedia(Obj)
                    .then((mediaStreamObj) => {
                        MediaStream = mediaStreamObj;
                        mediaRecorder = new MediaRecorder(mediaStreamObj)
                       
                       
                    })
                    .then(() => {

                        mediaRecorder.start();
                        console.log(mediaRecorder.state);



                    })

                return;

            }


        const Deactivate =
            (ev) => {
               
                mediaRecorder.stop();
                mediaRecorder.ondataavailable = function (e) {

                    chunks.push(e.data);



                    console.log(mediaRecorder.state)

                    let blob = new Blob(chunks, {
                        'type': 'audio/webm'
                    });
                   
                    chunks = [];
                    let videoURL = window.URL.createObjectURL(blob);


                    AudioURL = videoURL;

                



                    var FinalVal =
                        <audio controls>
                            <source src={AudioURL} />
                        </audio>
                    var id = props.id;
                    var MessID= props.MessID;
                    props.Logs.UpdateSoundLog({ id, FinalVal, MessID  })
                    props.func(); // re-renders TextBox (so it shows it instantly)
                    props.forceGroupListing();
                }





            }




        const Func =
            (e) => {
               

                if (RecordButton === 0) {

                    UpdateButton(1);
                    
                    return Activate();

                }
                else {
                   
                    UpdateButton(0);
                    
                    return Deactivate(e);

                }

            }
        const GiveIcon =
            () => {

                if (RecordButton === 0) {
                    return IconHandle("MicOn")
                }
                return IconHandle("MicOff");


            }
        return (
            <>
                <button onClick={(e)=> Func(e)} id="button-72" className="btn btn-outline-secondary" type="button">{GiveIcon()}</button>
            </>

        )
    }

export default SoundRecordButton;