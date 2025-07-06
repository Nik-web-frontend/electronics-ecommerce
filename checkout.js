




    let getcart = JSON.parse(localStorage.getItem('cartt')) || [];
    let checkoutContainer = document.querySelector('.checkout-container');
    let totall = document.querySelector('.grndtotal');
    let grndtotal = 0;
    console.log('cart items: ',getcart);
    getcart.forEach(item=>{
        let div = document.createElement('div');
        let product = products.find(p=>p.name.toLowerCase() === item.name.toLowerCase());
        let pric = item.price * item.quantity;
        let gst = parseFloat((pric * 0.18).toFixed(2));
        let summation = (pric + gst).toFixed(2);
        grndtotal += parseFloat(summation); 
          if (!product) {
        console.warn(`Product not found for: ${item.name}`);
      }
        div.innerHTML=`
            <img src="${product.img}" alt=""/>
        
            <div class="pro-det">
                <p class='pro-name'>${item.name}</p>
                <div class="product-option">
                    <p class='qty'>${item.quantity}Pcs</p>
                    
                </div>
            </div>
            <div class="priceTax">
                    <pre>  ${pric}</pre>
                    <pre>+ ${gst} (GST)</pre>
            </div>
            <p>${summation}</p>
        
        `;
        div.className='checkout-details';
        checkoutContainer.appendChild(div);
        
    })
    
    if(totall){
    
        totall.textContent = `Total is : ${(grndtotal).toFixed(2)}`;
        console.log('grnd: ',grndtotal);
        console.log('total', totall);
    }
    else{
        console.log('total does not exist!!!');
    }




