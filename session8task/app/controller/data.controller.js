const Data = require('../models/task.model')


const addTask = async(req,res)=>{
    // res.send('test')
    const newInsert = new Data(req.body)
    try{
        await newInsert.save()
        res.status(200).send({
            apiStatus:true,
            data:newInsert,
            message:"Task added success"
        })
    }
    catch(e){
        // res.send(e)
        res.status(500).send({
            apiStatus:false,
            data:e.message,
            message:"Problem"
        })
    }
}

const getAllTasks = async(req, res)=>{
    try{
        let myData = await Data.find()
        res.status(200).send({
            apiStatus:true,
            data:myData,
            message:"Data fetched success"
        })
    }
    catch(e){
        res.status(500).send({
            apiStatus:false,
            data:e.message,
            message:"Problem while loading"
        })
    }
}

const getSingle = async(req,res)=>{
    const id = req.params.id
    try{
        result = await Data.findById(id)
        if(!result) res.send('not found')
        res.send(result)
    }
    catch(e){
        res.send(e)
    }
}

const deleteTask = async(req,res)=>{
    try{
        id = req.params.id
        const data = await Data.findByIdAndDelete(id)
        if(!data) return res.status(400).send({
            apiStatus:false,
            data:null,
            message:"Data not found"
        })
        res.status(200).send({
            apiStatus:true,
            data:data,
            message: "deleted"
        })
    }
    catch(e){
        res.status(500).send({
            apiStatus:false,
            data:e.message,
            message: "error in delete"
        })
    }
}

const editTask = async(req,res)=>{
    try{
        id = req.params.id
        allowed = ['dueDate']
        requested = Object.keys(req.body)
        const isValidUpdates = requested.every(r=> allowed.includes(r))
        if(!isValidUpdates) return res.status(500).send({
            apiStatus:false,
            data:null,
            message:"invalid requested"
        })
        const task = await Data.findByIdAndUpdate(id, req.body, {new:true, runValidators:true})
        if(!task) return res.status(404).send({apiStatus:false, data:null, message:"task not found"})
        res.status(200).send({
            apiStatus:true,
            data:task,
            message:"updated"
        })
    }
    catch(e){
        res.status(500).send({
            apiStatus:false,
            data:e.message,
            message: "error in edit"
        })
    }

}

module.exports = {
    addTask,
    getAllTasks, 
    getSingle, 
    deleteTask, 
    editTask
}