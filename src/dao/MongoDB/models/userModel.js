import mongoose from 'mongoose'

const userCollection = 'usuarios'

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: {
        type: String,
        unique: true
    },
    age: Number,
    password: String,
    cartId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "carts"
    },
    role: {
        type: String,
        default: 'user',
        enum:['user','admin','premium']
    },
    documents:{
        type: [{
            name:{
                type: String,
            },
            reference:{
                type: String,
            }
            
    }],
    },
    last_connection:{
        type: Date,
        requiered: true,
    }
})

const userModel = mongoose.model(userCollection, userSchema)

export { userModel }