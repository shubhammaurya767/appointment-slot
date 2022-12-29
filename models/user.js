const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    patient_id: {
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
    gender: {
        type: String,
        required: true
    },
    appointments: [{
        date: {
            type: Date,
            required: true
        },
        slot: {
            type: Number
        },
        doctor_id: {
            type: Number,
            required: true
        }
    }]
},{
    timestamps: true
});


const User = mongoose.model('User', userSchema);
module.exports = User;
