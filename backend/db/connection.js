const configDb = require('./config')
const Sequelize = require('sequelize')
const sequelize = new Sequelize(configDb.DB,configDb.USER,configDb.PASSWORD,{
host:configDb.HOST,
dialect:configDb.dialect,
port:12860,
operatorsAliases:false,
pool:{
  max:configDb.pool.max,
  min:configDb.pool.min  
},
dialectOptions:{
    ssl:{

      rejectUnauthorized:false
    }
}

})


const db = {}
db.Sequelize = Sequelize
db.sequelize = sequelize
module.exports = db  