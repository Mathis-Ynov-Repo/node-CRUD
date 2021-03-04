"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var fs_1 = require("fs");
var app = express_1.default();
var mongoose_1 = __importDefault(require("mongoose"));
var path = require('path');
var multer_1 = __importDefault(require("multer"));
var user_model_1 = __importDefault(require("./models/user.model"));
var storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
var fileFilter = function (req, file, cb) {
    if (file.mimetype == 'image/jpeg' || file.mimetype == 'image/png') {
        cb(null, true);
    }
    else {
        cb(null, false);
    }
};
var upload = multer_1.default({ storage: storage, fileFilter: fileFilter });
mongoose_1.default.connect('mongodb://localhost:27017/nodejs', { useNewUrlParser: true, useUnifiedTopology: true });
app.use(express_1.default.json());
app.use('/static', express_1.default.static(__dirname + '/uploads'));
//GET
app.get('/users', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var users, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, user_model_1.default.find({})];
            case 1:
                users = _a.sent();
                res.send(users);
                return [3 /*break*/, 3];
            case 2:
                err_1 = _a.sent();
                res.send(err_1);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
//GET ONE
app.get('/users/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, err_2;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, user_model_1.default.findOne({ _id: req.params.id })];
            case 1:
                user = _a.sent();
                user ? res.json(user) : res.status(404).send('Not Found');
                return [3 /*break*/, 3];
            case 2:
                err_2 = _a.sent();
                res.send(err_2);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
//POST (PREVIOUS WITHOUT FILE UPLOAD)
app.post('/old-users', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, user_model_1.default.create(req.body)];
            case 1:
                user = _a.sent();
                res.json(user);
                return [3 /*break*/, 3];
            case 2:
                err_3 = _a.sent();
                res.send(err_3);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
//POST + UPLOAD
app.post('/users', upload.single('avatar'), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, user_model_1.default.create(__assign(__assign({}, req.body), { photo: 'http://localhost:3000/static/' + req.file.filename }))];
            case 1:
                user = _a.sent();
                res.json(user);
                return [3 /*break*/, 3];
            case 2:
                err_4 = _a.sent();
                res.status(422);
                err_4.errors ? res.send(err_4) : res.send('A profile pictures is needed');
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
//LOGIN
app.post('/login', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, user_model_1.default.findOne({ password: req.body.password, email: req.body.email })];
            case 1:
                user = _a.sent();
                user ? res.json(user) : res.status(404).send('Not Found');
                return [3 /*break*/, 3];
            case 2:
                err_5 = _a.sent();
                res.send(err_5);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
//PUT
app.put('/users/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, err_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, user_model_1.default.updateOne({ _id: req.params.id }, req.body)];
            case 1:
                user = _a.sent();
                res.json(user);
                return [3 /*break*/, 3];
            case 2:
                err_6 = _a.sent();
                res.send(err_6);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
//DELETE
app.delete('/users/:id', function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, err_7;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, user_model_1.default.deleteOne({ _id: req.params.id })];
            case 1:
                user = _a.sent();
                res.json(user);
                return [3 /*break*/, 3];
            case 2:
                err_7 = _a.sent();
                res.send(err_7);
                return [3 /*break*/, 3];
            case 3: return [2 /*return*/];
        }
    });
}); });
//UPLOAD AN IMAGE 
app.post('/upload', upload.single('avatar'), function (req, res) {
    if (!req.file) {
        console.log("No file received");
        return res.send({
            success: false
        });
    }
    else {
        res.json(req.file);
    }
});
//CHANGE IMAGE OF SPECIFIC USER AND DELETE PREVIOUS ONE
app.post('/upload/:id', upload.single('avatar'), function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userToDel, filename, user, e_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!!req.file) return [3 /*break*/, 1];
                console.log("No file received");
                return [2 /*return*/, res.send({
                        success: false
                    })];
            case 1:
                _a.trys.push([1, 4, , 5]);
                return [4 /*yield*/, user_model_1.default.findOne({ _id: req.params.id })];
            case 2:
                userToDel = _a.sent();
                if (userToDel) {
                    filename = userToDel.photo.replace('http://localhost:3000/static/', '');
                    fs_1.unlink('uploads/' + filename, function (err) {
                        if (err)
                            throw err;
                        console.log("deleted file");
                    });
                }
                else {
                    res.json({ status_code: 404, message: "Not Found" });
                }
                return [4 /*yield*/, user_model_1.default.updateOne({ _id: req.params.id }, { photo: 'http://localhost:3000/static/' + req.file.filename })];
            case 3:
                user = _a.sent();
                res.json(user);
                return [3 /*break*/, 5];
            case 4:
                e_1 = _a.sent();
                console.log(e_1);
                return [3 /*break*/, 5];
            case 5: return [2 /*return*/];
        }
    });
}); });
app.listen(3000);
