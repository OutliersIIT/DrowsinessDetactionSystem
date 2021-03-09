const express = require('express')
const app = express()
Const mongoClient = require('mongodb').MongoClient

Const url = "mongodb://localhost:27017"

app.use(express.json())

mongoClient.connect(url, (err, db) => {

	if (err) {
		console.log("error while connecting mongo client")
	} else {
		const myDb = db.db('myDb')
		const collection = myDb.collection('myTable')

		app.post('/signin', (req, res) => {

			const newUser = {
				name: req.body.name,
				age: req.body.age
			}
			const query = {email: newUser.email}

			collection.findOne(query, (err, result) => {
				if (result == null){
					collection.insertOne(newUser, (err, result) =>{
						res.status(200).send()
					})
				}else{
					res.status(400).send()
				}
			})
		})
	}

})