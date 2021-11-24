'use strict';

const express = require('express');
const cors = require('cors')
const app = express();

const fileUtils = require('./file-acces-utilities.js');

/**
 * Cors Middleware * Allow All
 */

app.use(cors());

app.get('/',(req,res)=>{
    res.send('Welcome to file explorer!')
});

app.get('/location',async (req,res) => {
    let results;
    const { searchPath } = req.query;
   
    try {
        results = await fileUtils.getLocationDetails(searchPath);
    } catch (error) {
        console.error(error.message)
        res.status(500).send(error.message);
    }
    
    res.send(results);
});

module.exports = app;


