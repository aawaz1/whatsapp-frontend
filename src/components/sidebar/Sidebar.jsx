import { useState } from "react"
import { Notification } from "./notification"
import { Search } from "./search"
import { Sidebarheader } from "./sidebar-header"
import Conversations from "./conversation/Conversations"
import {SearchResults} from "./search"

const Sidebar = ({onlineUsers , typing}) => {
  
    const [searchResults ,setSearchResults] = useState([]);
 
  return (
    <div className="md:flex0030 w-full max-w-[100%] md:max-w-[30%] h-full select-none overflow-hidden">
    {/* Sidebar Header */}
    <Sidebarheader />
        {/* Notification */}
        <Notification/>
        {/* Search */}
        <Search searchLength={searchResults?.length} setSearchResults={setSearchResults}/>
        {searchResults?.length > 0 ? (
          <>
         
          {/* Search results */}
           <SearchResults searchResults={searchResults} setSearchResults={setSearchResults}/>
           </>
         
        ) : (
          <>
          {/* Conversation */}
         
           <Conversations onlineUsers={onlineUsers} typing={typing}/></>
        )
        }
  
   


    </div>
  )
}

export default Sidebar