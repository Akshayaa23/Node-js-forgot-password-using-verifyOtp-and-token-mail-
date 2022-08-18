const path = require('path')
const multer = require('multer') 

var storage = multer.diskStorage({
    destination:function(req,file,cb) {
        cb(null, 'uploads/')
    },
    filename: function(req,file,cb) {
        let ext = path.extname(file.originalname)
        cb(null,Date.now() + ext)
    }
})

var upload = multer({
    storage : storage,
    fileFilter: function(req,file,callback) {
        console.log(file.mimetype )
        if(
            file.mimetype == "image/jpeg" ||
            file.mimetype == "image/png"
        ){
            callback(null,true)
        }else{
            console.log("only png and jpg is supported!")
            callback(null,false)
        }
    },
    limits: {
        fileSize: 1990 * 1180 * 2
    }
})

module.exports = upload