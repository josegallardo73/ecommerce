const products = JSON.parse(localStorage.getItem('products'));
let cart = JSON.parse(localStorage.getItem('cart'));

const updateLocalStorage = () => localStorage.setItem('cart', JSON.stringify(cart));


const addItemToCart = (productId) => {
   
    let product = products.find(function(product) {
        return product.id === productId;
    })

    if(cart.length === 0) {
        cart.push(product);
    } else {
        let result = cart.find(product => product.id === productId);
        if(result === undefined) {
            cart.push(product);
        }
    }
    updateLocalStorage();
}

const removeItemFromCart = (productId) => {
    cart = cart.filter(product => product.id != productId);
    updateLocalStorage();
}

const addQuantity = (productId) => {
    for(let product of cart) {
        if(product.id == productId) {
            product.quantity ++;
        }
    }
    updateLocalStorage();
}

const subQuantity = (productId) => {
    for(let product of cart) {
        if(product.id == productId) {
            product.quantity --;
        }
    }
    updateLocalStorage();
}

const getTotal = () => {
    const total = cart.reduce(function(acum, product){
        return acum + (product.quantity * product.price);
    }, 0)
    return total;
}

export { products, cart, updateLocalStorage, addItemToCart, removeItemFromCart, addQuantity, subQuantity, getTotal }