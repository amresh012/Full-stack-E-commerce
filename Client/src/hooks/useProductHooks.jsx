import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../utils/Apis";

const useProductHooks = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
};

export default useProductHooks;
