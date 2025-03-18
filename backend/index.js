const mysql = require("mysql2");
const express = require("express");
const dotenv = require("dotenv");
dotenv.config();
const app = express();



const connectToDB = async()=>{
    const db = mysql.createConnection({
        host:"localhost",
        user:"root",
        password:process.env.db_password,
        database:"music"
    })
    db.connect((err)=>{
        if(err){
            console.log("error while connecting to db",err);
        }
        else{
            console.log("connected to DB successfully");
            
        }
    })
}

app.listen((process.env.port),async()=>{
    connectToDB();
    console.log(`server listening on port ${process.env.port}`);
    
})


