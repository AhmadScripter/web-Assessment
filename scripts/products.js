const productList = document.getElementById("product-list");
const searchInput = document.getElementById("search");
const sortSelect = document.getElementById("sortBy");

// function to fetch and display tech products
async function fetchProducts() {
    productList.innerHTML = "<p>Loading products...</p>";

    try {
        const cachedProducts = localStorage.getItem("electronics");

        if (cachedProducts) {
            let products = JSON.parse(cachedProducts);
            displayProducts(products);
        } else {
            const res = await fetch("https://dummyjson.com/products/category/laptops");
            if (!res.ok) throw new Error("Failed to fetch products");
            const data = await res.json();

            localStorage.setItem("electronics", JSON.stringify(data));

            displayProducts(data);
        }
    } catch (error) {
        productList.innerHTML = `<p>Error loading products. Please try again.</p>`;
        console.error("Error fetching products:", error);
    }
}

// function to display products
function displayProducts(products) {
    let filteredProducts = [...products];

    // filter products based on search
    searchInput.addEventListener("input", () => {
        const query = searchInput.value.toLowerCase();
        filteredProducts = products.filter(product =>
            product.title.toLowerCase().includes(query) || product.description.toLowerCase().includes(query)
        );
        renderProducts(filteredProducts);
    });

    // sort products based on selected sorting criteria
    sortSelect.addEventListener("change", () => {
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
    });

    renderProducts(filteredProducts);
}

// function to render products to the page
function renderProducts(products) {
    productList.innerHTML = products
        .map(
            (product) => `
            <div class="product-card">
                <img src="${product.thumbnail}" alt="${product.title}">
                <h3>${product.title}</h3>
                <p class="price">$${product.price}</p>
                <button onclick="addToCart(${product.id})">Add to Cart</button>
            </div>
        `
        )
        .join("");
}

// function to handle Add to Cart
function addToCart(productId) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    if (!cart.includes(productId)) {
        cart.push(productId);
        localStorage.setItem("cart", JSON.stringify(cart));
        alert(`Product ${productId} added to cart!`);
    } else {
        alert("Product is already in the cart!");
    }
}

fetchProducts();