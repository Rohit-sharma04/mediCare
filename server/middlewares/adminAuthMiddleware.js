import jwt from "jsonwebtoken";
import userModel from "../models/userModels.js";

export default async (req, res, next) => {
    try {
        const token = req.headers["authorization"].split(" ")[1];
        console.log("auth admin token ",token)
        jwt.verify(token, process.env.JWT_SECRET, (err, decode) => {
            if (err) {
                return res.status(200).send({
                    message: "Auth Failed",
                    success: false,
                });
            } else {
                const user = userModel.findOne({ _id: decode.id })
                if (user.isAdmin) {
                    next();
                }
                else {
                    return res.status(200).send({
                        message: "Auth Failed",
                        success: false,
                    });
                }
            }
        });
    } catch (error) {
        console.log(error);
        res.status(401).send({
            message: "Auth Failed",
            success: false,
        });
    }
};
