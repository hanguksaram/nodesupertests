const { ObjectID } = require('mongodb')
// const { mongoose } = require('../db/mongoose')
const { Todo } = require('../models/todo')
const { User } = require('../models/users')

const id = '5b516dbeac61532918481c0d'

User.findById(id)
    .then(usr => {
        if (!usr)
           return console.log('user not found') 
        console.log(usr)},
            err => console.log('Id couldnt be cast'))
    
        
        

// if (!ObjectID.isValid(id)){
//     console.log('ID not valid')
// }
// Todo.find({
//     _id: id
// }).then((todos) => {
//     console.log(todos)
// })

// Todo.findOne({
//     _id: id
// }).then((todo) => {
//     console.log(todo)
// })

// Todo.findById(id).then((todo) => {
//     if (!todo)
//         return console.log('Id not found')
//     console.log(todo)
// }).catch((e) => console.log(e))