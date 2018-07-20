const { ObjectID } = require('mongodb')
// const { mongoose } = require('../db/mongoose')
const { Todo } = require('../models/todo')
const { User } = require('../models/users')

Todo.remove({}).then(() => {

})
Todo.findOneAndRemove(() => {

})
Todo.findByIdAndRemove()