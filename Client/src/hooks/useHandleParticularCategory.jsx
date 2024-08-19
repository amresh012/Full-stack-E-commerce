import { useQuery } from "@tanstack/react-query";
import { getFilterProduct } from "../utils/Apis";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const useHandleParticularCategory = (title, types) => {
    const type = types;
    const value = title;
    return useQuery({
        queryKey: ["category", [type, value]],
        queryFn: () => getFilterProduct({ type, value }),
        enabled: title ? true : false,
    });
};

export default useHandleParticularCategory;

export const useHandleParticularCategoryHook = () => {
    const [category, setCategory] = useState("");

    const [type, setType] = useState("");
    const [navigated, setNavigated] = useState(false);
    const navigate = useNavigate();
    const handleClick = (title, type) => {
        setCategory(title);
        setType(type);
    };
    const { isSuccess: poke, isFetching } = useHandleParticularCategory(
        category,
        type
    );

    useEffect(() => {
        if (category && type) {
            navigate(`/product?type=${type}&value=${category}`);
            setNavigated(true);
            setCategory(null);
            setType(null);
        }
    }, [poke, navigated, navigate, category, type]);

    return { handleClick, isFetching };
};
