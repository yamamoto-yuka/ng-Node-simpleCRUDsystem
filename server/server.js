import express from 'express';
import cors from 'cors';
import mysql from 'mysql';

const db = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "crud"
})

const server = express();
server.use(cors());
server.use(express.json());
db.connect(error => {
    if (error)
        console.log('Sorry cannot connect to db: ', error);
    else
        console.log('Connected to mysql DB');
})

// GET ALL POSTS
server.get('/posts', (req, res) => {
    let query = 'CALL `GetPosts`()';
    db.query(query, (error, results) => {
        if (error) {
            res.json({ data: false, message: error });
        } else {
            res.json({ data: results[0], message: "Success" });
        }
    })
})

//POST NEW POST
server.post('/posts', (req, res) => {
    let query = "CALL `NewPost`(?)";
    db.query(query, req.body.post, (error, newpostfromSQL) => {
        if (error) {
            res.json({ newpost: false, message: error });
        } else {
            res.json({ newpost: true, data: newpostfromSQL[0], message: "New post inserted!" });
        }
    })
})

// UPDATE NEW POST
server.put('/posts', (req, res) => {
    let ID = req.body.ID;
    let post = req.body.post;
    let query = "CALL `UpdatePost`(?, ?)";
    db.query(query, [ID, post], (error, updateddata) => {
        if (error) {
            res.json({ updatedpost: false, message: error });
        } else {
            res.json({ updatedpost: updateddata[0], message: "Post data successfully updated." });
        }
    })
})

// DELETE POST
server.delete('/posts/:id', (req, res) => {
    let ID = req.params.id;
    let query = "CALL `DeletePost`(?)";
    db.query(query, [ID], (error, data) => {
        if (error) {
            res.json({ delete: false, message: error });
        } else {
            // res.json({ deleted: data[0][0].DEL_SUCCESS });
            if (data[0][0].DEL_SUCCESS === 0) {
                res.json({ delete: false, message: "Data does not exist" });
            } else {
                res.json({ delete: data[0], message: "The post has been deleted." })
            }
        }
    })
})

server.listen(4400, function() {
    console.log("server running at port 4400")
})