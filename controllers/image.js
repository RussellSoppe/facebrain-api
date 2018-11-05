const Clarifai = require('clarifai');

const API_KEY = process.env.API_KEY;

const app = new Clarifai.App({
 apiKey: process.env.API_CLARIFAIKEY
});

const handleApiCall = (req, res)=>{
	app.models
		.predict(Clarifai.FACE_DETECT_MODEL, req.body.input)
		.then(data => {
			res.json(data);
		})
		.catch(err => res.status(400).json('Unable To Work With API'))
}

const handleImage = (req, res, db)=>{
	const {id} = req.body;
	
	db('users').where('id', '=', id)
	.increment('entries', 1)
	.returning('entries')
	.then(entries => {
		res.json(entries[0]);
	})
	.catch(err => res.status(400).json('Unable To Retrieve Entries'))
}


//with ECMA 6 no need for both names in the object since they are the same, can just have handle<name>, but I left for sake of remembering what was happening
module.exports = {
	handleImage: handleImage, 
	handleApiCall: handleApiCall
};