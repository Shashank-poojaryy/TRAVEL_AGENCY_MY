const multer = require('multer');//handle file upload
const storage =  multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'Uploads/')
    },
    filename:function(req, file, cb){
        const uniqueSuffix = Date.now() + '-' +
        Math.round(Math.random() * 1E9)
        cb(null, file.fieldname + '-' + uniqueSuffix)
    }
        
    
})
const upload = multer({storage:storage})
module.exports = upload;