import { useDispatch, useSelector } from "react-redux"
import { Sidebar } from "../components/sidebar"
import { useEffect } from "react";
import {getConversations} from '../features/chatSlice.js'

const Home = () => {
  const {user} = useSelector(state => state.user);
  console.log(user); 
  
  const dispatch = useDispatch();
  useEffect(() => {
    if(user?.token){
      dispatch(getConversations(user.token))

    }

  },[])


  return (
    <div  className="min-h-screen dark:bg-dark_bg_1 flex items-center justify-center py-[19px] overflow-hiddens">
      {/* container */}
      <div className="container min-h-screen flex">
        {/* Sidebar */}
       <Sidebar/>
      </div>

    </div>
  )
}

export default Home