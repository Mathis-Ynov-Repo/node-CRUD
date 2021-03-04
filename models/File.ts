export class File {
    fieldname: String
    originalname: String
    encoding: String
    mimetype: String
    destination: String
    filename: String
    path: String
    size: Number

    constructor(fieldname: String, originalname: String, encoding: String, mimetype: String, destination: String, filename: String, path: String, size: Number) {
        this.fieldname = fieldname
        this.originalname = originalname
        this.encoding = encoding
        this.mimetype = mimetype
        this.destination = destination
        this.filename = filename
        this.path = path
        this.size = size
    }
}