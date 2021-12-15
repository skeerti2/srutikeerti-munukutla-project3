const express = require('express');
const router = express.Router();
const UserModelAccessor = require('./Model/User.Model');


router.post('/signUp', (req, res) => {
    console.log("From router for signup")
    console.log("req.body in signup" + req.body)
    const { username, password, email} = req.body
    
    //if user is already logged in, the send error
    // else, if user signing up, add user to session
    console.log("session ID before setting session username : " +req.sessionID)
    if(!req.session.username){
        req.session.username = username
        console.log("current session is of", req.session + "with session ID : " + req.sessionID)
    return UserModelAccessor.findByUsername(username)
        .then(response => {
            if (!response) {
                UserModelAccessor.createUser(req.body)
                    .then(newRes => res.status(200).send(newRes))
                    .catch(error => {
                        console.log("Error creating a user")
                        return res.status(400).send("Error creating a user")
                    })     
            }else{
                console.log("username already exists")
                return res.status(400).send("username already exists")
            }
        })
        .catch(error => {
            console.log("error in finding user by name")
            return res.status(400).send("error in finding user by name")
        })
    }else{
        console.log("user is already signed in, please log out to sign up")
        return res.status(400).send("user is already signed in, please log out to sign up")
    }
})


router.post('/logIn', (req, res) =>{
    const {username, password} = req.body;
    //TODO: need to validate password matching
    if(req.session.username){
        res.send('User already logged In')
    } else{
        return UserModelAccessor.findByUsername(username)
        .then(response => {
            req.session.username = username;
            res.status(200).send(response)
        })
        .catch(error => res.status(422).send("Hey new User! Please sign up first!"))
    }
})

router.get('/logout', (req, res)=>{
    if(req.session.username){
        req.session.destroy(error => {
            if(error){
                console.log(error);
            } else {
                res.status(200).send('Successfully logged out!')
            }
        });
    }
})

router.get('/isLoggedIn', (req, res) =>{
    const username = req.session.username;
    if(username){   
        res.status(200).send({username: username})
    }else{
        res.status(401).send("Not authorized")
    }
})

module.exports = router;