import * as Yup from 'yup';

export const signupSchema = Yup.object({
    name : Yup.string().required("Full Name is Required")
              .matches(/^[a-zA-Z_ ]*$/ , "No Special characters is allowed")
              .min(2 , "Name is too short").
              max(18 , "Name must be between 2 to 18 characters"),
    email : Yup.string().required("Email is Required").email("Invalid Email Address"),
    status : Yup.string().required("Status must be less than 64 characters"),
    password : Yup.string().required("Password is Required")
               .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])([A-Za-z\d@$!%*?&]).{6,}$/,"Password must contain atleast 6 Characters ,1 uppercase, 1 lowercase , 1 number and a special characters")
           
});


export const signinSchema = Yup.object({
    email : Yup.string().required("Email is Required").email("Invalid Email Address"),
    password : Yup.string().required("Password is Required")
});