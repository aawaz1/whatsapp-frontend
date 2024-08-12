import { useState } from "react"
import { Notification } from "./notification"
import { Search } from "./search"
import { Sidebarheader } from "./sidebar-header"

const Sidebar = () => {
    const [searchInput ,setSearchInput] = useState([]);
  return (
    <div  className="w-[40%] h-full select-none">
        {/* Sidebar Header */}
        <Sidebarheader/>
        {/* Notification */}
        <Notification/>
        {/* Search */}
        <Search searchResults={searchInput.length}/>


    </div>
  )
}

export default Sidebar