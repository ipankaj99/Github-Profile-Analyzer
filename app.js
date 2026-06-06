import 'dotenv/config';
import express from 'express';
import pool from './config/db.js';
import router from './routes/profileRoutes.js';
const app=express();
const port=process.env.PORT || 5000;
app.use(express.json());

async function testDbConnection()
{
   try {
       //for testing purpose
        await pool.query("SELECT 1");
        console.log("Database connection successful!");
    } catch (error) {
        console.error("Database connection failed:");
        console.error(error.message);
    }
}
testDbConnection();
app.use('/api/gitHub', router);


//error handling middlware
app.use((err, req, res, next)=>{
    const statusCode=err.statusCode || 500;
    const message=err.message || "Internal Server Error";

    return res.status(statusCode).json({
        message:message
    })
})


app.listen(port, ()=>{
    console.log(`http://localhost:${port}`);
})
