import express from "express";
import cors from "cors";

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:5174",
    methods: ["GET", "POST","DELETE","PUT"],
  }),
);

let products = [
  {
    id: 1,
    name: "Oppo",
    desc: "dhjsc",
    imageUrl:
      "https://www.oppo.com/content/dam/oppo_com/common/mkt/v2-2/reno15-series-en/list-page/reno15/480-600-white.png",
    price: 500000,
  },
  {
    id: 2,
    name: "Headphones",
    imageUrl:
      "https://xcessorieshub.com/wp-content/uploads/2023/03/wh-ch720_Primary_image-1.webp",
    price: 600000,
    desc: "14jfdv",
  },
  {
    id: 3,
    name: "charger",
    imageUrl:
      "https://pakistanstore.pk/wp-content/uploads/2022/08/iPhone-USB-C-Power-Adapter.jpg",
    price: 600000,
    desc: "14jfdv",
  },
  {
    id: 4,
    name: "ear buds",
    imageUrl:
      "https://delenzomart.com.pk/cdn/shop/files/download_6_e3334d1c-97a7-47a1-bc14-83edbf1935f5.jpg?v=1740112621",
    price: 9900,
    desc: "14jfdv",
  },
  {
    id: 5,
    name: "Laptop",
    imageUrl:
      "https://coretekcomputers.com/cdn/shop/products/dell_3340_02_1024x1024.jpg?v=1569190249",
    price: 44000,
    desc: "14jfdv",
  },
  {
    id: 6,
    name: "Extension",
    imageUrl:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ3zE1HP0qjjvSYWLjrtpxTo1nbZO5TuxOOEA&s",
    price: 50000,
    desc: "14jfdv",
  },
];

app.get("/products", (req, res) => {
  res.json(products);
});

app.post("/products", (req, res) => {
  const newProduct = req.body;
  products.push(newProduct);
  res.status(201).json(newProduct);
});
app.put("/products/:id", (req, res) => {
  const { id } = req.params;
  const updatedProduct = req.body;

  const index = products.findIndex((product) => product.id === parseInt(id));
  if (index !== -1) {
    products[index] = { ...products[index], ...updatedProduct };
    res.json(products[index]);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
});
app.delete("/products/:id", (req,res) => {
    const {id } = req.params;
    products = products.filter((product) => product.id !== parseInt(id));
    res.status(204).send({ message: "Product Deleted"});
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
