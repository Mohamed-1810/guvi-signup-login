// const express = require('express');
import express from 'express';
// const mysql = require('mysql');
import mysql from 'mysql';
// const cors = require('cors');
import cors from 'cors';
import cookieParser from 'cookie-parser';
import jwt from 'jsonwebtoken';
const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors(
    {
        origin: ["http://localhost:3000"],
        methods: ["POST", "GET"],
        credentials: true
    }
));
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "guvitask"
})

const verifyUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.json({ Message: "we need token please provide it." })
    }
    else {
        jwt.verify(token, "our-jsonwebtoken-scret-key", (err, decoded) => {
            if (err) {
                return res.json({ Meassage: "Authentication Error." })
            }
            else {
                req.name = decoded.name;
                next();
            }
        })
    }
}

app.get('/', verifyUser, (req, res) => {
    return res.json({ Status: "Success", name: req.name })
})

app.post('/signup', (req, res) => {
    const sql = "INSERT INTO users (`name`,`email`,`password`) VALUES(?)";
    const values = [
        req.body.name,
        req.body.email,
        req.body.password
    ]
    db.query(sql, [values], (err, data) => {
        if (err) {
            return res.json("Error");
        }
        return res.json(data);
    })
})
app.post('/profile', (req, res) => {
    // const sql = "UPDATE users SET(`age`,`phone`,`qualification`) VALUES(?) WHERE email = ?";
    const sql = `UPDATE users SET age = ?, phone=?, qualification=? WHERE email=?`;
    console.log(req.body);
    const values = [
        req.body.age,
        req.body.phone,
        // req.body.qualification,
        req.body.email
    ]


    db.query(sql, [req.body.age, req.body.phone, req.body.qualification, req.body.email], (err, data) => {
        console.log(data);
        if (err) {
            return res.json("Error");
        }
        return res.json(data);
    })


})
app.post('/login', (req, res) => {
    const query = 'SELECT COUNT(*) AS count FROM users WHERE email = ?';
    db.query(query, [req.body.email], (err, results) => {
        if (err) {
            console.error('Error executing query:', err);
            return;
        }
        const count = results[0].count;
        if (count > 0) {
            // console.log('Email exists in the database');
            const sql = "SELECT * FROM users WHERE `email` = ? AND `password` = ?";
            // console.log(req.body);  
            db.query(sql, [req.body.email, req.body.password], (err, data) => {
                // console.log(data);
                if (err) {
                    return res.json({ Message: "Server Side Error" });
                }
                if (data.length > 0) {
                    const name = data[0].name;
                    const token = jwt.sign({ name }, "our-jsonwebtoken-scret-key", { expiresIn: '1d' });
                    res.cookie('token', token)
                    return res.json("Success");
                }
                else {
                    return res.json("Failed");
                }
            })
        } else {
            // console.log('Email does not exist in the database');
            return res.json("EmailFailed");
        }
    });

    // const sql = "SELECT * FROM users WHERE `email` = ? AND `password` = ?";
    // // console.log(req.body);  
    // db.query(sql, [req.body.email,req.body.password], (err, data) =>{
    //     // console.log(data);
    //     if(err){
    //         return res.json({Message:"Server Side Error"});
    //     }
    //     if(data.length > 0){
    //         const name = data[0].name;
    //         const token = jwt.sign({name}, "our-jsonwebtoken-scret-key",{expiresIn:'1d'});
    //         res.cookie('token',token)
    //         return res.json("Success");
    //     }
    //     else{
    //         return res.json("Failed");
    //     }
    // })
})

app.get('/logout', (req, res) => {
    res.clearCookie('token');
    return res.json({ Status: "Success" })
})
// console.log("hello");
app.listen(8081, () => {
    console.log("listening");
})