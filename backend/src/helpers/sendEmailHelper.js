const axios = require("axios");
require("dotenv").config();

const sendEmailHelper = async ({
    senderEmail = "techerudite@trial-neqvygmp27wg0p7w.mlsender.net",
    senderName = "Techerudite",
    recipients,
    subject,
    htmlContent,
    textContent
}) => {
    try {
        const response = await axios.post(
            "https://api.mailersend.com/v1/email",
            {
                from: {
                    email: senderEmail,
                    name: senderName,
                },
                to: recipients.map(r => ({ email: r.email, name: r.name })),
                subject,
                html: htmlContent,
                text: textContent
            },
            {
                headers: {
                    "Authorization": `Bearer ${process.env.EMAIL_API_KEY}`,
                    "Content-Type": "application/json",
                }
            }
        );

        return response.data;
    } catch (error) {
        console.error("Error sending email:", error.response ? error.response.data : error.message);
        throw new Error("Failed to send email");
    }
};

module.exports = sendEmailHelper;
