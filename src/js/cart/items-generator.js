myApp.fetchCartItems().subscribe(
    data => {
        if ('productsInCart' in data){
            const cartItemsData = data.productsInCart;
            const cartItemsTemplate = cartItemsData.map(item => {
                function getColors(colors) {
                    return colors.length ? colors.map( color => `<span>${color.name}</span>`) : 'standard color'
                }
                function getSizes(sizes) {
                    return sizes.length ? sizes.map( size => `<span>${size.code}</span>`).join(' ').toUpperCase() : 'standard size'
                }
                return `<div class="row cart-item-row">
                        <div class="col-md-6">
                            <img src="../images/T${item.p_id}.jpg" class="cart-thumb" />
                            <div class="cart-item-detail">
                                <h3>${item.p_name}</h3>
                                <label>Style #: ${item.p_style}</label>
                                <label>Colour: ${getColors(item.p_available_options.colors)}</label>
                            </div>
                            <div class="cart-actions">
                                <a href="javascript:void(0)" class="jsEdit">Edit</a>
                                <a href="javascript:void(0)">X Remove</a>
                                <a href="javascript:void(0)">Save for Later</a>
                            </div>
                        </div>
                        <div class="col-md-2 text-center">${getSizes(item.p_available_options.sizes)}</div>
                        <div class="col-md-2 text-center">
                            <input type="text" name="txtQty${item.p_quantity}" id="txtQty${item.p_quantity}" value="${item.p_quantity}" class="form-control qty-input" />
                        </div>
                        <div class="col-md-2 text-right price-text"><sup>$</sup>${item.p_price}</div>
                    </div>
                    `;
            });

            document.getElementById('cartItemContainer').innerHTML = cartItemsTemplate;
        }
        console.info('Subscribe Next finish');
        myApp.bindModalHandler();
    },
    err => {
        console.error('Subscribe Error', err);
    },
    () => {
        console.info('Subscribe complete');
    }
);