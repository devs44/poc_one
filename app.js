
const express=require("express")
const app = express()
const dotenv=require("dotenv")
dotenv.config()
const PORT=5000
const dbEmp=require("./employee.js")

const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.use(express.json())

app.get('/employees',dbEmp.getEmployee)

app.put('/employee/add',dbEmp.createEmployee)

app.get('/employee/:id', dbEmp.getEmployeeByID)

app.put('/employee/:id',dbEmp.updateEmployee)

app.delete('/employee/:id', dbEmp.deleteEmployee)

app.get("/",(req,res)=>{
    res.send("hello")
})

app.listen(PORT,()=> console.log(`Server running on ${PORT}`))