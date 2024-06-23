export const getSalePrices = (product) => {
  const variants = product.variants;
  let minPrice = parseInt(variants[0].salePrice);
  let maxPrice = parseInt(variants[0].salePrice);

  for (let i = 0; i < variants.length; i++) {
    if (parseInt(variants[i].salePrice) > parseInt(maxPrice)) {
      maxPrice = parseInt(variants[i].salePrice);
    }

    if (parseInt(variants[i].salePrice) < parseInt(minPrice)) {
      minPrice = parseInt(variants[i].salePrice);
    }
  }

  if (minPrice == maxPrice) {
    return [minPrice];
  }

  return [minPrice, maxPrice];
};

export const getPrices = (product) => {
  const variants = product.variants;
  let minPrice = parseInt(variants[0].price);
  let maxPrice = parseInt(variants[0].price);

  for (let i = 0; i < variants.length; i++) {
    if (parseInt(variants[i].price) > parseInt(maxPrice)) {
      maxPrice = parseInt(variants[i].price);
    }

    if (parseInt(variants[i].price) < parseInt(minPrice)) {
      minPrice = parseInt(variants[i].price);
    }
  }

  if (minPrice == maxPrice) {
    return [minPrice];
  }

  return [minPrice, maxPrice];
};
