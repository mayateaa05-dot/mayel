// Daftar produk dengan gambar
const products = [
    {id: 1, name: 'MARIE SUSU', price: 2000, img: 'img/marie susu.jpg' },
    {id: 2, name: 'SOSIS', price: 1000, img: 'img/sosis.jpg' },
    {id: 3, name: 'GERY', price: 2000, img: 'img/gery.jpg' },
    {id: 4, name: 'SARI ROTI', price: 5000, img: 'img/sari roti.jpg' },
    {id: 5, name: 'CIMORY', price: 7000, img: 'img/c.jpg' },
];

//Keranjang Belanja
let cart = [];
  
 //Fungsi untuk menampilkan daftar produk 
function displayProducts() {
    const productsContainer = document.getElementById('products');
    products.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product');
        productDiv.innerHTML = `
            <img src="${product.img}" alt="${product.name}" >
            <h3>${product.name}</h3>
            <p>Rp ${product.price}</p>
            <button onclick="addToCart(${product.id})">Tambahkan ke keranjang</button>
        `;

        productsContainer.appendChild(productDiv);
    });
}

//fungsi untuk menambahkan produk ke keranjang belanja
function addToCart(productid) {
    const product = products.find(p => p.id === productid);
    const cartItem = cart.find(item => item.id === productid);
    
    if (cartItem) {
        cartItem.quantity += 1;
    } else {
        cart.push({ ...product, quantity: 1});
    }
    
    updateCart();
}

//fungsi untuk menampilkan isi keranjang belanja 
function updateCart() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';

    let totalPrice = 0;
    cart.forEach(item => {
        const listItem = document.createElement('li');
        listItem.textContent = `${item.name} x ${item.quantity} - Rp ${item.price * item.quantity}`;
        cartItemsContainer.appendChild(listItem);

        totalPrice += item.price * item.quantity;
    });

    document.getElementById('total-price').textContent = `Rp ${totalPrice}`;
}

// fungsi untuk melakukan checkout
function checkout() {
    if (cart.length === 0) {
        alert('keranjang anda kosong.');
        return;
    }
    
    const total = cart.reduce((sum,item) => sum + item.price * item.quantity, 0);
    const payment =prompt(`total belanja anda Rp ${total}. masukan jumlah pembayaran:`);
    
    if (payment >= total) {
        alert(`pembayaran berhasil! kembalian anda: Rp ${payment - total}`);
        cart = [];
        updateCart();
    } else {
        alert('uang anda tidak mencukupi.');
    }
}


// event listener untuk tombol checkout
document.getElementById('checkout-btn').addEventListener ('click', checkout);

//tampilkan product saat halaman dimuat
displayProducts();