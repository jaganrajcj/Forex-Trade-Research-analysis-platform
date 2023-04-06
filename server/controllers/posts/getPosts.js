import UserPost from '../../models/UserPost.js'
import UserInfo from '../../models/UserInfo.js'
import User from '../../models/User.js'

export const getPosts = async (req, res) => {
    try {
        const posts = await UserPost.find().select(['-__v']).sort({ createdAt: -1 })

        const promises = []

        UserPost.find().select(['-__v']).sort({ createdAt: -1 })
            .populate({
                path: 'comments.userId',
                model: 'UserInfo',
                select: 'profileImage firstName lastName',
            })
            .exec(async (err, posts) => {
                if (err) {
                    console.error(err);
                    throw 'Error fetching posts!'
                }
                const updatedPosts = await Promise.all(posts.map(async (post) => {
                    const updatedComments = await Promise.all(post.comments.map(async (comment) => {
                        const userInfo = comment.userId;
                        if (userInfo && userInfo.profileImage) {
                            comment.userId = userInfo._id;
                            comment.profileImage = userInfo.profileImage;
                            comment.name = `${userInfo.firstName} ${userInfo.lastName}`;
                        } else {
                            comment.userId = userInfo._id;
                            comment.profileImage = null;
                            comment.name = '';
                        }
                        delete comment.userId;
                        return comment;
                    }));
                    const userInformation = await UserInfo.findOne({ _id: post.userId });
                    const userData = await User.findOne({ _id: post.userId });
                    const firstName = userInformation?.firstName || '';
                    const lastName = userInformation?.lastName || '';
                    const name = `${firstName} ${lastName}`;
                    const userName = userData.name || ''
                    const profileImage = userInformation.profileImage || ''

                    return { ...post.toObject(), comments: updatedComments, name, userName, profileImage };
                }));
                return res.status(200).json({ data: updatedPosts });

            })

        // res.status(200).json({ data: posts });
    }
    catch (err) {
        res.status(500).json({ error: err });
    }
}