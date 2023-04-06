import UserPost from "../../models/UserPost.js";

export const viewPost = async (req, res) => {
    try {
        const postId = req.query.id
        if (!postId) throw 'No post found!'
        const mongoIdRegex = /^[0-9a-fA-F]{24}$/;

        if (!mongoIdRegex.test(postId)) throw 'No post found!'

        UserPost.findOne({ _id: postId }).select(['-__v', '-_id',]).then((post) => {
            if (post) res.status(200).json({ post: post })
        }).catch((error) => {
            throw error
        })

    } catch (err) {
        res.status(404).json({ error: err });
    }
}