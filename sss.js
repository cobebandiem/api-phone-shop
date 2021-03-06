let data = {
  users: [
    {
      id: 1,
      username: "0944748742",
      password: "123456",
      address: "97 man thien quan 9 hcm",
      status: true,
      idCart: 1
    }
  ],
  carts: [
    {
      id: 1,//id of user
      products: [
        {
          idProduct: 6,
          quantity: 2
        },
        {
          idProduct: 3,
          quantity: 1
        }
      ]
    }
  ],
  sold: [
    {
      id: 1,//id user
      products: [
        {
          idProduct: 7,
          quantity: 1
        }
      ]
    }
  ],
  products: [
    {
      id: 3,
      name: "Điện thoại di động Samsung Galaxy Note 20 - Chính hãng",
      brand: "samsung",
      description: [
        "Có thể nói, những thiết kế của Samsung luôn khiến cộng đồng đam mê công nghệ phải say mê khi vô cùng tinh tế cùng với những gam màu sang trọng. Thế hệ Samsung Galaxy Note năm 2020 sở hữu thiết kế kim loại nguyên khối, mặt lưng được làm từ kính cường lực giúp tăng độ bóng bẩy cho smartphone, mang đến vẻ ngoài đẳng cấp. Note 20 có kiểu dáng mạnh mẽ và có phần nam tính hơn với những góc cạnh vuông vức, mang đến cảm giác cầm tay chắc chắn",
        "https://cdn.cellphones.com.vn/media/wysiwyg/mobile/samsung/samsung-galaxy-note-20-8_1.jpg",
        "Mặc dù sở hữu màn hình lớn nhưng kích thước của máy vẫn khá gọn nhờ viền màn hình cực mỏng và độ mỏng cũng vô cùng ấn tượng, mang đến sự thanh thoát, sang trọng.",
        "https://cdn.cellphones.com.vn/media/wysiwyg/mobile/samsung/samsung-galaxy-note-20-3_2.jpg",
        "Màn hình 6.7 inch mở ra góc nhìn lớn hơn, rộng hơn để bạn có thể tận hưởng mọi thước phim, “chiến” game, xử lý hình ảnh, video,… hoàn hảo. Samsung luôn sử dụng những công nghệ tiên tiến nhất cho các sản phẩm smartphone của mình khi trang bị cho Note 20 màn hình Dynamic AMOLED – màn hình tốt nhất của Samsung. Màn hình Dynamic AMOLED với khả năng tự động điều chỉnh màu sắc, 16 triệu màu và 100% dải màu giúp tái tạo màu sắc chân thực, chính xác, gần với thực tế để mang đến khung hình sống động, tuyệt vời."
      ],
      color: "Blue",
      price: "23990000",
      images: [
        "2020/10/09/Note%2020%20-%20Green%20(2).png",
        "2020/10/09/Note%2020%20-%20Green%20(1).png",
        "2020/10/09/Note%2020%20-%20Gray%20(1).png",
        ""
      ],
      sale: "15",
      quantity: "23",
      details: [
        "Công nghệ màn hình: Super AMOLED Plus",
        "Độ phân giải: Full HD+ (1080 x 2400 Pixels)",
        "Màn hình rộng: 6.7",
        "Tốc độ CPU: 2 nhân 2.73 GHz, 2 nhân 2.5 GHz & 4 nhân 2.0 Ghz",
        "Chip đồ họa (GPU): Mali-G77 MP11",
        "RAM: 8 GB"
      ]
    },
    {
      id: 4,
      name: "Apple iPhone 12 - 256GB - Chính hãng VN/A",
      brand: "iphone",
      description: [
        "Nhắc tới Apple, người dùng sẽ luôn nghĩ tới những thiết bị iPhone đẳng cấp, mang trên mình một thiết kế vô cùng sang trọng, hiện đại và thời thượng. Và iPhone 12 Series của năm nay cũng không phải là một ngoại lệ. Mẫu iPhone 12 256GB sở hữu một thiết kế đã được “lột xác” hoàn toàn so với các thế hệ tiền nhiệm trước đây với cạnh được vát phẳng, vuông thành sắc cạnh, mang tới một cảm giác cực kì bền bỉ và chắc chắn. Thiết kế này khiến cho người dùng có thể dễ dàng liên tưởng tới những mẫu iPhone huyền thoại trước đây đã làm nên tên tuổi của Apple như iPhone 4 hoặc iPhone 5.",
        "https://hoanghamobile.com/Uploads/Content/2020/10/14/apple--dien-thoai-di-dong-apple-iphone-12-128gb-chinh-hang-vn-a-2.jpg",
        "Màn hình của iPhone 12 256GB được trang bị công nghệ tấm nền OLED Super Retina XDR, mang lại cho iPhone 12 một chất lượng hiển thị xuất sắc nhất từ trước đến nay. Đi cùng với đó là độ phân giải Full HD 2,532 x 1,170; cho mật độ điểm ảnh cực tốt lên tới 460ppi. Với màn hình được nâng cấp và cải tiến như vậy, những vị chủ nhân sở hữu iPhone 12 có thể thoải mái thưởng thức những bộ phim hoặc chơi game mà không cần phải lo nghĩ về bất cứ điều gì."
      ],
      color: "Green",
      price: "28290000",
      images: [
        "2020/11/06/apple-iphone-12-mini-5.png",
        "2020/11/06/apple-iphone-12-mini-4.png",
        "2020/11/06/apple-iphone-12-mini-3.png",
        "2020/11/06/apple-iphone-12-mini-2.png",
        "2020/11/06/apple-iphone-12-mini.png"
      ],
      sale: "12",
      quantity: "8",
      details: [
        "Công nghệ màn hình: OLED",
        "Độ phân giải: 1170 x 2532 Pixels",
        "Màn hình rộng: 6.1",
        "Tốc độ CPU: 2 nhân 3.1 GHz & 4 nhân 1.8 GHz",
        "Hệ điều hành: iOS 14",
        "RAM: 4 GB",
        "Dung lượng pin: 2815 mAh"
      ]
    },
    {
      id: 5,
      name: "iPhone 8 Plus - 128GB - Chính hãng (VN/A)",
      brand: "iphone",
      description: [
        "Bộ nhớ trong dung lượng đến 128GB chính là một phần sức mạnh của smartphone. Với mức dung lượng này, bạn có thể lưu trữ đến hàng nghìn tập tin bài hát, hình ảnh, video, cài đặt các ứng dụng một cách thoải mái. Nếu nhu cầu lưu trữ thấp hơn, bạn có thể tham khảo thêm điện thoại iPhone 8 Plus 64GB VN/A hoặc iPhone 8 Plus 64GB nhập khẩu.",
        "https://cdn.cellphones.com.vn/media/wysiwyg/mobile/apple/apple-iphone-8-plus-128gb-6.jpg",
        "Ngoài phiên bản iPhone 8 Plus 128GB thì iPhone 8 Plus còn có các phiên bản với dung lượng bộ nhớ trong khác gồm iPhone 8 Plus 64GB, iPhone 8 Plus 256GB nên bạn có thể lựa chọn dung lượng phù hợp với mục đích sử dụng của mình.",
        "Apple iPhone 8 Plus 128GB đã thể hiện được sự đẳng cấp và sang trọng, chứng minh phong cách thiết kế hoàn toàn thời thượng từ nhà “Táo khuyết”. Vẫn là thiết kế nguyên khối với chất liệu kim loại nhôm, tuy nhiên iPhone 8 Plus 128GB lại mang đến làn gió mới trong các thiết kế nhờ mặt lưng được làm từ kính mang đến sự bóng bẩy, sang trọng. Mặt kính cường lực bo cong đã mang đến sự hiện đại và sang trọng hơn cho iPhone 8 Plus."
      ],
      color: "White",
      price: "14000000",
      images: [
        "2020/10/12/8Plus-White.png",
        "2020/10/12/8Plus-Gold.png"
      ],
      sale: "10",
      quantity: "12",
      details: [
        "Công nghệ màn hình: LED-backlit IPS LCD",
        "Độ phân giải: Full HD (1080 x 1920 Pixels)",
        "Màn hình rộng: 5.5",
        "Tốc độ CPU: 2.39 GHz",
        "Chip đồ họa (GPU): Apple GPU 3 nhân",
        "RAM: 3 GB"
      ]
    },
    {
      id: 6,
      name: "Điện thoại di động Samsung Galaxy A52 - Chính hãng",
      brand: "samsung",
      description: [
        "Galaxy A52 sở hữu một thiết kế sang trọng với các góc được bo tròn nhẹ nhàng. Kích thước khá mỏng tạo cảm giác nhẹ nhàng mà vẫn chắc chắn khi cầm trên tay. Thay vì sử dụng mặt lưng bóng như đa số smartphone hiện nay, Galaxy A52 lại chọn mặt lưng lì tinh tế, ít bám dấu vân tay. Về màu sắc, sản phẩm này sẽ có các màu thời thượng tương tự như người tiền nhiệm. Đó là màu hồng, đen, trắng, xanh. ",
        "https://lh5.googleusercontent.com/pbSTBFLYmiDX-t-sVr4Ycqah1Kn8QEmEY5JH1qBP5qKrEiGApq4f_wl3WSb5k_Iae5KiKLGBvgYCZvf437y3PdZh-ZtkmLKstkzV91VMahbG3P2qxnDXt4Fh1xuNxqoiq2vhR5Y",
        "Galaxy A52 vẫn sở hữu màn hình đục lỗ quen thuộc với kích thước 6.5 inch. Samsung đã trang bị cho sản phẩm này tấm nền Super AMOLED, mật độ điểm ảnh 405ppi nhằm mang đến những hình ảnh sống động, màu sắc chính xác. Độ phân giải 2400 x 1080 (Full HD+) càng làm tăng thêm tính chân thực cho những hình ảnh hiển thị. "
      ],
      color: "Blue",
      price: "9290000",
      images: [
        "2021/03/18/image-removebg-preview-9.png",
        "2021/03/18/image-removebg-preview-10.png",
        "2021/03/18/image-removebg-preview-8.png"
      ],
      sale: "18",
      quantity: "3",
      details: [
        "Công nghệ màn hình: Super AMOLED",
        "Độ phân giải: Full HD (1080 x 2040 Pixels)",
        "Màn hình rộng: 6.5",
        "Tốc độ CPU: 2 nhân 2.2 GHz & 6 nhân 1.8 GHz",
        "Hệ điều hành: Android 11",
        "RAM: 8 GB",
        "Dung lượng pin: 4500 mAh"
      ]
    },
    {
      id: 7,
      name: "Apple iPhone 12 Pro Max - 512GB - Chính hãng VN/A",
      brand: "iphone",
      description: [
        "iPhone 12 Pro Max chính thức trở thành chiếc iPhone có màn hình lớn nhất tính tới thời điểm hiện tại. Bạn sẽ được trải nghiệm hình ảnh đã mắt trên màn hình 6,7 inch Super Retina XDR này. Viền màn hình và phần khoét tai thỏ đã được làm gọn hơn để tối ưu thêm không gian hiển thị. Tấm nền của iPhone 12 Pro Max hỗ trợ chuẩn HDR10 với độ sáng tối đa lên tới 1200 nit. Màn hình của máy được bảo vệ bởi kính cường lực Ceremic Shield cho độ bền gấp 4 lần thế hệ trước.",
        "2020/10/14/apple--dien-thoai-di-dong-apple-iphone-12-pro-max-256gb-chinh-hang-vn-a-2.jpg",
        "Cầm iPhone 12 Pro Max trên tay chắc chắn sẽ thu hút mọi ánh nhìn nhờ thiết kế cực sang trọng. Phần viền của máy được làm từ vật liệu thép không gỉ sáng bóng, được sơn lên lớp phủ chống xước. Mặt lưng của máy tiếp tục được hoàn thiện nhám giúp tăng cường khả năng cầm nắm mà không phải đánh đổi vẻ ngoài cao cấp. Người dùng sẽ có 4 lựa chọn về màu sắc gồm bạc, xám graphite, vàng và xanh biển sâu. iPhone 12 Pro Max được trang bị chuẩn kháng nước và bụi bẩn IP68."
      ],
      color: "White",
      price: "43990000",
      images: [
        "2020/11/06/iphone-12-pro-max-4.png",
        "2020/11/06/iphone-12-pro-max-3.png",
        "2020/11/06/iphone-12-pro-max-2.png",
        "2020/11/06/iphone-12-pro-max.png"
      ],
      sale: "12",
      quantity: "12",
      details: [
        "Công nghệ màn hình: OLED",
        "Độ phân giải: 1284 x 2778 Pixels",
        "Màn hình rộng: 6.7",
        "Tốc độ CPU: 2 nhân 3.1 GHz & 4 nhân 1.8 GHz",
        "Hệ điều hành: iOS 14",
        "RAM: 6 GB",
        "Dung lượng pin: 3687 mAh"
      ]
    },
    {
      id: 8,
      name: "Điện thoại di động Vsmart Star 5 - 3GB/32GB - Chính hãng",
      brand: "Vsmart",
      description: [
        "Vsmart là thương hiệu “điện thoại quốc dân” không còn xa lạ với người dùng Việt Nam. Những mẫu smartphone mang thương hiệu Vsmart sở hữu công nghệ tiên tiến và hoàn thiện thiết kế tỉ mỉ. Mới đây, công ty đã cho ra mắt chiếc điện thoại Vsmart Star 5 được đánh giá là đáp ứng các tiêu chuẩn của một chiếc điện thoại phổ thông trong mức giá tầm trung. Nếu bạn đang tìm kiếm một chiếc smartphone thì không nên bỏ qua Vsmart Star 3GB/32GB chính hãng tại Hoàng Hà Mobile. ",
        "https://hoanghamobile.com/Uploads/2021/03/22/star-5-1.png",
        "Ngay từ những ngày đầu ra mắt, thiết kế của những chiếc điện thoại của thương hiệu Vsmart được đánh giá có độ hoàn thiện chi tiết rất tốt. Chiếc Vsmart Star 5 3GB/ 32GB có vẻ ngoài tương tự như điện thoại Vsmart Joy 3 đã ra mắt hồi đầu năm ngoái. Nó có kích thước 163.91x75.67x9.1mm và trọng lượng chỉ khoảng 196.26g nên khá nhỏ gọn và tiện lợi. Người dùng có thể cầm và sử dụng dễ dàng mà không gây ra cảm giác nặng tay. Hoặc khi bạn bỏ chiếc điện thoại Vsmart Star 5 vào túi để mang theo khi di chuyển, nó cũng không chiếm quá nhiều diện tích."
      ],
      color: "Xanh Mint",
      price: "2690000",
      images: [
        "2021/03/31/paleaqua.jpg",
        "2021/03/31/green.jpg",
        "2021/03/31/gray.jpg"
      ],
      sale: "5",
      quantity: "12",
      details: [
        "Công nghệ màn hình: IPS LCD",
        "Độ phân giải: HD+ (720 x 1600 Pixels)",
        "Màn hình rộng: 6.52",
        "Hệ điều hành: Android 11",
        "RAM: 3 GB",
        "Dung lượng pin: 5000 mAh"
      ]
    }
  ]
}

let getProductsInCart = (data, idUser) => {
  let cart = data.carts.filter((cart) => {
    return cart.id === idUser;
  })
  let arrproductsInCart = cart[0].products.map((item) => {
    return item.idProduct;
  });
  let products=data.products.filter((product)=>{
    return arrproductsInCart.includes(product.id);
  });
  console.log(products);
  let fakeCarts=products.map((product,index)=>{
    let quantityOrder=cart[0].products[index].quantity;
    return temp={...product,quantityOrder};
  });
  return fakeCarts;
}
getProductsInCart(data, 1);


let getProductsSold = (data, idUser) => {
  let productsSold = data.sold.filter((item) => {
    return item.id === idUser;
  })
  let arrproductsSold = productsSold[0].products.map((item) => {
    return item.idProduct;
  });
  let products=data.products.filter((product)=>{
    return arrproductsSold.includes(product.id);
  });
  let fakeCarts=products.map((product,index)=>{
    let quantitySold=productsSold[0].products[index].quantity;
    return temp={...product,quantitySold};
  });
  console.log(fakeCarts)
  return fakeCarts;
}
getProductsSold(data, 1);
