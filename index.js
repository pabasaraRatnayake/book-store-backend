import express from "express"
import mysql from "mysql";
import cors from "cors";

const app = express()

const db = mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"Pabasara$1998",
    database:"book_store"
})


//allows to use any json file sent by client
app.use(express.json())

app.use(cors())

app.get("/", (req,res)=>{
    res.json("Backend application started!")
})

app.get("/books", (req, res) =>{
    const q = "SELECT * from book"
    db.query(q,(err,data)=>{
        if(err) return res.json(err)
        return res.json(data)
    })
})

app.post("/books", (req, res)=>{
    const q = "INSERT into book (`title`, `desc`, `price`, `cover`) VALUES (?)";
    const values = [
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover,
    ]

    db.query(q, [values], (err, data)=>{
        if(err) return res.json(err);
        return res.json("Book has been created successfully");
    });
})

app.delete("/books/:id", (req, res)=>{
    const bookId = req.params.id;
    const q = "DELETE FROM book WHERE id = ?"

    db.query(q, [bookId], (err, data)=>{
        if(err) return res.json(err);
        return res.json("Book has been deleted successfully");
    });
})

app.put("/books/:id", (req, res)=>{
    const bookId = req.params.id;
    const q = "UPDATE book SET `title`=?,`desc`=?,`price`=?, `cover`=? WHERE id=?";

    const values=[
        req.body.title,
        req.body.desc,
        req.body.price,
        req.body.cover,
    ]
    db.query(q, [...values, bookId], (err, data)=>{
        if(err) return res.json(err);
        return res.json("Book has been updated successfully");
    });
})

app.listen(8800, ()=>{
    console.log("Connected to backend!")
})