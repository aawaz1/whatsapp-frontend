import {useForm}  from 'react-hook-form'
import Authinput from './auth/Authinput.jsx'
import {yupResolver} from '@hookform/resolvers/yup';
import { useDispatch, useSelector } from 'react-redux';
import PulseLoader from 'react-spinners/PulseLoader';
import { signinSchema } from '../utils/validation.js';
import { Link, useNavigate } from 'react-router-dom';
import { loginUser} from '../features/userSlice.js';






const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
 
  const { register,handleSubmit ,formState: { errors } } = useForm({resolver : yupResolver(signinSchema)});
  const {status ,error} = useSelector((state) => state.user);
  console.log(error);

 
  const onSubmit = async (values) => {
    let  res = await dispatch(loginUser({...values}));
   
  
    if(res?.user){
      navigate('/')
    }
  };
 
 
 
  return (
    <div className='min-h-screen w-full flex items-center justify-center overflow-hidden'>
        {/* container */}
        <div className='w-full max-w-md space-y-8 p-10 dark:bg-dark_bg_2 rounded-xl'>
            {/* heading */}
            <div className="text-center dark:text-dark_text_1">
                <h2 className="mt-6 text-3xl font-bold">Welcome Back</h2>
                <p className='mt-2 text-sm'>Sign In</p>
            </div>

            {/* form */}
            <form  onSubmit ={handleSubmit(onSubmit)} className='mt-6 space-y-6'>
             
               <Authinput
              name="email"
              type="text"
              placeholder= "Please Enter Your Email Address"
              register={register}
              error={errors?.email?.message}
              />
               
               <Authinput
              name="password"
              type="password"
              placeholder= "Please Enter A Unique Password"
              register={register}
              error={errors?.password?.message}
              />
             
              {/* if we have an error */}
              {
                error && (<div>
                  <p className='text-red-400'>{error}</p>
                </div>)
              }

               {/* submit button */}
              <button className='w-full flex justify-center bg-green_1 text-gray-100 p-4 rounded-full tracking-wide font-semibold focus:outline-none hover:bg-green_2 shadow-lg cursor-pointer transition ease-in duration-300' type='submit'>
                {status == "loading" ? (<PulseLoader color="#fff" size={16}/> ): "Sign In" }
              </button>
              {/* sign in links */}
              <p className='flex flex-col items-center justify-center mt-10 text-center text-md dark:text-dark_text_1'>
                <span> dont have an account</span>
                <Link rel="stylesheet" to="/register" className='hover:underline cursor-pointer transition ease-in duration-300'>Sign In</Link>
              </p>
            </form>

        </div>
    </div>
  )
}

export default LoginForm