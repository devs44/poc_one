
const express=require("express")
const app = express()
const dotenv=require("dotenv")
dotenv.config()
const PORT=5000
const dbEmp=require("./employee.js")
const dbCon=require("./contacts.js")

const bodyParser = require("body-parser");
app.use(bodyParser.json());

app.use(express.json())

app.get('/employees',dbEmp.getEmployee)

app.put('/employee/add',dbEmp.createEmployee)

app.get('/employee/:id', dbEmp.getEmployeeByID)

app.put('/employee/:id',dbEmp.updateEmployee)

app.delete('/employee/:id', dbEmp.deleteEmployee)


// #contact
app.get('/contacts',dbCon.getContact)

app.put('/contacts/add',dbCon.createContact)

app.put('/contacts/:id', dbDep.updateContact)

app.delete('/contacts/:id', dbCon.deleteContact)



app.get("/",(req,res)=>{
    res.send("hello")
})

app.listen(PORT,()=> console.log(`Server running on ${PORT}`))