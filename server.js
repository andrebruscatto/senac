//http://devfuria.com.br/nodejs/old/introducao-ao-framework-express-js/

const express = require("express")
const app = express()

const handlebars = require("express-handlebars")
const bodyParser = require("body-parser")

const usuario = require("./models/usuario")

//Configurar handlebar
app.engine('handlebars',handlebars({defaultLayout:'main'}))
app.set('view engine','handlebars')

//Configurar o motor de tamplate handlebar
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json()) 

app.use('/static', express.static(__dirname + '/public'));



/*APARTIR DAQUI COMEÇAM AS ROTAS DO EXPRESS*/

//este bloco e disparado pela url do navegador e busca o formulario.handlebars
app.get('/login/meulogin',function(req,res){
    usuario.findAll().then(function(doadores){
        res.render('formulario',{doador: doadores.map(
                                        pagamento => pagamento.toJSON())})
    })
})
//Rota principal
app.get('/',function(req,res){
  res.send('ola, essa e a pagina inicial e so tem ')
  // res.render('main')
})

//VAMOS CRIAR MAIS UMA ROTA E ELA DARA PARA UM FORMULÁRIO
app.get('/update/:id',function(req,res){
    usuario.findAll({ where:{'id': req.params.id}}).then(function(doadores){
        res.render('atualiza',{doador: doadores.map(pagamento => pagamento.toJSON())})
    })
 })

 //DEPOIS VAMOS CRIAR ESSA ROTA QUE ENVIA PARA O BANCO E DEPOIS CHAMA O FORMULARIO
 app.post('/updateUsuario',function(req,res){
    usuario.update({Nome:req.body.nome,senha:req.body.senha },{
        where:{id:req.body.codigo}}
    ).then(function(){
        usuario.findAll().then(function(doadores){
        res.render('formulario',{doador: doadores.map(pagamento => pagamento.toJSON())})
    })
    }).catch(function(erro){
        res.send("Erro "+erro)
    })
})

//esse bloco é disparado pelo enviar do formulário
app.post('/cadUsuario',function(req,res){
    usuario.create({
        Nome:req.body.nome,
        senha:req.body.senha
    }).then(function(){
        usuario.findAll().then(function(doadores){
        res.render('formulario',{doador: doadores.map(pagamento => pagamento.toJSON())})
    })
    }).catch(function(erro){
        res.send("Erro "+erro)
    })
    //res.send("Nome: "+req.body.nome + "<br>Valor: "+ req.body.senha)
})


//formulario para controle de acesso
app.get('/conectar',function(req,res){

    usuario.count('nome',{where: { authorId: 2 }}).then(function(dados){
        if(dados > 1 ){
            res.send("Usuário Logado" + dados)
        }else{
            res.send("Usuário não cadastrado" + dados)
        }
    })
})

app.get('/delete/:id',function(req,res){
    usuario.destroy({
        where:{'id': req.params.id}
    }).then(function(){  
        usuario.findAll().then(function(doadores){
            res.render('formulario',{doador: doadores.map(
                pagamento => pagamento.toJSON())})
        }).catch(function(){ res.send("não deu certo")
        })
    })
});

app.listen(3000);

/*
const server = app.listen(3000,function(){
    const host = server.address().address
    const port = server.address().port

    console.log("Exemplo de app lendo ",host,port)
})
*/

/*
    
tabela.findAll().then(function(dados){
   var valor = dados;
  //console.log(typeof(valor))
  console.log(valor.forEach(
        function(valor, indice) {
            console.log(valor.email); 
        })
    )
})

*/



