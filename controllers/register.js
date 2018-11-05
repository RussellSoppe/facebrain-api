
//can create a require for db and bcrypt or they can be passed from server.js to this function
//const bcrypt = require('bcryptjs');


const handleRegister = (req, res, db, bcrypt)=>{
	const { email, name, password } = req.body;
	
	if (!email || !name || !password){
		return res.status(400).json('Incorrect Form Submission');
	}

	const hash = bcrypt.hashSync(password);
	//knex transaction - read up this can get tricky
		db.transaction(trx => {
			trx.insert({
				hash: hash,
				email: email
			})
			.into('login')
			.returning('email')
			.then(loginemail => {
				return trx('users')
				//knex has feature called returning
				.returning('*')
				.insert({
					name: name,
					email: loginemail[0],
					joined: new Date()
				})
				//response can be named anything, lets name it user to make it more decriptive
				.then(user => {
					//only want to return one user just in case of something I didn't quite understand, maybe if more objects or arrays or something?
					res.json(user[0]);
				})
			})
			//read more in knex
			.then(trx.commit)
			.catch(trx.rollback)
		})
		
		// do not log the error itself as it will reveal too much about the database, such as if a user exists by such a name, 
		// a security issue for time attacks or hard attacks 
		.catch(err => res.status(400).json('UNABLE TO REGISTER'))
}

//with ECMA 6 no need for both can just have handleProfileGet, I left for sake of remembering what was happening
module.exports = {
	handleRegister: handleRegister
};