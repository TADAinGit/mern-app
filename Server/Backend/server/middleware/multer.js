const multer = require('multer');

// set storage
var storage = multer.diskStorage({
    destination : function ( req , file , cb ){
        cb(null, 'uploads')
    },
    filename : function (req, file , cb){
        // image.jpg
        var ext = file.originalname.substr(file.originalname.lastIndexOf('.'));

        cb(null, file.fieldname + '-' + Date.now() + ext)
    },
    fileFilter:(req, file, callback) => {
        if(file.mimetype.startsWith('image/')){
            callback(null,true)
        }
        else callback(null,true)
    }, limits:{fileSize:500000}
});

module.exports = storage

    