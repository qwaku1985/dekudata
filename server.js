const express = require("express")
const fs = require("fs")
const bodyParser = require("body-parser")
const app = express()

app.use(bodyParser.json())
app.use(express.static("public"))

function readDB(){
return JSON.parse(fs.readFileSync("db.json"))
}

function writeDB(data){
fs.writeFileSync("db.json", JSON.stringify(data,null,2))
}

app.post("/signup",(req,res)=>{

let db = readDB()

const user = {
id: Date.now(),
username: req.body.username,
password: req.body.password,
role:"user"
}

db.users.push(user)
writeDB(db)

res.json({message:"Account created"})
})

app.post("/login",(req,res)=>{

let db = readDB()

let user = db.users.find(u =>
u.username == req.body.username &&
u.password == req.body.password
)

if(user){
res.json({success:true,user})
}else{
res.json({success:false})
}

})

app.post("/buy-data",(req,res)=>{

let db = readDB()

let order = {
id:Date.now(),
user:req.body.username,
bundle:req.body.bundle,
phone:req.body.phone,
status:"processing"
}

db.orders.push(order)
writeDB(db)

/* Simulated Automatic Delivery */

setTimeout(()=>{

order.status = "completed"
writeDB(db)

},3000)

res.json({message:"Order received"})
})

app.get("/orders",(req,res)=>{

let db = readDB()

res.json(db.orders)

})

app.listen(3000,()=>{

console.log("Dakudata server running on port 3000")

})