import express from 'express';
import cors from 'cors';
import mysql from 'mysql';
import multer from 'multer';

const db = mysql.createConnection({
    host: "localhost",
    port: 8889,
    user: "root",
    password: "root",
    database: "crud"
})


db.connect(error => {
    if (error)
        console.log('Sorry cannot connect to db: ', error);
    else
        console.log('Connected to mysql DB');
})

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads')
    },
    filename: function(req, file, cb) {
        cb(null, file.originalname)
    }
})

const fileupload = multer({ storage: storage });


const server = express();
server.use(cors());
server.use(express.json());
server.use(express.static('uploads'));


// File upload
server.post('/upload', fileupload.single("image"), (req, res) => {
    // console.log(req.file);
    res.json('Upload success');
})

// GET ALL POSTS
server.get('/posts', (req, res) => {
    let query = 'CALL `GetPosts`()';
    db.query(query, (error, results) => {
        if (error) {
            res.json({ data: false, message: error });
        } else {
            res.json({ data: results[0] });
        }
    })
})

//POST NEW POST
server.post('/posts', (req, res) => {
    let query = "CALL `NewPost`(?,?)";
    db.query(query, [req.body.post, req.body.thumbnail], (error, newpostfromSQL) => {
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
                res.json({ delete: data[0][0].DEL_SUCCESS, message: "Data does not exist" });
            } else {
                res.json({ delete: data[0][0].DEL_SUCCESS, message: "The post has been deleted." })
            }
        }
    })
})

server.listen(4400, function() {
    console.log("server running at port 4400")
})