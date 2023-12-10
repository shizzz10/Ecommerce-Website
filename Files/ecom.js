const iconCartEl = document.querySelector('.cartsvg');
const bodyEl = document.querySelector('body');
const productListEl = document.querySelector('.Products')
const cartItemsEl = document.querySelector('.productList')
const subTotalEl = document.querySelector('.cartItemAndTotal')
const cartCountEl = document.querySelector('#cartCount')

    function renderProducts(){
    products.forEach((product) => {
        productListEl.innerHTML += `
        <div class="item1"><img src="${product.imgSrc}"  alt="" class="pImg"> <p class="pppera">Zara</p> <h4 class="productName">${product.name}</h4> <h5>$${product.price}<button class="pButton" onclick="addtoCart(${product.id})"> <h5>Add to Cart</h5></button> </h5></div>
        `
    });
    }renderProducts()


            // Crating array 
    let cart = [];

    // onclick method, used in button
    function addtoCart(id){
        // check if product alredy exist, if it then do ..function  
        if(cart.some((item) => item.id === id)){
            changeNumberofUnits ('plus', id )
            
        }

        else{
            // then find in products file and store that product in a variable and push it in cart using spread operator
            let item = products.find((product)=> product.id === id );
            cart.push({
                ...item,
                numberOfUnits : 1,
            });
            updateCart()
        }
    }

    function updateCart(){
        renderCartItems();
        renderSubtotal();
    }

    // Calculating subTotal

    function renderSubtotal(){
        let totalPrice = 0;
        let totalProduct = 0;

        cart.forEach((item)=>{
            totalPrice += item.price * item.numberOfUnits ;
            totalProduct += item.numberOfUnits ;
        });
        subTotalEl.innerHTML = `SubTotal (${totalProduct} Items) &   $${totalPrice.toFixed(2)}`;
        cartCountEl.innerHTML = totalProduct ;
    }

                    //   RENDERING CART ITEMS 
    function renderCartItems(){
        cartItemsEl.innerHTML = '';
        cart.forEach((product)=>{
            cartItemsEl.innerHTML += `
            <div class="CTitem">
                    <div class="CTimage" onclick="removeItemFromCart(${product.id})"> 
                        <img src="${product.imgSrc}" alt="CartTabimage" >
                    </div>
                    <div class="CartTabName">${product.name}</div>
                    <div class="CTtotalPrice">$${product.price}</div>
                    
                    <div class="CTquantity">
                        <span class="minus" onclick="changeNumberofUnits('minus',${product.id})"><</span>
                        <span>${product.numberOfUnits}</span>
                        <span class="pluse" onclick="changeNumberofUnits('plus',${product.id})">></span>
                    </div>
                </div>
            `
        });
    }

                  //  remove Item From Cart using filter() method
            function removeItemFromCart(id){
                cart = cart.filter((item)=> item.id !== id );
                updateCart();
            }

             //  Creating function for changing number of units using map method
    function changeNumberofUnits(action, id){
    cart = cart.map((item)=> {
    let numberOfUnits = item.numberOfUnits;
    
    if(item.id === id ){
        if(action === 'minus' && numberOfUnits > 1 ){
            numberOfUnits -- ;
        }
        else if (action === 'plus' && numberOfUnits < item.instock){
            numberOfUnits ++ ;
        }
    }
    return({
        ...item,
        numberOfUnits,
    })
    });
    updateCart();
    }

    iconCartEl.addEventListener('click', function(){
    bodyEl.classList.toggle('showCart')
    })
    //    onclick function
    function closeCart(){
    bodyEl.classList.remove('showCart')
    }


