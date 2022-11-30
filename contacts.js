
const Pool = require("pg").Pool
const pool= new Pool({
    user:"postgres",
    host:"localhost",
    database:"api_express",
    password:"devi",
    port:5432,
})

const getContact=(req,res)=>{
    pool.query("SELECT * FROM Contacts ",(error,results)=>{
        if(error) throw error;
        res.status(200).json(results.rows);
    })
}



const createContact = (req, res) => {
    const { ContactNo, ContactName,ID } = req.body;
  
    pool.query(
      "INSERT INTO Contacts (ContactNo,ContactName,ID) VALUES ($1,$2,$3) RETURNING * ",
      [ContactNo, ContactName, ID],
      (error, results) => {
        if (error) throw error; 
        res.status(200).json(results.rows);
      }
    )
}

const updateContact = (req,res) => {
    
    let id = parseInt(req.params.id)
    const { contactno, contactname}  = req.body

    pool.query('UPDATE Contacts  SET contactno =$1,contactname=$2 WHERE id=$3', 
    [contactno,contactname,id],
     (err,result) => {
        if(err){
            throw err
        }
        res.json({
            data : "Updated successfully"
        })
    })


}

const deleteContact = (req,res) => {
    const id = parseInt(req.params.id)

    pool.query('DELETE FROM Contacts WHERE id=$1',[id], (err,result) => {
        if(err){
            throw err
        }

        res.json({
            msg: `Contact with ${id} Deleted successfuly`
        })
    })
}

module.exports={
    getContact,createContact,deleteContact,updateContact
}