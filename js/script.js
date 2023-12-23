// initiating product data
let productData = [
  {
    id: -7,
    image:
      "https://www.startech.com.bd/image/cache/catalog/mobile/apple/iphone-15-pro/blue-titanium/iphone-15-pro-titanium-blue-01-500x500.webp",
    title: "iPhone 15 Pro 128GB Blue Titanium",
    price: 1450,
    stock: 10,
  },
  {
    id: -6,
    image:
      "https://www.startech.com.bd/image/cache/catalog/laptop/apple/macbook-pro-m3/macbook-pro-m3-space-gray-01-500x500.webp",
    title:
      "Apple MacBook Pro 14 inch M3 Chip Liquid Retina Display 8GB RAM 512GB SSD Space Gray",
    price: 2280,
    stock: 5,
  },
  {
    id: -5,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4_q9WleucSVOuU7Xby9lSiWZ4siBzhP5vJA&usqp=CAU",
    title: "Samsung Galaxy S23 Ultra Smartphone (12/512GB)",
    price: 2459,
    stock: 8,
  },
  {
    id: -4,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS8T_VRLvwy70hd7po0anRQsotNTb1rRUz7CQ&usqp=CAU",
    title: "Intel Core i9 14900K 14th Gen Raptor Lake Processor",
    price: 735,
    stock: 15,
  },
  {
    id: -3,
    image:
      "https://www.startech.com.bd/image/cache/catalog/monitor/lg-monitor/32ep950-b/lg-32ep950-b-32-inch-4K-monitor-01-500x500.jpg",
    title: "LG 32EP950-B 32 Inch UltraFine OLED Pro 4K Professional Monitor",
    price: 4450,
    stock: 4,
  },
  {
    id: -2,
    image:
      "https://www.startech.com.bd/image/cache/catalog/graphics-card/asus/tuf-gaming-geforce-rtx-4090-oc-edition-24gb/tuf-gaming-geforce-rtx-4090-oc-edition-24gb-01-500x500.webp",
    title:
      "ASUS TUF Gaming GeForce RTX 4090 OC Edition 24GB GDDR6X Graphics Card",
    price: 3050,
    stock: 6,
  },
  {
    id: -1,
    image:
      "https://www.startech.com.bd/image/cache/catalog/keyboard/redragon/k618-horus/k618-horus-01-500x500.jpg",
    title:
      "Redragon K618 HORUS Wireless RGB Ultra-Thin Mechanical Gaming Keyboard",
    price: 750,
    stock: 8,
  },
  {
    id: 0,
    image:
      "https://www.startech.com.bd/image/cache/catalog/laptop/acer/aspire-7-a715-42g-r2ne/aspire-7-a715-42g-r2ne-01-500x500.webp",
    title:
      'Acer Aspire 7 A715-42G-R2NE Ryzen 5 5500U GTX 1650 4GB Graphics 15.6" FHD Gaming Laptop',
    price: 810,
    stock: 13,
  },
];

const extraDataFromApi = async () => {
  let skip = productData.length-8
  let data = await fetch(`https://dummyjson.com/products?limit=8&skip=${skip}`);
  data = await data.json();
  data = await data.products;
  await data.forEach((item) => productData.push(item));
  products.innerHTML = "";
  productData.forEach((item) => {
    productCard(item);
  });
};

let cartItem = [];

const subTotal = () => {
  let total = 0;
  let existsCart = localStorage.getItem("cartItem");
  if (existsCart) {
    existsCart = JSON.parse(existsCart);
    existsCart &&
      existsCart.forEach((item) => {
        total += item.price * item.quantity;
      });
  }

  let totalElement = document.createElement("p");
  totalElement.classList.add("sub-total");
  totalElement.innerHTML = `Total Amount = ${total}$`;
  document.querySelector(".cart-products").appendChild(totalElement);
};

const reloadCart = () => {
  let existsCart = localStorage.getItem("cartItem");
  if (existsCart) {
    existsCart = JSON.parse(existsCart);
    cartItem = existsCart;
    existsCart &&
      existsCart.forEach((item) => {
        cartShow(item);
      });
  }
  if (cartItem.length === 0) {
    let cartProduct = document.createElement("div");
    cartProduct.innerHTML = `
    <p class="no-item">No item in cart</p>
    `;
    carts?.appendChild(cartProduct);
  }
  subTotal();
};
document.addEventListener("DOMContentLoaded", reloadCart);

// finding dom
let products = document.querySelector(".prod-list");
let carts = document.querySelector(".cart-products");
let cartsec = document.querySelector(".carts");
let alertbox = document.querySelector(".alert");
let cartToggle = document.querySelector(".cartToggle");
let cross = document.querySelector(".cross");

cartToggle?.addEventListener("click", () => {
  cartsec.classList.remove("cartslide");
});

cross?.addEventListener("click", () => {
  cartsec.classList.add("cartslide");
});

const alertShow = (message, classname) => {
  alertbox.style.display = "flex";
  alertbox?.classList.add(classname);
  alertbox.innerHTML = `
        <h4>${message}</h4>
    `;
  setTimeout(() => {
    alertbox?.classList.remove(classname);
    alertbox.style.display = "none";
  }, 1000);
};

const handleRemove = (id) => {
  carts.innerHTML = "";
  cartItem = cartItem.filter((item) => {
    return item.id !== id;
  });
  localStorage.setItem("cartItem", JSON.stringify(cartItem));
  cartItem = JSON.parse(localStorage.getItem("cartItem"));
  cartItem.forEach((item) => {
    cartShow(item);
  });
  alertShow("Item removed from cart", "removecart");
  if (cartItem.length === 0) {
    let cartProduct = document.createElement("div");
    cartProduct.innerHTML = `
    <p class="no-item">No item in cart</p>
    `;
    carts?.appendChild(cartProduct);
  }
  subTotal();
};

const handleIncrement = (id) => {
  cartItem.forEach((item) => {
    if (item.id === id && item.quantity < item.stock) item.quantity += 1;
  });
  localStorage.setItem("cartItem", JSON.stringify(cartItem));
  carts.innerHTML = "";
  cartItem.forEach((item) => {
    cartShow(item);
  });

  subTotal();
};

const handleDecrement = (id) => {
  cartItem.forEach((item) => {
    if (item.id === id && item.quantity > 1) item.quantity -= 1;
  });
  localStorage.setItem("cartItem", JSON.stringify(cartItem));
  carts.innerHTML = "";
  cartItem.forEach((item) => {
    cartShow(item);
  });

  subTotal();
};

const cartShow = (item) => {
  let cartProduct = document.createElement("div");
  cartProduct.className = "cart-product";
  cartProduct.innerHTML = `
        <div class="product-image">
            <img src="${item.image?item.image: item.images[0]}" alt="img">
        </div>
        <div class="product-description">
            <h2>${item.title.slice(0, 25)}...</h2>
            <h3>Price: ${item.price}$</h3>
            <div class="cartAction">
                <div class="cartAction">
                    <button class="changeButton" onclick="handleDecrement(${
                      item.id
                    })">-</button>
                    <p class="quantity">${item.quantity}</p>
                    <button class="changeButton" onclick="handleIncrement(${
                      item.id
                    })">+</button>
                </div>
                <button onclick="handleRemove(${
                  item.id
                })" class= "remove">Remove</button>
            </div>
        </div>
      `;
  carts?.appendChild(cartProduct);
};

const handleAddCart = (id) => {
  let exists = false;
  cartItem &&
    cartItem.forEach((citem) => {
      if (citem.id === id) exists = true;
    });

  if (!exists) {
    productData.forEach((item) => {
      if (item.id === id) {
        item.quantity = 1;
        cartItem.push(item);
      }
    });
    alertShow("Item added to cart", "success");
  } else {
    alertShow("Already in cart", "warn");
  }

  carts.innerHTML = "";
  localStorage.setItem("cartItem", JSON.stringify(cartItem));
  cartItem = JSON.parse(localStorage.getItem("cartItem"));
  cartItem.forEach((item) => {
    cartShow(item);
  });

  subTotal();
};

const productCard = (item) => {
  let product = document.createElement("div");
  product.className = "product-card";
  product.innerHTML = `
        <div class="product-image">
            <img src="${item.image?item.image: item.images[0]}" alt="img">
        </div>
        <div class="product-description">
            <h2>${item.title.slice(0, 25)}...</h2>
            <h3>Price: ${item.price}$</h3>
            <h4>${item.stock} item left.</h4>
            <button onclick="handleAddCart(${item.id})">Add to cart</button>
        </div>
    `;
  products?.appendChild(product);
};

productData.forEach((item) => {
  productCard(item);
});
