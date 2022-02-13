const express = require('express');
const router = express.Router();

require('dotenv').config();
const ensureLogin = require('../middleware/ensureLogin');

router.post('/like/add',ensureLogin,(req,res)=>{
 res.status(201).json({message:"blog added!!"})
});

router.get('/like',ensureLogin,(req,res)=>{

});

router.put('/blog/:id',ensureLogin,(req,res)=>{

});

router.delete('/blog/delete',ensureLogin,(req,res)=>{

});

module.exports = router;