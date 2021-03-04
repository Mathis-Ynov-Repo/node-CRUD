"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.File = void 0;
var File = /** @class */ (function () {
    function File(fieldname, originalname, encoding, mimetype, destination, filename, path, size) {
        this.fieldname = fieldname;
        this.originalname = originalname;
        this.encoding = encoding;
        this.mimetype = mimetype;
        this.destination = destination;
        this.filename = filename;
        this.path = path;
        this.size = size;
    }
    return File;
}());
exports.File = File;
