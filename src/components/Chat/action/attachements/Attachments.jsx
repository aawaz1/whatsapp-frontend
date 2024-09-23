import { useState } from "react";
import { AttachmentIcon } from "../../../../svg";
import Menu from "./menu/Menu";

export default function Attachments({showAttachments,setShowPicker, setShowAttachments}) {
 
  return (
    <li className="relative">
      <button onClick={(prev) => {
        setShowPicker(false);
        setShowAttachments(prev => !prev)
      }} className="btn" type="button">
        <AttachmentIcon  className="dark:fill-dark_svg_1"/>

      </button>
      {/* Menu */}
   {
    showAttachments ?    <Menu/> : null
   }

    </li>
  )
}
