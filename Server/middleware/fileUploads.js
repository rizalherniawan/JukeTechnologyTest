const multer = require('multer')
const path = require('path')
const storage = multer.diskStorage({ 
    destination: (req, file, cb) => {
        cb(null, path.join(path.resolve(),'files'))
    },
    filename: (req, file, cb) => {
        const ext = file.mimetype.split('/')[1]
        const uid = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, `user-${uid}.${ext}`)
    }
})

const filter = (req,file,cb) => {
    const ext = file.mimetype.split('/')[1]
    const fileSize = parseInt(req.headers["content-length"])
    if(ext !== 'pdf'){
        cb(new Error("File should be in pdf format"))
    } else if(fileSize > 500000){
        cb(new Error("Size of file maximum at 500 kB"))
    } else{
        cb(null,true)
    }
}


const upload = multer({ storage: storage, fileFilter: filter }).single('file')


module.exports = (req,res,next) => {
    upload(req, res, function (err) {
        if (err) {
            return res.status(400).json({message: err.message})
        }
        next()
      })
}