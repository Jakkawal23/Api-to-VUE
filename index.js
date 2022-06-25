var express = require('express')
var cors = require('cors')
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'dbvue'
});

var app = express()
app.use(cors())
app.use(express.json())

    //Show data
    app.get('/student', function (req, res, next) {
        connection.query(
        'SELECT * FROM `student`',
        function(err, results, fields) {
            res.json(results);
        }
        );
    })

    //Insert
    app.post('/student', function (req, res, next) {
        connection.query(
        'INSERT INTO `student`(`fname`, `lname`) VALUES (?, ?)',
        [req.body.fname, req.body.lname],
        function(err, results) {
            res.json(results);
        }
        );
    })
    
    //Update
    app.put('/student', function (req, res, next) {
        connection.query(
        'UPDATE `student` SET `fname`= ?, `lname`= ? WHERE id = ?',
        [req.body.fname, req.body.lname,req.body.id],
        function(err, results) {
            res.json(results);
        }
        );
    })

    //Delete
    app.delete('/student', function (req, res, next) {
        connection.query(
        'DELETE FROM `student` WHERE id = ?',
        [req.body.id],
        function(err, results) {
            res.json(results);
        }
        );
    })

app.listen(5000, function () {
  console.log('CORS-enabled web server listening on port 5000')
})