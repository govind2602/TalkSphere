import { StreamChat } from "stream-chat";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.STREAM_API_KEY;   // keep your env spelling
const apiSecret = process.env.STREAM_API_SECRET;

if (!apiKey || !apiSecret) {
    throw new Error("Stream API key and secret are required");
}

// ✅ initialize with longer timeout & explicit region (change if your app is not in 'singapore')
const streamClient = StreamChat.getInstance(apiKey, apiSecret, {
    timeout: 10000, // 10 seconds
});

// If your Stream app is in another region (check dashboard), update this:
// Possible values: 'us-east', 'dublin', 'singapore', 'sydney', 'tokyo'
streamClient.setBaseURL("https://chat.stream-io-api.com");

export const upsertStreamUser = async (userData) => {
    try {
        await streamClient.upsertUser({
            id: userData.id,
            name: userData.name,
            image: userData.image || "",
        });
        console.log(`✅ Stream user upserted: ${userData.id}`);
        return userData;
    } catch (error) {
        console.error("❌ Error upserting Stream user:", error.message);
        throw new Error("Failed to upsert Stream user");
    }
};

export const generateStreamToken = (userId) => {
    try {
        // ensure userId is a string
        const userIdStr = userId.toString();
        return streamClient.createToken(userIdStr);
    } catch (error) {
        console.error("Error generating Stream token:", error);
    }
};
