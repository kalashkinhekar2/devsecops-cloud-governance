const mongoose = require("mongoose");

const RequestSchema = new mongoose.Schema(
{
    requesterName: {
        type: String,
        required: true
    },

    requesterEmail: {
        type: String,
        required: true
    },
    
    department: {
        type: String,
        required: true
    },

    cloudProvider: {
        type: String,
        enum: ["AWS", "Azure"],
        required: true
    },

    resourceType: {
        type: String,
        required: true
    },

    environment: {
        type: String,
        enum: ["Dev", "Test", "Production"],
        required: true
    },

    purpose: {
        type: String,
        required: true
    },

    durationDays: {
        type: Number,
        required: true
    },

    usageEstimate: {
        type: Number,
        required: true
    },

    accessJustification: {
        type: String,
        required: true
    },

    status: {
        type: String,
        default: "Submitted"
    },

    costCategory: {
        type: String,
        default: "Low"
    },

    reviewerComments: {
        type: String
    },

    owner: {
        type: String,
        required: true
    },

    expiryDate: {
        type: Date
    }

    

},
{ timestamps: true }
);

module.exports = mongoose.model("Request", RequestSchema);