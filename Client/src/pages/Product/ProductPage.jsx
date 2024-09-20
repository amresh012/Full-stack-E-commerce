import React, { useEffect, useState } from "react";
import { gym_equipment } from "../../constant";
import { base_url } from "../../Utils/baseUrl";
import Loader from "../../components/reusablesUI/Loader";
import { Carousel } from "react-responsive-carousel";
import { Chip, Pagination, Rating } from "@mui/material";
import { GrPowerReset } from "react-icons/gr";
import { FaSearch } from "react-icons/fa";
import toast from "react-hot-toast";
import { useAddCartHook } from "../../hooks/cartHooks";
import { Link } from "react-router-dom";

const Product = ({ buttonProp, filtervisible, onClickhandler }) => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortedProducts, setSortedProducts] = useState([]);
  const [selectedOption, setSelectedOption] = useState("Low to High");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [visible, setVisible] = useState(filtervisible);

  const productsPerPage = 9;
  const { mutation } = useAddCartHook(); // React Query hook for adding items to cart

  // Fetch products and filter based on categories
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      let url = `${base_url}product`;

      let response = await fetch(url);
      let data = await response.json();

      const filteredData = selectedCategories.length > 0
        ? data.filter(product => selectedCategories.includes(product.subcategory.toLowerCase()))
        : data;

      setProducts(filteredData);
      setSortedProducts(filteredData);
      setCurrentPage(1);
      setIsLoading(false);
    };

    fetchProducts();
  }, [selectedCategories]);

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

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
    sortProducts(e.target.value);
  };

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
    setCurrentPage(1);
  };

  const LowerCaseCategory = gym_equipment.map((item) => item.toLowerCase());

  const handleCategoryChange = (category) => {
    setSelectedCategories((prevCategories) =>
      prevCategories.includes(category.toLowerCase())
        ? prevCategories.filter((c) => c !== category)
        : [...prevCategories, category]
    );
  };

  const handlePageChange = (event, value) => {
    setCurrentPage(value);
  };

  const handleCart = (product) => {
    const { _id } = product;
    mutation.mutate({ id: _id, qty: 1 });
    toast.success("Product Added Successfully")
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = sortedProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  return (
    <>
      <div className={"main-wrapper flex items-start justify-start"}>
        <div className="h-24"></div>
        {visible && (
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
            <div className="p-2 space-y-2 bg-gray-100 rounded-md">
              <h1 className="font-bold uppercase text-xl">Category</h1>
              <div className="flex flex-col gap-2 no-scrollbar cursor-pointer">
                {LowerCaseCategory.map((item, index) => (
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
                    <p className="uppercase">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <div className="product_list_all flex w-full flex-col justify-between">
          <div className="mt-4 flex lg:flex-row flex-col justify-between items-center p-4">
            {visible && (
              <p className="lg:text-2xl text-4xl p-2 text-center">
                Products ({sortedProducts.length})
              </p>
            )}
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
            <div className="flex items-center rounded-md w-fit border">
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

          <div className="product-list_container grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {isLoading ? (
              <Loader />
            ) : (
              currentProducts.map((product) => (
                <div
                  className="card group border-2 p-2 rounded-md"
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
                            className="h-[35vh] w-auto object-cover bottom group-hover:scale-95 duration-300"
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
                          value={product.rating || 3.5}
                          readOnly
                          precision={0.5}
                          size="small"
                        />
                        <span>({product.numReviews} Reviews)</span>
                      </div>
                    </div>
                    <h1 className="flex items-center gap-2">
                      <span className="text-red-500 text-sm line-through">
                        {product?.corporateDiscount &&
                          product?.corporateDiscount !== 0 &&
                          product?.corporateDiscount > 0 && <span>₹</span>}
                        {product?.corporateDiscount &&
                          product?.corporateDiscount !== 0 &&
                          product?.corporateDiscount > 0 &&
                          (
                            product.price -
                            product.price * (product.corporateDiscount / 100)
                          ).toFixed(2)}
                      </span>
                      <span className="text-lg font-bold p-2">
                        ₹ {product.price}{" "}
                      </span>
                    </h1>
                  </div>
                  <div className="button-group space-y-2 mt-2">
                    <button
                      className="bg-[#0A2440] text-white w-full py-1 px-2 rounded-md"
                      onClick={() =>
                        !onClickhandler
                          ? handleCart(product)
                          : onClickhandler(product._id)
                      }
                    >
                      {buttonProp || "Add to Cart"}
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
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
