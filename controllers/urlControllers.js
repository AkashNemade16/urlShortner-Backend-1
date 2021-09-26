import shortUrls from '../models/shortUrls.js';
import shortId from 'shortid';
export const getAllUrls = async (req, res) => {
    try {
        const getUrls = await shortUrls.find();
        res.status(200).json(getUrls);
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

export const getUrl = async (req, res) => {
    try {

        // console.log(res);
        const Url = await shortUrls.findOne({ short: req.params.id });
        if (Url === null) return res.sendStatus(404);
        Url.clicks++;
        Url.save();

        return res.redirect(Url.full)

    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}

export const getUserUrls = async (req, res) => {
    try {

        const Urls = await shortUrls.find({ ownedBy: req.body.email });
        res.status(201).json(Urls);
        console.log({ Urls })
        // if (Urls === null) return res.sendStatus(404);
    } catch (err) {
        res.status(404).json({ message: err.message })
    }
}


export const createPost = async (req, res) => {
    const { full, ownedBy } = req.body;

    console.log(full);
    const short = shortId.generate()



    const newUrl = await shortUrls.findOne({
        full
    })
    if (newUrl) {
        res.json(newUrl)
    } else {
        const shortenedUrl = "https://urlshort-backend.herokuapp.com" + "/" + short
        const newUrl = new shortUrls({ full, short, shortenedUrl, ownedBy });
        await newUrl.save();

        res.status(201).json(newUrl);
    }


}



