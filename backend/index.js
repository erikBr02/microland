import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();


const app=express();
const PORT = process.env.PORT || 3000;



app.use(cors({
    origin: "http://localhost:5173", // Allow frontend origin
    methods: ["POST"],
    allowedHeaders: ["Content-Type"]
}));
app.use(express.json());


app.post("/ask-gemini", async (req, res) => {
    const { question } = req.body;

    if (!question) {
        return res.status(400).json({ error: 'Question is required' });
    }

    try {
        const response = await axios.post(
            'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=' + process.env.GEMINI_API_KEY,
            {
                contents: [
                    { parts: [{ text: question }] },
                ],
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                },
            }
        );

        const answer = response.data.candidates[0].content.parts[0].text;
        res.json({ answer });
        console.log(answer);
    } catch (error) {
        console.error('Error calling Gemini API:', error);
        res.status(500).json({ error: 'Failed to fetch response from Gemini API' });
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});