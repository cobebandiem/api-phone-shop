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
const secretKey="huydu";
const cookieParser = require('cookie-parser');

app.set('view engine','pug');
app.set('views','./views');
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())


// RestFull api with products
app.get('/',(req,res)=>{
    const products=db.get('products').value()
    res.json(products);
})

app.get('/products',(req,res)=>{
    let products=db.get('products').value()
    res.json(products);
})

app.get('/products',(req,res)=>{
    let products=db.get('products').value()
    res.json(products);
})
app.get('/products/:id',(req,res)=>{
    let id=parseInt(req.params.id);
    let product=db.get('products').find({id:id}).value()
    res.json(product);
})
app.post('/products',(req,res)=>{
    let products=db.get('products').value();
    let id=products[products.length-1].id + 1;
    let product={
        ...req.body,
        id:parseInt(id)
    }
    db.get('products').push(product).write();
    res.json('success');
})
app.put('/products/:id',(req,res)=>{
    let id=parseInt(req.params.id);
    let bodyFake={
        ...req.body,
        id:parseInt(req.body.id)
    }
    let product=db.get('products')
        .find({ id: id })
        .assign(bodyFake)
        .write()
    res.json(product);
})
app.delete('/products/:id',(req,res)=>{
    let id=parseInt(req.params.id);
    let rs=db.get('products')
        .remove({ id: id })
        .write()
    res.send(rs);
})

//login && user
app.post('/login',(req,res)=>{
    const {username, password}=req.body;
    let user=db.get('users')
        .find({ username:username, password: password })
        .write()
    if(user){
        let token = jwt.sign({ _id: user.id}, secretKey);
        res.json({
            status:1,
            token:token
        });
    }else{
        res.json({
            status:0
        });
    } 
})
app.get('/users',(req,res)=>{
    console.log(req.headers)
    const { token } = req.headers;
    console.log(token)
    if(token){
        let id = parseInt(jwt.verify(token, secretKey));
        console.log(id);
        let user=db.get('users').find({id:id}).value()
        res.json(user)
    }
    res.status=404;
})

app.post('/users',(req,res)=>{
    let users=db.get('users').value();
    let id=users[users.length-1].id + 1;
    let user={
        ...req.body,
        id:parseInt(id)
    }
    db.get('users').push(user).write();
    res.json({
        status:1
    });
})
app.put('/users/:id',(req,res)=>{
    let id=parseInt(req.params.id);
    let bodyFake={
        ...req.body,
        id:parseInt(req.body.id)
    }
    let user=db.get('users')
        .find({ id: id })
        .assign(bodyFake)
        .write()
    res.json(user);
})

// RestFull api with carts
// let getProductsInCart = (cart, products) => {
//     // let cart = data.carts.filter((cart) => {
//     //   return cart.id === idUser;
//     // })
//     let arrProductsInCart = cart.products.map((item) => {
//       return item.idProduct;
//     });
//     let arrProducts=products.filter((product)=>{
//       return arrProductsInCart.includes(product.id);
//     });
//     let fakeCarts=arrProducts.map((product,index)=>{
//       let quantityOrder=cart[0].products[index].quantity;
//       return temp={...product,quantityOrder};
//     });
//     return fakeCarts;
// }

app.get('/carts/:id',(req,res)=>{
    let id=parseInt(req.params.id);
    let cart=db.get('carts').find({id:id}).value();
    if(cart){
        let products=db.get('products').value();
        let arrProductsInCart = cart.products.map((item) => {
            return item.idProduct;
        });
        let arrProducts=products.filter((product)=>{
            return arrProductsInCart.includes(product.id);
        });
        let result=arrProducts.map((product,index)=>{
            let quantityOrder=cart.products[index].quantityOrder;
            return temp={...product,quantityOrder};
        });
        res.json(result);
    }else{
        res.json([]);
    } 
});
// app.post('/carts/:id',(req,res)=>{
//     let id=parseInt(req.params.id);
//     let cart=db.get('carts').find({id:id}).value();
//     res.json(carts);
// })
app.post('/carts/:id',(req,res)=>{
    let id=parseInt(req.params.id);
    let idProduct=parseInt(req.body.idProduct);
    let cart=db.get('carts').find({id:id}).value();
    let indexZ=null;
    let productT=cart.products.filter((product,index)=>{
        if(product.idProduct===idProduct){
            indexZ=index;
            return product.idProduct;
        }
    });
    if(indexZ===null){
        let cartFake={
            idProduct,
            quantityOrder:parseInt(req.body.quantityOrder)
        }
        cart.products.push(cartFake);
    }else{
        let quantityOrder=productT[0].quantityOrder+parseInt(req.body.quantityOrder);
        let cartFake={
            idProduct,
            quantityOrder
        }
        cart.products[indexZ]=cartFake;
    }
    let carts=db.get('carts')
        .find({ id: id })
        .assign(cart)
        .write()
    res.json(carts);
})


app.delete('/carts/:id',(req,res)=>{
    let id=parseInt(req.params.id);
    let idProduct=parseInt(req.body.idProduct);
    let cart=db.get('carts').find({id:id}).value();
    let indexZ=null;
    cart.products.filter((product,index)=>{
        if(product.idProduct===idProduct){
            indexZ=index;
            return product.idProduct;
        }
    });
    cart.products.splice(indexZ,1);
    let carts=db.get('carts')
        .find({ id: id })
        .assign(cart)
        .write()
    res.json(carts);
})



// RestFull api with sold

app.get('/sold/:id',(req,res)=>{
    let id=parseInt(req.params.id);
    let sold=db.get('sold').find({id:id}).value();
    if(sold){
        let products=db.get('products').value();
        let arrProductsSold = sold.products.map((item) => {
            return item.idProduct;
        });
        let arrProducts=products.filter((product)=>{
            return arrProductsSold.includes(product.id);
        });
        let result=arrProducts.map((product,index)=>{
            let quantityOrder=sold.products[index].quantityOrder;
            return temp={...product,quantityOrder};
        });
        res.json(result);
    }else{
        res.json([]);
    } 
});


// app.post('/sold/:id',(req,res)=>{
//     let id=parseInt(req.params.id);
//     db.get('sold').find({id:id}).push(req.body).write();
//     let sold=db.get('sold')
//         .find({ id: id })
//         .write()
//     res.json(sold);
// })

app.post('/sold/:id',(req,res)=>{
    let id=parseInt(req.params.id);
    let idProduct=parseInt(req.body.idProduct);
    let cart=db.get('sold').find({id:id}).value();
    let indexZ=null;
    let productT=cart.products.filter((product,index)=>{
        if(product.idProduct===idProduct){
            indexZ=index;
            return product.idProduct;
        }
    });
    if(indexZ===null){
        let cartFake={
            idProduct,
            quantityOrder:parseInt(req.body.quantityOrder)
        }
        cart.products.push(cartFake);
    }else{
        let quantityOrder=productT[0].quantityOrder+parseInt(req.body.quantityOrder);
        let cartFake={
            idProduct,
            quantityOrder
        }
        cart.products[indexZ]=cartFake;
    }
    let carts=db.get('sold')
        .find({ id: id })
        .assign(cart)
        .write()
    res.json(carts);
})


app.delete('/sold/:id',(req,res)=>{
    let id=parseInt(req.params.id);
    let idProduct=parseInt(req.body.idProduct);
    let cart=db.get('sold').find({id:id}).value();
    let indexZ=null;
    cart.products.filter((product,index)=>{
        if(product.idProduct===idProduct){
            indexZ=index;
            return product.idProduct;
        }
    });
    cart.products.splice(indexZ,1);
    let carts=db.get('sold')
        .find({ id: id })
        .assign(cart)
        .write()
    res.json(carts);
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
