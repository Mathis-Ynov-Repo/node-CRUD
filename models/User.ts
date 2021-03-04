export interface User {
    _id: Number
    name: String
    surname: String
    email: String
    password: String
    civility: String
    path: String
    longitude: Number
    photo: String
    latitude: Number
    birthDate: Date

    // constructor(_id: Number, name: String, surname: String, email: String, password: String, civility: String, path: String, longitude: Number, photo: String, latitude: Number, birthDate: Date) {
    //     this._id = _id
    //     this.name = name
    //     this.surname = surname
    //     this.email = email
    //     this.password = password
    //     this.civility = civility
    //     this.path = path
    //     this.longitude = longitude
    //     this.photo = photo
    //     this.latitude = latitude
    //     this.birthDate = birthDate
    // }
}