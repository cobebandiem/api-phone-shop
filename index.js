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
    const {email, password}=req.headers;
    let user=db.get('users')
        .find({ email:email, password: password })
        .write()
    if(user){
        let token = jwt.sign({ _id: user.id}, secretKey);
        res.json({
            isStatus:1,
            token:token
        });
    }else{
        res.json({
            isStatus:0
        });
    } 
})
app.get('/users',(req,res)=>{
    console.log(req.headers)
    const { token } = req.headers;
    if(token){
        let {_id} = jwt.verify(token, secretKey);
        let user=db.get('users').find({id:_id}).value();
       if(user){
        res.json(user)
       }else{
        res.json({
            isStatus:0
        })
       }
    }else{
        res.json({
            isStatus:0
        })
    }
})

app.post('/users',(req,res)=>{
    let users=db.get('users').value();
    let id=parseInt(users[users.length-1].id) + 1;
    const {email, name, password, phone, address}=req.headers;
    let userCheckEmail=db.get('users').find({email:email}).value();
    let userCheckPhone=db.get('users').find({phone:phone}).value();
    if(userCheckEmail){
        res.json({
            isStatus:2
        });
    }else if(userCheckPhone){
        res.json({
            isStatus:3
        });
    }else{
        let user={
            id,
            name,
            password,
            address,
            phone,
            email,
            image: "https://cobebandiem.github.io/cv/avatar.jpg",
            status:true,
            role: false
        }
        db.get('users').push(user).write();
        let cart={
            id:parseInt(id),
            products:[]
        }
        db.get('carts').push(cart).write();
        res.json({
            isStatus:1
        });
    }
})
app.put('/users',(req,res)=>{
    console.log(req.headers)
    const { token, email, name, phone, address } = req.headers;
    if(token){
        let {_id} = jwt.verify(token, secretKey);
        let userCheckEmail=db.get('users').find({email:email}).value();
        let userCheckPhone=db.get('users').find({phone:phone}).value();
        if(userCheckEmail){
            res.json({
                isStatus:2
            })
        }else if(userCheckPhone){
            res.json({
                isStatus:3
            })
        }else{
            let bodyFake={
                name,
                address,
                phone,
                email,
            }
            db.get('users')
                .find({ id: _id })
                .assign(bodyFake)
                .write();
            res.json({
                isStatus:1
            })
        }
    }else{
        res.json({
            isStatus:0
        })
    }
})

app.get('/slides',(req,res)=>{
    let slides=db.get('slides').value()
    res.json(slides)
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

app.get('/sold',(req,res)=>{
    const { token } = req.headers;
    if(token){
        let {_id} = jwt.verify(token, secretKey);
        let sold=db.get('sold').find({id:_id}).value();
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
            res.json({result,isStatus:1});
        }else{ 
            res.json({isStatus:1,result:[]});
        } 
    }else{
        res.json({
            isStatus:0
        })
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

app.post('/sold',(req,res)=>{
    const { token } = req.headers;
    if(token){
        let {_id} = jwt.verify(token, secretKey);
        let cart=db.get('sold').find({id:_id}).value();
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
        db.get('sold')
            .find({ id: id })
            .assign(cart)
            .write()
        res.json({isStatus:1}); 
    }else{
        res.json({
            isStatus:0
        })
    }
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
