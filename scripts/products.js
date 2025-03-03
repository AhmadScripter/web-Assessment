const productList = document.getElementById("product-list");
const searchInput = document.getElementById("search");
const sortSelect = document.getElementById("sortBy");

let products = [];

// fetch products and display
async function fetchProducts() {
    productList.innerHTML = "<p>Loading products...</p>";

    try {
        const cachedProducts = localStorage.getItem("electronics");

        if (cachedProducts) {
            products = JSON.parse(cachedProducts);
        } else {
            const res = await fetch("https://dummyjson.com/products/category/laptops");
            if (!res.ok) throw new Error("Failed to fetch products");
            const data = await res.json();

            products = data.products; // extract the actual product array
            localStorage.setItem("electronics", JSON.stringify(products));
        }

        renderProducts(products);
    } catch (error) {
        productList.innerHTML = `<p>Error loading products. Please try again.</p>`;
        console.error("Error fetching products:", error);
    }
}

// function to filter and sort products
function filterAndSortProducts() {
    let filteredProducts = [...products];

    // Filter products based on search query
    const query = searchInput.value.toLowerCase();
    if (query) {
        filteredProducts = filteredProducts.filter(product =>
            product.title.toLowerCase().includes(query) || product.description.toLowerCase().includes(query)
        );
    }

    // sort products based on selected option
    const selectedSort = sortSelect.value;
    if (selectedSort === "price-asc") {
        filteredProducts.sort((a, b) => a.price - b.price);
    } else if (selectedSort === "price-desc") {
        filteredProducts.sort((a, b) => b.price - a.price);
    } else if (selectedSort === "name-asc") {
        filteredProducts.sort((a, b) => a.title.localeCompare(b.title));
    } else if (selectedSort === "name-desc") {
        filteredProducts.sort((a, b) => b.title.localeCompare(a.title));
    }

    renderProducts(filteredProducts);
}

// function to render products
function renderProducts(productsToRender) {
    productList.innerHTML = productsToRender.length
        ? productsToRender
              .map(
                  (product) => `
                  <div class="product-card">
                      <img src="${product.thumbnail}" alt="${product.title}">
                      <h3>${product.title}</h3>
                      <p class="price">$${product.price}</p>
                      <button onclick="addToCart(${product.id}, '${product.title}', ${product.price})">Add to Cart</button>
                  </div>
              `
              )
              .join("")
        : "<p>No products found.</p>";
}

// function to handle Add to Cart
function addToCart(productId, title, price) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];

    if (!cart.some(item => item.id === productId)) {
        cart.push({ id: productId, title, price, quantity: 1 });
        localStorage.setItem("cart", JSON.stringify(cart));
        alert(`"${title}" added to cart!`);
    } else {
        alert("Product is already in the cart!");
    }
}

searchInput.addEventListener("input", filterAndSortProducts);
sortSelect.addEventListener("change", filterAndSortProducts);

fetchProducts();