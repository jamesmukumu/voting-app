
const db = require('../../db/connection')
const Sequelize = db.Sequelize
const sequelize = db.sequelize



const Votes = sequelize.define('votestable',{
politicalParty:{
    type:Sequelize.STRING,
    allowNull:false
},
vote:{
    type:Sequelize.STRING,
    allowNull:false,
    validate:{
        isIn:[['yes','no']]
    }
}
})


sequelize.sync()

module.exports = Votes