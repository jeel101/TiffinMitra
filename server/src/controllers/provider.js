const bcrypt = require('bcrypt');
const providerModel = require('../models/provider');
const userModel = require('../models/user');
const generateToken = require('../utils/generateToken');
const uploads = require('../utils/cloudinaryUpload');
// const { sendEmail } = require('../utils/sendEmail');

exports.registerProvider = async (req, res) => {
    try {
        const {
            name,
            email,
            password,
            phoneNumber,
            address,
            aadhaar,
            pan,
            gst
        } = req.body;

        const providerExists = await providerModel.findOne({ email });
        let providerLogo = "";

        if (req.file) {
            const location = req.file.buffer;
            const result = await uploads(location);
            providerLogo = result.url;
        }

        if (providerExists)
            return res.status(400).json({ message: "Provider Already Exists" });

        const isUser = await userModel.findOne({ email });
        if (isUser)
            return res.status(400).json({ message: "Invalid email! Email exists as user" });

        // ✅ Map correctly to schema fields
        const data = {
            name,
            email,
            password,
            phoneNumber,
            address,
            providerLogo,
            aadhaarNo: aadhaar,
            panNo: pan,
            gstNo: gst
        };

        const provider = await providerModel.create(data);

        generateToken(res, 201, provider, false);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.loginProvider = async (req, res) => {
    try {
        const { email, password } = req.body;
        const provider = await providerModel.findOne({ email });
        if (!provider)
            return res.status(404).json({ message: "Invalid Email or Password" });

        const passwordMatch = await bcrypt.compare(password, provider.password);
        if (!passwordMatch)
            return res.status(400).json({ message: "Invalid Email or Password" });

        if (!provider.isAuthorized) {
            return res.status(400).json({ message: "You are not authorized" });
        }

        generateToken(res, 200, provider, false);
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.getProviderDetails = async (req, res) => {
    try {
        if (!req?.provider) {
            return res.status(404).json({ message: "No provider Found" });
        }

        const provider = await providerModel.findOne({ _id: req.provider._id });
        if (!provider)
            return res.status(404).json({ message: "No provider Found" });

        return res.status(200).json({ provider });
    } catch (error) {
        return res.status(500).json({});
    }
};

exports.getAllProviders = async (req, res) => {
    try {
        const allProviders = await providerModel.find();

        if (!allProviders.length === 0)
            return res.status(404).json({ success: false });

        return res.status(200).json({ allProviders });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};

exports.getProviderById = async (req, res) => {
    try {
        const { _id } = req.params;

        const provider = await providerModel.findById(_id);
        if (!provider)
            return res.status(404).json({ success: false });

        return res.status(200).json({ provider });
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
};
