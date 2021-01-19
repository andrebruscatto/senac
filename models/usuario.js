/*
    O arquivo usuario.js é um models, ou seja, um modelo da tabela de nome 
    igual, localizada no banco de dados, cujo proposito é "interfacear" 
    com o front-end, usando OCR.
*/
const db = require('./db')

const usuario = db.sequelize.define('informativo',{
    Nome:{
        type:db.Sequelize.STRING
    },
    senha:{
        type:db.Sequelize.STRING
    }
})

//Cria tabela - somente uma vez
//usuario.sync({force:true})

module.exports = usuario