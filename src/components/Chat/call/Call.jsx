import Header from "./Header";
import Ringing from "./Ringing";
import CallArea from './CallArea'
import CallActions from './CallActions'
import { useState } from "react";

export default function Call({call,setShow ,setCall,answerCall, stream ,userVideo ,myVideo ,callAccepted}) {

  const {recievingCall , callEnded, name ,picture} = call;
  console.log(recievingCall,callAccepted , "call------------" )
  const [showActions ,setShowActions] = useState(false)
  return (
    <>
    <div className={`fixed overflow-hidden cursor-pointer callbg rounded-2xl bg-slate-900 top-1/2 left-1/2 -translate-x-1/2 w-[350px] h-[550px] z-10 -translate-y-1/2 ${recievingCall && !callAccepted ? "hidden" : ""}`}
    onMouseOver={() => setShowActions(true)}
    onMouseOut={() => setShowActions(false)}

    >
      <div>
        <div>
          {/* Header */}
          <Header/>
          {/*Call Area  */}
          <CallArea  name={name} picture={picture} />
          {/* Call Actions */}
        {
          showActions ? (<CallActions/>) : null
        }
        </div>
        {/* Videos Streams */}
        <div>
           {/* User Video */}
          {
            callAccepted && !callEnded && (
              <div>
              <video playsInline muted autoPlay className="LargeVideoCall" ref={userVideo}></video>
              </div>
            )
          }
         
          {/* My Video */}
         {
          stream ? ( <div>
            <video ref={myVideo} playsInline muted autoPlay className={`SmallVideoCall ${showActions ? 'moveVideoCall' : null}`}></video>
           </div>) : null
         }
        
           
        </div>

      </div>
      </div>

  {recievingCall && !callAccepted  ? (    <div>
    <Ringing call={call} setCall={setCall} answerCall={answerCall}/>
</div>) : null}
</>

  )
}
