const mongoose = require('mongoose');

const doctorSchema = new mongoose.Schema({
    doctor_id:{
        type: Number,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    appointment: [{
            date: {
                type: Date,
                required: true
            },
            slot: {
                type: Number,
                required: true
            },
            patient_id: {
                type: Number,
                required: true
            }
    }]
},{
    timestamps: true
})


const User = mongoose.model('User', userSchema);
module.exports = User;
