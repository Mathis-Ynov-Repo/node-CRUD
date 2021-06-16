import express from 'express';
import { unlink } from 'fs';


const app = express()
import mongoose from 'mongoose';
const pathBuild = `${__dirname}/dist`;
var cors = require('cors')
const path = require('path');
const history = require('connect-history-api-fallback');

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


app.use(cors())
app.use(express.static(pathBuild));
app.use(history({
    disableDotRule: true,
}));
app.use(express.static(pathBuild));
app.use(express.json())
app.use('/static', express.static(__dirname + '/uploads'));

app.get('/', (req, res) => {
    res.sendFile(`${path}/index.html`);
});

//GET
app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.send(users)
    } catch (err) {
        res.send(err)
    }
})

app.get('/api/valorant', async (req, res) => {
    try {
        const val = { missile: 54, name: "Viber" };
        res.send(val)
    } catch (err) {
        res.send(err)
    }
})

//GET ONE
app.get('/api/users/:id', async (req, res) => {
    try {
        const user = await User.findOne({ _id: req.params.id });
        user ? res.json(user) : res.status(404).send('Not Found')

    } catch (err) {
        res.send(err)
    }
})

//POST (PREVIOUS WITHOUT FILE UPLOAD)
app.post('/api/old-users', async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.json(user)
    } catch (err) {
        res.send(err)
    }
})

//POST + UPLOAD
app.post('/api/users', upload.single('avatar'), async (req, res) => {
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
app.post('/api/login', async (req, res) => {
    try {
        const user = await User.findOne({ password: req.body.password, email: req.body.email });
        user ? res.json(user) : res.status(404).send('Not Found')
    } catch (err) {
        res.send(err)
    }
})

//PUT
app.put('/api/users/:id', async (req, res) => {
    try {
        const user = await User.updateOne({ _id: req.params.id }, req.body);
        res.json(user)
    } catch (err) {
        res.send(err)
    }
})

//DELETE
app.delete('/api/users/:id', async (req, res) => {
    try {
        const user = await User.deleteOne({ _id: req.params.id });
        res.json(user)
    } catch (err) {
        res.send(err)
    }
})

//UPLOAD AN IMAGE 
app.post('/api/upload', upload.single('avatar'), (req, res) => {
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
app.post('/api/upload/:id', upload.single('avatar'), async (req, res) => {
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