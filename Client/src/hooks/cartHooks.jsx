import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { base_url } from "../Utils/baseUrl";
import { config } from "../Utils/axiosConfig";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCart, addcarts, removeItem, resetCart } from "../features/cartSlice";

// Fetch Cart Hook
export const useCartHooks = () => {
  const dispatch = useDispatch();
  return useQuery({
    queryKey: ["cart"],
    queryFn: async () => {
      const res = await axios.get(`${base_url}cart`, config);
      return res.data;
    },
    onSuccess: (data) => {
      dispatch(setCart(data)); // Sync cart data with Redux
    },
    onError: (error) => {
      console.error("Error fetching cart:", error);
    },
  });
};

// Add Cart Item Hook
export const useAddCartHook = () => {
  const client = useQueryClient();
  const dispatch = useDispatch();
  const mutation = useMutation({
    mutationKey: ["Addcart"],
    mutationFn: async (payload) => {
      console.log(payload)
      const res = await axios.post(`${base_url}cart`, payload, config);
      return res.data;
    },
    onSuccess: (data) => {
      client.invalidateQueries(["cart"]);
      dispatch(addcarts(data)); // Sync added item with Redux
    },
    onError: (error) => {
      console.error("Error adding cart item:", error);
    },
  });
  return { mutation };
};

// Delete Cart Item Hook
export const useDeleteCartHook = () => {
  const client = useQueryClient();
  const dispatch = useDispatch();

  const mutation = useMutation({
    mutationKey: ["carts"],
    mutationFn: async (id) => {
      const res = await axios.delete(`${base_url}cart/${id}`, config);
      return res.data;
    },
    onSuccess: (data) => {
      client.invalidateQueries(["cart"]);
      dispatch(removeItem({ _id: data._id })); // Sync removed item with Redux
    },
    onError: (error) => {
      console.error("Error deleting cart item:", error);
    },
  });

  return { mutation };
};

// Update Cart Item Hook
export const useUpdateCartHook = () => {
  const client = useQueryClient();
  const updateCart = useMutation({
    mutationKey: ["updatecart"],
    mutationFn: async (payload) => {
      console.log(payload)
      const res = await axios.put(`${base_url}cart`, payload, config);
      return res.data;
    },
    onSuccess: () => {
      client.invalidateQueries(["cart"]);
    },
    onError: (error) => {
      console.error("Error updating cart item:", error);
    },
  });

  return { updateCart };
};

// Reset Cart Hook
export const useResetCartHook = () => {
  const client = useQueryClient();
  const dispatch = useDispatch();

  const mutation = useMutation({
    mutationKey: ["resetCart"],
    mutationFn: async () => {
      const res = await axios.delete(`${base_url}cart/reset`, config);
      return res.data;
    },
    onSuccess: () => {
      client.invalidateQueries(["cart"]);
      dispatch(resetCart()); // Sync reset cart with Redux
    },
    onError: (error) => {
      console.error("Error resetting cart:", error);
    },
  });

  return { mutation };
};
