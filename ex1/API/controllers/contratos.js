const mongoose = require('mongoose');
var CONTRATO = require("../models/contrato")

module.exports.list = () => {
    return CONTRATO
        .find()
        .exec()
}

module.exports.findById = id => {
    return CONTRATO
    .findOne({_id : id})
    .exec()
}

module.exports.findByQuery = query =>{
    return CONTRATO
    .find(query)
    .exec()
}

module.exports.listEntidades = () => {
    return CONTRATO
        .distinct("entidade_comunicante")
        .exec()
}

module.exports.listTipos = () => {
    return CONTRATO
        .distinct("tipoprocedimento")
        .exec()
}

module.exports.insert = contrato => {
    if((CONTRATO.find({_id : contrato._id}).exec()).length != 1){
        var newContrato = new Contrato(contrato)
        return newContrato.save()
    }
}

module.exports.update = (id, contrato) => {
    return CONTRATO
        .findByIdAndUpdate(id, contrato, {new : true})
}

module.exports.remove = id => {
    return CONTRATO
        .findOneAndDelete({_id : id})
}