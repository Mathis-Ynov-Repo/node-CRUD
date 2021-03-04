import { File } from "../models/File";


declare namespace Express {
    interface Request {
        file: File
    }
}
