let stor = parseInt(localStorage.getItem('proid'),10);
let productt = products.find(p=>p.id === stor);
console.log(productt.id);
console.log(productt.name, productt.price);
    
let qntyy = localStorage.getItem('qnty');
    
    // let getcart = JSON.parse(localStorage.getItem('cartt')) || [];
    let checkoutContainer = document.querySelector('.checkout-container');
    let totall = document.querySelector('.grndtotal');
    let grndtotal = 0;
    // console.log('cart items: ',getcart);
    if(productt)
    {
        let div = document.createElement('div');
        let pric = productt.price * qntyy;
        let gst = parseFloat((pric * 0.18).toFixed(2));
        let summation = (pric + gst).toFixed(2);
            grndtotal += parseFloat(summation); 
              if (!product) {
            console.warn(`Product not found for: ${productt.name}`);
          }
            div.innerHTML=`
                <img src="${productt.img}" alt=""/>
            
                <div class="pro-det">
                    <p class='pro-name'>${productt.name}</p>
                    <div class="product-option">
                        <p class='qty'>${qntyy}Pcs</p>
                        
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
            console.log(summation);
    }
    
     if(totall){
    
        totall.textContent = `Total is : ${(grndtotal).toFixed(2)}`;
        console.log('grnd: ',grndtotal);
        console.log('total', totall);
    }
    else{
        console.log('total does not exist!!!');
        
    }



    
    





