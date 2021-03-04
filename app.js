const express = require('express')
const app = express()
const mongoose = require('mongoose');
const path = require('path');
const multer = require('multer')
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const fileFilter = (req, file, cb) => {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
const upload = multer({ storage: storage, fileFilter: fileFilter })


mongoose.connect('mongodb://localhost:27017/nodejs', { useNewUrlParser: true, useUnifiedTopology: true });

const User = mongoose.model('user', {
    name: String,
    surname: String,
    email: String,
    password: String,
    birthDate: Date,
    civility: String,
    longitude: Number,
    latitude: Number,
    photo: String
});

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
        res.json(user)
    } catch (err) {
        res.send(err)
    }
})

//POST
app.post('/users', async (req, res) => {
    try {
        const user = await User.create(req.body);
        res.json(user)
    } catch (err) {
        res.send(err)
    }
})

//LOGIN
app.post('/login', async (req, res) => {
    try {
        const user = await User.findOne({ password: req.body.password, email: req.body.password });
        res.json(user)
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

//UPLOAD
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

//POST / UPLOAD
app.post('/users/avatar', upload.single('avatar'), async (req, res) => {
    try {
        const user = await User.create({ ...req.body, photo: req.file.filename });
        res.json(user)
    } catch (err) {
        res.send(err)
    }
})

app.listen(3000)