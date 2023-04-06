import UserPost from '../../models/UserPost.js'
import multer from "multer"
import path from "path"
import fs from 'fs'
import { v4 as uuidv4 } from 'uuid';


export const createPost = async (req, res) => {
    try {
        const { title, description, bias, market, fileName } = req.body


        if (!title || !description || !bias || !market || !fileName) throw "Incomplete request!"
        const userId = req.userId

        const post = new UserPost({
            'userId': userId,
            title: title,
            description: description,
            bias: bias,
            market: market,
            imageSource: fileName
        })

        post.save()
            .then(() => {
                res.status(200).json({ status: true, message: 'Post created successfully' })
            })
            .catch(() => {
                res.status(403).json({ status: false, message: 'Failed to create post!' })
            })

    }
    catch (err) {
        res.status(500).json({ error: err })
    }
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'data/postImages');
    },
    filename: function (req, file, cb) {
        const imagePath = uuidv4() + '-' + Date.now() + path.extname(file.originalname)
        // console.log("Req: ", req.body)
        cb(null, imagePath);
    }
});

const fileFilter = (req, file, cb) => {
    const allowedFileTypes = ['image/jpeg', 'image/jpg', 'image/png'];
    if (allowedFileTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(null, false);
    }
}
export const uploadPostImage = multer({ storage, fileFilter });

export const upLoadImage = async (req, res) => {
    try {
        const upLoadedFilename = req.file.filename
        if (upLoadedFilename) return res.status(200).json({ fileName: upLoadedFilename })
    }
    catch (err) {
        res.status(500).json({ error: err })
    }
}