var express = require('express');
var router = express.Router();
var axios= require("axios");

/* GET home page. */
router.get('/', function(req, res, next) {
  
  axios.get("http://localhost:16000/contratos")
    .then(resposta=>{
      res.render('index', { title: 'Gestao de contratos Home Page' ,lista:resposta.data});
      //res.render('listItems', { title: 'Gestao de contratos Home Page' ,lista:resposta.data, conjuntos:"contratos"});
    })
    .catch(erro=>{
      res.render("error",{error: erro, message:"Erro ao recuperar as contratos"})
    })
  
});

router.get('/entidades/:id', function(req, res, next) {

  axios.get("http://localhost:16000/contratos?nipc=" + req.params.id)
    .then(resposta=>{
      res.render('nipc', { title: 'Entidade Comunicante ' + req.params.id ,lista:resposta.data});
    })
    .catch(erro=>{
      res.render("error",{error: erro, message:"Erro ao recuperar as contratos"})
    })
  
});

router.get('/:id', function(req, res, next) {

  axios.get("http://localhost:16000/contratos/" + req.params.id)
    .then(resposta=>{
      res.render('item', { title: 'Contrato ' + req.params.id ,item:resposta.data});
    })
    .catch(erro=>{
      res.render("error",{error: erro, message:"Erro ao recuperar as contratos"})
    })
  
});


module.exports = router;
