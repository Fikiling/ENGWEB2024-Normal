var express = require('express');
var router = express.Router();
var CONTRATO = require('../controllers/contratos');

/* Listar os contratos (R) */
router.get('/', function(req, res) {

  const entidade = req.query.entidade; // entidade é o que literalmente vem no url 
  const tipo = req.query.tipo;
  const nipc = req.query.nipc;
  let query = {}; // Objeto de consulta inicial vazio

  // Adicionar condição de consulta com base no parâmetro 'especie'
  if (entidade) {
      query.entidade_comunicante = entidade;
  }

  // Adicionar condição de consulta com base no parâmetro 'implantacao'
  if (tipo) {
      query.tipoprocedimento = tipo;
  }

  // Adicionar condição de consulta com base no parâmetro 'nipc'
  if (nipc) {
      query.NIPC_entidade_comunicante = nipc;
  }


  CONTRATO.findByQuery(query)
      .then(data => res.jsonp(data))
      .catch(erro => res.jsonp(erro))
});

// Listar as entidades comunicantes (R).
router.get('/entidades', function(req, res) {
  CONTRATO.listEntidades()
      .then(data => res.jsonp(data))
      .catch(erro => res.jsonp(erro))
});

// Listar os tipos de contratos (R).
router.get('/tipos', function(req, res) {
  CONTRATO.listTipos()
      .then(data => res.jsonp(data))
      .catch(erro => res.jsonp(erro))
});

// Consultar um contrato (R).
router.get('/:id', function(req, res) {
  CONTRATO.findById(req.params.id)
    .then(data => res.jsonp(data))
    .catch(erro => res.jsonp(erro))
});

// Criar um contrato (C).
router.post('/', function(req, res) {
  CONTRATO.insert(req.body)
    .then(data => res.status(201).jsonp(data))
    .catch(erro => res.jsonp(erro))
});

// Alterar um contrato (U).
router.put('/:id', function(req, res) {
  CONTRATO.update(req.params.id, req.body)
    .then(data => res.jsonp(data))
    .catch(erro => res.jsonp(erro))
});

// Remover um contrato (D).
router.delete('/:id', function(req, res) {
  CONTRATO.remove(req.params.id)
    .then(data => res.jsonp(data))
    .catch(erro => res.jsonp(erro))
});

module.exports = router;
