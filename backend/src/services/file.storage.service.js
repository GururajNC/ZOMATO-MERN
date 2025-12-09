// storage.service.js
import dotenv from "dotenv";

dotenv.config()

import { v2 as cloudinary } from "cloudinary";

// console.log(process.env.CLOUDINARY_CLOUD_NAME);
// console.log(process.env.CLOUDINARY_API_KEY);
// console.log(process.env.CLOUDINARY_API_SECRET);


cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// export default cloudinary;


async function fileUpload(file) {
  return new Promise((resolve,reject)=>{
    const stream = cloudinary.uploader.upload_stream
    (
      {
        resource_type:'video'
      },
      (error,result)=>
        {
          if (error) return reject(error);
          resolve(result);
        }
    );
    stream.end(file);
  })

}

  
export default {
    fileUpload
}

