const express = require('express')
const server = express()
const PORT = 3000


server.use(express.json())
//usa el server


const users = [
    {
        id: 1,
        firstname: 'Marcos',
        lastname: 'Costa',
        isActive: true,
        age: 25,
        hobbis: ["Karate", "Scout", "Pesca", "Escalada"]
    },
    {
        id: 2,
        firstname: 'Elena',
        lastname: 'Zamora',
        isActive: true,
        age: 32,
        hobbis: ["Lectura", "Yoga", "Fotografía"]
    },
    {
        id: 3,
        firstname: 'Julián',
        lastname: 'Ríos',
        isActive: false,
        age: 19,
        hobbis: ["Gaming", "Ajedrez", "Ciclismo"]
    },
    {
        id: 4,
        firstname: 'Sofía',
        lastname: 'Méndez',
        isActive: true,
        age: 28,
        hobbis: ["Cocina", "Pintura", "Tenis"]
    },
    {
        id: 5,
        firstname: 'Ricardo',
        lastname: 'Gómez',
        isActive: false,
        age: 45,
        hobbis: ["Carpintería", "Jardinería", "Viajes"]
    }
];

/*
//debera tener un GET que obtenga a todos los usuarios,
//  un GET por ID para obtener un usuario por ID,
//  un POST para crear un nuevo usuarios (como es de forma logica mostrar la lista completa con el nuevo usuarios), 
// PATCH para modificar parcialmente un usuario (deberan mostrar el usuario una vez fue modificado),
//  PUT para modificar de forma completa un usuario (lo mismo que el patch deben mostrar el usuaro modificado)
//  y DELETE debera eliminar un usuario de lalista y mostrar nuevamente la lista ya con el usuario eliminado
*/

server.get('/users', (req, res) => {

var isActiveUsers = []


for(let i = 0; i < users.length; i++){
 if( users[i].isActive===true){
    isActiveUsers.push(users[i])
 }
}

res.status(200).json(isActiveUsers)
})




server . get ('/users/:id', (req, res) => {
const newId = parseInt(req.params.id)

for(let i = 0; i < users.length; i++){
    if(users[i].id === newId){
        res.status(200).json(users[i])
    }
    //agarra el id que le envie y saca la informacion del array grande para mostrarla 
}


})


server.post('/users', (req, res) => {

    const firstname = req.body.firstname
    const lastname = req.body.lastname
    const isActive = req.body.isActive
    const age = req.body.age
    const hobbis = req.body.hobbis

    var newId = users[0].id;

    for(let i = 0; i < users.length; i++){
        if(users[i].id > newId){
            newId = users[i].id
            //esto recorre todos los id y si encuentra un id mas grande al que actual, entonces el nuevo id se vuelve el id 
            // del usuario mas nuevo, lo que hace es q al final del recorrido el nuevo id va a ser el id del ultimo usuario
        }
    }

    const newUser = {
        id: newId + 1,
        firstname: firstname,
        lastname: lastname,
        isActive: isActive,
        age: age,
        hobbis: hobbis  
    }
    //guardo los nuevos valores en el array de nuevo usuario, con el nuevo id que es el id del ultimo usuario + 1
    users.push(newUser)

    var isActiveUsers = []
    for(let i = 0; i < users.length; i++){
        if(users[i].isActive === true){
            isActiveUsers.push(users[i])
        }
    }
    //filtro los usuarios activos para mostrarlos luego de agregar el nuevo usuario

    res.status(201).json(isActiveUsers)
    //res status manda un mensaje segun que codigo le ponga, el 201 es creado con exito
    //es como el res.send pero con un mensaje personalizado, en este caso muestro la lista completa de usuarios activos
})




server.put('/users/:id', (req, res) => {
    //al parecer se pueden usar funciones params, body y query en cualquier tipo de metodo, no solo en el get,
    //  el put tambien puede usar params para agarrar el id que le envie


    const newId = parseInt(req.params.id)
    //agarro el id que envie con params y lo parseo para guardarlo en nuevo id
    const firstname = req.body.firstname
    const lastname = req.body.lastname
    const isActive = req.body.isActive
    const age = req.body.age
    const hobbis = req.body.hobbis

    var user = {}
    var index = 0

    for (let i = 0; i < users.length; i++) {
        if (users[i].id === newId) {
            user = users[i]
            index = i
            //esto hace que cuando encuentre el usuario que yo le puse de id,
            //guarde el valor para usarlo despues de indice en el array grande
        }

    }

    user.firstname = firstname
    user.lastname = lastname
    user.isActive = isActive
    user.age = age
    user.hobbis = hobbis
    //esto hace que el nuevo usuario tenga los nuevos valores que le envie por body


    users[index] = user
    //esto hace que el usuario que esta en el indice del array grande, se vuelva el nuevo usuario con los nuevos valores, segun el indice
    //que puse

    
    res.status(200).json(users)
})

server.patch('/users/:id', (req, res) => {
//el patch es practicamente igual al anterior solo con diferencia al final cuando establezco los nuevos valores

    const newId = parseInt(req.params.id)
    //agarro el id que envie con params y lo parseo para guardarlo en nuevo id
    const firstname = req.body.firstname
    const lastname = req.body.lastname
    const isActive = req.body.isActive
    const age = req.body.age
    const hobbis = req.body.hobbis

    var user = {}
    var index = 0

    for (let i = 0; i < users.length; i++) {
        if (users[i].id === newId) {
            user = users[i]
            index = i
            //esto hace que cuando encuentre el usuario que yo le puse de id,
            //guarde el valor para usarlo despues de indice en el array grande
        }

    }

    user.firstname = req.body.firstname ? req.body.firstname : user.firstname
    user.lastname = req.body.lastname ? req.body.lastname : user.lastname
    user.isActive = req.body.isActive ? req.body.isActive : user.isActive
    user.age = req.body.age ? req.body.age : user.age
    user.hobbis = req.body.hobbis ? req.body.hobbis : user.hobbis
    //esto hace que el nuevo usuario tenga los nuevos valores que le envie por body, pero si no le envio un valor,
    //  entonces se queda con el valor anterior, es decir, el valor del usuario que ya estaba en el array grande



    users[index] = user

    res.status(200).json(users)
})


server.delete('/users/:id', (req, res) => {

    const newId = parseInt(req.params.id)
     var user = {}
    var index = 0

    for (let i = 0; i < users.length; i++) {

        if (users[i].id === newId) {
            user = users[i]
            index = i
    }
    }
    user.isActive = false
    users[index] = user
    //esto hace que el usuario que esta en el indice del array grande, se vuelva el nuevo usuario con los nuevos valores, segun el indice
    //que puse, en este caso lo que hago es que el usuario que quiero eliminar, se vuelva inactivo, entonces no lo borro del array grande
    //  sino que lo vuelvo inactivo para no perder su informacion



     
res.status(200).json(users)
//muestra toda la lista y el eliminado va a tener isActive en false, por lo que tecnicamente esta eliminado 
})









server.listen(PORT, () => {
    console.log("El server esta ON");

})