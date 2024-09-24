import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { toast, Toaster } from "react-hot-toast";
import axios from "axios";
import { base_url } from "../../Utils/baseUrl";
import Loader from "../../components/reusablesUI/Loader";
import { Carousel } from "react-responsive-carousel";
import { LuEye } from "react-icons/lu";
import { Chip, Pagination, Rating } from "@mui/material";
import { useDispatch } from "react-redux";
import { addcarts } from "../../features/cartSlice";
import { FaSearch } from "react-icons/fa";
import { useAddCartHook } from "../../hooks/cartHooks";


const Category = () => {
  // const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [sortedProducts, setSortedProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOption, setSelectedOption] = useState("Low to High");
  const productsPerPage = 9;
  const dispatch = useDispatch();
  const { mutation } = useAddCartHook(); // React Query hook for adding items to cart


  const fetchProducts = async (category, subcategory) => {
    
    try {
      setIsLoading(true);
      let url = `${base_url}product?category=${category}&subcategory=${subcategory}`;
      let response = await fetch(url);
      let data = await response.json();
      setProducts(data);
      setSortedProducts(data);
      setIsLoading(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const handleCart = (product) => {
    const { _id } = product;
    mutation.mutate({ id: _id, qty: 1 });
    toast.success("Product Added to Cart")
  };

  // debounceing
  const debounce = (func, wait) => {
    let timeout;
    return function (...args) {
      const context = this;
      clearTimeout(timeout);
      timeout = setTimeout(() => {
        func.apply(context, args);
      }, wait);
    };
  };

  //  fillter searched products
  const handleSearch = debounce((searchKey) => {
    if (searchKey.trim() === "") {
      setSortedProducts(products);
    } else {
      const filteredProducts = products.filter((product) => {
        const productName = product.name.toLowerCase();
        const productDescription = product.mindiscription.toLowerCase();
        return (
          productName.includes(searchKey.trim().toLowerCase()) ||
          productDescription.includes(searchKey.trim().toLowerCase())
        );
      });
      setCurrentPage(1);
      setSortedProducts(filteredProducts);
    }
  }, 500);

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
    sortProducts(e.target.value);
  };

  const sortProducts = (option) => {
    let sortedProducts = [...products];

    switch (option) {
      case "Low to High":
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case "High to Low":
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case "Alphabetical A-Z":
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Alphabetical Z-A":
        sortedProducts.sort((b, a) => a.name.localeCompare(b.name)); // fixed Z-A sorting
        break;
      default:
        break;
    }

    setSortedProducts(sortedProducts);
    setCurrentPage(1); // Reset to the first page when sorting changes
  };

  useEffect(() => {
    const searchParams = window.location.search.split('&');
    let category = '';
    let subcategory = '';
    if(searchParams.length === 0){
      setIsLoading(true);
      return;
    }
    else{
      category = searchParams[0].replace('?=', '');
      if(searchParams.length > 1){
        subcategory = searchParams[1].replace('subcategory?=', '');
      }
    }
    fetchProducts(category?.toLowerCase(), subcategory?.toLowerCase());
  }, []);

  return (
    <div className="my-16">
      <Toaster />
      <h1 className="uppercase text-center text-[#0a2440] text-2xl lg:text-4xl font-bold">
        Products: ({products.length})
      </h1>
      <div className="mx-auto mt-2 rounded-md h-[6px] w-[120px] bg-[#0a2440]"></div>

      {isLoading && <Loader />}

      {!isLoading && (
        <div className="flex flex-col items-end gap-y-3 mt-6 px-10 ml-auto mr-0">
          <div className="searchbar lg:w-2/6 w-full h-full  rounded-md  flex items-center border">
            <input
              type="search"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                handleSearch(e.target.value);
              }}
              className="search h-8 outline-none py-1  rounded-l-md w-full px-4 placeholder:px-2"
              placeholder="search for product..."
            />
            <button
              className="uppercase bg-[#0A2440] rounded-r-md text-white p-2"
              onClick={() => handleSearch(search)}
            >
              <FaSearch />
            </button>
          </div>

          <div className="flex flex-col-reverse lg:flex-row items-center pr-4 gap-3 ">
            <div className="flex items-center rounded-md w-fit border-2">
              <div className="bg-[#0A2440] rounded-l-md text-white p-2">
                <span className="">Sort by:</span>
              </div>
              <select
                value={selectedOption}
                onChange={handleSelectChange}
                className="outline-none p-2 text-black"
              >
                <option value="Low to High">Low to High</option>
                <option value="High to Low">High to Low</option>
                <option value="Alphabetical A-Z">Alphabetical A-Z</option>
                <option value="Alphabetical Z-A">Alphabetical Z-A</option>
              </select>
            </div>
          </div>
        </div>
      )}
      {!isLoading && (
        <div className="my-16 px-4 flex justify-center">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-2 gap-y-2">
            {currentProducts?.map((product) => {
              return (
                <div
                  className="card group w-[21rem] border-2 p-4 rounded-md"
                  key={product._id}
                >
                  <div className="imagecontainer overflow-clip">
                  <Link to={`/product/${product._id}`}>
                  <Carousel
                      renderIndicator={false}
                      autoPlay={true}
                      infiniteLoop={true}
                      showStatus={false}
                      showThumbs={false}
                      showArrows={false}
                    >
                      {product.images.map((image, index) => (
                        <img
                          src={image}
                          key={index}
                          className="h-[15rem] w-auto object-cover group-hover:scale-95 duration-300"
                        />
                      ))}
                    </Carousel></Link>
                    {product?.corporateDiscount && product?.corporateDiscount !== '0' && <div className="absolute top-[10px] left-[10px]">
                        <Chip
                        sx={{ margin: "10px 0" }}
                        color="success"
                        size="small"
                        label={"upto " + product.corporateDiscount + "% off"}
                      />
                    </div>}
                  </div>
                  <div className="product-detail">
                    <div className="stack-1 flex justify-between p-2">
                      <div className="icon flex items-center gap-4 text-xl">
                        {/* <div className="preview-icon">
                        <CiHeart />
                      </div> */}
                      </div>
                    </div>
                    <div className="stack-2 p-2 group">
                    <Link to={`/product/${product._id}`}><h1 className="text-xl font-bold group-hover:underline h-[3.5rem] overflow-clip">
                        {product.name}
                      </h1></Link>
                      <p className="rating flex items-center gap-2">
                        <Rating
                          name="size-small"
                          value={product?.rating}
                          precision={0.5}
                          size="small"
                        />
                        <span className="rating-value">
                          {product?.rating}
                        </span>
                        <span className="rating-count">
                        <span className="pr-2">reviews</span>
                         ( {product?.reviews?.length}
                          {"+"})
                        </span>
                      </p>
                    </div>
                    <div className="price flex text-xl gap-2 px-2">
                      <div className="flex items-center gap-x-1">
                        <span
                          style={{
                            textDecoration: `${
                              product.corporateDiscount > 0
                                ? "line-through"
                                : ""
                            }`,
                            color: `${
                              product.corporateDiscount > 0
                                ? "#ff5050"
                                : "#0a2440"
                            }`,
                            fontSize: `${
                              product.corporateDiscount > 0 ? "15px" : "20px"
                            }`,
                          }}
                          className="font-bold"
                        >
                          &#8377;{(+product.price).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
                        </span>
                        {product.corporateDiscount > 0 && (
                          <span className="text-[20px] font-bold text-[#0a2440]">
                            &#8377;
                            {(product.price -
                              product.price * (product.corporateDiscount / 100)).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,')}
                          </span>
                        )}
                      </div>
                    </div>
                    <div
                      className="button w-full flex items-center justify-center p-2 text-white"
                      onClick={() => handleCart(product)}
                    >
                      <button className="bg-[#0A2440] p-2 w-full rounded-md">
                        Add To Cart
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <div className="pagination w-full flex items-center justify-center p-4 m-2">
        <Pagination
          count={Math.ceil(sortedProducts.length / productsPerPage)}
          page={currentPage}
          onChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Category;
