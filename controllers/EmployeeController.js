const Employee = require('../models/Employee.js')
const upload = require('../middleware/upload')

//show the list of employees(get)
const index = (req,res,next) => {
    Employee.find()
    .then(response => {
        res.json({
            response
        })
    })
    .catch(error => {
        res.json({
            message: 'An error occured!'
        })
    })
}

const imageupload = (req, res)=> {
    upload.single('uploadImages')(req, res, function(error) {
        let imag = new Employee({
            uploadImage:req.file.path
        })
        let result =  imag.save()
        console.log("sucess")
        
        if (error) {
            return res.json({ error: "Error uploading file" })
        }
        res.status(200).json({ message: "Image Uploaded Successfully", ImageUrl: `http://localhost:8000/${imag}` })
    })
}

//show particular employee
const show = (req,res,next) => {
    let employeeID = req.params.employeeID
    Employee.findById(employeeID)
    
    .then(response => {
        res.json({
            response
        })
    })
    .catch(error => {
        res.json({
            message:'An error occured!! ',
            err:error
        })
    })
}

//store employee(post)
const store = (req,res,next) => {
    let employee = new Employee({
        name : req.body.name,
        designation : req.body.designation,
        email : req.body.email,
        phone : req.body.phone,
        age : req.body.age,  
    })
    if(req.file){
        employee.avatar=req.file.path
      
    }
    employee.save()
    .then(response => {
        res.json({
            message:'Employee added Successfully',
            data:employee,
            ImageUrl: `http://localhost:8000/${req.file.path}`

        })
    })
    .catch(error => {
        res.json({
            message:'An error occured!!!'
        })
    })
}

//update the employee list (put)
const update = (req,res,next) => {
    let employeeID = req.params.employeeID
    
    let updatedData = {
        name: req.body.name,
        designation: req.body.designation,
        email: req.body.email,
        phone: req.body.phone,
        age: req.body.age    
    }
    Employee.updateMany(employeeID,updatedData)
    .then(() => {
        res.json({
            message: 'Employee updated successfully'
        })
    })
    .catch(error => {
        res.json({
            message: 'An error occured!!!!!'
        })
    })
}



//delete an employee

const destroy = (req,res,next) => {
    let employeeID = req.params.employeeID
    Employee.findOneAndRemove(employeeID)
    .then(response => {
        res.json({
            message:'Employee deleted successfully'
        })
    })
    .catch(error => {
        res.json({
            message:'error occured!!!!!!!!!!'
        })
    })
}
module.exports = {
    index,show,store,update,destroy,imageupload
}
