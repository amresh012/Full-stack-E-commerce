import React, { useEffect, useState } from "react";
import { gym_equipment } from "../../constant"; // Removed unnecessary import
import { base_url } from "../../Utils/baseUrl";
import Loader from "../../components/reusablesUI/Loader";
import { Carousel } from "react-responsive-carousel";
import { Chip, Pagination, Rating } from "@mui/material";
import { useDispatch } from "react-redux";
import { addcarts } from "../../features/cartSlice";
import { GrPowerReset } from "react-icons/gr";
import { FaSearch } from "react-icons/fa";
import toast from "react-hot-toast";
import Category from "../Home/Category";
import { Link } from "react-router-dom";

const Product = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortedProducts, setSortedProducts] = useState([]);
  const [selectedOption, setSelectedOption] = useState("Low to High");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState([]);

  // number of products per page
  const productsPerPage = 9;
  const dispatch = useDispatch();

  // Fetch products and filter based on categories
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true); // Set loading while fetching
      let url = `${base_url}product`;

      let response = await fetch(url);
      let data = await response.json();

      // Filter products by categories
      const filteredData = selectedCategories.length > 0
        ? data.filter(product => selectedCategories.includes(product.category))
        : data;

      setProducts(filteredData);
      setSortedProducts(filteredData);
      setIsLoading(false);
    };

    fetchProducts();
  }, [selectedCategories]); // Dependency on selectedCategories

  // Debounce function to limit API calls
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

  // Handle search
  const handleSearch = debounce((searchKey) => {
    setSearch(searchKey);

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
      setSortedProducts(filteredProducts);
      setCurrentPage(1);
    }
  }, 500);

  // Handle sorting
  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
    sortProducts(e.target.value);
  };

  // Sort products by selected option
  const sortProducts = (option) => {
    let sorted = [...sortedProducts];

    switch (option) {
      case "Low to High":
        sorted.sort((a, b) => a.price - b.price);
        break;
      case "High to Low":
        sorted.sort((a, b) => b.price - a.price);
        break;
      case "Alphabetical A-Z":
        sorted.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case "Alphabetical Z-A":
        sorted.sort((b, a) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }

    setSortedProducts(sorted);
    setCurrentPage(1); // Reset to first page when sorting changes
  };

  // Handle category filter change
  const handleCategoryChange = (category) => {
    setSelectedCategories((prevCategories) =>
      prevCategories.includes(category)? prevCategories.filter((c) => c !== category): [...prevCategories, category]
    );
  };

  // Handle page change
  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  // Handle Add to Cart
  const handleAdd = (product) => {
    dispatch(addcarts(product));
    toast.success("Product added to cart successfully.");
  };

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  return (
    <>
      <div className="main-wrapper flex items-start justify-start">
        <div className="h-24"></div>
        <div className="fillter_wrapper shadow m-2 hidden p-2 min-w-[18rem] space-y-6 lg:flex justify-around flex-col relative">
          <div className="h-12 w-full flex items-center justify-center text-3xl">
            <h1 className="w-full uppercase p-2">Filter</h1>
            <Chip
              label="Reset"
              sx={{ bgcolor: "#0A2440", color: "#fff" }}
              icon={<GrPowerReset size={18} />}
              onClick={() => setSelectedCategories([])}
            />
          </div>
          <div className="p-2 space-y-2">
            <h1 className="font-bold">Category</h1>
            <div className="flex flex-col gap-2 no-scrollbar cursor-pointer">
              {gym_equipment.map((item, index) => (
                <div
                  className="flex gap-2 p-2 hover:bg-[#0A2440] hover:text-white rounded-md"
                  key={index}
                >
                  <input
                    type="checkbox"
                    className="cursor-pointer"
                    onChange={() => handleCategoryChange(item)}
                    checked={selectedCategories.includes(item)}
                  />
                  <p className="lowercase">{item}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="product_list_all flex w-full flex-col justify-between">
          <div className="mt-4 flex lg:flex-row flex-col justify-between items-center p-4">
            <p className="lg:text-2xl text-4xl p-2 text-center">
              Products ({sortedProducts.length})
            </p>
            {/* Search Bar */}
            <div className="searchbar lg:w-2/6 w-full h-full rounded-md flex items-center border ">
              <input
                type="search"
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
                className="search h-8 outline-none rounded-l-md w-full px-4"
                placeholder="search for product..."
              />
              <button className="uppercase bg-[#0A2440] rounded-r-md text-white p-2">
                <FaSearch />
              </button>
            </div>
          </div>

          <div className="flex w-full flex-col-reverse lg:flex-row items-center justify-end pr-4 gap-3">
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

          {/* Product List */}
          <div className="product-list_container p-2 flex flex-wrap gap-2 w-full items-center justify-center lg:justify-start">
            {isLoading ? (
              <Loader />
            ) : (
              currentProducts.map((product) => (
                <div
                  className="card group w-[30%] border-2 p-4 rounded-md"
                  key={product._id}
                >
                  <Link to={`/product/${product._id}`}>
                  <div className="imagecontainer relative overflow-clip">
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
                    </Carousel>
                  </div>
                  </Link>
                  <div className="product-detail">
                    <div className="stack-2 p-2 group">
                      <h1 className="text-xl font-bold group-hover:underline h-[3.5rem] overflow-clip">
                        {product.name}
                      </h1>
                      <div className="flex items-center gap-2 text-sm">
                        <Rating
                          name="size-small"
                          value={product.rating}
                          readOnly
                          precision={0.5}
                          size="small"
                        />
                        <span>({product.numReviews} Reviews)</span>
                      </div>
                    </div>
                    <h1 className="text-lg font-bold p-2">
                      ₹ {product.price}{" "}
                      <span className="text-sm font-normal text-gray-500 line-through">
                        ₹ {product.mrp}
                      </span>
                    </h1>
                  </div>
                  <div className="button-group space-y-2 mt-2">
                    <button
                      className="bg-[#0A2440] text-white w-full py-1 px-2 rounded-md"
                      onClick={() => handleAdd(product)}
                    >
                      Add to Cart
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
          {/* Pagination */}
          <div className="p-2 flex justify-center">
            <Pagination
              count={Math.ceil(sortedProducts.length / productsPerPage)}
              page={currentPage}
              onChange={handlePageChange}
              color="primary"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Product;
