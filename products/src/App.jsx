import { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";

function App() {

  const [products, setProducts] = useState([]);
const [editingId, setEditingId] = useState(null);

  const [newproductForm, setNewProductForm] = useState({
    id: "",
    name: "",
    imageUrl: "",
    price: 0,
    desc: ""
  });

  const handleNewProductFormChange = (e) => {
    setNewProductForm({
      ...newproductForm,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const apiRes = await axios.get("http://localhost:8000/products");
        const productData = apiRes.data;
        setProducts(apiRes.data);
      } catch (err) {
        alert("Something went wrong");
      }
    };

    fetchProducts();
  }, []);

  async function saveProduct(e) {
    e.preventDefault();

    try {
      const saveRes = await axios.post("http://localhost:8000/products",{
        id: newproductForm.id,
      name: newproductForm.name,
      imageUrl: newproductForm.imageUrl,
      price: newproductForm.price,
      desc: newproductForm.desc
      });

     alert("save product");
  
    } catch (err) {
      alert("Error saving product");
    }
  };

   const editProduct = (product) => {
    setNewProductForm(product);
    setEditingId(product.id);
  };

 
  const updateProduct = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.put(
        `http://localhost:8000/products/${editingId}`,
        newproductForm
      );

      const updatedProducts = products.map((p) =>
        p.id === editingId ? res.data : p
      );

      setProducts(updatedProducts);

      alert("Product Updated");

      setEditingId(null);

      setNewProductForm({
        id: "",
        name: "",
        imageUrl: "",
        price: 0,
        desc: ""
      });

    } catch (err) {
      alert("Error updating product");
    }
  };

   const deleteProduct = async(id) =>  {
    try{
      await axios.delete(`http://localhost:8000/products/${id}`);

      setProducts(products.filter((product) => product.id !== id));

      alert("Product Deleted");
    } catch (err) {
      alert("Error deleting product");
    }
   };

  return (
  <div className="min-h-screen bg-gray-100 p-10">

    
    <div className="max-w-xl mx-auto bg-white shadow-lg rounded-xl p-6 mb-10">

      <h1 className="text-2xl font-bold mb-6 text-center">Add Product</h1>

      <form onSubmit={editingId ? updateProduct : saveProduct}className="space-y-4">

        <input
          type="text"
          placeholder="Product ID"
          onChange={handleNewProductFormChange}
          className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="text"
          name="name"
          placeholder="Product Name"
          onChange={handleNewProductFormChange}
          className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="text"
          name="imageUrl"
          placeholder="Image URL"
          onChange={handleNewProductFormChange}
          className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <input
          type="number"
          name="price"
          placeholder="Price"
          onChange={handleNewProductFormChange}
          className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />

        <textarea
          name="desc"
          placeholder="Product Description"
          rows="4"
          onChange={handleNewProductFormChange}
          className="w-full border p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        ></textarea>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
        >
          Save Product
        </button>

      </form>
    </div>

    

    <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">

      {products.map((pr) => (
        <div
          key={pr.id}
          className="bg-white rounded-xl shadow-md p-4 hover:shadow-xl transition"
        >

          {pr.imageUrl && (
            <img
              src={pr.imageUrl}
              alt={pr.name}
              className="h-40 w-full object-contain mb-4"
            />
          )}

          <h2 className="font-semibold text-lg">{pr.name}</h2>

          <p className="text-gray-500 text-sm mb-2">{pr.desc}</p>

          <p className="text-blue-600 font-bold text-lg">
            ${pr.price}
          </p>

          <button
              onClick={() => editProduct(pr)}
              className="w-full bg-yellow-500 text-white py-1 rounded-lg mb-2 hover:bg-yellow-600 cursor-pointer"
            >
              Edit
            </button>
          <button
              onClick={() => deleteProduct(pr.id)}
              className="w-full bg-red-500 text-white py-1 rounded-lg hover:bg-red-600 cursor-pointer"
            >
              Delete Product
            </button>
        </div>
      ))}

    </div>

  </div>
);
}
export default App;