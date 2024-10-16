import axios from "axios";

const cloud_secret = process.env.REACT_APP_CLOUD_SECRET
const cloud_name = process.env.REACT_APP_CLOUD_NAME
console.log(cloud_name ,cloud_secret ,"cloud name")


export const  uploadFiles = async(files) => {

let formData = new FormData();
formData.append("upload_preset" ,cloud_secret);
let uploaded = [];
for(const f of files){
    const {file ,type} = f;
    formData.append("file" ,file);
    let res = await uploadToCloudinary(formData);
    console.log(res);
    uploaded.push({
        file : res,
        type : type
    });


    
}
return uploaded;
}

const uploadToCloudinary = async(formData) => {
    return new Promise(async (resolve) => {
        return  await  axios.post(`https://api.cloudinary.com/v1_1/dqv1vwkxc/raw/upload` ,formData).then(({data}) => {
            resolve(data);
        }).catch((error) => {
            console.log(error);
        })
    } ) 

    }
