require('dotenv').config()
const express = require('express')
const cors = require('cors')
const uuid = require('uuid')
const server = express()

server.use(express.json())
server.use(cors())

//Here is some seed data

let dogs = [ 
    {
        id: uuid.v4(),
        breed: 'German Shepard',
        imageUrl: 'https://images.unsplash.com/photo-1521229424090-c4e9ff91d66b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2549&q=80'
    }
]

// Get all dogs

server.get('/dogs', (req,res)=> {
    try{
        res.status(200).json(dogs)
    }
    catch {
        res.status(500).json({ errorMessage: "Sorry cannot get dogs" })
    }
})

// Get one dog 

server.get('/dogs/:id', (req, res) => {
    const { id } = req.params
    const findDogById = dog => {
        return dog.id === id
    }
    const foundDog = dogs.find(findDogById)
    if (!foundDog){
        res.status(400).json({ errorMessage: 'cannot find a dog with that ID'})
    } else {
        res.json(foundDog)
    }
})

// Add new dogs

server.post('/dogs', (req,res) => {
    const newDog = req.body
    if(!(newDog.breed)) {
        res.status(400).json({ errorMessage: 'Please make sure you have a breed listed'})
    } try {
        const notNew = dogs.find(dog => dog.breed === req.body.breed)
        if(!notNew){
            newDog.id = uuid.v4()
            dogs.push(newDog)
            res.status(201).json({ message: 'Added new dog', newDog })
        } else {
            res.status(400).json({ errorMessage: 'Dog is already on server'})
        }
    }
    catch {
        res.status(500).json({ errorMessage: 'Dang it, Something is broken on the server'})
    }
})

// Delete a dog

server.delete('/dogs/:id', (req, res) =>{
    const { id } = req.params
    const findDogById = dog => {
        return dog.id === id
    }
    foundDog = dogs.find(findDogById)
    if (!foundDog){
        res.status(400).json({ errorMessage: "cannot find dog with that ID" })
    } else {
        dogs = dogs.filter(d => d.id !== id)
        res.json({deleted: foundDog})
    }
})


//Base url

server.use('/', (req, res) => {
    res.status(200).json({message: 'Hello Lambda Students'})
})

//spins up server

// const PORT = 5000 
const PORT = process.env.PORT || 5000

server.listen(PORT, () => {
    console.log(`Server is on port: ${PORT}`)
})

