const express = require('express');
const router = express.Router();

require('dotenv').config();
const ensureLogin = require('../middleware/ensureLogin');

router.post('/blog/add',ensureLogin,(req,res)=>{
 res.status(201).json({message:"blog added!!"})
});

router.get('/blog',(req,res)=>{

});

router.put('/blog/:id',(req,res)=>{

});

router.delete('/blog/delete',(req,res)=>{

});

module.exports = router;