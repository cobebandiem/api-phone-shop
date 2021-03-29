// const express = require('express')
// const app = express()
// // const port = 3000
// const server = app.listen(process.env.PORT || 3000, () => {
//     console.log(`SERVER running`);
// });'
  
const express = require('express');
const app = express();
const server = app.listen(process.env.PORT || 3000, () => {
    console.log(`SERVER running`);
});
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)
const jwt = require('jsonwebtoken');

app.set('view engine','pug');
app.set('views','./views');
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true }))

app.get('/',(req,res)=>{
    const products=db.get('products').value()
    res.json(products);
})

app.get('/products',(req,res)=>{
    const products=db.get('products').value()
    res.json(products);
})
app.get('/products/:id',(req,res)=>{
    const id=req.params.id;
    const product=db.get('products').find({id:id}).value()
    res.json(product);
})
app.post('/products',(req,res)=>{
    console.log(req.body);
    const products=db.get('products').value();
    let id=products[products.length-1].id + 1;
    let product={
        ...req.body,
        id
    }
    db.get('products').push(product).write();
    res.json('success');
})
app.put('/products/:id',(req,res)=>{
    const id=req.params.id;
    let product=db.get('products')
        .find({ id: id })
        .assign(req.body)
        .write()
    res.json(product);
})
app.delete('/products/:id',(req,res)=>{
    const id=req.params.id;
    db.get('products')
        .remove({ id: id })
        .write()
    res.send('success');
})
app.post('/login',(req,res)=>{
    const {username, password}=req.body;
    console.log(username);
    console.log(password);
    let user=db.get('users')
        .find({ username:username, password: password })
        .write()
    if(user){
        var token = jwt.sign({ _id: user.id}, 'mk');
        res.json({
            message:'success',
            token:token
        });
    }else{
        res.json({
            message:'faulty'
        });
    }
    
})



// app.get('/', (req, res)=>{

// },(req, res) => {
//     // res.send('<h1>Hello ban</h1><a href="/user">user</a>')
//     res.render('index',{
//         name:'AAA'
//     });
// })
// app.get('/users', (req, res) => {
//     res.render('users/index',{
//         users:db.get('users').value()
//     })
// })
// app.get('/users/search',(req,res)=>{
//     const {q}=req.query;
//     var matchedUsers=users.filter((user)=>{
//         return user.name.toLowerCase().indexOf(q.toLocaleLowerCase())!==-1;
//     })
//     res.render('users/index',{
//         users:matchedUsers
//     })
// })
// app.get('/users/create',(req,res)=>{
//     res.render('users/create')
// })
// app.get('/users/:id',(req,res)=>{
//     const id=parseInt(req.params.id);
//     const user=db.get('users').find({id:id}).value()
//     res.render('users/view',{
//         user
//     })
// })
// app.get('/login',(req, res)=>{
//     res.render('login')
// })
// app.post('/login',(req, res)=>{
//     let {username, password}=req.body;
//     var user=db.get("users").find({username: username}).value();
//     if(!user){
//         res.render('login',{
//             errors: 'user does not exits'
//         });
//         return;
//     }
//     if(user.password!==password){
//         res.render('login',{
//             errors:'wrong password'
//         });
//         return;
//     }
//     res.cookie('userId',user.username)
//     res.redirect('/users');
// })



// app.post('/users/create',(req,res)=>{
//     db.get('users').push(req.body).write()
//     res.redirect('/users')
// })



















// app.get('/login', (req, res) => {
//     console.log(req.body)
//     res.send('hello')
// })

// app.listen(port, () => {
//   console.log(`Example app listening at http://localhost:${port}`)
// })
