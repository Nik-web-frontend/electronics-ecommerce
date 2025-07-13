
// Navigation functionality
// const navLinks = document.querySelectorAll('.nav-link');
// const pages = document.querySelectorAll('.page');

// navLinks.forEach(link => {
//     link.addEventListener('click', (e) => {
//         e.preventDefault();

//         // Remove active class from all links and pages
//         navLinks.forEach(l => l.classList.remove('active'));
//         pages.forEach(p => p.classList.remove('active'));

//         // Add active class to clicked link
//         link.classList.add('active');

//         // Show corresponding page
//         const targetPage = link.getAttribute('data-page');
//         document.getElementById(targetPage).classList.add('active');
//     });
// });



// Form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Thank you for your message! We\'ll get back to you soon.');
        contactForm.reset();
    });
}

// Product buttons
const buyButtons = document.querySelectorAll('.buy-button');
buyButtons.forEach(button => {
    button.addEventListener('click', () => {
        button.textContent = 'Added!';
        button.style.background = 'linear-gradient(45deg, #10b981, #059669)';
        setTimeout(() => {
            button.textContent = 'Add to Cart';
            button.style.background = 'linear-gradient(45deg, #8b5cf6, #06b6d4)';

        }, 2000);
    });
});

// Smooth scrolling for navigation
document.addEventListener('DOMContentLoaded', () => {
    // Add smooth transition effects
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 800);
});


side = document.querySelector('.sidebar');
mobile = document.querySelector('.mobile-menu-btn');

mobile.addEventListener('click', () => {

    side.classList.toggle('show');

});

window.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-container')) {
        side.classList.remove('show');
    }
})

// cart sidebar
cartSide = document.querySelector('.cart-sidebar');
cart = document.querySelector('.cart');

cart.addEventListener('click', () => {
  const isOpen = cartSide.classList.toggle('showCart');

  // Reload ONLY when cart just got closed
  if (!isOpen && window.location.pathname.includes('checkout.html')) {
    
    location.reload();
  }
  
});

document.addEventListener('click', (e) => {
    if (!e.target.closest('.cart-sidebar') && !e.target.closest('.cart')) {
        let open = cartSide.classList.contains('showCart');
        cartSide.classList.remove('showCart');
        
        
    }
});







// cart details 
function add(button, event) {
    event.stopPropagation();
    //for diffrent product access via parent element
    let qut = button.parentNode.querySelector('.qty-val');
    qut.textContent = Number(qut.textContent) + 1;
    let par = qut.closest('.product-cont');
    let h4 = par.querySelector('h4');

    cartt.forEach((item) => {
        if (item.name === h4.textContent) {
            item.quantity += 1;

        }
    })

    localStorage.setItem('cartt', JSON.stringify(cartt));
    cartDetails();
   
}
function sub(button, event) {
    event.stopPropagation();
    // add quantity to show on display
    let qut = button.parentNode.querySelector('.qty-val');
    let stor = Number(qut.textContent);
    if (stor > 1)
        qut.textContent = stor - 1;
    // add quantity in cartt array
    let par = qut.closest('.product-cont');
    let h4 = par.querySelector('h4');
    cartt.forEach((item) => {
        if (item.name === h4.textContent) {
            if (item.quantity > 1) {
                item.quantity -= 1;
            }
        }
    })

    localStorage.setItem('cartt', JSON.stringify(cartt));
    cartDetails();
    
}

function del(button, event) {
    event.stopPropagation();

    let stor = button.closest('.product-cont');
    let h4 = stor.querySelector('h4').textContent.trim();

    // Remove from cart array
    cartt = cartt.filter(item => item.name !== h4);

    // Update localStorage
    localStorage.setItem('cartt', JSON.stringify(cartt));

    // Refresh cart UI
    cartDetails();
}   


let cartt = JSON.parse(localStorage.getItem('cartt')) || [];

// Optional cleanup if your localStorage may have invalid entries
cartt = cartt.filter(item => item.name && !isNaN(item.price));

function cartDetails(nm, price, qty = 1) {
    const det = document.querySelector('.detail');
    let countt = document.querySelector('.cart-count');

    // ✅ If product is being added
    if (nm && price != null && qty != null) {
        let exst = cartt.find(item => item.name === nm);
        if (exst) {
            exst.quantity += 1;
        } else {
            cartt.push({ name: nm, price: price, quantity: qty });
        }
        localStorage.setItem('cartt', JSON.stringify(cartt));
    }

    // ✅ Update cart count
    countt.textContent = cartt.length;

    // ✅ Rebuild the cart UI
    let cartHtM = '';
    if (cartt.length === 0) {
        cartHtM = '<p style="font-weight:bold; padding:1rem;">Your cart is Empty!</p>';
    } else {
        cartt.forEach(item => {
            console.log('Product Name: ',item.name );
            cartHtM += `
            <div class='product-cont'>
                <div style="display:flex;justify-content:space-between;align-items:center;width:15rem;margin-top:1.5rem;margin-bottom:0.3rem">
                    <h4 style="color:navy">${item.name}</h4>
                    <p class='quty' style="display:flex;align-items:center;font-weight:600">
                        <button style="background:transparent;border:none;font-size:0.7rem;margin-right:1rem;margin-left:0.5rem" onclick="add(this, event)">
                            <i class="fa-solid fa-plus"></i>
                        </button>
                        <span class='qty-val'>${item.quantity}</span>
                        <button style="background:transparent;border:none;font-size:0.7rem;margin-left:1rem;" onclick="sub(this, event)">
                            <i class="fa-solid fa-minus"></i>
                        </button>

                        <button class='del' onclick="del(this, event)" style="margin-left:2rem; background:transparent;border:none; outline:none">
                            <i class="fa-solid fa-trash" style="color:rgb(255, 0, 0);"></i>
                        </button>
                    </p>
                </div>
                <div class='price' style="font-weight:500">
                    $${item.price}
                </div>
            </div>
        `;
        });
    }
    

    // ✅ Calculate total
    let sum = 0;
    cartt.forEach(item => {
        if (!isNaN(item.price)) {
            sum += item.price * item.quantity;
        }
    });

    console.log('Total: $', sum);
    console.log(cartt);
    let total = document.querySelector('.total-price');   
    det.innerHTML = cartHtM;
    total.textContent = `$${sum}`;
} 


function clr() {
    cartt = [];

    localStorage.setItem('cartt', JSON.stringify(cartt));
    cartDetails(); // this will auto update cart UI
    

}


// Search Suggestions
let search = document.querySelector('.search');
let sugg = document.querySelector('.suggestion');

search.addEventListener('input', () => {
    let val = search.value.toLowerCase();
    sugg.innerHTML = '';

    if (val.trim() === '')
        return;
    let matched = products.filter(p => p.name.toLowerCase().includes(val));
    matched.forEach(p => {
        let div = document.createElement('div');
        div.className = 'sugg-div';
        div.style.cssText = `
            padding:1rem;
        `;
        div.textContent = p.name;
        sugg.appendChild(div); 
        
    })

})

document.addEventListener('click', (e)=>{
    if(!e.target.closest('.suggestion'))
    {
        sugg.innerHTML='';
    }
})
// AUTO SELECT SUGGETIONS

    let indx = -1;

    search.addEventListener('keydown', (e) => {
        let item = sugg.querySelectorAll('.sugg-div');
        if (e.key === 'ArrowDown') {
            indx = (indx + 1) % item.length;
            search.value = item[indx].textContent;
            // sugg.innerHTML='';
        }
        else if (e.key === 'ArrowUp') {
            indx = (indx - 1 + item.length) % item.length;
            search.value = item[indx].textContent;
            // sugg.innerHTML='';
        }
        else if (e.key === 'Enter') {
            search.value = item[indx].textContent;
            sugg.innerHTML = '';
        
        
        }
        item.forEach((el, i) => {
            el.classList.toggle('highlight', i === indx);
        })

    });

    sugg.addEventListener('click', (e) => {
    if (e.target.classList.contains('sugg-div')) {
        search.value = e.target.textContent;
        sugg.innerHTML = '';
        localStorage.setItem('val',search.value)
        window.location.href='prosearch.html';
    }
});


document.addEventListener('DOMContentLoaded', ()=>{
    search.addEventListener('keydown', (e)=>{
        if(e.key === 'Enter'){
            let val = search.value.toLowerCase();
           val.trim();
           localStorage.setItem('val',val)
           window.location.href='prosearch.html';
        }
    })
});

// For payment button in checkout.html
function pay(){
    clr()
    window.location.href='success.html';
}


cartDetails(); // with no params












