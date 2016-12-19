/**
 * Created by HP_PC on 12/17/2016.
 */
var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

var schema = mongoose.Schema({

    local:{

        email: String,
        password:String,
        Hashedpassword : String
    }


});

schema.methods.generateHash = function(password){
    return bcrypt.hashSync(password,bcrypt.genSaltSync(8),null);
};

schema.methods.validPassword = function(password){
    return bcrypt.compareSync(password,this.local.Hashedpassword);
    /*    if(error){
            return ob(error);
        }
        ob(null,isMatch);
    */
};

module.exports = mongoose.model('User',schema);

/*
module.exports = mongoose.model('User',new schema({

    email: String,
    password:String
}));*/