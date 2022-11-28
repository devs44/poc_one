
const Pool = require("pg").Pool
const pool= new Pool({
    user:"postgres",
    host:"localhost",
    database:"api_express",
    password:"devi",
    port:5432,
})

const getEmployee=(req,res)=>{
    pool.query("SELECT * FROM employees",(error,results)=>{
        if(error) throw error;
        res.status(200).json(results.rows);
    })
}

const getEmployeeByID=(req,res)=>{
    let id=parseInt(req.params.id)
    pool.query("SELECT * FROM employees WHERE id=$1",[id],(error,results)=>{
        if(error) throw error;
        res.status(200).json(results.rows);
    })
}

const createEmployee = (req, res) => {
    const { name, email } = req.body;
  
    pool.query(
      "INSERT INTO employees (name,email) VALUES ($1,$2) RETURNING * ",
      [name, email],
      (error, results) => {
        if (error)throw error; 
        res.status(200).json(results.rows);
      }
    )
}

const updateEmployee = (req,res) => {
    
    let id = parseInt(req.params.id)
    const { name, email}  = req.body

    pool.query('UPDATE employees  SET name =$1 ,email = $2 WHERE id=$3', [name,email,id], (err,result) => {
        if(err){
            throw err
        }
        res.json({
            data : "Updated successfully"
        })
    })


}

const deleteEmployee = (req,res) => {
    const id = parseInt(req.params.id)

    pool.query('DELETE FROM employees WHERE id=$1',[id], (err,result) => {
        if(err){
            throw err
        }

        res.json({
            msg: `Employee with ${id} Deleted successfuly`
        })
    })
}

module.exports={
    getEmployee,createEmployee,getEmployeeByID,updateEmployee,deleteEmployee
}