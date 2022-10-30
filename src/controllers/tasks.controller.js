const { query, json } = require("express")
const pool = require("../db")

const getAllTasks = async(req,res,next)=>{
    const allTasks = await pool.query('SELECT * FROM task')
    console.log(allTasks)
  }
const getTask = async(req,res,next)=>{
 try{ const {id} = req.params
   const oneTask = await pool.query('SELECT * FROM task WHERE id = $1', [id])
   if(oneTask.rows.length === 0){
    return res.status(404).json({
      message:"Task not found"
    })
   } res.json(oneTask.rows[0])
  } catch (error){
    next(error)
  }
}
const createTask= async(req,res,next)=>{
    try{
    const {title, description}= req.body;
    console.log(title, description)
   const result = await pool.query('INSERT INTO task (title, description) VALUES ($1,$2) RETURNING * ', [title, description])
   res.json(result.rows[0])
  } catch(error){
    next(error)
}
}

const deleteTask= async (req,res,next)=>{
 try{   const {id} = req.params
    const deleted = await pool.query('DELETE * FROM task WHERE id = $1', [id])
    if(deleted.rowCount===0)
      return res.status(404).json({
      message: "task not found"
    });
    return res.sendStatus(204)
  } catch (error){
    next(error)
  }
}
const updateTask=async(req,res,next)=>{
 try{
  const {title, description} = req.body;
  const {id} = req.params 
  console.log(title, description)
    const updated = await pool.query('UPDATE task SET title=$1, description=$2 WHERE id = $3 RETURNING * ', [title, description, id])
    res.json(updated.rows[0])
  } catch(error){
    next(error) 
}
  }
  module.exports={
    getAllTasks,
    getTask,
    createTask,
    deleteTask,
    updateTask

  }