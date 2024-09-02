import React, { useEffect, useState } from "react";
import BasicTable from "../../components/AdminComponents/BasicTable";
import { base_url } from "../../Utils/baseUrl";
import { FaAddressCard, FaEye, FaPen, FaTrash } from "react-icons/fa";
import { List } from "@mui/material";
import { toast, Toaster } from "react-hot-toast";
import { config } from "../../Utils/axiosConfig";
import { useNavigate } from "react-router-dom";
import { IoCloseCircleOutline } from "react-icons/io5";

const ListProduct = () => {
  const [product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [reload, setReload] = useState(false);
  const navigate = useNavigate();
  const [productDetails, setProductDetails] = useState({
    name: null,
    images: [],
    price: null,
    category: null,
    subcategory: null,
    itemCode: null,
    height: null,
    width: null,
    length: null,
    weight: null,
    hsnCode: null,
    perpiece: null,
    measurment: null,
    quantity: null,
    description: null,
    discount: null,
    mindiscription: null,
  });
  const [open, setOpen] = useState(false);

  const deleteProduct = async (id) => {
    try {
      const response = await fetch(`${base_url}product/${id}`, {
        method: "DELETE",
        ...config,
      });
      const data = await response.json();
      if (data.error) {
        toast.error(data.error);
        return;
      }
      if (!data.success) {
        toast.error(data.message);
        return;
      }
      setReload((prev) => !prev);
      toast.success(data.message);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const fetchProductDetails = async (id) => {
    try {
      const response = await fetch(`${base_url}product/${id}`, {
        method: "GET",
        ...config,
      });
      const data = await response.json();
      console.log(data);
      setProductDetails({
        name: data?.name,
        images: data?.images,
        price: data?.price,
        category: data?.category,
        subcategory: data?.subcategory,
        itemCode: data?.itemCode,
        height: data?.height,
        width: data?.width,
        length: data?.length,
        weight: data?.weight,
        hsnCode: data?.hsnCode,
        perpiece: data?.perpiece,
        measurment: data?.measurment,
        quantity: data?.quantity,
        description: data?.description,
        discount: data?.corporateDiscount,
        mindiscription: data?.mindiscription,
      });
      setOpen(true);
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    const FetchProduct = async () => {
      let response = await fetch(`${base_url}product`);
      let data = await response.json();
      setProduct(data);
      setIsLoading(false);
    };
    FetchProduct();
    // console.log(product)
  }, [reload]);

  const columns = [
    {
      header: "Sr.No.",
      accessorKey: "_id",
      cell: ({ row }) => {
        const id = row.id;
        return <span>{(+id)+1}</span>;
      },
    },
    {
      header: "Image",
      accessorKey: "images",
      cell: ({ row }) => {
        return (
          <img
            src={row.original.images[0]}
            alt=""
            className="h-12 w-12 object-cover"
          />
        );
      },
    },
    {
      header: "Product Name",
      accessorKey: "name",
    },
    {
      header: "Price / unit",
      accessorKey: "price",
    },
    {
      header: "Discount",
      accessorKey: "corporateDiscount",
      cell: ({ row }) => {
        console.log(row)
        const discount = row.original?.corporateDiscount;
        console.log(discount)
        return <span>{discount}</span>;
      },
    },
    {
      header: "Quantity",
      accessorKey: "quantity",
    },
    {
      header: "Category",
      accessorKey: "category",
    },
    {
      header: "Action",
      cell: ({ row }) => (
        <List
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 4,
            justifyContent: "center",
            cursor: "pointer",
          }}
        >
          <div
            onClick={() => deleteProduct(row.original._id)}
            className="bg-red-200 p-2 rounded-md hover:shadow-md"
          >
            <FaTrash className="text-red-500" />
          </div>
          <div
            onClick={() => fetchProductDetails(row.original._id)}
            className="bg-blue-200 p-2 rounded-md hover:shadow-md"
          >
            <FaEye className="text-blue-500" />
          </div>
          <div
            onClick={() => navigate(`/admin/product-edit/${row.original._id}`)}
            className="bg-black/20 p-2 rounded-md hover:shadow-md"
          >
            <FaPen className="text-black" />
          </div>
        </List>
      ),
    },
  ];
  return (
    <>
      <Toaster />
      {open && (
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90%] lg:w-[50%] h-[35rem] bg-white p-5 rounded-md overflow-auto"
          style={{ boxShadow: "0 0 4px 1px #c3bcbc" }}
        >
          <div
            onClick={() => {
              setOpen(false);
              setProductDetails({
                name: null,
                images: [],
                price: null,
                category: null,
                subcategory: null,
                itemCode: null,
                height: null,
                width: null,
                length: null,
                weight: null,
                hsnCode: null,
                perpiece: null,
                measurment: null,
                quantity: null,
                description: null,
                discount: null,
                mindiscription: null,
              });
            }}
            className="flex justify-between text-3xl"
          >
            <h1 className="font-bold text-3xl">Product Details</h1>
            <div className="hover:text-red-500">
              <IoCloseCircleOutline />
            </div>
          </div>
          <div>
            <div className="mt-3 text-lg">
              <div>
                <div className="mb-1 flex items-start gap-x-2">
                  <span className="font-semibold">Name:</span>
                  <span>{productDetails?.name}</span>
                </div>
                <div className="mb-1 flex items-start gap-x-2">
                  <span className="font-semibold">Description:</span>
                  <span>
                    {productDetails?.mindiscription ||
                      productDetails?.description}
                  </span>
                </div>
                <div className="mb-1 flex items-start gap-x-2">
                  <span className="font-semibold">Category:</span>
                  <span>{productDetails?.category}</span>
                </div>
                <div className="mb-1 flex items-start gap-x-2">
                  <span className="font-semibold">Subcategory:</span>
                  <span>{productDetails?.subcategory}</span>
                </div>
                <div className="mb-1 flex items-start gap-x-2">
                  <span className="font-semibold">Price:</span>
                  <span>{productDetails?.price}</span>
                </div>
                <div className="mb-1 flex items-start gap-x-2">
                  <span className="font-semibold">Discount:</span>
                  <span>{productDetails?.discount}%</span>
                </div>
                <div className="mb-1 flex items-start gap-x-2">
                  <span className="font-semibold">Height:</span>
                  <span>{productDetails?.height}</span>
                </div>
                <div className="mb-1 flex items-start gap-x-2">
                  <span className="font-semibold">Width:</span>
                  <span>{productDetails?.width}</span>
                </div>
                <div className="mb-1 flex items-start gap-x-2">
                  <span className="font-semibold">Length:</span>
                  <span>{productDetails?.length}</span>
                </div>
                <div className="mb-1 flex items-start gap-x-2">
                  <span className="font-semibold">Weight:</span>
                  <span>{productDetails?.weight} kg</span>
                </div>
                <div className="mb-1 flex items-start gap-x-2">
                  <span className="font-semibold">Measurement Unit:</span>
                  <span>{productDetails?.measurment}</span>
                </div>
                <div className="mb-1 flex items-start gap-x-2">
                  <span className="font-semibold">Item Code:</span>
                  <span>{productDetails?.itemCode}</span>
                </div>
                <div className="mb-1 flex items-start gap-x-2">
                  <span className="font-semibold">HSN Code:</span>
                  <span>{productDetails?.hsnCode}</span>
                </div>
                <div className="mb-1 flex items-start gap-x-2">
                  <span className="font-semibold">Per Piece Price:</span>
                  <span>{productDetails?.perpiece}</span>
                </div>
                <div className="mb-1 flex items-start gap-x-2">
                  <span className="font-semibold">Quantity:</span>
                  <span>{productDetails?.quantity}</span>
                </div>
                <div className="mb-1 flex flex-col items-start gap-y-2">
                  <span className="font-semibold">Product Images:</span>
                  <div className="grid grid-cols-3 gap-2">
                    {productDetails?.images?.map((img) => (
                      <img
                        src={img[0]}
                        className="h-[10rem] w-full object-contain"
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <div className="border-2 shadow-md flex items-center justify-normal m-8 rounded-md p-4">
        <div className="text-3xl font-bold p-8 bg-[#0a2440] text-white w-full shadow-md rounded-md ">
          <h1 className="">Product List</h1>
        </div>
      </div>
      <div className="w-full">
        <BasicTable columns={columns} data={product} />
      </div>
    </>
  );
};

export default ListProduct;