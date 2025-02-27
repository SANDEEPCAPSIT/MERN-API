const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const { compare } = require("bcryptjs");

const userSchema = new mongoose.Schema({
    username:{
        type: String,
        require: true,
    },
    email:{
        type: String,
        require: true,
    },
    phone:{
        type: String,
        require: true,
    },
    password:{
        type: String,
        require: true,
    },
    isAdmin:{
        type: Boolean,
        default: false,
    },
});

// compare the password
userSchema.method.comparePassword = async function (password) {
    return bcrypt.compare(password, this.password);
}



//json web token
userSchema.method.generateToken = async function () {
    try {
        return jwt.sign({
            userId: this._id.toString(),
            email: this.email,
            isAdmin: this.isAdmin,
        },
        process.env.JWT_SECRTECT_KEY,
        {
            expiresIn: "30d",
        }

        );
    } catch (error) {
        console.error(error);
    }

};


// define the modele or the collection name
const User = new mongoose.model("User",userSchema);
module.exports = User;