import { AiFillEyeInvisible } from 'react-icons/ai'
import { AiFillEye } from 'react-icons/ai'
import { FiUser } from 'react-icons/fi';
import { AiFillLock } from 'react-icons/ai';
import { TiArrowRepeat } from 'react-icons/ti';
import { HiPaperAirplane } from 'react-icons/hi';
import { Gi3DGlasses } from 'react-icons/gi'
import { MdAttachFile } from 'react-icons/md'
import { FiUserPlus } from 'react-icons/fi'
import { FcPicture} from 'react-icons/fc'
import { FcCamcorderPro } from 'react-icons/fc'
import { FcSpeaker } from 'react-icons/fc'
import { BsFillMicFill} from 'react-icons/bs'
import { RiStopMiniFill} from 'react-icons/ri'
const IconHandle =
    (name) => {
        switch (name) {

            case ("FiUser"):
                return (<FiUser />);
            case ("FillLock"):
                return (<AiFillLock />)
            case ("FillEyeInv"):
                return (<AiFillEyeInvisible />)
            case ("FillEye"):
                return (<AiFillEye />);
            case ("ArrowRepeat"):
                return (<TiArrowRepeat />);
            case ("Airplane"):
                return (<HiPaperAirplane />);
            case ("3DGlasses"):
                return (<Gi3DGlasses />)
            case ("AttachFile"):
                return (<MdAttachFile />);
            case ("FiUserPlus"):
                return (<FiUserPlus />);
            case ("Picture"):
                return (<FcPicture />);
            case ("Video"):
                return(<FcCamcorderPro />);
            case ("Voice"):
                return (<FcSpeaker />);
            case ("MicOn"): {

                return (<BsFillMicFill />);
            }
            case ("MicOff"): {

                return (<RiStopMiniFill />);
            }
        }
     
    }

export default IconHandle