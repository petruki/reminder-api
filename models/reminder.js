const mongoose = require('mongoose');

const PriorityType = Object.freeze({
    LOW: 'Low',
    MEDIUM: 'Medium',
    HIGH: 'High'
});

const reminderSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        trim: true
    },
    priority: {
        type: String,
        enum: Object.values(PriorityType),
        default: PriorityType.LOW
    },
    daysBefore: {
        type: Number,
        default: 0
    },
    date: {
        type: Date
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
}, {
    timestamps: true
});

reminderSchema.virtual('v_user', {
    ref: 'User',
    localField: 'createdBy',
    foreignField: '_id',
    justOne : true
});

const Reminder = mongoose.model('Reminder', reminderSchema);

module.exports = {
    Reminder,
    PriorityType
};