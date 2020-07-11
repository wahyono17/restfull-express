const express = require('express');
const app = express(); //execute express spt fungsi, tanda () berarti telah di exekusi

app.use((req, res, next) => {
    res.status(200).json({
        message: 'It works!'
    });
});

module.exports = app;