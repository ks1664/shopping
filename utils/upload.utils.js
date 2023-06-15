const multer  = require('multer')
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const fs = require('fs');
const AWS = require('aws-sdk');

module.exports = class UploadUtils {

    constructor(directoryPath = 'uploads/default') {
        this.storage = multer.diskStorage({
            destination: function (req, file, cb) {
              fs.mkdirSync(directoryPath, { recursive: true })
              cb(null, directoryPath)
            },
            filename: function (req, file, cb) {
              cb(null, file.fieldname + '-' + uuidv4() + path.extname(file.originalname)) //Appending extension
            }
        })

        this.s3 = new AWS.S3({
            accessKeyId: process.env.AWS_ACCESS_KEY,
            secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
        });

    }

    uploadFile (type = /jpg|jpeg|png/, fileSize = 20000000) {
        try{
            return  multer({ 
                storage: this.storage,
                limits: {fileSize: fileSize},   // This limits file size to 2 million bytes(2mb)
                fileFilter: (req, file, cb) => {
                    
                    const validFileTypes = type // Create regex to match jpg and png
            
                    // Do the regex match to check if file extenxion match
                    const extname = validFileTypes.test(path.extname(file.originalname).toLowerCase())
            
                    if(extname === true){
                        // Return true and file is saved
                         return cb(null, true)
                    }else{
                        // Return error message if file extension does not match
                        return cb("Error: Images Only!")
                    }
                } 
            });
        }
        catch(error){
            console.log("Error get all :", err);
            Error.payload = err.errors ? err.errors : err.message;
            throw new Error();
        }
    }

    uploadFileAws (req,res,next) {
        console.log('req.files')
        var file = req.file;
        return fs.readFile(file.path, function (err, data) {
            if (err){
                console.log(err)
                throw err;  
            } 
            // Something went wrong!

            var params = {
                Key: file.originalname, //file.name doesn't exist as a property
                Body: data
            };
            var s3bucket = new AWS.S3({
                params: {
                    Bucket: process.env.BUCKET_NAME
                }
            });
            return s3bucket.upload(params, function (err, data) {
                // Whether there is an error or not, delete the temp file
                fs.unlink(file.path, function (err) {
                    if (err) {
                        console.error(err);
                    }
                    console.log('Temp File Delete');
                    return;
                });

                console.log("PRINT FILE:", file);
                if (err) {
                    console.log('ERROR MSG: ', err);
                    return;
                    //res.status(500).send(err); 
                } else {
                    console.log('Successfully uploaded data');
                    return;
                    //res.status(200).end();
                }
            });
        });
    };


    uploadExcelFile (type = /.xlsx|.xlsm|.xlsb|.csv/, fileSize = 800000000) {
        try{
            return  multer({ 
                storage: this.storage,
                limits: {fileSize: fileSize},   // This limits file size to 2 million bytes(5mb)
                fileFilter: (req, file, cb) => {
                    
                    const validFileTypes = type // Create regex to match jpg and png
            
                    // Do the regex match to check if file extenxion match
                    const extname = validFileTypes.test(path.extname(file.originalname).toLowerCase())
                    
                    if(extname === true){
                        // Return true and file is saved
                         return cb(null, true)
                    }else{
                        // Return error message if file extension does not match
                        return cb("Error: Excel File Only!")
                    }
                } 
                
            });
           
        }
        catch(error){
            console.log("Error get all :", err);
            Error.payload = err.errors ? err.errors : err.message;
            throw new Error();
        }
    }

}