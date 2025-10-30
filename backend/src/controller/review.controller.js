import Review from "../models/review.model.js";


export const addReview = async (req, res) => {
    try {
        const { name, message, stars } = req.body;

        if (!name || !message || !stars) {
            return res.status(400).json({ message: "Name, message, and stars are required" });
        }

        const newReview = await Review.create({
            name,
            message,
            stars
        });

        res.status(200).json({ message: "Reviewed successfully!", newReview });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: err.message || "Internal server error" });
    }
};


export const allReviews=(async(req,res)=>{
    try{
        const reviews=await Review.find();
        if(reviews.length==0){
            return res.status(200).json({message:"No review yet"})
        }
        res.status(200).json({message:"Success",reviews})
    }catch(err){
        console.error(err);
        res.status(500).json({ message: err.message || "Internal server error" });
    }
})