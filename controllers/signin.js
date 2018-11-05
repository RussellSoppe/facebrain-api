
const handleSignIn = (req, res, db, bcrypt)=>{
	const {email, password} = req.body;
	
	if (!email || !password){
		return res.status(400).json('Incorrect Form Submission');
	}

	db.select('email', 'hash').from('login')
		.where('email', '=', req.body.email)
		.then(data =>{
			const isValid = bcrypt.compareSync(req.body.password, data[0].hash);
			//console.log(isValid);
			if (isValid){
				return db.select('*').from('users')
					.where('email', '=', req.body.email)
					.then(user => {
						//console.log(user);
						res.json(user[0])
					})
					.catch(err =>{
						res.status(400).json('Unable To Get User!')
					})
			}
			res.status(400).json('Username or Password Do Not Match')
		})
		.catch(err => {
			res.status(400).json('Unable To SignIn!')
		})
}


//with ECMA 6 no need for both can just have handleProfileGet, I left for sake of remembering what was happening
module.exports = {
	handleSignIn: handleSignIn
};