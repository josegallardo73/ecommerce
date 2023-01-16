export const fetchBD = async () => {
    try {
        const players = await fetch('../data/players.json');
        const dataJson = await players.json();
        
        if (!localStorage.getItem('products')) localStorage.setItem('products', JSON.stringify(dataJson));
        if (!localStorage.getItem('cart')) localStorage.setItem('cart', "[]");
    }catch(err) {
        throw new Error(`Se ha producido el siguiente error: ${err}`);
    }
}