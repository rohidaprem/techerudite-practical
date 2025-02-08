const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken"); // You will use this for creating the token
const sendEmailHelper = require("../helpers/sendEmailHelper"); // Assuming this is your helper file
const AuthModel = require("../models/authModel");
const { Op } = require("sequelize");

const signUp = async (req, res) => {
    try {
        const { firstName, lastName, email, password, role = "customer" } = req.body;

        // Check if the email with the same role already exists
        const existingRecords = await AuthModel.count({
            where: {
                isDeleted: false,
                role,
                email: email.toLowerCase(),
            },
        });

        if (existingRecords) {
            return res.status(409).json({ success: false, message: "Email with the same role already exists" });
        }

        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user record
        const data = await AuthModel.create({
            firstName,
            lastName,
            email: email.toLowerCase(),
            role,
            password: hashedPassword,
        });

        // Create a verification token (with expiration date)
        const verificationToken = jwt.sign({ email: data.email, id: data.id }, process.env.JWT_SECRET, { expiresIn: "24h" });

        // Construct verification URL
        const verificationUrl = `localhost:3000/verify-auth/${verificationToken}`;

        // Define email subject and content
        const subject = "Verify Your Email for Techerudite";
        const htmlContent = `
            <p>Hi ${firstName},</p>
            <p>Welcome to Techerudite! Please click the link below to verify your email and activate your account:</p>
            <a href="${verificationUrl}">Verify Email</a>
            <p>If you did not register, please ignore this email.</p>
            <p>Thank you,</p>
            <p>The Techerudite Team</p>
        `;
        const textContent = `
            Hi ${firstName},
            Welcome to Techerudite! Please click the link below to verify your email and activate your account:

            ${verificationUrl}

            If you did not register, please ignore this email.

            Thank you,
            The Techerudite Team
        `;

        // Send verification email
        const emailResponse = await sendEmailHelper({
            recipients: [{ email: data.email, name: `${firstName} ${lastName}` }],
            subject,
            htmlContent,
            textContent,
        });

        // Send response with the created data and success message
        return res.status(201).json({
            success: true,
            message: "Account created successfully. Please check your email for verification.",
            authData: {
                id: data.id,
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                role: data.role,
                createdAt: data.createdAt,
                updatedAt: data.updatedAt,
            },
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Technical Error", error });
    }
};

const signIn = async (req, res) => {
    try {
        const { email, password, role = "customer" } = req.body;

        // Check if the email exists with the given role
        const existingUser = await AuthModel.findOne({
            where: {
                isDeleted: false,
                role,
                email: email.toLowerCase(),
            },
        });

        // If no user found, check if the email exists under a different role
        if (!existingUser) {
            const userWithDifferentRole = await AuthModel.findOne({
                where: {
                    isDeleted: false,
                    email: email.toLowerCase(),
                    role: { [Op.ne]: role }, // Check if the role is different
                },
            });

            if (userWithDifferentRole) {
                return res.status(403).json({ success: false, message: "You are not allowed to sign in from here." });
            }

            return res.status(404).json({ success: false, message: "Email does not exist." });
        }

        // Check if the email is verified
        if (!existingUser.isEmailVerified) {
            return res.status(401).json({ success: false, message: "Please verify your email before logging in." });
        }

        // Validate password
        const isPasswordValid = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordValid) {
            return res.status(401).json({ success: false, message: "Invalid email or password." });
        }

        // Generate JWT Token
        const token = jwt.sign(
            { id: existingUser.id, email: existingUser.email, role: existingUser.role },
            process.env.JWT_SECRET,
            { expiresIn: "24h" }
        );

        // Return success response with token
        return res.status(200).json({
            success: true,
            message: "Login successful.",
            token,
            user: {
                id: existingUser.id,
                firstName: existingUser.firstName,
                lastName: existingUser.lastName,
                email: existingUser.email,
                role: existingUser.role,
            },
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Technical Error", error });
    }
};

const verifyAuth = async (req, res) => {
    try {
        const { token } = req.params;
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        // Find user by ID and update verification status
        const user = await AuthModel.findOne({ where: { id: decoded.id } });
        if (!user) {
            return res.status(400).json({ success: false, message: "User not found" });
        }

        // Update user to mark as verified
        await AuthModel.update({ isEmailVerified: true }, { where: { id: decoded.id } });

        return res.json({ success: true, message: "Email verified successfully", role: user.role });
    } catch (error) {
        return res.status(400).json({ success: false, message: "Invalid or expired token" });
    }
};

module.exports = { signUp, verifyAuth, signIn };
