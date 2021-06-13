// const express = require('express')
// const app = express()
// // const port = 3000
// const server = app.listen(process.env.PORT || 3000, () => {
//     console.log(`SERVER running`);
// });'
const nodemailer = require('nodemailer');
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
const secretKey = "huydu";
const cookieParser = require('cookie-parser');

app.set('view engine', 'pug');
app.set('views', './views');
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())

app.get('/getcode', (req, res) => {
    let { email } = req.headers;
    const transporter = nodemailer.createTransport({
        service: "hotmail",
        auth: {
            user: "nad.test.003@outlook.com.vn",
            pass: "1qw1qw1qw"
        }
    });
    var number = '';
    for (let i = 0; i < 4; i++) {
        number += Math.floor(Math.random() * 10);;
    }
    const options = {
        from: "nad.test.003@outlook.com.vn",
        to: email,
        subject: "Mã từ PhoneShop:",
        text: `code: ${number}`
    };
    transporter.sendMail(options, function (err, info) {
        console.log('err:', err);
        console.log(info);
        if (info) {
            res.json(number);
        }
        res.json("lỗi email xin lòng liên hệ quản trị viên!");
    })
})



// RestFull api with products
app.get('/', (req, res) => {
    const products = db.get('products').value()
    res.json(products);
})

app.get('/products', (req, res) => {
    let products = db.get('products').value()
    res.json(products);
})

app.get('/products', (req, res) => {
    let products = db.get('products').value()
    res.json(products);
})
app.get('/products/:id', (req, res) => {
    let id = parseInt(req.params.id);
    let product = db.get('products').find({ id: id }).value()
    res.json(product);
})
app.post('/products', (req, res) => {
    let products = db.get('products').value();
    let id = products[products.length - 1].id + 1;
    let product = {
        ...req.body,
        id: parseInt(id)
    }
    db.get('products').push(product).write();
    res.json('success');
})
app.put('/products/:id', (req, res) => {
    let id = parseInt(req.params.id);
    let bodyFake = {
        ...req.body,
        id: parseInt(req.body.id)
    }
    let product = db.get('products')
        .find({ id: id })
        .assign(bodyFake)
        .write()
    res.json(product);
})
app.delete('/products/:id', (req, res) => {
    let id = parseInt(req.params.id);
    let rs = db.get('products')
        .remove({ id: id })
        .write()
    res.send(rs);
})

//login && user
app.post('/login', (req, res) => {
    const { email, password } = req.headers;
    let user = db.get('users')
        .find({ email: email, password: password })
        .write()
    if (user) {
        res.json({
            isStatus: 1,
            id: user.id
        });
    } else {
        res.json({
            isStatus: 0
        });
    }
})
app.post('/login1', (req, res) => {
    const { email, password } = req.headers;
    let user = db.get('users')
        .find({ email: email, password: password })
        .write()
    if (user) {
        res.json({
            isStatus: 1,
            user
        });
    } else {
        res.json({
            isStatus: 0
        });
    }
})

app.get('/users', (req, res) => {
    console.log(req.headers)
    let { id } = req.headers;
    id = parseInt(id);
    if (id) {
        let user = db.get('users').find({ id: id }).value();
        if (user) {
            res.json(user)
        } else {
            res.json({
                isStatus: 2
            })
        }
    } else {
        res.json({
            isStatus: 0
        })
    }
})

app.post('/users', (req, res) => {
    let users = db.get('users').value();
    let id = parseInt(users[users.length - 1].id) + 1;
    const { email, name, password, phone, address } = req.headers;
    let userCheckEmail = db.get('users').find({ email: email }).value();
    let userCheckPhone = db.get('users').find({ phone: phone }).value();
    if (userCheckEmail) {
        res.json({
            isStatus: 2
        });
    } else if (userCheckPhone) {
        res.json({
            isStatus: 3
        });
    } else {
        let user = {
            id,
            name,
            password,
            address,
            phone,
            email,
            image: "https://cobebandiem.github.io/cv/avatar.jpg",
            status: true,
            role: false
        }
        db.get('users').push(user).write();
        let cart = {
            id: parseInt(id),
            products: []
        }
        db.get('carts').push(cart).write();
        let sold = {
            id: parseInt(id),
            products: []
        }
        db.get('sold').push(sold).write();
        res.json({
            isStatus: 1
        });
    }
})
app.put('/users', (req, res) => {
    console.log(req.headers)
    let { id, email, name, phone, address } = req.headers;
    id = parseInt(id);
    if (id) {
        let userCheckEmail = db.get('users').find({ email: email }).value() ? db.get('users').find({ email: email }).value() : { email: null };
        let userCheckPhone = db.get('users').find({ phone: phone }).value() ? db.get('users').find({ phone: phone }).value() : { phone: null };
        let user = db.get('users').find({ id: id }).value();
        console.log(userCheckEmail)
        if (userCheckEmail.email !== user.email && userCheckEmail.email) {
            res.json({
                isStatus: 2
            })
        } else if (userCheckPhone.phone !== user.phone && userCheckPhone.phone) {
            res.json({
                isStatus: 3
            })
        } else {
            let bodyFake = {
                name,
                address,
                phone,
                email,
            }
            db.get('users')
                .find({ id: id })
                .assign(bodyFake)
                .write();
            res.json({
                isStatus: 1
            })
        }
    } else {
        res.json({
            isStatus: 0
        })
    }
})
app.put('/password', (req, res) => {
    console.log(req.headers)
    let { id, new_password, old_password } = req.headers;
    id = parseInt(id);
    if (id) {
        let user = db.get('users').find({ id: id }).value();
        if (user.password === old_password) {
            let bodyFake = {
                ...user,
                password: new_password
            }
            db.get('users')
                .find({ id: id })
                .assign(bodyFake)
                .write();
            res.json({
                isStatus: 1
            })
        } else {
            res.json({
                isStatus: 2
            })
        }
    } else {
        res.json({
            isStatus: 0
        })
    }
})

app.get('/slides', (req, res) => {
    let slides = db.get('slides').value()
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

app.get('/carts', (req, res) => {
    let { id } = req.headers;
    id = parseInt(id);
    if (id) {
        let cart = db.get('carts').find({ id: id }).value();
        if (cart) {
            let products = db.get('products').value();
            let arrProductsInCart = cart.products.map((item) => {
                return item.idProduct;
            });
            let arrProducts = products.filter((product) => {
                return arrProductsInCart.includes(product.id);
            });
            console.log('arrProducts',arrProducts);
            let result = arrProducts.map((product, index) => {
                let index1=arrProductsInCart.findIndex(item=>product.id==item);
                console.log(index1);
                let quantityOrder = cart.products[index1].quantityOrder;
                let checked = cart.products[index1].checked;
                return temp = { ...product, quantityOrder, checked };
            });
            res.json(result);
        } else {
            res.json([]);
        }
    } else {
        res.json({ isStatus: 0 });
    }
});
app.get('/countCarts/:id', (req, res) => {
    let id = parseInt(req.params.id);
    let count = 0;
    let carts = db.get('carts').find({ id: id }).value();
    carts.products.map((cart) => {
        count += cart.quantityOrder;
    });
    res.json(count);
    // let { id } = req.headers;
    // id = parseInt(id);
    // let count = 0;
    // let carts = db.get('carts').find({ id: id }).value();
    // carts.products.map((cart) => {
    //     count += cart.quantityOrder;
    // });
    // res.json(count);
});
// app.post('/carts/:id',(req,res)=>{
//     let id=parseInt(req.params.id);
//     let cart=db.get('carts').find({id:id}).value();
//     res.json(carts);
// })
app.put('/carts', (req, res) => {
    let { id_user, id, sl } = req.headers;
    id_user = parseInt(id_user);
    let idProduct = parseInt(id);
    if (id_user) {
        let cart = db.get('carts').find({ id: id_user }).value();
        let indexZ = null;
        let productT = cart.products.filter((product, index) => {
            if (product.idProduct === idProduct) {
                indexZ = index;
                return product.idProduct;
            }
        });
        let quantityOrder = parseInt(sl);
        let cartFake = {
            idProduct,
            quantityOrder,
            checked: true
        }
        cart.products[indexZ] = cartFake;
        let result = db.get('carts')
            .find({ id: id_user })
            .assign(cart)
            .write()
        res.json({ isStatus: 1, result });
    } else {
        res.json({ isStatus: 0 });
    }
})
app.post('/changeChecked', (req, res) => {
    let { id_user, id } = req.headers;
    id_user = parseInt(id_user);
    let idProduct = parseInt(id);
    if (id_user) {
        let cart = db.get('carts').find({ id: id_user }).value();
        let indexZ = -1;
        let productT = cart.products.filter((product, index) => {
            if (product.idProduct === idProduct) {
                indexZ = index;
                return product.idProduct;
            }
        });
        let quantityOrder = productT[0].quantityOrder;
        let checked = !productT[0].checked;
        let cartFake = {
            idProduct,
            quantityOrder,
            checked
        }
        cart.products[indexZ] = cartFake;
        let result = db.get('carts')
            .find({ id: id_user })
            .assign(cart)
            .write()
        res.json({ isStatus: 1, result });
    } else {
        res.json({ isStatus: 0 });
    }
})

app.post('/carts', (req, res) => {
    let { id_user, id, sl } = req.headers;
    id_user = parseInt(id_user);
    let idProduct = parseInt(id);
    console.log(idProduct)
    if (id_user) {
        let cart = db.get('carts').find({ id: id_user }).value();
        let indexZ = -1;
        let productT = cart.products.filter((product, index) => {
            if (product.idProduct === idProduct) {
                indexZ = index;
                return product.idProduct;
            }
        });
        if (indexZ === -1) {
            let cartFake = {
                idProduct,
                quantityOrder: parseInt(sl),
                checked: true
            }
            cart.products.push(cartFake);
        } else {
            let quantityOrder = productT[0].quantityOrder + parseInt(sl);
            let cartFake = {
                idProduct,
                quantityOrder,
                checked: true
            }
            cart.products[indexZ] = cartFake;
        }
        let result = db.get('carts')
            .find({ id: id_user })
            .assign(cart)
            .write()
        res.json({ isStatus: 1, result });
    } else {
        res.json({ isStatus: 0 });
    }
})


app.delete('/carts', (req, res) => {
    let { id_user, id } = req.headers;
    id_user = parseInt(id_user);
    idProduct = parseInt(id);
    if (id_user) {
        let carts = db.get('carts').find({ id: id_user }).value();
        let indexZ = -1;
        carts.products.filter((product, index) => {
            if (product.idProduct === idProduct) {
                indexZ = index;
                return product.idProduct;
            }
        });
        console.log(indexZ)
        if (indexZ !== -1) {
            console.log("sad")
            carts.products.splice(indexZ, 1);
            db.get('carts')
                .find({ id: id_user })
                .assign(carts)
                .write()
            res.json({ isStatus: 1, result: carts });
        } else {
            res.json({ isStatus: 0 });
        }
    } else {
        res.json({ isStatus: 0 });
    }
})



// RestFull api with sold
app.get('/sold', (req, res) => {//đã hoàn thành
    let { id_user } = req.headers;
    id_user = parseInt(id_user);
    if (id_user) {
        let sold = db.get('sold').find({ id: id_user }).value();
        if (sold) {
            let products = db.get('products').value();
            let arrProductsSold = sold.products.map((item) => {
                return item.idProduct;
            });
            let arrProducts = products.filter((product) => {
                return arrProductsSold.includes(product.id);
            });
            let result = arrProducts.map((product, index) => {
                let quantityOrder = 0;
                let date = null;
                let address = null;
                sold.products.map((item) => {
                    if (item.idProduct === product.id) {
                        quantityOrder = item.quantityOrder;
                        date = item.date;
                        address = item.addressSold;
                    }
                })
                return { ...product, quantityOrder, date, address };
            });
            var today = new Date();
            var today1 = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
            let result1 = [];
            result.map((item) => {
                var timeDiff = ((new Date(today1) - new Date(item.date)));
                console.log(item.date + ' - ' + today1)
                var dayDiff = timeDiff / (1000 * 60 * 60 * 24);
                console.log(dayDiff);
                if (dayDiff > 3) {
                    result1.push(item);
                }
            })
            res.json({ result: result1, isStatus: 1 });
        } else {
            res.json({ isStatus: 1, result: [] });
        }
    } else {
        res.json({
            isStatus: 0
        })
    }
});
app.get('/confirm', (req, res) => {// chờ xác nhận
    let { id_user } = req.headers;
    id_user = parseInt(id_user);
    if (id_user) {
        let sold = db.get('sold').find({ id: id_user }).value();
        if (sold) {
            let products = db.get('products').value();
            let arrProductsSold = sold.products.map((item) => {
                return item.idProduct;
            });
            let arrProducts = products.filter((product) => {
                return arrProductsSold.includes(product.id);
            });
            let result = arrProducts.map((product, index) => {
                let quantityOrder = 0;
                let date = null;
                let address = null;
                sold.products.map((item) => {
                    if (item.idProduct === product.id) {
                        quantityOrder = item.quantityOrder;
                        date = item.date;
                        address = item.addressSold;
                    }
                })
                return { ...product, quantityOrder, date, address };
            });
            var today = new Date();
            var today1 = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
            let result1 = [];
            result.map((item) => {
                var timeDiff = ((new Date(today1) - new Date(item.date)));
                console.log(item.date + ' - ' + today1)
                var dayDiff = timeDiff / (1000 * 60 * 60 * 24);
                console.log(dayDiff);
                if (dayDiff == 1 || dayDiff == 0) {
                    result1.push(item);
                }
            })
            res.json({ result: result1, isStatus: 1 });
        } else {
            res.json({ isStatus: 1, result: [] });
        }
    } else {
        res.json({
            isStatus: 0
        })
    }
});
app.get('/getSold', (req, res) => {//chờ lấy hàng
    let { id_user } = req.headers;
    id_user = parseInt(id_user);
    if (id_user) {
        let sold = db.get('sold').find({ id: id_user }).value();
        if (sold) {
            let products = db.get('products').value();
            let arrProductsSold = sold.products.map((item) => {
                return item.idProduct;
            });
            let arrProducts = products.filter((product) => {
                return arrProductsSold.includes(product.id);
            });
            let result = arrProducts.map((product, index) => {
                let quantityOrder = 0;
                let date = null;
                let address = null;
                sold.products.map((item) => {
                    if (item.idProduct === product.id) {
                        quantityOrder = item.quantityOrder;
                        date = item.date;
                        address = item.addressSold;
                    }
                })
                return { ...product, quantityOrder, date, address };
            });
            var today = new Date();
            var today1 = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
            let result1 = [];
            result.map((item) => {
                var timeDiff = ((new Date(today1) - new Date(item.date)));
                console.log(item.date + ' - ' + today1)
                var dayDiff = timeDiff / (1000 * 60 * 60 * 24);
                console.log(dayDiff);
                if (dayDiff == 2) {
                    result1.push(item);
                }
            })
            res.json({ result: result1, isStatus: 1 });
        } else {
            res.json({ isStatus: 1, result: [] });
        }
    } else {
        res.json({
            isStatus: 0
        })
    }
});

app.get('/delivering', (req, res) => {//đang giao hàng
    let { id_user } = req.headers;
    id_user = parseInt(id_user);
    if (id_user) {
        let sold = db.get('sold').find({ id: id_user }).value();
        if (sold) {
            let products = db.get('products').value();
            let arrProductsSold = sold.products.map((item) => {
                return item.idProduct;
            });
            let arrProducts = products.filter((product) => {
                return arrProductsSold.includes(product.id);
            });
            let result = arrProducts.map((product, index) => {
                let quantityOrder = 0;
                let date = null;
                let address = null;
                sold.products.map((item) => {
                    if (item.idProduct === product.id) {
                        quantityOrder = item.quantityOrder;
                        date = item.date;
                        address = item.addressSold;
                    }
                })
                return { ...product, quantityOrder, date, address };
            });
            var today = new Date();
            var today1 = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
            let result1 = [];
            result.map((item) => {
                var timeDiff = ((new Date(today1) - new Date(item.date)));
                console.log(item.date + ' - ' + today1)
                var dayDiff = timeDiff / (1000 * 60 * 60 * 24);
                console.log(dayDiff);
                if (dayDiff == 3) {
                    result1.push(item);
                }
            })
            res.json({ result: result1, isStatus: 1 });
        } else {
            res.json({ isStatus: 1, result: [] });
        }
    } else {
        res.json({
            isStatus: 0
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

app.post('/sold', (req, res) => {
    let { id } = req.headers;
    id = parseInt(id);
    let user = db.get('users').find({ id: id }).value();
    let carts = db.get('carts').find({ id: id }).value();
    console.log(carts);
    let sold = db.get('sold').find({ id: id }).value();
    let products = db.get('products').value();
    let cartsChecked = carts.products.filter((cart) => cart.checked === true);

    //edit quantity on products when customer order
    products.map((product, index) => {
        cartsChecked.map((cart) => {
            if (cart.idProduct === product.id) {
                products[index].quantity -= cart.quantityOrder;
            }
        })
    })
    //add from carts to sold
    var today = new Date();
    var today1 = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    cartsChecked.map((cart) => {
        let idSold = sold.products[sold.products.length - 1].id ? sold.products[sold.products.length - 1].id + 1 : 1;
        sold.products.push({
            id: idSold,
            idProduct: cart.idProduct,
            quantityOrder: cart.quantityOrder,
            addressSold: user.address,
            date: today1
        })
    });

    //delete from carts
    let cartsNotChecked = carts.products.filter((cart) => cart.checked === false);
    let cartPerson = {
        id,
        products: cartsNotChecked
    }
    db.get('carts')
        .find({ id })
        .assign(cartPerson)
        .write()
    db.get('sold')
        .find({ id })
        .assign(sold)
        .write()
    db.get('products')
        .assign(products)
        .write()
    let arrProductsSold = sold.products.map((item) => {
        return item.idProduct;
    });
    let arrProducts = products.filter((product) => {
        return arrProductsSold.includes(product.id);
    });
    let result = arrProducts.map((product, index) => {
        let quantityOrder = 0;
        sold.products.map((item) => {
            if (item.idProduct === product.id) {
                quantityOrder = item.quantityOrder;
            }
        })
        return temp = { ...product, quantityOrder };
    });
    res.json({ result, isStatus: 1, cartsChecked });
})

app.post('/soldCopy', (req, res) => {//mua hàng của huy đù
    let { id } = req.headers;
    id = parseInt(id);
    let user = db.get('users').find({ id: id }).value();
    let carts = db.get('carts').find({ id: id }).value();
    console.log(carts);
    let sold = db.get('sold').find({ id: id }).value();
    let products = db.get('products').value();
    let cartsChecked = carts.products;

    //edit quantity on products when customer order
    products.map((product, index) => {
        cartsChecked.map((cart) => {
            if (cart.idProduct === product.id) {
                products[index].quantity -= cart.quantityOrder;
            }
        })
    })
    //add from carts to sold
    var today = new Date();
    var today1 = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    cartsChecked.map((cart) => {
        let idSold = sold.products[sold.products.length - 1].id ? sold.products[sold.products.length - 1].id + 1 : 1;
        sold.products.push({
            id: idSold,
            idProduct: cart.idProduct,
            quantityOrder: cart.quantityOrder,
            addressSold: user.address,
            date: today1
        })
    });

    //delete from carts
    //let cartsNotChecked = carts.products.filter((cart) => cart.checked === false);
    let cartPerson = {
        id,
        products: []
    }
    db.get('carts')
        .find({ id })
        .assign(cartPerson)
        .write()
    db.get('sold')
        .find({ id })
        .assign(sold)
        .write()
    db.get('products')
        .assign(products)
        .write()
    let arrProductsSold = sold.products.map((item) => {
        return item.idProduct;
    });
    let arrProducts = products.filter((product) => {
        return arrProductsSold.includes(product.id);
    });
    let result = arrProducts.map((product, index) => {
        let quantityOrder = 0;
        sold.products.map((item) => {
            if (item.idProduct === product.id) {
                quantityOrder = item.quantityOrder;
            }
        })
        return temp = { ...product, quantityOrder };
    });
    res.json({ result, isStatus: 1, cartsChecked });
})

app.delete('/sold', (req, res) => {
    let { id_user, id } = req.headers;
    id_user = parseInt(id_user);
    if (id_user) {
        let idProduct = parseInt(id);
        let cart = db.get('sold').find({ id: id_user }).value();
        let indexZ = null;
        cart.products.filter((product, index) => {
            if (product.idProduct === idProduct) {
                indexZ = index;
                return product.idProduct;
            }
        });
        cart.products.splice(indexZ, 1);
        let carts = db.get('sold')
            .find({ id: id_user })
            .assign(cart)
            .write()
        res.json(carts);
    }
})


app.get('/brands', (req, res) => {
    let products = db.get('products').value();
    let brands = products.map((product) => { return product.brand });
    brands = brands.filter((brand, index) => {
        return brands.indexOf(brand) === index;
    })
    res.json(brands);
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
