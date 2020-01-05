const bcrypt = require('bcryptjs');
const User = require('../../models/user');
const jwt = require('jsonwebtoken');

module.exports = {
    createUser: async (args)=>{
        try{
            const user = await User.findOne({email: args.userInput.email});
            if(user){
                throw new Error("User exists")
            }
            const hash = await bcrypt.hash(args.userInput.password,10)    
            const newUser = new User({
                email: args.userInput.email,
                password: hash
            });
            const result = await newUser.save()
            return {...result._doc, password: "***", _id: result.id}
        }
        catch(err){
            throw err;
        }
    },
    login: async ({email, password}) => {
        const user = await User.findOne({email: email});
        if(!user){
            throw new Error("User does not exist");
        }
        const isEqual = await bcrypt.compare(password, user.password);
        if(!isEqual){
            throw new Error("Incorrect credentials")
        }
        const token = jwt.sign({userId: user.id, email: user.email},'SECRETKEY',{expiresIn:'1h'});
        return {userId: user.id, token: token, tokenExpiry: 1}
    }
}