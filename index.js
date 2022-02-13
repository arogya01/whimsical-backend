const express = require('express');
const app = express();
const dbConnect=require('./database/config');
const port = process.env.port || 3001;
const cors = require('cors');

//middlewares
app.use(cors());
app.use(express.json());

//routes 
app.use(require('./routes/users'));
app.use(require('./routes/blog'));
require('dotenv').config();



(async () => {
   await dbConnect.main();
})();

app.get('/',(req,res)=>{ 
    res.end('hlloww');
});

app.listen(port,()=>{
    console.log('listening on port:',port );
})