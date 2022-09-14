const express= require('express')
const app= express();

app.use(express.json());

app.get('/',(req,res,next)=>{
    let data={
        id:1,
        name:"test"
    }
    res.send(data)
})

const PORT = process.env.PORT || 8080;
app.listen(PORT,()=>{
    console.log(`server is running on http://localhost:${PORT}`);
})
