const db = require('../../db/connection')
const Sequelize = db.Sequelize
const sequelize = db.sequelize

const Voter = sequelize.define('votertstable',{
firstName:{
    type:Sequelize.STRING,
    allowNull:false
},
secondName:{
    type:Sequelize.STRING,
    allowNull:false
},
phoneNumber:{
    type:Sequelize.INTEGER,
    allowNull:false,
    unique:true
},
idNumber:{
    type:Sequelize.INTEGER,
    allowNull:false,
    unique:true
},
email:{
    type:Sequelize.TEXT,
    allowNull:false,
    unique:true
},
voterPasskey:{
    type:Sequelize.TEXT,
    allowNull:false,
    unique:true
},

})
sequelize.sync()


module.exports = Voter