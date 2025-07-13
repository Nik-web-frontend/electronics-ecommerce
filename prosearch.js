
const getval = localStorage.getItem('val')?.trim().toLowerCase(); 
let search_contt = document.querySelector('.search-contt');
if(getval){
    const keyword = getval.split(' ');
    const high = products.filter(p=>{
        let nm = p.name.toLowerCase();
        return keyword.every(kw=>nm.includes(kw));
    });
    
    const low = products.filter(p=>{
        let nm = p.name.toLowerCase();
        return keyword.some(kw=>nm.includes(kw)) &&
                !keyword.every(kw=>nm.includes(kw))
    });
    

    const match_product = [...high,...low];
    if(match_product.length === 0)
        search_contt.textContent='Product not found';
    else{
        match_product.forEach(p=>{

            let div = document.createElement('div');
            
            div.className='access';
            div.innerHTML = `
                 <img src="${p.img}" alt="${p.name}" 
                style="">
                <div class="detls" style="display: flex;flex-direction: column;gap: 1rem;flex:1">
                    <p class="prt-nm" style="font-weight: 800;">${p.name}</p>
                    <p style="font-size: 1.1rem;">Brand:  <span>${p.brand}</span></p>
                </div>
            `;
            search_contt.appendChild(div);
            div.addEventListener('click', ()=>{
                window.location.href=`propage.html?id=${p.id}`;
            })
        });
    }
}
else{
    search_contt.textContent='Value not found in data';
}



