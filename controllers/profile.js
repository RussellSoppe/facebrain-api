const handleProfileGet = (req, res, db)=>{
	const {id} = req.params;
	//let found = false; no longer needed once we have database
	db.select('*').from('users').where({
		id: id
	})
	//with ECMA 6 becaues property and value are the same could be .where({id})
		.then(user => {
			if (user.length){
				res.json(user[0])
			} else {
				res.status(400).json('Not Found')
			}
			
		})
		.catch(err => res.status(400).json('Error Getting User'))
}


//with ECMA 6 no need for both can just have handleProfileGet, I left for sake of remembering what was happening
module.exports = {
	handleProfileGet: handleProfileGet
};