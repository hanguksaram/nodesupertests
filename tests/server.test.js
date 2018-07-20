const expect = require('expect')
const request = require('supertest')
const { app } = require('../server')
const { Todo } = require('../models/todo')
const { ObjectID } = require('mongodb')


const id =  new ObjectID(1)
const todos = [{text: 'First test todo'}, {text: 'Second test todo'}, {_id: id, text: 'Testing object for fetchong by id'}]
beforeEach((done) => {
    Todo.remove({})
        .then(() => {
            return Todo.insertMany(todos)})
                .then(() => done())})
                    // Todo.save({text: 'Test fetching by id', _id: 1})
                    // done()})})
                        // .then(() => done())
                        //     });
          


describe('Post /todos', () => {
    it('should create a new todo', (done) => {
        const text = 'Test todo text'

        request(app)
            .post('/todos')
            .send({text})
            .expect(200)
            .expect((response) => {
                expect(response.body.text).toBe(text)
            })
            .end((err, response) => {
                if (err) 
                    return done(err)
                Todo.find({text: 'Test todo text'}).then((todos) => {
                    expect(todos.length).toBe(1)
                    expect(todos[0].text).toBe(text)
                    done()
                }).catch((e) => done(e))

            })
    })
    it('should not create todo with invalid body data', (done) => {
        request(app)
            .post('/todos')
            .send({})
            .expect(400)
            .end((err , response) => {
                if (err)
                    return done(err)
                Todo.find().then((todos) => {
                    expect(todos.length).toBe(3)
                    done()
                }).catch((e) => done(e)) 
            })
            
    })
})
describe('/get todos', () => {
    it('should fetch all todos correctly', (done) =>{
        request(app)
            .get('/todos')
            .expect(200)
            
            .end((err, response) => {
                if (err)
                    return done(err)
                Todo.find().then((data) => {
                    expect(response.body.length).toBe(data.length)
                    done()}).catch((err) => done(err))
                    

                    
                
            })
    })
}) 
describe('fetch one todo by id', () => {
    it('should fetch todo correctly', (done) => {
        request(app)
            .get('/todos/' + id)
            .expect(200)
            .expect((response) => {
                console.log(response.body)
                expect(response.body._id).toBe(id.toString())})
            .end(done)

    })
    it('should return 500', (done) => {
        request(app)
            .get('/todos/' + 23)
            .expect(400)
            .end(done)

    })
    it('should return 404', (done) => {
        request(app)
            .get('/todos/' + new ObjectID(2))
            .expect(404)
            .end(done)

    })

})
describe('removing single todo', () => {
    it('should removev single todo correctly', (done) => {
        request(app)
            .delete('/todos/' + id)
            .expect(200)
            .end((err, resp) => {
                if (err) 
                    return done(err)
                Todo.findById(id).then((todo) => {
                    expect(todo).toBeNull()
                    done()
                }).catch((e) => done(e))
            })
            
    })
    it('should not remove todo which dosnt exist, send 404', (done) => {
        request(app)
            .delete('/todos/' + new ObjectID(2))
            .expect(404)
            .end(done)
            })
    it('should not remove todo due to bad data in request params, send 400', (done) => {
                request(app)
                    .delete('/todos/' + 'lorumipsum')
                    .expect(400)
                    .end(done)
                    })         
    
})