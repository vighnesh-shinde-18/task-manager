const express = require('express')
const user = require('../MODELS/user')
const router = express.Router();
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')

router.get('/', (req, res) => {
    res.send('user routes')
})

router.post('/register', async (req, res) => {

    const { name, email, password } = req.body;
    try {
        const newUser = new user({
            name, email, password
        });
        await newUser.save();
        res.status(200).send({ message: "user created succesfully" })

    }
    catch (err) {
        res.json({ message: err })
    }
})

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const reqUser = await user.findOne({ email })

        if (!reqUser) {
            throw new Error("User not found")
        }
        const isMatch = await bcrypt.compare(password, reqUser.password)
       
        if (!isMatch) {
            throw new Error('Unable to login, invalid credential')
        }

        const token = jwt.sign({
            _id: reqUser._id.toString()
        }, process.env.JWT_SECRET_KEY)

        res.status(200).send({ reqUser, token, message: "logged in succesfully" });

    }
    catch (err) {
      if( err.message === "User not found"){
        res.status(400).send({ message: "User not found" })
      }
      else if(err.message === "Unable to login, invalid credential"){
        res.status(400).send({ error: "Unable to login, invalid credential" })
      }
      else{
        res.status(400).send({ error: "Something went wrong" })
      }
    }
})



module.exports = router;