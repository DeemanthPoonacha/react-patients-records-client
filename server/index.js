const express= require('express')
const app= express();
const data = require('./records.json');
const cors = require('cors');
const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,            //access-control-allow-credentials:true
    optionSuccessStatus:200
}
app.use(cors(corsOptions));

app.use(express.json());

app.get('/claims',(req,res,next)=>{
    let patientData = data
    res.send(patientData)
})

app.get('/claims/:id', (req, res, next) => { 
    let patientData = data.filter((d) => (d.id == req.params.id))
    console.log(patientData);
    res.send(patientData)
})

const PORT = process.env.PORT || 8080;
app.listen(PORT,()=>{
    console.log(`server is running on http://localhost:${PORT}`);
})
