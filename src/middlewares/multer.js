import multer from 'multer'

const storage = multer.diskStorage({
    destination: (req,file,cb) =>{
        let destinationFolder = ''
        
        if(file.fieldname === 'profilePic'){
            destinationFolder = './public/profileImages'
        }
        else if(file.fieldname === 'idDoc' || file.fieldname === 'addressDoc' || file.fieldname === 'accountStatus' ){
            destinationFolder = './public/documents'
        }
        else{
            destinationFolder = './public/thumbnails'
        }

        cb(null,destinationFolder)
    }, 
    filename: (req,file,cb) => cb(null,file.originalname)
})
export const uploader = multer ({storage})