import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import PDF from './files/PDF.webp';
import TXT from './files/TXT.webp';
import PPTX from './files/PPTX.webp';
import DOCX from './files/DOCX.webp';
import VideoThumbnail from 'react-video-thumbnail';
import Add from './Add';
import { CloseIcon, SendIcon } from '../../../../svg';
import { uploadFiles } from '../../../../utils/uplaod.utils';
import { removeFileFromFiles, sendMessages } from '../../../../features/chatSlice';
import SocketContext from '../../../../context/socketContext';
import { ClipLoader } from 'react-spinners';

function SendAndUpdate({activeIndex ,message, setActiveIndex ,socket}) {
    const dispatch = useDispatch();
    const [loading ,setLoading] = useState(false);
    const {files,activeConversation }  = useSelector(state => state.chat);
    const {user }  = useSelector(state => state.user);
    const {token} = user;
    const handleRemoveFile = (index) => {
        dispatch(removeFileFromFiles(index))
        console.log(index);
    }
    const SendMessageHandler  = async(e) => {
        setLoading(true);
        e.preventDefault();
        // upload file first
        const uploadedFiles = await uploadFiles(files);
    // send the messages
    const values = {
        token ,message ,convo_id : activeConversation._id,
        files : uploadedFiles.length > 0 ? uploadedFiles : []
    }

    let newMsg = await dispatch(sendMessages(values));
    socket.emit("send message" ,newMsg.payload);
    setLoading(false);


    }
       
    const fileTypeToImage = {
        PDF: PDF,
        TXT: TXT,
        PPTX: PPTX,
        DOCX: DOCX
    };
  return (
    <div className='w-[97%] flex items-center justify-between mt-2 border-t  dark:border-dark_bg_2'>
        {/* Empty */}
        <span></span>
        {/* List Files */}
        <div className="flex items-center gap-x-2">
            {
                files.map((file ,i) => (
                    <div key={i} onClick={() => setActiveIndex(i)} className={`w-14 filesThumbnail relative h-14 mt-2 border ${activeIndex=== i ? "border-[3px] !border-green_1" : ""} dark:border-white rounded-md overflow-hidden cursor-pointer`}>
                        {
                            file.type === 'IMAGE' ? (
                                <img src={file.fileData} alt='' className='w-full h-full object-cover'/>
                            ) : files.type === "VIDEO" ? (
                                <VideoThumbnail 
                                videoUrl={file.fileData} 
                              
                                />

                            ) :  (
                                <img alt={files.name} src={fileTypeToImage[files[0].type]} className='w-8 h-10 mt-1.5 ml-2.5'/>
                            )
                        }

                        {/* Remove file */}
                      <div onClick={() => handleRemoveFile(i)} className="removeFile hidden">  <CloseIcon  className="dark:fill-white w-4 h-4 absolute right-0 top-0"/></div>
                    </div>
                  
                   

                ))
            }
            {/* Add Another File */}
            <Add setActiveIndex={setActiveIndex} activeIndex={activeIndex}/>
        </div>
        {/* Send Button */}
        <div onClick={(e) => SendMessageHandler(e)} className='bg-green_1 w-16 h-16 mt-2 rounded-full  flex items-center justify-center cursor-pointer'>
           {loading ? <ClipLoader color="#E9EDEF" size={25}/> :<SendIcon className="fill-white"/>} 

        </div>
    </div>
  )
}


const SendAndUpdateWithContext = (props) => (
    <SocketContext.Consumer>
        {
            (socket) => (<SendAndUpdate {...props} socket={socket}/>)
        }

    </SocketContext.Consumer>

    )

export default SendAndUpdateWithContext;