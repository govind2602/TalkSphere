import { upsertStreamUser } from "../lib/stream.js";
import User from "../models/User.js";
import jwt from "jsonwebtoken";

export async function signup(req, res) {
    const { email, password, fullName } = req.body;

    try {
        if (!email || !password || !fullName) {
            return res.status(400).json({ message: "All fields are required" });

        }
        if (password.length < 6) {
            return res.status(400).json({ message: " passwoord must be at least   6 character" });
        }
        const emailREGWx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailREGWx.test(email)) {
            return res.status(400).json({ message: "Invalid email format" });
        }

        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        const idx = Math.floor(Math.random() * 100) + 1;
        const randomAvatar = `https://avatar.iran.liara.run/public/123/${idx}.png`

        const newUser = await User.create({

            email,
            fullName,
            password,
            profilePicture: randomAvatar
        });


        try {
            await upsertStreamUser({
                id: newUser._id.toString(),
                name: newUser.fullName,
                image: newUser.profilePicture || "",

            })
            console.log(`Stream user upserted successfully ${newUser.fullName}`);
        } catch (error) {
            console.log("Error upserting Stream user:", error.message);
        }
        const token = jwt.sign({ userId: newUser._id }, process.env.JWT_SECRET_KEY, {
            expiresIn: "30d"
        })

        res.cookie("jwt", token, {
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
            httpOnly: true,//prevent XSS attacks
            secure: process.env.NODE_ENV === "production", // Use secure cookies in production
            sameSite: "strict" // CSRF protection
        });

        res.status(201).json({ success: true, user: newUser })

    }
    catch (error) {
        console.log("error in signup controller", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function login(req, res) {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        const isPasswordCorrect = await user.matchPassword(password)
        if (!isPasswordCorrect) {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET_KEY, {
            expiresIn: "30d"
        })

        res.cookie("jwt", token, {
            maxAge: 30 * 24 * 60 * 60 * 1000, // 30 days
            httpOnly: true,//prevent XSS attacks
            secure: process.env.NODE_ENV === "production", // Use secure cookies in production
            sameSite: "strict" // CSRF protection
        });
        res.status(200).json({ success: true, user });
    }
    catch (error) {
        console.log("error in login controller", error.message);
        res.status(500).json({ message: "Internal server error" });

    }
}

export function logout(req, res) {
    res.clearCookie("jwt")
    res.status(200).json({ success: true, message: "Logged out successfully" });
}

export async function onboard(req, res) {
    try {
        const userId = req.user._id;
        const { fullName, profilePicture, nativeLanguage, learningLanguage, location } = req.body;

        if (!fullName || !nativeLanguage || !learningLanguage || !location) {
            return res.status(400).json({
                message: "All fields are required",
                missingfields: [
                    !fullName && "fullName",
                    !nativeLanguage && "nativeLanguage",
                    !learningLanguage && "learningLanguage",
                    !location && "location"

                ].filter(Boolean),




            });
        }
        const updatedUser = await User.findByIdAndUpdate(userId, {
            ...req.body,
            isOnboarded: true
        }, { new: true })

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }

        try {
            await upsertStreamUser({
                id: updatedUser._id.toString(),
                name: updatedUser.fullName,
                image: updatedUser.profilePicture || "",
            })
            console.log(`Stream user upserted successfully ${updatedUser.fullName}`);
        } catch (strteamError) {
            console.log("Error upserting Stream user:", strteamError.message);
        }

        res.status(200).json({ success: true, user: updatedUser });
    }
    catch (error) {
        console.error("Onboarding error:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
}