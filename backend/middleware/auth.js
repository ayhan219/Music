const jwt = require("jsonwebtoken");
const db = require("../db");


const verifyToken = (req, res, next) => {

    const token = req.headers.cookie
    if(!token){
        return res.status(401).json({message:"unauthorized"})
    }
    const tokenValue = token.split(';').find(c => c.trim().startsWith('token='))
    if (!tokenValue) {
        return res.status(401).json({ message: "unauthorized - token not found" });
    }
    const jwtToken = tokenValue.split('=')[1];
    
    try {
        const decoded = jwt.verify(jwtToken,process.env.JWT_SECRET);
        const sql = "select * from user where id=?";
        db.query(sql,[decoded.id],(err,result)=>{
            if(err){
                return res.status(500).json({message:"server error"})
            }
            if(result.length===0){
                return res.status(401).json({message:"unauthorized"})
            }
            const {password,...rest}= result[0]
            
            req.user = rest
            next();
            
        })
        
    } catch (error) {
        return res.status(500).json({message:"server error",error})
    }
    

}

module.exports = verifyToken;