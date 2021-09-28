const mongoose = require('mongoose')
const Schema = mongoose.Schema

var uniqueValidator = require('mongoose-unique-validator');

const bcrypt = require('bcrypt')

const SaltRounds = 10

const userSchema = new Schema({


  email: {

    type: String,
    unique: [true, 'email  required'],
    required: [true, 'email  required'],

    // validate: {/*pour tester sur les caractéres  regex*/

    //     validator: function(mail) {
    //       return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail);
    //     },

    //     message: props /* propse el message eli bech yeketbo*/ => `${props.value} is not a valid email!`

    //    },


  },

  password: {

    type: String,
    required: true,

    // validate: {/*pour tester sur les caractéres  regex*/
    //     validator: function(password) {
    //       return /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8,15}$/.test(password);
    //     },

    //     message: props /* propse el message eli bech yeketbo*/ => `${props.value} is not a correct password`
    //   },

  },
  avatar: {
    type: String,
    default: 'useravatar.png'
  }
},
  { timestamps: true }

)

userSchema.plugin(uniqueValidator);

userSchema.pre('save', function (next) {

  this.password = bcrypt.hashSync(this.password, SaltRounds);
  next()

})


module.exports = mongoose.model('user', userSchema);