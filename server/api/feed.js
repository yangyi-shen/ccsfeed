export default async function handler(req, res) {
    try {
        const feed = await Post.find({}).sort({ timestamp: -1 }).limit(40)

        return res.json({
            success: true,
            feed: feed
        })
    } catch (err) {
        console.error(err)
        return res.json({
            success: false
        })
    }
}