import EmojiPicker from "emoji-picker-react"
import { CloseIcon, EmojiIcon } from "../../../svg"
import { useEffect, useState } from "react"
export default function EmojiPickerApp({textRef,showPicker,setShowAttachments ,setShowPicker ,message ,setMessage}) {

  const [cursorPosition ,setCursorPosition] = useState();

  useEffect(() => {
    textRef.current.selectionEnd = cursorPosition;

  }, [cursorPosition])
  const handleEmoji = (emojiData ,e) => {
    const {emoji} = emojiData;
    const ref = textRef.current;
    ref.focus();
    const start = message?.substring(0,ref.selectionStart);
    const end = message?.substring(ref.selectionEnd);
    const newText = start + emoji + end;
    setMessage(newText);
    setCursorPosition(start.length + emoji.length);


  }

  return <li className="w-full"> 
    <button onClick={() =>{
       setShowAttachments(false); setShowPicker((prev) => !prev)} } className="btn" type="button">
   {
    showPicker ? (<CloseIcon className="dark:fill-dark_svg_1"/>) : (   <EmojiIcon className="dark:fill-dark_svg_1"/>)
   }
    </button>


    {/* Emoji Picker */}
  {
    showPicker && (
      <div className="openEmojiAnimation absolute bottom-[60px] left-[-0.5px] w-full">
      <EmojiPicker theme="dark" onEmojiClick={handleEmoji}/>
      </div>
    )
  }
    <div>

    </div>
  </li>
}
