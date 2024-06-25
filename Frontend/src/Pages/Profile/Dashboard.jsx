
import { Card, IconButton, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { HiMiniPencilSquare } from "react-icons/hi2";
import { RiDeleteBin5Line } from "react-icons/ri";


const TABLE_HEAD = ["Image", "Title", "Price", "Quantity", "Options"];

export default function Dasboard() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch("https://swiftshop-server.vercel.app/productsm")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const handleDeleteProduct = (id) => {
    const alert = window.confirm("Are you sure?");
    if (alert) {
      console.log({ id });
      const result = fetch(
        `https://swiftshop-server.vercel.app/product/${id}k`,
        {
          method: "DELETE",
          headers: {
            authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.acknowledged) {
            const newProducts = products.filter(
              (product) => product._id !== id
            );
            setProducts(newProducts);
          }
        });

      toast.promise(result, {
        loading: "Deleting...",
        success: "Product Successfully deleted",
        error: "Something went wrong",
      });

      console.log({ result });
    }
  };

  return (
    <div>
      <div className="flex justify-between py-4">
        <h1 className="text-xl font-semibold">Rent History</h1>
      </div>
      <Card className="h-full w-full overflow-scroll">
        <table className="w-full min-w-max table-auto text-left">
          <thead>
            <tr>
              {TABLE_HEAD.map((head) => (
                <th
                  key={head}
                  className="text-left border-b border-blue-gray-100 bg-blue-gray-50 p-4"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="font-normal leading-none opacity-70"
                  >
                    {head}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <>
                <tr>
                  <td className="p-2">
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-10 h-10 rounded border object-cover"
                    />
                  </td>
                  <td>{product.title}</td>
                  <td className="text-left p-2">৳ {product.price}</td>
                  <td className="text-left pl-8">{product.quantity}</td>
                  <td>
                    <div className="flex gap-2">
                      <IconButton>
                        <HiMiniPencilSquare className="text-xl text-white" />
                      </IconButton>
                      <IconButton
                        onClick={() => handleDeleteProduct(product._id)}
                      >
                        <RiDeleteBin5Line className="text-xl text-white" />
                      </IconButton>
                    </div>
                  </td>
                </tr>
              </>
            ))}
          </tbody>
        </table>
      </Card>
    </div>
  );
}
