import { Document } from "mongoose";

export interface IUser extends Document {
    _id: String
    name: String
    surname: String
    email: String
    password: String
    civility: String
    longitude: Number
    photo: String
    latitude: Number
    birthDate: Date
}