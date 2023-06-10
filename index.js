const express=require("express")
const app=express()
const products=require("./product")
const mongoose=require("mongoose")
const cors=require("cors")
const bodyParser=require("body-parser")
const Content=require("./schema")
console.log(Content)
app.use(bodyParser.urlencoded({
    extended:true
}))
app.use(bodyParser.json())
app.use(cors())
mongoose.connect("mongodb+srv://likki:likki@cluster0.be2177o.mongodb.net/Firstdb?retryWrites=true&w=majority")
    .then(()=>{
        console.log("MongoDb connected Successfully")
    })
    .catch((err)=>{
        console.log(err)
    })
app.get("/",(req,res)=>{
    res.send("Server started Successfully")
})
app.post("/add",(req,res)=>{
    console.log("Data from front end",req.body)
    const {name,passcode}=req.body
    const newData= new Content({
        name,passcode
    })
    newData.save()
    res.send("Added")
})
app.get("/retrieve",(req,res)=>{
    Content.find()
    // .then(found=>res.json(found))
    .then((found)=>{
        return res.json(found)
    })
})

app.get("/my-products",(req,res)=>{
    res.json(products)
})

app.get("/name",(req,res)=>{
    res.send("Codegnan IT")
})

//listen is a method that always starts the server, it will perform an action based on port.
app.listen(4000,()=>console.log("Server is started"))