const db = require('../../db/connection')
const Sequelize = db.Sequelize
const sequelize = db.sequelize




const Candidate = sequelize.define('candidatesTable',{
firstNamemain:{
    type:Sequelize.STRING,
    allowNull:false
},
secondNamemain:{
    type:Sequelize.STRING,
    allowNull:false
},
imageMain:{
    type:Sequelize.TEXT,
    allowNull:false
},
politicalPartyname:{
    type:Sequelize.STRING,
    allowNull:false
},
politicalpartylogo:{
type:Sequelize.TEXT,
allowNull:false
},
runningMatefirstname:{
    type:Sequelize.STRING,
    allowNull:false
},
runningMatesecondname:{
    type:Sequelize.STRING,
    allowNull:false
},
imagerunningMate:{
    type:Sequelize.TEXT,
    allowNull:false
}
})



module.exports = Candidate