const FormDate = require("form-data")
const axios = require("axios")


exports.Checkslip = async(req,res,next) =>{
    try {
        const file = req.file;
        const formData = new FormDate();
        formData.append('files', file.buffer,file.originalname)

        const response = await axios.post(process.env.API_URL,formData,{
            headers : {
                'Content-Type' : file.mimetype,
                'x-authorization' : process.env.API_KEY
            }
        })
        res.json(response.data)
    } catch (err) {
        next(err)
    }
}