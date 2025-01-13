const shorturls=require("../models/shortURL")
const shortid=require("shortid")

async function handleShortIdCreation(req,res){
    const body=req.body;

    if(!body.url) return res.status(400).json({error:"url is required"})
    const shortId = shortid();
//    const { shortId } = req.params;

    await shorturls.create(
        {
            shortId:shortId,
            redirectURL:body.url,
            visitHistory:[]
        }
    )
    
    return res.render('home',{id:shortId})
    return res.json({id:shortId})
}


async function handleShortIdVisitor(req,res){
    const shortId=req.params.shortId;
    const entry=await shorturls.findOneAndUpdate(
        {shortId}
    ,{
        $push:{
            visitHistory:{
                timestamp:Date.now(),
            }
        }
    },
    { new: true } )
    console.log(entry)
    res.redirect(entry.redirectURL)
}
// async function handleShortIdVisitor(req, res) {
//     const shortId = req.params.shortId;

//     try {
//         // Use a proper filter to find the document by shortId
//         const entry = await shorturls.findOneAndUpdate(
//             { shortId },  // Proper filter
//             {
//                 $push: {
//                     visitHistory: {
//                         timestamp: Date.now(),
//                     },
//                 },
//             },
//             { new: true }  // Return the updated document
//         );

//         if (!entry) {
//             // If no document is found, handle the error
//             return res.status(404).send("Short URL not found");
//         }

//         console.log(entry);  // Log the updated entry
//         res.redirect(entry.redirectURL);  // Redirect to the stored URL
//     } catch (error) {
//         console.error("Error updating visit history:", error);
//         res.status(500).send("Internal Server Error");
//     }
// }

async function handleAnalytics(req,res){
    const shortId=req.params.shortId;
    const result=await shorturls.findOne({shortId});
    return res.json({totalclicks:result.visitHistory.length,
        analytics:result.visitHistory})
    

}
async function handleGetAllURL(req,res){
    const allURL=await shorturls.find({});
    return res.render("home",{allURLs:allURL})
}

async function handleGetdatabyForm(req, res) {
    try {
        const allURLs = await shorturls.find({});
        console.log("Fetched URLs:", allURLs); // Log fetched data
        return res.render("home", { urls: allURLs }); // Pass resolved data
    } catch (error) {
        console.error("Error fetching URLs:", error);
        res.status(500).send("Server Error");
    }
}

module.exports={
    handleShortIdCreation,
    handleShortIdVisitor,handleAnalytics,handleGetdatabyForm,handleGetAllURL
}