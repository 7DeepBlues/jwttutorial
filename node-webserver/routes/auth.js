var bcrypt = require('bcryptjs')
const router = require('express').Router()
var jwt = require('jsonwebtoken')
const { User, userValidate, loginValidate } = require('../model/User')

router.post('/register', async (req,res) => {
    const { error } = userValidate(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    
    const emailExist = await User.findOne({ email : req.body.email})
    if (emailExist) return res.status(400).send('Email already exists')

    const salt = await bcrypt.genSalt(10)
    hashedPassword = await bcrypt.hash(req.body.password, salt)

    try{
        const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hashedPassword
        })
        const savedUser = await user.save()
        res.send(savedUser)
    }catch(err){
        res.status(400).send(err)
    }
})


router.post('/login', async (req,res) => {
    const { error } = loginValidate(req.body)
    if (error) return res.status(400).send(error.details[0].message)

    const user = await User.findOne({ email : req.body.email})
    if (!user) return res.status(400).send('Email does not exist')

    const validPass = await bcrypt.compare(req.body.password,user.password)
    if(!validPass) return res.status(400).send('Invalid Password')

    const token = jwt.sign({_id: user._id}, process.env.TOKEN_SECRET, {expiresIn: 60})
    res.header('auth-token', token).send(token)
})


module.exports = router