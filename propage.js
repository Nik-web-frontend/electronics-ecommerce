const params = new URLSearchParams(window.location.search);
const id = Number(params.get('id'));
if (id) {
    console.log('----ID FOund', id);
}
else {
    console.log('----ID NOT FOund');
}
let buyNow = document.querySelector('#buyNow');
let product = products.find(p => p.id === id);
let proid = product.id;
if (proid) {
    console.log('Proid Found', proid);
}
else {
    console.log('proid not found');
}
localStorage.setItem('proid', proid);
if (product) {
    console.log(product);
    document.querySelector('img').src = product.img;
    document.querySelector('.name').textContent = product.name;
    document.querySelector('.pro-det').textContent = product.description;
    document.querySelector('.pricee').textContent = '$' + product.price;
}
else {
    document.querySelector('.main').innerHTML = '<h1>Product not found!</h1>';
}

let atc = document.querySelector('.atc');
let cartMsg = document.querySelector('.cart-msg');

atc.addEventListener('click', () => {
    if (product) {
        cartDetails(product.name, product.price);
        cartMsg.style.display='flex';
        setTimeout(()=>{
        cartMsg.style.display='none';
        },2000);

    }
})



let qnty = document.querySelector('.qnty-number');
buyNow.addEventListener('click', () => {
           window.location.href = "buy.html";
           localStorage.setItem('qnty', qnty.textContent);
       })
console.log('Quantity Text Content: ', qnty.textContent);
let addqty = document.querySelector('.addqty');
let subqty = document.querySelector('.subqty');
if (qnty) {
    addqty.addEventListener('click', () => {
        qnty.textContent = Number(qnty.textContent) + 1;
        console.log('quantity added');
        buyNow.addEventListener('click', () => {
            window.location.href = "buy.html";
            localStorage.setItem('qnty', qnty.textContent);
        })

    });

    subqty.addEventListener('click', () => {

        if (qnty.textContent >= 2) {
            qnty.textContent = Number(qnty.textContent) - 1;
            console.log('quantity deleted');
             buyNow.addEventListener('click', () => {
                localStorage.setItem('qnty', qnty.textContent);
                window.location.href = "buy.html";
        })}
    })
}


