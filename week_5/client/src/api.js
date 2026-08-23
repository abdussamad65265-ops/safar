const BASE_URL = "[localhost](http://localhost:5000/api/products)";

export const fetchProducts = async (category = "", search = "") => {
  let url = BASE_URL;
  const params = new URLSearchParams();

  if (category) params.append("category", category);
  if (search) params.append("search", search);

  if ([...params].length) {
    url += `?${params.toString()}`;
  }

  const res = await fetch(url);
  return res.json();
};

export const fetchProductById = async (id) => {
  const res = await fetch(`${BASE_URL}/${id}`);
  return res.json();
};
