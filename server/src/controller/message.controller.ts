import type { Request, Response } from "express";
import Message from "../models/message.model.js";
import Reviewer from "../models/reviewer.model.js";


export const sendMessage = async (req: Request, res: Response) => {
    try {
        const { name, email, subject, message } = req.body;
        if (!name || !email || !subject || !message) {
            return res.status(400).json({ message: "all fields are required" })
        }
        const createdMessage = await Message.create({ name, email, subject, message })
        return res.status(200).json({ message: "Message sent successfully", createdMessage })
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "internal server error" })
    }
}


export const getAllMessages = async (req: Request, res: Response) => {
    try {
        const userId = req.user;

        if (!userId) {
            return res.status(400).json({ message: "Bad request" });
        }

        const user = await Reviewer.findById(userId);
        if (!user?.isAuthor) {
            return res.status(400).json({ message: "You are not allowed to view messages" })
        }

        const messages = await Message.find().sort({ createdAt: -1 });
        return res.status(200).json({ message: "Messages fetched successfully", messages });
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Internal server error" })
    }
}

export const getMessage = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const userId = req.user;
        if (!id || !userId) {
            return res.status(400).json({ message: "Bad request" })
        }
        const user = await Reviewer.findById(userId);
        if (!user?.isAuthor) {
            return res.status(400).json({ message: "You are not allowed to view messages" })
        }
        const messageData = await Message.findById(id);
        if (!messageData) {
            return res.status(404).json({ message: "Message not found" })
        }
        return res.status(200).json({ message: "Message fetched successfully", messageData });
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: "Internal server error" })
    }
}

export const deleteMessage = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const userId = req.user;
        if (!id || !userId) {
            return res.status(400).json({ message: "bad request" })
        }
        const user = await Reviewer.findById(userId);
        if (!user?.isAuthor) {
            return res.status(400).json({ message: "You are not allowed to delete messages" })
        }
        const messageData = await Message.findByIdAndDelete(id);
        if (!messageData) {
            return res.status(404).json({ message: "Message not found" })
        }
        return res.status(200).json({ message: "Message deleted successfully", messageData });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Internal server error" })
    }
}