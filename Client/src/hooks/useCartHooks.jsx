import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios";
import { base_url } from "../utils/baseUrl";
import { config } from "../utils/axiosConfig";
import { useNavigate } from "react-router-dom";

const useCartHooks = () => {
    return useQuery({
        queryKey: ['cart'],
        queryFn: async () => {
            const res = await axios.get(`${base_url}cart`, config);
            return res.data;
        }
    })
}

export default useCartHooks

export const useDeleteCartHook = () => {
    const client = useQueryClient();
    const mutation = useMutation({
        mutationKey: ['carts'],
        mutationFn: async (id) => {
            const res = await axios.delete(`${base_url}cart/${id}`, config);
            return res.data;
        },
        onSuccess: () => {
            client.invalidateQueries(['cart'])
        }
    })
    return { mutation }
}


export const useAddCartHook = () => {
    const navigate = useNavigate();
    const client = useQueryClient();
    const mutation = useMutation({

        mutationKey: ['Addcart'],
        mutationFn: async (payload) => {
            const res = await axios.post(`${base_url}cart`, payload, config);
            return res.data;
        },
        onSuccess: () => {
            navigate('/checkout')
            client.invalidateQueries(['cart'])

        }

    })
    return { mutation }
}

export const useUpdateCartHook = () => {
    const navigate = useNavigate();
    const client = useQueryClient();
    const updateCart = useMutation({

        mutationKey: ['updaetcart'],
        mutationFn: async (payload) => {
            console.log(payload);
            const res = await axios.put(`${base_url}cart`, payload, config);
            return res.data;
        },
        onSuccess: () => {
            navigate('/checkout')
            client.invalidateQueries(['cart'])

        }

    })
    return { updateCart }
}