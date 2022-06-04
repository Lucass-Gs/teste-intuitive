const router = require('express').Router()

const { update } = require('../models/Person')
const Person = require('../models/Person')



// Create - criação da operadora
router.post('/', async (req, res) => {

      //req.body
      const { RegistroANS, CNPJ, RazaoSocial, NomeFantasia, Modalidade,
            Logradouro, Numero, Complemento, Bairro, Cidade, UF, CEP,
            DDD, Telefone, Fax, EnderecoEletronico, Representante,
            CargoRepresentant, DataRegistroANS } = req.body

      // validacao de dados obrigatorios     
      if (RegistroANS[0] == " " || CNPJ[0] == " " || RazaoSocial[0] == " ") {
            res.status(422).json({ error: 'Dados obrigatórios não inseridos!' })
            return
      }

      const person = {
            RegistroANS, CNPJ, RazaoSocial, NomeFantasia, Modalidade,
            Logradouro, Numero, Complemento, Bairro, Cidade, UF, CEP,
            DDD, Telefone, Fax, EnderecoEletronico, Representante,
            CargoRepresentant, DataRegistroANS
      }

      try {
            //Criando dados
            await Person.create(person)

            res.status(201).json({ message: 'Pessoa inserida no sistema com sucesso!' })
      } catch (error) {
            res.status(500).json({ erro: error })
      }
})

// Read - leitura dos dados

//Buscar todas operadoras
router.get('/', async (req, res) => {
      try {
            const people = await Person.find()
            res.status(200).json(people)
      } catch (error) {
            res.status(500).json({ error: error })
      }
})

router.get('/:id', async (req, res) => {
      //Buscar operadora pelo id
      //extrair o dado da requisição
      const id = req.params.id
      try {
            const person = await Person.findOne({ _id: id })

            if (!person) {
                  res.status(422).json({ message: 'O usuário não foi encontrado!' })
                  return
            }
            res.status(200).json(person)
      } catch (error) {
            res.status(500).json({ error: error })
      }
})

//Update - atualização de dados (PUT, PATCH)
router.patch('/:id', async (req, res) => {
      const id = req.params.id

      const { RegistroANS, CNPJ, RazaoSocial, NomeFantasia, Modalidade,
            Logradouro, Numero, Complemento, Bairro, Cidade, UF, CEP,
            DDD, Telefone, Fax, EnderecoEletronico, Representante,
            CargoRepresentant, DataRegistroANS } = req.body

      const person = {
            RegistroANS, CNPJ, RazaoSocial, NomeFantasia, Modalidade,
            Logradouro, Numero, Complemento, Bairro, Cidade, UF, CEP,
            DDD, Telefone, Fax, EnderecoEletronico, Representante,
            CargoRepresentant, DataRegistroANS
      }
      try {
            const updatedPerson = await Person.updateOne({ _id: id }, person)
            if (updatedPerson.matchedCount === 0) {
                  res.status(422).json({ message: 'O usuário não foi encontrado!' })
                  return
            }
            res.status(200).json(person)
      } catch (error) {
            res.status(500).json({ error: error })
      }
})

router.delete('/:id', async (req, res) => {
      const id = req.params.id

      const person = await Person.findOne({ _id: id })
      if (!person) {
            res.status(422).json({ message: 'O usuário não foi encontrado!' })
            return
      }
      try {
            await Person.deleteOne({ _id: id })
            res.status(200).json({ message: 'Usuário removido com sucesso!' })
      } catch (error) {
            res.status(500).json({ error: error })
      }
})

module.exports = router