const mongoose = require('mongoose')
const User = require('../models/userSchema');
const bcrypt = require('bcrypt');
const asyncHandler = require('express-async-handler')


const saltRounds = 10;


//get all users
const getAllUsers = async(req, res)=>{
      try {

        const users = await User.find({}).select('-password').lean();
        if(!users){
          return res.status(404).json({msg: 'No user found'})
        }
        res.status(200).json(users)
        
      } catch (error) {
        res.status(500).json({msg: error.message})
        console.log(error)
      }

    }


    //get users by id
    const getUsersById = async(req, res)=>{
      try {
        const {id} = req.params

        if(!mongoose.Types.ObjectId.isValid(id)){
          return res.status(404).json({error: 'no such ID'})
        }
        const user = await User.findById(id)
         
        if(!user){
          return res.status(404).json({error: 'no such user'})
        }

        res.status(200).json(user)

      } catch (error) {
        res.status(500).json({msg: error.message})
        console.log(error)
      }
    }


    //create a new user
    const createNewUser =  async (req, res) => {
      try {
        const { name, email, role, password } = req.body;

        const existingUser = await User.findOne({ email });
        if (existingUser) {
          return res.status(400).json({ msg: 'Email already exists' });
        }
        let emptyFields = []

        if(!name){
          emptyFields.push('name')
        }
        if(!email){
          emptyFields.push('email')
        }
        if(!role){
          emptyFields.push('role')
        }
        if(!password){
          emptyFields.push('password')
        }

        if(emptyFields.length > 0){
          return res.status(400).json({error: 'please fill in all the fields', emptyFields})
        }

        const hashedPassword = await bcrypt.hash(password, 10);
    
        const newUser = new User({
          name,
          email,
          role,
          password: hashedPassword
        });
    
        await newUser.save();
        res.status(201).json(newUser);
        console.log(newUser)

      } catch (error) {
        res.status(500).json({ msg: error.message });
      }
    };



    //delete user info
    const deleteUser = async(req, res) =>{
    try {
      
      const {id} = req.params

      if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'no such ID'})
      }

      const deletedUser = await User.findByIdAndDelete(id);
      if(!deletedUser){
        return res.status(404).json({error: 'no such user'})
      }
      res.status(200).json(deletedUser)

    } catch (error) {

      res.status(500).json({msg: error.message})
      console.log(error)

    }
 }



 // update user info
    const updateUser = async(req, res)=>{
    try {

      const {id} = req.params

      if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: 'no such ID'})
      }

      const update = await User.findByIdAndUpdate(id, {...req.body })
  
      if (!update) {
        return res.status(404).json({ msg: 'User not found' });
      }
      res.status(200).json(update)
      
    } catch (error) {
      res.status(500).json({msg: error.message})
      console.log(error)
    }
}



module.exports = {updateUser, deleteUser, createNewUser, getUsersById ,  getAllUsers}