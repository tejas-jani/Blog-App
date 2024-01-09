import Post from "../models/post.js";
import fs  from 'fs'; 




export const createPost = async (req, res) => {

    const { title, summary, content} = req.body;
    console.log(req.file)
    if (!(title && summary && content && req.file ))
        req.res.status(422).json({ err: "please provide All fields" })


    try {
        const postDoc = await Post.create({
            title,
            summary,
            content,
            "cover": req.file.path.toString(),
            author: req.info.id
        })

        res.json({_id :postDoc._id })

    } catch (err) {
        res.status(500).json({ err })
    }

}

export const getAllPost = async (req, res) => {
    try {
        const posts = await Post
            .find({}, { content: 0, updatedAt: 0, content: 0 })
            .populate("author", ["username"])
            .sort({ createdAt: -1 })
            .limit(20)

        res.json(posts)
    } catch (err) {
        res.status(500).json({ err })
    }
}


export const getPostById = async (req, res) => {
    const { id } = req.params;
    console.log(id);
    try {
        const post = await Post.findById(id).populate("author", ["username"])

        res.json(post)
    } catch (err) {
        res.status(500).json({ err })
    }
}

export const updatePost = async (req, res) => {
    const { id } = req.body;
    let haseImg = false;

    let post = {};
    if (req.file) { // user also want to update file
        haseImg = true;
        const { title, summary, content } = req.body;
        post = { title, summary, content, "cover": req.file.path.toString() }
    }
    else {
        const { title, summary, content } = req.body;
        post = { title, summary, content }
    }

    try {
        const oldpost = await Post.findOneAndUpdate({ _id: id }, post)
        if (haseImg)   //delete old img after cover image update  
            fs.unlink(oldpost.cover, (err) => err && console.error("file error" + err))

        res.json({message:" Blog updated"});
    } catch (err) {
        res.json({ err }).status(500);
    }
}