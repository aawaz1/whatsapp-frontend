import { useState } from "react";
import { ReturnIcon } from "../../../svg";
import UnderlineInput from "./UnderlineInput";
import MultiSelect  from "./MultiSelect";
import { useDispatch, useSelector } from "react-redux";
import ClipLoader from 'react-spinners/ClipLoader';
import { FaCheck } from "react-icons/fa";


import axios from "axios";
import { createGroupConversation } from "../../../features/chatSlice";

export default function CreateGroup({setShowGroup}) {
  const dispatch = useDispatch();
  const {user} = useSelector(state => state.user);
  const {status} = useSelector(state => state.chat);
  console.log(status , "statusstaus")
    const [name ,setName] = useState("");
    const {token} = user;
    const [searchResults ,setSearchResults] = useState([]);
    const [selectedUsers ,setSelectedUsers] = useState([]);
    console.log(selectedUsers , "sssssssssssss")
    const handleSearch =  async(e) => {
      setSearchResults([]);
      if(e.target.value && e.key == "Enter"){
        try {
            const{ data }= await axios.get(`${process.env.REACT_APP_API_ENDPOINT}/user?search=${e.target.value}` , {
                headers : {
                    Authorization : `Bearer ${token}`
                }
            });
            if(data.length > 0){
              let tempArr = [];
              data.forEach(user => {
                let temp = {
                  value : user._id,
                  label : user?.name,
                  picture : user?.picture
                };
                tempArr.push(temp);
                
              });
              setSearchResults(tempArr);
            }else{
              setSearchResults([]);

            }
            
           
           
            
        } catch (error) {
            console.log(error.response.data.error.message);
            
        }
        
        }else{
            setSearchResults([]);
        }

    }

    const createGroupHandler = async() => {
      if(status !== "loading"){
        let users = []
         selectedUsers.forEach(user => {
          users.push(user.value)
          
        });
        let values = {name ,users , token}
       let newConvo = await dispatch(createGroupConversation(values))

      }
    }
  return (

    <div className="creatGroupAnimation flex0030 relative h-full z-40">
        {/* Container */}
        <div className="mt-5">
            {/* Return/Close Button */}
            <button onClick={() => setShowGroup(false)} className="btn w-6 h-6 border ">
                <ReturnIcon className="fill-white"/>
            </button>
            {/* group name input */}
           <UnderlineInput name={name} setName={setName}/>
           {/* Multi Select */}
           <MultiSelect 
           setSelectedUsers={setSelectedUsers}
           selectedUsers={selectedUsers}
            searchResults={searchResults}
            handleSearch={handleSearch}
            />
            {/* Group Button */}
            <div className="absolute bottom-1/3 left-1/2 -translate-x-1/2 max-h-20">
            <button onClick={createGroupHandler} className="btn  bg-green_1  scale-150 hover:bg-green-500">
              {
                status === "loading" ? <ClipLoader color="E9EDEF" size={25}/>  : <FaCheck className="fill-white text-lg "/>
              }
              </button></div>
        </div>
    </div>
  )
}
