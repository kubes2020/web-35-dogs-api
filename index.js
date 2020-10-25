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


server.use('/', (req, res) => {
    res.status(200).json({message: 'Hello Lambda Students'})
})

// const PORT = 5000 
const PORT = process.env.PORT || 5000

server.listen(PORT, () => {
    console.log(`Server is on port: ${PORT}`)
})

