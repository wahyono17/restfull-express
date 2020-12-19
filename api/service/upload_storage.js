const util = require('util');
const gc = require('../../config');
const bucket = gc.bucket('jsimage');//bucket name di google drive
const path = require('path');

const { format } = util

//promise di panggil di midleware
const uploadImage = (files) => new Promise((resolve, reject) => {

  //perlu di looping di sini karena yang di kirim berupa array
  let arrayPicture = [];
  files.forEach(element => {

    const {filename} = element;
    // console.log(filename);
    const picture = path.join(__dirname,'../../uploads',filename);

    //ini peruntah untuk uplaod
    bucket.upload(picture);

    // ini yang di kirim ke return
        // const publicUrl = format(
          // `https://storage.googleapis.com/${bucket.name}/${filename}`
        // )

    arrayPicture.push(picture);
  });

  resolve(arrayPicture);

  reject(err=>(err))
})

module.exports = uploadImage