import express from 'express';
import { unlink } from 'fs';


const app = express()
import mongoose from 'mongoose';
const path = require('path');
import multer, { FileFilterCallback } from 'multer';
import User from './models/user.model';
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const fileFilter = (req: express.Request, file: Express.Multer.File, cb: FileFilterCallback) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
const upload = multer({ storage: storage, fileFilter: fileFilter })


mongoose.connect('mongodb://localhost:27017/nodejs', { useNewUrlParser: true, useUnifiedTopology: true });


app.use(express.json())
app.use('/static', express.static(__dirname + '/uploads'));

//GET
app.get('/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users)
    } catch (err) {
        res.send(err)
    }
})

//GET ONE
app.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id });
        user ? res.json(user) : res.status(404).send('Not Found')

    } catch (err) {
        res.send(err)
    }
})

//POST (PREVIOUS WITHOUT FILE UPLOAD)
app.post('/old-users', async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.json(user)
    } catch (err) {
        res.send(err)
    }
})

//POST + UPLOAD
app.post('/users', upload.single('avatar'), async (req, res) => {
    try {
        const user = await User.create({ ...req.body, photo: 'http://localhost:3000/static/' + req.file.filename });
        res.json(user)
    } catch (err) {
        res.status(422)
        if (err.errors || err.keyPattern) {
            res.send(err)
        } else {
            res.send('A profile picture is needed')
        }
    }
})

//LOGIN
app.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ password: req.body.password, email: req.body.email });
        user ? res.json(user) : res.status(404).send('Not Found')
    } catch (err) {
        res.send(err)
    }
})

//PUT
app.put('/users/:id', async (req, res) => {
    try {
        const user = await User.updateOne({ _id: req.params.id }, req.body);
        res.json(user)
    } catch (err) {
        res.send(err)
    }
})

//DELETE
app.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.deleteOne({ _id: req.params.id });
        res.json(user)
    } catch (err) {
        res.send(err)
    }
})

//UPLOAD AN IMAGE 
app.post('/upload', upload.single('avatar'), (req, res) => {
    if (!req.file) {
        console.log("No file received");
        return res.send({
            success: false
        });
    } else {

        res.json(req.file)

    }
});

//CHANGE IMAGE OF SPECIFIC USER AND DELETE PREVIOUS ONE
app.post('/upload/:id', upload.single('avatar'), async (req, res) => {
    if (!req.file) {
        console.log("No file received");
        return res.send({
            success: false
        });
    } else {
        try {
            //DELETE OLD IMAGE
            const userToDel = await User.findOne({ _id: req.params.id })
            if (userToDel) {
                const filename = userToDel.photo.replace('http://localhost:3000/static/', '')
                unlink('uploads/' + filename, (err) => {
                    if (err) throw err;
                    console.log("deleted file")
                })
            } else {
                res.json({ status_code: 404, message: "Not Found" })
            }
            //UPDATE USER WITH NEW PATH
            const user = await User.updateOne({ _id: req.params.id }, { photo: 'http://localhost:3000/static/' + req.file.filename })
            res.json(user)
        } catch (e) {
            console.log(e)
        }
    }
});



app.listen(3000)