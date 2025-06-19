// Global variables
let currentSlide = 0;
let splashProgress = 0;
let matrixInterval;
let progressInterval;
let sliderInterval;

// Products data
const products = [
    {
        id: 1,
        name: "Elixir JORTS",
        price: 249.99,
        image1: "https://i.pinimg.com/736x/c3/f6/b5/c3f6b5d8212a6e00ba94a4175fdce7b0.jpg",
    },
    {
        id: 2,
        name: "Always Far Signature Hoodie",
        price: 300.00,
        image1: "https://i.pinimg.com/736x/92/06/56/920656e03f09691d871e149b5dad8f7f.jpg",
    },
    {
        id: 3,
        name: "NoneofUs Balaclava black and white",
        price: 159.99,
        image1: "https://i.pinimg.com/736x/01/7a/04/017a04120dc2b609f1d9f95973601f47.jpg",
    },
    {
        id: 4,
        name: "Custom Glasses Custom 1of1",
        price: 150.00,
        image1: "https://i.pinimg.com/736x/c8/c9/61/c8c961306bdef0a47526f12368f29df5.jpg",
    },
    

    {
    
        id: 5,
        name: "Wavy Hoodie",
        price: 249.99,
        image1: "https://i.pinimg.com/736x/9d/e5/15/9de5157380fe4cd56ad360bbac0b99e3.jpg",
    },

    {
    
        id: 6,
        name: "Only Fear God Jeans",
        price: 199.99,
        image1: "https://i.pinimg.com/736x/b9/6a/a9/b96aa9d29cc8dfeb4bae17ff74c7bca7.jpg",
    },


    



    ];

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initCustomCursor();
    initSplashScreen();
    initBannerSlider();
    initProducts();
    initScrollButton();
});

// Custom Cursor
function initCustomCursor() {
    const cursor = document.getElementById('cursor');
    
    document.addEventListener('mousemove', function(e) {
        cursor.style.left = e.clientX + 'px';
        cursor.style.top = e.clientY + 'px';
    });
    
    document.addEventListener('click', function() {
        cursor.classList.add('clicked');
        setTimeout(() => cursor.classList.remove('clicked'), 300);
    });
}

// Splash Screen
function initSplashScreen() {
    const characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$#@%";
    const loadingText = document.getElementById('loadingText');
    const progressBar = document.getElementById('progressBar');
    const progressPercentage = document.getElementById('progressPercentage');
    const splashScreen = document.getElementById('splashScreen');
    const mainContent = document.getElementById('mainContent');
    
    // Matrix text effect
    matrixInterval = setInterval(() => {
        const randomText = Array(8).fill(0)
            .map(() => characters.charAt(Math.floor(Math.random() * characters.length)))
            .join('');
        loadingText.textContent = `LOADING_SYSTEM: ${randomText}`;
    }, 50);
    
    // Progress animation
    progressInterval = setInterval(() => {
        splashProgress += 1;
        progressBar.style.width = splashProgress + '%';
        progressPercentage.textContent = splashProgress + '%';
        
        if (splashProgress >= 100) {
            clearInterval(progressInterval);
            clearInterval(matrixInterval);
            
            setTimeout(() => {
                splashScreen.classList.add('hidden');
                mainContent.classList.add('visible');
            }, 500);
        }
    }, 30);
}

// Banner Slider
function initBannerSlider() {
    const slides = document.querySelectorAll('.banner-slide');
    
    sliderInterval = setInterval(() => {
        slides[currentSlide].classList.remove('active');
        currentSlide = (currentSlide + 1) % slides.length;
        slides[currentSlide].classList.add('active');
    }, 5000);
}

// Products
function initProducts() {
    const productsGrid = document.getElementById('productsGrid');
    
    products.forEach(product => {
        const productCard = createProductCard(product);
        productsGrid.appendChild(productCard);
    });
}

function createProductCard(product) {
    const card = document.createElement('div');
    card.className = 'product-card';
    
    card.innerHTML = `
        <div class="product-image-container">
            <img src="${product.image1}" alt="${product.name}" class="product-image main-image">
            <img src="${product.image2}" alt="${product.name}" class="product-image hover-image hover">
        </div>
        <div class="product-info">
            <h3 class="product-name">${product.name}</h3>
            <p class="product-price">$${product.price.toFixed(2)}</p>
            <button class="buy-button">Buy Now</button>
        </div>
    `;
    
    // Add hover effect
    const imageContainer = card.querySelector('.product-image-container');
    const hoverImage = card.querySelector('.hover-image');
    
    imageContainer.addEventListener('mouseenter', () => {
        hoverImage.classList.add('show');
    });
    
    imageContainer.addEventListener('mouseleave', () => {
        hoverImage.classList.remove('show');
    });
    
    // Add buy button click effect
    const buyButton = card.querySelector('.buy-button');
    buyButton.addEventListener('click', () => {
        alert(`Added ${product.name} to cart!`);
    });
    
    return card;
}

// Scroll to products
function initScrollButton() {
    const shopButton = document.getElementById('shopButton');
    const productSection = document.getElementById('productSection');
    
    shopButton.addEventListener('click', () => {
        productSection.scrollIntoView({ behavior: 'smooth' });
    });
}

// Cleanup intervals when page unloads
window.addEventListener('beforeunload', () => {
    clearInterval(matrixInterval);
    clearInterval(progressInterval);
    clearInterval(sliderInterval);
});