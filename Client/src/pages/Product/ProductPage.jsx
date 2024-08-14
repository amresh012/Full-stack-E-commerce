import React, { useEffect, useState } from 'react'
import {gym_equipment} from "../../constant"
import { base_url } from '../../Utils/baseUrl'
import Loader from "../../components/reusablesUI/Loader"
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import { Rating } from '@mui/material';
import Badge from "../../components/Badge"
import {useDispatch} from "react-redux"
import {addcarts} from "../../features/cartSlice"




const Product = () => {
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [sortedProducts, setSortedProducts] = useState([]);
  const [selectedOption, setSelectedOption] = useState('Low to High');
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchProducts = async () => {
      let response = await fetch(`${base_url}product`);
      let data = await response.json();
      setProducts(data);
      setSortedProducts(data);
      setIsLoading(false);
    };
    fetchProducts();
  }, []);

  const handleSelectChange = (e) => {
    setSelectedOption(e.target.value);
    sortProducts(e.target.value);
  };

  const sortProducts = (option) => {
    let sortedProducts = [...products];

    switch (option) {
      case 'Low to High':
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case 'High to Low':
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case 'Alphabetical A-Z':
        sortedProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'Alphabetical Z-A':
        sortedProducts.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        break;
    }

    setSortedProducts(sortedProducts);
  };

  const filteredCategory = gym_equipment.filter((item) =>
    item.toLowerCase().includes(search?.toLowerCase())
  );

  // add to cart 
  const handleAdd = (product) => {
    dispatch(addcarts(product));
    console.log("product")
  };


  return (
   <>
    <div className="main-wrapper p-4 h-auto flex items-start justify-start  ">
      <div className="h-12"></div>
      {/* filter */}
     <div className="fillter_wrapper w-[50vw] space-y-6 flex justify-around  flex-col    relative  ">
      <div className="h-2"></div>
       <div className="h-12   w-full  flex items-center justify-center text-3xl ">
        <h1 className='bg-slate-950 w-full  text-white uppercase p-2'>Filter</h1>
      </div>
      <div className="p-2 space-y-2 border-b-2 h-screen">
      <h1 className='font-bold'>Category</h1>
      <div className=" flex flex-col gap-2  ">
       <input type="search" 
       value={search}
       onChange={(e)=>setSearch(e.target.value)}
        className='border-b-2 outline-none h-8 border-black' placeholder="search categories" />
      </div>
      <div className="no-scrollbar ">
       {
        filteredCategory.map((item , index)=>(
          <div className="flex gap-2 p-2 hover:bg-blue-300 " key={index}>
            <input type="checkbox"  />
            <p>{item}</p>
          </div>
        ))
       }
      </div>
      </div>
     </div>
     {/* filter end */}

     {/* product list all */}
     <div className="product_list_all flex flex-col justify-between">
      {/* product header */}
      <div className="h-24 w-full flex  items-center justify-between px-10">
        <p className='text-2xl'>Products {"("}{products.length}{")"}</p>
        <div className="flex items-center gap-2">
          <span className=''>Sort by:</span>
          <select
           value={selectedOption}
           onChange={handleSelectChange} 
          className='outline-none p-2 rounded-md border-2 text-black'>
            <option value="Low to High">Low to High</option>
            <option value="High to Low">High to Low</option>
            <option value="Alphabetical A-Z">Alphabetical A-Z</option>
            <option value="Alphabetical Z-A">Alphabetical Z-A</option>
          </select>
        </div>
      </div>
      {/* product list */}
      <div className="product-list_container flex flex-wrap gap-12 w-full  items-start justify-start pl-12">
        {
          isLoading ? 
          <Loader/>
          :
          sortedProducts.map((item)=>(
            <div className="product-card border-2 h-auto w-[20rem] relative">
              <div className="badge absolute">
                  <Badge discount={item.corporateDiscount}/>
                </div>
              <div className="image-container h-56 bg-gray-200 ">
              <Carousel>
                {
                  item.images.map((image)=>(
                    <img src={image} alt="product image" className="w-full h-full object-cover"/>
                  ))
                }
             </Carousel>
              </div>
              <div className="product-detail space-y-2 p-4 bg-black/80 text-white">
                <p className=" font-bold text-xl break-words hover:underline">{item.name}</p>
               <div className="rating flex items-center gap-2">
               <Rating name="size-small" value={item.Rating} defaultValue={4.5} precision={0.5} />
               <span>4.5</span>
               </div>
                <div className="prices flex gap-4 ">
                  <p className={item.corporateDiscount ? "line-through text-red-500":"font-bold"}>Rs{" "}{item.price}</p>
                   <p className="discount-price">
                    {/* calculate discount price from price and discount percentage  */}
                      {item.corporateDiscount && `Rs${(item.price * (1 - item.corporateDiscount/100)).toFixed(2)}`}
                   </p>
                </div>
                <div className="button flex  flex-col gap-2">
                  <button className="addtocart p-2 border-2" onClick={()=>handleAdd(item)}>Add To Cart</button>
                  <button className="addtocart p-2 bg-black/50">Buy It Now</button>
                </div>
              </div>
            </div>
          ))
        }
      </div>
     </div>
    </div>
    
   </>
  )
}

export default Product


