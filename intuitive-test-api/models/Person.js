const mongoose = require('mongoose');

const Person = mongoose.model('Person', {
      RegistroANS: String,
      CNPJ: String,
      RazaoSocial: String,
      NomeFantasia: String,
      Modalidade: String,
      Logradouro: String,
      Numero: String,
      Complemento: String,
      Bairro: String,
      Cidade: String,
      UF: String,
      CEP: String,
      DDD: String,
      Telefone: String,
      Fax: String,
      EnderecoEletronico: String,
      Representante: String,
      CargoRepresentant: String,
      DataRegistroANS: String,
});

module.exports = Person
