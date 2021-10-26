const {client} = require('pg');

const userSchema = new client.userSchema({
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    }
})