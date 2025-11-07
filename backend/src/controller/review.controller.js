import Review from "../models/review.model.js";


export const addReview = async (req, res) => {
    try {
        const { name, message, stars,deleteKey } = req.body;

        if (!name || !message || !stars || !deleteKey) {
            return res.status(400).json({ message: "Name, message, and stars are required" });
        }

        const newReview = await Review.create({
            name,
            message,
            stars,
            deleteKey
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


export const deleteReview=async(req,res)=>{
    try{
        const {id,deleteKey}=req.body;

        if(!id || !deleteKey){
            return res.status(400).json({message:"ID and deleteKey are required"})
        }

        const review=await Review.findById(id);
        if(!review){
            return res.status(404).json({message:"Review not found"})
        }

        if(review.deleteKey!==deleteKey){
            return res.status(403).json({message:"Invalid delete key"})
        }
        
        await Review.findByIdAndDelete(id);
        res.status(200).json({message:"Review deleted successfully"})
    }catch(err){
        console.error(err);
        res.status(500).json({ message: err.message || "Internal server error" });
    }
}