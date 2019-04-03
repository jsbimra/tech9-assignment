// Add your scripts here
// const { range } = rxjs;
// const { map, filter } = rxjs.operators;
const Observable = rxjs.Observable;

const myApp = {
    cartItems: [],
    init() {
        // myApp.fetchCartItems().then(data => {
        //     if('productsInCart' in data)
        //         this.cartItems.push(...data.productsInCart);
        //         console.log(this.cartItems);
        // });
        // let cartItems = [];

        // const cartItemsObservable = myApp.fetchCartItems().subscribe(
        //     data => {
        //         if ('productsInCart' in data)
        //             this.cartItems.push(...data.productsInCart);
        //             console.log(this.cartItems);
        //     },
        //     err => {
        //         console.log('Subscribe Error', err);
        //     },
        //     () => {
        //         console.log('Subscribe complete');
        //     },
        // )

        // console.log(this.cartItems);
    }
};

myApp.editItem = () => {
    console.log('edit fired!');
    const overlayEle = document.querySelector('.jsModalOverlay');
    const customModal = document.querySelector('.jsCustomModal');

    overlayEle.style.display = 'block';
    customModal.style.display = 'block';
}


myApp.closeModal = () => {
    console.log('close fired!');
    const overlayEle = document.querySelector('.jsModalOverlay');
    const customModal = document.querySelector('.jsCustomModal');

    overlayEle.style.display = 'none';
    customModal.style.display = 'none';
}

myApp.fetchCartItems = () => {
    const url = "../data/cart.json?x=" + new Date().getTime();

    // $.ajax({url, 
    //     success: function(xhr) {
    //         console.log(xhr.responseText);
    //     },
    //     error: function(xhr, err) {
    //         console.log(xhr.responseText);
    //     }
    // });

    // const newPromise = new Promise( (resolve, reject) => {
    //     fetch(url)
    //         .then((resp) => resp.json())
    //         // .then((resp) => resp.text())
    //         .then(data => {
    //             // console.log( JSON.parse(data) )
    //             console.log(data);
    //             resolve(data);
    //         })
    //         .catch(err => reject( Error('Error fetching data from api!') ) );
    // } ) 

    // return newPromise;
    //pass data to template file 

    //With observable pattern rxjs

    return new Observable(observer => {
        fetch(url)
            .then((resp) => resp.json())
            // .then((resp) => resp.text())
            .then(data => {
                // console.log( JSON.parse(data) )
                console.log(data);
                observer.next(data);
            })
            .catch(err => observer.error(Error('Error fetching data from api!')));
    });
}

myApp.bindModalHandler = () => {
    const editLink = document.querySelectorAll('.jsEdit');
    console.log(editLink);
    editLink.forEach((ele) => ele.addEventListener('click', myApp.editItem));
        
    const closeModalLink = document.querySelector('.jsModalClose');
    closeModalLink !== null ? closeModalLink.addEventListener('click', myApp.closeModal) : null;
}

myApp.init();

// const editLink = document.querySelectorAll('.jsEdit');
// editLink.forEach((ele) => ele.addEventListener('click', myApp.editItem));
// const closeModalLink = document.querySelector('.jsModalClose');
// closeModalLink !== null ? closeModalLink.addEventListener('click', myApp.closeModal) : null;