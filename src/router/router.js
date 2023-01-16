import { products, cart } from '../helpers/localstorage.js';
import { loopData, createDOMContent, createAboutUs, createThankYou, createTotalCart, showPlayersFromCategory, cleanDOM, removeHeader, addHeader, toggleSuperTitle } from '../helpers/createDOM.js';

export const router = (route => {
    const [, param] = route.split('_');
    switch(param) {
        case 'home':
            addHeader();
            cleanDOM();
            toggleSuperTitle('players');
            if(!products) location.reload(); 
            loopData(products,'products');
            break;
        case 'midfields':
            addHeader();
            cleanDOM();
            toggleSuperTitle('midfields')
            showPlayersFromCategory('midfield');
            break;
        case 'forwards':
            addHeader();
            cleanDOM();
            toggleSuperTitle('forwards');
            showPlayersFromCategory('forward');
            break;
        case 'defenses':
            addHeader();
            cleanDOM();
            toggleSuperTitle('defenses');
            showPlayersFromCategory('defense');
            break;
        case 'goalkeepers':
            addHeader();
            cleanDOM();
            toggleSuperTitle('goalkeepers');
            showPlayersFromCategory('goalkeeper');
            break;
        case 'aboutus':
            addHeader();
            cleanDOM();
            toggleSuperTitle('aboutus');
            createAboutUs();
            break;
        case 'cart':
            removeHeader();
            cleanDOM();
            loopData(cart, 'cart');
            createDOMContent(createTotalCart());
            break;
        case 'thankyou':
            addHeader();
            cleanDOM();
            toggleSuperTitle('thankyou');
            createThankYou();
            break;
        default:
            location.hash = '#_home';
            break;
    }
});