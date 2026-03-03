import express from "express"

const app=express()

app.get("/weather", (req,res)=>{
    res.send("yes,today is 30 degree");
});

app.listen(8000,()=> {
console.log("server is running");
});

