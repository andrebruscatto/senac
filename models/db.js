/*
    O db.js é um script em javascript que instancia o OCR, responsável 
    por criar a interface com obanco de dados. Nesse arquivo deve-se 
    colocar as informações do banco de dados que se pretende conectar 
    no projeto.

*/
//Inicializa o sequelize dando um require
const Sequelize = require("sequelize")

//Instancia o sequelize, passando como argumento, as credenciais do banco
const sequelize = new Sequelize('informativo','root','',{
    host:'localhost',
    dialect:'mysql'
})

//Exporta o db para ser utilizado nas demais models, como a do usuario
module.exports = {
    Sequelize:Sequelize,
    sequelize:sequelize
}