import {useForm}  from 'react-hook-form'
import Authinput from './auth/Authinput.jsx'
import {yupResolver} from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import PulseLoader from 'react-spinners/PulseLoader';
import { signupSchema } from '../utils.js/validation.js';
import { Link, useNavigate } from 'react-router-dom';
import { changeStatus, registerUser } from '../features/userSlice.js';
import { useState } from 'react';
import Picture from './auth/Picture.jsx';
import axios from 'axios';


const cloud_secret = process.env.REACT_APP_CLOUD_SECRET
const cloud_name = process.env.REACT_APP_CLOUD_NAME
const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
 
  const { register,handleSubmit,watch ,formState: { errors } } = useForm({resolver : yupResolver(signupSchema)});
  const {status ,error} = useSelector((state) => state.user)
  const [picture , setPicture] = useState();
  const [readablePicture , setReadablePicture] = useState("");
  const uploadImage = async () => {
    let formData = new FormData()
    formData.append('upload_preset' , cloud_secret)
    formData.append('file' , picture)
    const {data} = await axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload` , formData)
    console.log(data)
    return data;
  }
  const onSubmit = async (data) => {
   
    dispatch(changeStatus("loading"));
    if(picture){
      // upload to cloudinary and then register
      await uploadImage().then(async(response) => {
        let res = await dispatch(registerUser({...data , picture :response.secure_url}));
        if(res?.payload?.user)
        navigate("/");

      })

    }else{
     let  res = await dispatch(registerUser({...data , picture :""}));
       if(res?.payload?.user)
       navigate("/");
     
      
    }
   

   
  };
 
 
 
  return (
    <div className='min-h-screen w-full flex items-center justify-center overflow-hidden'>
        {/* container */}
        <div className='w-full max-w-md space-y-8 p-10 dark:bg-dark_bg_2 rounded-xl'>
            {/* heading */}
            <div className="text-center dark:text-dark_text_1">
                <h2 className="mt-6 text-3xl font-bold">Welcome</h2>
                <p className='mt-2 text-sm'>Sign Up</p>
            </div>

            {/* form */}
            <form  onSubmit ={handleSubmit(onSubmit)} className='mt-6 space-y-6'>
              <Authinput
              name="name"
              type="text"
              placeholder= "Please Enter Your Full Name"
              register={register}
              error={errors?.name?.message}
              />
               <Authinput
              name="email"
              type="text"
              placeholder= "Please Enter Your Email Address"
              register={register}
              error={errors?.email?.message}
              />
               <Authinput
              name="status"
              type="text"
              placeholder= "Please Enter A Status(Optional)"
              register={register}
              error={errors?.status?.message}
              />
               <Authinput
              name="password"
              type="password"
              placeholder= "Please Enter A Unique Password"
              register={register}
              error={errors?.password?.message}
              />
              {/* for picture section */}
              <Picture readablePicture={readablePicture} setPicture={setPicture}  setReadablePicture={setReadablePicture}/>
              {/* if we have an error */}
              {error && (<div>
  <p className='text-red-400'>{error}</p>
</div>)}

               {/* submit button */}
              <button className='w-full flex justify-center bg-green_1 text-gray-100 p-4 rounded-full tracking-wide font-semibold focus:outline-none hover:bg-green_2 shadow-lg cursor-pointer transition ease-in duration-300' type='submit'>
                {status == "loading" ? (<PulseLoader color="#fff" size={16}/> ): "Sign Up" }
              </button>
              {/* sign in links */}
              <p className='flex flex-col items-center justify-center mt-10 text-center text-md dark:text-dark_text_1'>
                <span>have an account</span>
                <Link rel="stylesheet" href="/login" className='hover:underline cursor-pointer transition ease-in duration-300'>Sign In</Link>
              </p>
            </form>

        </div>
    </div>
  )
}

export default RegisterForm