
export const useSortProductsByPrice = (products, order) => {

    const sortedProducts = [...products];
    sortedProducts.sort((a, b) => {
        const priceA = parseFloat(a.price);
        const priceB = parseFloat(b.price);
        if (order === "lowToHigh") {
            return priceA - priceB;
        } else if (order === "highToLow") {
            return priceB - priceA;
        }
        return 0;
    });
    return sortedProducts;

};