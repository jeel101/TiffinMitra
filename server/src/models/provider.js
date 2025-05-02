require('dotenv').config();

const mongoose = require("mongoose")
const bcrypt = require('bcrypt')
const jwt = require("jsonwebtoken")

const providerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
        min: 8
    },
    address: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: Number,
        required: true,
        min: 10,
    },
    rating: {
        type: String,
        default: "0"
    },
    isAuthorized: {
        type: Boolean,
        default: true
    },
    providerLogo: {
        type: String
    },
    aadhaarNo: {   // New field for Aadhaar number
        type: String,
        default: ""   // Default value can be empty string or any other default
    },
    panNo: {        // New field for PAN number
        type: String,
        default: ""   // Default value can be empty string or any other default
    },
    gstNo: {        // New field for GST number
        type: String,
        default: ""   // Default value can be empty string or any other default
    }
})

// Hash password before saving
providerSchema.pre("save", async function (next) {
    const provider = this
    if (!provider.isModified("password")) {
        next()
    }
    provider.password = await bcrypt.hash(provider.password, 10)
})

// Method to generate JWT token
providerSchema.methods.generateJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.SECRET_KEY, { expiresIn: '5d' });
}

// Update existing documents to include new fields
async function addNewFieldsToExistingProviders() {
    try {
        await mongoose.model('providers').updateMany({}, {
            $set: {
                aadhaarNo: "",   // Default value (empty string)
                panNo: "",        // Default value (empty string)
                gstNo: ""         // Default value (empty string)
            }
        });
        console.log("Existing providers updated with new fields.");
    } catch (err) {
        console.error("Error updating providers:", err);
    }
}

module.exports = mongoose.model('providers', providerSchema)
