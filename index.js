// const port = 4000;
// const express = require("express");
// const app = express();
// const mongoose = require("mongoose");
// const jwt = require("jsonwebtoken");
// const multer = require("multer");
// const path = require("path");
// const cors = require("cors");

// app.use(express.json());
// app.use(cors());

// // Database Connection
// mongoose.connect("mongodb+srv://jurair:jurair123@cluster0.9k5r3bb.mongodb.net/e-commerce");

// // Image Storage Engine 
// const storage = multer.diskStorage({
//   destination: './upload/images',
//   filename: (req, file, cb) => {
//     console.log(file);
//     return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
//   }
// })
// const upload = multer({ storage: storage });
// app.post("/upload", upload.single('product'), (req, res) => {
//   res.json({
//     success: 1,
//     image_url: `http://localhost:4000/images/${req.file.filename}`
//   })
// });
// app.use('/images', express.static('upload/images'));

// // Middleware to fetch user from the database
// const fetchuser = async (req, res, next) => {
//   const token = req.header("auth-token");
//   if (!token) {
//     res.status(401).send({ errors: "Please authenticate using a valid token" });
//   }
//   try {
//     const data = jwt.verify(token, "secret_ecom");
//     req.user = data.user;
//     next();
//   } catch (error) {
//     res.status(401).send({ errors: "Please authenticate using a valid token" });
//   }
// };

// // Schema for creating user model
// const Users = mongoose.model("Users", {
//   name: {
//     type: String,
//   },
//   email: {
//     type: String,
//     unique: true,
//   },
//   password: {
//     type: String,
//   },
//   cartData: {
//     type: Object,
//   },
//   date: {
//     type: Date,
//     default: Date.now,
//   },
// });

// // Schema for creating Product
// const Product = mongoose.model("Product", {
//   id: {
//     type: Number,
//     required: true,
//   },
//   name: {
//     type: String,
//     required: true,
//   },
//   image: {
//     type: String,
//     required: true,
//   },
//   category: {
//     type: String,
//     required: true,
//   },
//   new_price: {
//     type: Number
//   },
//   old_price: {
//     type: Number
//   },
//   description: {
//     type: String,
//     required: true,
//   },
//   rating: {
//     type: Number
//   },
//   date: {
//     type: Date,
//     default: Date.now,
//   },
//   available: {
//     type: Boolean,
//     default: true,
//   },
// });

// // Schema for creating seller

// const sellerSchema = new mongoose.Schema({
//   name: {
//     type: String,
//   },
//   email: {
//     type: String,
//     unique: true,
//   },
//   password: {
//     type: String,
//   },
//   companyName: {
//     type: String
//   },
// });

// const Sellers = mongoose.model('Sellers', sellerSchema);
// module.exports = Sellers;

// app.get("/", (req, res) => {
//   res.send("Root");
// });

// app.post('/login', async (req, res) => {
//   console.log("Login");
//   try {
//     let success = false;
//     let user = await Users.findOne({ email: req.body.email });
//     if (user) {
//       const passCompare = req.body.password === user.password;
//       if (passCompare) {
//         const data = {
//           user: {
//             id: user.id,
//           }
//         }
//         success = true;
//         console.log(user.id);
//         const token = jwt.sign(data, 'secret_ecom');
//         res.json({ success: true, token });
//       }
//       else {
//         return res.status(400).json({ success: success, errors: "Wrong Password" });
//       }
//     }
//     else {
//       return res.status(400).json({ success: success, errors: "Wrong Email Id" })
//     }
//   } catch (error) {
//     console.error('Error logging in:', error);
//     res.status(500).json({ success: false, errors: "An error occurred while logging in" });
//   }
// });

// app.post('/signup', async (req, res) => {
//   console.log("Sign Up");
//   try {
//     let success = false;
//     const existingUser = await Users.findOne({ email: req.body.email });
//     if (existingUser) {
//       return res.status(400).json({ success: false, errors: "Email already exists" });
//     }
//     let cart = {};
//     for (let i = 0; i < 300; i++) {
//       cart[i] = 0;
//     }
//     const user = new Users({
//       name: req.body.username,
//       email: req.body.email,
//       password: req.body.password,
//       cartData: cart,
//     });
//     await user.save();
//     const data = {
//       user: {
//         id: user.id
//       }
//     };
//     const token = jwt.sign(data, 'secret_ecom');
//     success = true;
//     res.json({ success, token });
//   } catch (error) {
//     console.error('Error signing up:', error);
//     res.status(500).json({ success: false, errors: "An error occurred while signing up" });
//   }
// });


// app.post('/seller/signup', async (req, res) => {
//   console.log("Seller Sign Up");
//   try {
//     let success = false;
//     const existingSeller = await Sellers.findOne({ email: req.body.email });
//     if (existingSeller) {
//       return res.status(400).json({ success: false, errors: "Email already exists" });
//     }
//     const seller = new Sellers({
//       name: req.body.username,
//       email: req.body.email,
//       password: req.body.password,
//       companyName: req.body.companyName,
//     });
//     await seller.save();
//     const data = {
//       seller: {
//         id: seller.id
//       }
//     };
//     const token = jwt.sign(data, 'secret_ecom_seller');
//     success = true;
//     res.json({ success, token });
//   } catch (error) {
//     console.error('Error signing up seller:', error);
//     res.status(500).json({ success: false, errors: "An error occurred while signing up as a seller" });
//   }
// });

// app.get("/allproducts", async (req, res) => {
//   let products = await Product.find({});
//   console.log("All Products");
//   res.send(products);
// });

// app.get("/newcollections", async (req, res) => {
//   let products = await Product.find({});
//   let arr = products.slice(1).slice(-8);
//   console.log("New Collections");
//   res.send(arr);
// });

// app.get("/popularinjute", async (req, res) => {
//   let products = await Product.find({});
//   let arr = products.slice(0, 4);
//   console.log("Popular In wooden");
//   res.send(arr);
// });



// app.post('/addtocart', fetchuser, async (req, res) => {
//   console.log("Add Cart");
//   let userData = await Users.findOne({_id:req.user.id});
//   userData.cartData[req.body.itemId] += 1;
//   await Users.findOneAndUpdate({_id:req.user.id}, {cartData:userData.cartData});
//   res.send("Added")
// });

// app.post('/removefromcart', fetchuser, async (req, res) => {
//   console.log("Remove Cart");
//   let userData = await Users.findOne({ _id: req.user.id });
//   if (userData.cartData[req.body.itemId] != 0) {
//     userData.cartData[req.body.itemId] -= 1;
//   }
//   await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
//   res.send("Removed");
// });

// app.post('/getcart', fetchuser, async (req, res) => {
//   console.log("Get Cart");
//   let userData = await Users.findOne({ _id: req.user.id });
//   res.json(userData.cartData);
// });

// app.post("/addproduct", async (req, res) => {
//   let products = await Product.find({});
//   let id;
//   if (products.length > 0) {
//     let last_product_array = products.slice(-1);
//     let last_product = last_product_array[0];
//     id = last_product.id + 1;
//   }
//   else {
//     id = 1;
//   }
//   const product = new Product({
//     id: id,
//     name: req.body.name,
//     image: req.body.image,
//     category: req.body.category,
//     rating: req.body.rating,
//     new_price: req.body.new_price,
//     old_price: req.body.old_price,
//     description: req.body.description,
//   });
//   console.log(product);
//   await product.save();
//   console.log("Saved");
//   res.json({ success: true, name: req.body.name });
// });

// app.post("/removeproduct", async (req, res) => {
//   const product = await Product.findOneAndDelete({ id: req.body.id });
//   console.log("Removed");
//   res.json({ success: true, name: req.body.name });
// });

// app.listen(port, (error) => {
//   if (!error) console.log("Server Running on port " + port);
//   else console.log("Error : ", error);
// });




// const express = require("express");
// const mongoose = require("mongoose");
// const jwt = require("jsonwebtoken");
// const multer = require("multer");
// const path = require("path");
// const cors = require("cors");

// const app = express();
// app.use(express.json());
// app.use(cors());

// // Database Connection
// mongoose.connect("mongodb+srv://jurair:jurair123@cluster0.9k5r3bb.mongodb.net/e-commerce");

// // Image Storage Engine 
// const storage = multer.diskStorage({
//   destination: './upload/images',
//   filename: (req, file, cb) => {
//     console.log(file);
//     return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
//   }
// })
// const upload = multer({ storage: storage });
// app.post("/upload", upload.single('product'), (req, res) => {
//   res.json({
//     success: 1,
//     image_url: `http://localhost:4000/images/${req.file.filename}`
//   })
// });
// app.use('/images', express.static('upload/images'));

// // Middleware to fetch user from the database
// const fetchuser = async (req, res, next) => {
//   const token = req.header("auth-token");
//   if (!token) {
//     res.status(401).send({ errors: "Please authenticate using a valid token" });
//   }
//   try {
//     const data = jwt.verify(token, "secret_ecom");
//     req.user = data.user;
//     next();
//   } catch (error) {
//     res.status(401).send({ errors: "Please authenticate using a valid token" });
//   }
// };

// // Schema for creating user model
// const Users = mongoose.model("Users", {
//   name: {
//     type: String,
//   },
//   email: {
//     type: String,
//     unique: true,
//   },
//   password: {
//     type: String,
//   },
//   cartData: {
//     type: Object,
//   },
//   date: {
//     type: Date,
//     default: Date.now,
//   },
// });

// // Schema for creating Product
// const Product = mongoose.model("Product", {
//   id: {
//     type: Number,
//     required: true,
//   },
//   name: {
//     type: String,
//     required: true,
//   },
//   image: {
//     type: String,
//     required: true,
//   },
//   category: {
//     type: String,
//     required: true,
//   },
//   new_price: {
//     type: Number
//   },
//   old_price: {
//     type: Number
//   },
//   description: {
//     type: String,
//     required: true,
//   },
//   rating: {
//     type: Number
//   },
//   relatedProducts: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'Product'
//   }],
//   date: {
//     type: Date,
//     default: Date.now,
//   },
//   available: {
//     type: Boolean,
//     default: true,
//   },
// });

// // Schema for creating seller

// const sellerSchema = new mongoose.Schema({
//   name: {
//     type: String,
//   },
//   email: {
//     type: String,
//     unique: true,
//   },
//   password: {
//     type: String,
//   },
//   companyName: {
//     type: String
//   },
// });

// const Sellers = mongoose.model('Sellers', sellerSchema);
// module.exports = Sellers;

// app.get("/", (req, res) => {
//   res.send("Root");
// });

// app.post('/login', async (req, res) => {
//   console.log("Login");
//   try {
//     let success = false;
//     let user = await Users.findOne({ email: req.body.email });
//     if (user) {
//       const passCompare = req.body.password === user.password;
//       if (passCompare) {
//         const data = {
//           user: {
//             id: user.id,
//           }
//         }
//         success = true;
//         console.log(user.id);
//         const token = jwt.sign(data, 'secret_ecom');
//         res.json({ success: true, token });
//       }
//       else {
//         return res.status(400).json({ success: success, errors: "Wrong Password" });
//       }
//     }
//     else {
//       return res.status(400).json({ success: success, errors: "Wrong Email Id" })
//     }
//   } catch (error) {
//     console.error('Error logging in:', error);
//     res.status(500).json({ success: false, errors: "An error occurred while logging in" });
//   }
// });

// app.post('/signup', async (req, res) => {
//   console.log("Sign Up");
//   try {
//     let success = false;
//     const existingUser = await Users.findOne({ email: req.body.email });
//     if (existingUser) {
//       return res.status(400).json({ success: false, errors: "Email already exists" });
//     }
//     let cart = {};
//     for (let i = 0; i < 300; i++) {
//       cart[i] = 0;
//     }
//     const user = new Users({
//       name: req.body.username,
//       email: req.body.email,
//       password: req.body.password,
//       cartData: cart,
//     });
//     await user.save();
//     const data = {
//       user: {
//         id: user.id
//       }
//     };
//     const token = jwt.sign(data, 'secret_ecom');
//     success = true;
//     res.json({ success, token });
//   } catch (error) {
//     console.error('Error signing up:', error);
//     res.status(500).json({ success: false, errors: "An error occurred while signing up" });
//   }
// });


// app.post('/seller/signup', async (req, res) => {
//   console.log("Seller Sign Up");
//   try {
//     let success = false;
//     const existingSeller = await Sellers.findOne({ email: req.body.email });
//     if (existingSeller) {
//       return res.status(400).json({ success: false, errors: "Email already exists" });
//     }
//     const seller = new Sellers({
//       name: req.body.username,
//       email: req.body.email,
//       password: req.body.password,
//       companyName: req.body.companyName,
//     });
//     await seller.save();
//     const data = {
//       seller: {
//         id: seller.id
//       }
//     };
//     const token = jwt.sign(data, 'secret_ecom_seller');
//     success = true;
//     res.json({ success, token });
//   } catch (error) {
//     console.error('Error signing up seller:', error);
//     res.status(500).json({ success: false, errors: "An error occurred while signing up as a seller" });
//   }
// });

// app.get("/allproducts", async (req, res) => {
//   let products = await Product.find({});
//   console.log("All Products");
//   res.send(products);
// });

// app.get("/newcollections", async (req, res) => {
//   let products = await Product.find({});
//   let arr = products.slice(1).slice(-8);
//   console.log("New Collections");
//   res.send(arr);
// });

// app.get("/popularinjute", async (req, res) => {
//   let products = await Product.find({});
//   let arr = products.slice(0, 4);
//   console.log("Popular In wooden");
//   res.send(arr);
// });

// app.post('/addtocart', fetchuser, async (req, res) => {
//   console.log("Add Cart");
//   let userData = await Users.findOne({_id:req.user.id});
//   userData.cartData[req.body.itemId] += 1;
//   await Users.findOneAndUpdate({_id:req.user.id}, {cartData:userData.cartData});
//   res.send("Added")
// });

// app.post('/removefromcart', fetchuser, async (req, res) => {
//   console.log("Remove Cart");
//   let userData = await Users.findOne({ _id: req.user.id });
//   if (userData.cartData[req.body.itemId] != 0) {
//     userData.cartData[req.body.itemId] -= 1;
//   }
//   await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
//   res.send("Removed");
// });

// app.post('/getcart', fetchuser, async (req, res) => {
//   console.log("Get Cart");
//   let userData = await Users.findOne({ _id: req.user.id });
//   res.json(userData.cartData);
// });

// app.post("/addproduct", async (req, res) => {
//   let products = await Product.find({});
//   let id;
//   if (products.length > 0) {
//     let last_product_array = products.slice(-1);
//     let last_product = last_product_array[0];
//     id = last_product.id + 1;
//   }
//   else {
//     id = 1;
//   }
//   console.log(product);
//   await product.save();
//   console.log("Saved");
//   res.json({ success: true, name: req.body.name });
// });

// app.post("/removeproduct", async (req, res) => {
//   const product = await Product.findOneAndDelete({ id: req.body.id });
//   console.log("Removed");
//   res.json({ success: true, name: req.body.name });
// });

// const port = 4000;
// app.listen(port, (error) => {
//   if (!error) console.log("Server Running on port " + port);
//   else console.log("Error : ", error);
// });






const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// Database Connection
mongoose.connect("mongodb+srv://jurair:jurair123@cluster0.9k5r3bb.mongodb.net/e-commerce");

// Image Storage Engine 
const storage = multer.diskStorage({
  destination: './upload/images',
  filename: (req, file, cb) => {
    console.log(file);
    return cb(null, `${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
  }
})
const upload = multer({ storage: storage });
app.post("/upload", upload.single('product'), (req, res) => {
  res.json({
    success: 1,
    image_url: `http://localhost:4000/images/${req.file.filename}`
  })
});
app.use('/images', express.static('upload/images'));

// Middleware to fetch user from the database
const fetchuser = async (req, res, next) => {
  const token = req.header("auth-token");
  if (!token) {
    res.status(401).send({ errors: "Please authenticate using a valid token" });
  }
  try {
    const data = jwt.verify(token, "secret_ecom");
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).send({ errors: "Please authenticate using a valid token" });
  }
};

// Schema for creating user model
const Users = mongoose.model("Users", {
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  cartData: {
    type: Object,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// Schema for creating Product
const Product = mongoose.model("Product", {
  id: {
    type: Number,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  new_price: {
    type: Number
  },
  old_price: {
    type: Number
  },
  description: {
    type: String,
    required: true,
  },
  rating: {
    type: Number
  },
  relatedProducts: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product'
  }],
  date: {
    type: Date,
    default: Date.now,
  },
  available: {
    type: Boolean,
    default: true,
  },
});

// Schema for creating seller

const sellerSchema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
    unique: true,
  },
  password: {
    type: String,
  },
  companyName: {
    type: String
  },
});

const Sellers = mongoose.model('Sellers', sellerSchema);
module.exports = Sellers;

app.get("/", (req, res) => {
  res.send("Root");
});

app.post('/login', async (req, res) => {
  console.log("Login");
  try {
    let success = false;
    let user = await Users.findOne({ email: req.body.email });
    if (user) {
      const passCompare = req.body.password === user.password;
      if (passCompare) {
        const data = {
          user: {
            id: user.id,
          }
        }
        success = true;
        console.log(user.id);
        const token = jwt.sign(data, 'secret_ecom');
        res.json({ success: true, token });
      }
      else {
        return res.status(400).json({ success: success, errors: "Wrong Password" });
      }
    }
    else {
      return res.status(400).json({ success: success, errors: "Wrong Email Id" })
    }
  } catch (error) {
    console.error('Error logging in:', error);
    res.status(500).json({ success: false, errors: "An error occurred while logging in" });
  }
});

app.post('/signup', async (req, res) => {
  console.log("Sign Up");
  try {
    let success = false;
    const existingUser = await Users.findOne({ email: req.body.email });
    if (existingUser) {
      return res.status(400).json({ success: false, errors: "Email already exists" });
    }
    let cart = {};
    for (let i = 0; i < 300; i++) {
      cart[i] = 0;
    }
    const user = new Users({
      name: req.body.username,
      email: req.body.email,
      password: req.body.password,
      cartData: cart,
    });
    await user.save();
    const data = {
      user: {
        id: user.id
      }
    };
    const token = jwt.sign(data, 'secret_ecom');
    success = true;
    res.json({ success, token });
  } catch (error) {
    console.error('Error signing up:', error);
    res.status(500).json({ success: false, errors: "An error occurred while signing up" });
  }
});


app.post('/seller/signup', async (req, res) => {
  console.log("Seller Sign Up");
  try {
    let success = false;
    const existingSeller = await Sellers.findOne({ email: req.body.email });
    if (existingSeller) {
      return res.status(400).json({ success: false, errors: "Email already exists" });
    }
    const seller = new Sellers({
      name: req.body.username,
      email: req.body.email,
      password: req.body.password,
      companyName: req.body.companyName,
    });
    await seller.save();
    const data = {
      seller: {
        id: seller.id
      }
    };
    const token = jwt.sign(data, 'secret_ecom_seller');
    success = true;
    res.json({ success, token });
  } catch (error) {
    console.error('Error signing up seller:', error);
    res.status(500).json({ success: false, errors: "An error occurred while signing up as a seller" });
  }
});

app.get("/allproducts", async (req, res) => {
  let products = await Product.find({});
  console.log("All Products");
  res.send(products);
});

app.get("/newcollections", async (req, res) => {
  let products = await Product.find({});
  let arr = products.slice(1).slice(-8);
  console.log("New Collections");
  res.send(arr);
});

app.get("/popularinjute", async (req, res) => {
  let products = await Product.find({});
  let arr = products.slice(0, 4);
  console.log("Popular In wooden");
  res.send(arr);
});

app.get("/relatedproducts/:productId", async (req, res) => {
  try {
    const product = await Product.findById(req.params.productId).populate('relatedProducts');
    res.json(product.relatedProducts);
  } catch (error) {
    console.error("Error fetching related products:", error);
    res.status(500).json({ error: "An error occurred while fetching related products" });
  }
});

app.post('/addtocart', fetchuser, async (req, res) => {
  console.log("Add Cart");
  let userData = await Users.findOne({_id:req.user.id});
  userData.cartData[req.body.itemId] += 1;
  await Users.findOneAndUpdate({_id:req.user.id}, {cartData:userData.cartData});
  res.send("Added")
});

app.post('/removefromcart', fetchuser, async (req, res) => {
  console.log("Remove Cart");
  let userData = await Users.findOne({ _id: req.user.id });
  if (userData.cartData[req.body.itemId] != 0) {
    userData.cartData[req.body.itemId] -= 1;
  }
  await Users.findOneAndUpdate({ _id: req.user.id }, { cartData: userData.cartData });
  res.send("Removed");
});

app.post('/getcart', fetchuser, async (req, res) => {
  console.log("Get Cart");
  let userData = await Users.findOne({ _id: req.user.id });
  res.json(userData.cartData);
});

app.post("/addproduct", async (req, res) => {
  let products = await Product.find({});
  let id;
  if (products.length > 0) {
    let last_product_array = products.slice(-1);
    let last_product = last_product_array[0];
    id = last_product.id + 1;
  }
  else {
    id = 1;
  }
  console.log(product);
  await product.save();
  console.log("Saved");
  res.json({ success: true, name: req.body.name });
});

app.post("/removeproduct", async (req, res) => {
  const product = await Product.findOneAndDelete({ id: req.body.id });
  console.log("Removed");
  res.json({ success: true, name: req.body.name });
});

const port = 4000;
app.listen(port, (error) => {
  if (!error) console.log("Server Running on port " + port);
  else console.log("Error : ", error);
});
