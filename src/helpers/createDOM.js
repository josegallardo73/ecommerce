import { products, cart, removeItemFromCart, subQuantity, addQuantity, addItemToCart, updateLocalStorage, getTotal} from "./localstorage.js";

export const cleanDOM = () =>  document.querySelector('.content').innerHTML = '';
export const removeHeader = () => document.querySelector('.header').style.display = 'none';
export const addHeader = () => document.querySelector('.header').style.display = 'block';
export const createDOMContent = (content) => document.querySelector('.content').append(content);
const modifyGridColumns = (cols) => document.querySelector('.content').style.gridTemplateColumns = `${cols}`;

export const loopData = (data, type) => {
    data.forEach(item => {
        if(type != 'cart') createCard(item);
        else createCart(item);
    });
}

const createElementDOM = (tag, content = '', className, src='', alt='') => {
    const element = document.createElement(tag);
    element.classList.add(className);
    if(content) element.innerHTML = content;
    if(src) {
        element.src = src;
        element.alt = alt;
    }
    return element;
}

const removeItemFromDOM = (id) => {
    document.querySelectorAll('.cart__content').forEach(item => {
        try{
            if(item.id == id) {
                item.style.display = 'none';
                document.querySelector('.total__cart_section_shippingValue').innerHTML = `${getTotal()}$`
            } 
        } catch(err) {
            throw new Error(`Se ha producido el siguiente error: ${err}`);
        }
        
    });
}

export const toggleSuperTitle = (hash) => {
    let superTitle = document.querySelector('.products__card_supertitle');
    if(hash == 'aboutus' || hash == 'thankyou') superTitle.style.display = 'none';
    else {
        superTitle.innerHTML = `INCREDIBLE ${hash.toUpperCase()}`;
        superTitle.style.display = 'block';
    }
}

export const createAboutUs = () => {
    const section = createElementDOM('section', '', 'products__aboutus_section');
    const subtitle = createElementDOM('h2', 'ABOUT US','products__aboutus_subtitle');
    const aboutUsContent = '<p>Es un hecho establecido hace demasiado tiempo que un lector se distraerá con el contenido del texto de un sitio mientras que mira su diseño. El punto de usar Lorem Ipsum es que tiene una distribución más o menos normal de las letras, al contrario de usar textos como por ejemplo "Contenido aquí, contenido aquí".</p> <p>Estos textos hacen parecerlo un español que se puede leer. Muchos paquetes de autoedición y editores de páginas web usan el Lorem Ipsum como su texto por defecto, y al hacer una búsqueda de "Lorem Ipsum" va a dar por resultado muchos sitios web que usan este texto si se encuentran en estado de desarrollo.</p><p>Muchas versiones han evolucionado a través de los años, algunas veces por accidente, otras veces a propósito (por ejemplo insertándole humor y cosas por el estilo).</p><p>Es un hecho establecido hace demasiado tiempo que un lector se distraerá con el contenido del texto de un sitio mientras que mira su diseño. El punto de usar Lorem Ipsum es que tiene una distribución más o menos normal de las letras, al contrario de usar textos como por ejemplo "Contenido aquí, contenido aquí".</p> <p>Estos textos hacen parecerlo un español que se puede leer. Muchos paquetes de autoedición y editores de páginas web usan el Lorem Ipsum como su texto por defecto, y al hacer una búsqueda de "Lorem Ipsum" va a dar por resultado muchos sitios web que usan este texto si se encuentran en estado de desarrollo.</p><p>Muchas versiones han evolucionado a través de los años, algunas veces por accidente, otras veces a propósito (por ejemplo insertándole humor y cosas por el estilo).</p>';

    const aboutUsParagraph = createElementDOM('p', aboutUsContent, 'products__aboutus_content');
    section.append(subtitle, aboutUsParagraph);
    modifyGridColumns('1fr');
    createDOMContent(section);
}

export const createThankYou = () => {
    const section = createElementDOM('section', '', 'thankyou__section');
    const subtitle = createElementDOM('h2', 'Thanks for your purchase', 'thankyou__section_subtitle');
    const thankYouContent = '<p>Es un hecho establecido hace demasiado tiempo que un lector se distraerá con el contenido del texto de un sitio mientras que mira su diseño. El punto de usar Lorem Ipsum es que tiene una distribución más o menos normal de las letras, al contrario de usar textos como por ejemplo.Es un hecho establecido hace demasiado tiempo que un lector se distraerá con el contenido del texto de un sitio mientras que mira su diseño. El punto de usar Lorem Ipsum es que tiene una distribución más o menos normal de las letras, al contrario de usar textos como por ejemplo</p><p>Es un hecho establecido hace demasiado tiempo que un lector se distraerá con el contenido del texto de un sitio mientras que mira su diseño. El punto de usar Lorem Ipsum es que tiene una distribución más o menos normal de las letras, al contrario de usar textos como por ejemplo</p><p>Es un hecho establecido hace demasiado tiempo que un lector se distraerá con el contenido del texto de un sitio mientras que mira su diseño. El punto de usar Lorem Ipsum es que tiene una distribución más o menos normal de las letras, al contrario de usar textos como por ejemplo</p>'; 
    const thankyouParagraph = createElementDOM('p', thankYouContent, 'thankyou__section_paragraph');
    section.append(subtitle, thankyouParagraph);
    modifyGridColumns('1fr');
    createDOMContent(section);
}

const purchaseMade = () => {
    const buyBtn = createElementDOM('button','BUY','total__cart_section_buyBtn');
    buyBtn.addEventListener('click', (e) => {
        localStorage.setItem('cart', JSON.stringify([]));
        location.hash = '#_thankyou';
    });
    return buyBtn;
}

export const createTotalCart = () => {
    const section = createElementDOM('section', '','total__cart_section');
    const totalShippingText = createElementDOM('span', 'TOTAL SHIPPING: ', 'total__cart_section_shippingText');
    const totalShippingValue = createElementDOM('span',`${getTotal()}$`, 'total__cart_section_shippingValue');
    const buyBtn = purchaseMade();

    section.append(totalShippingText, totalShippingValue, buyBtn);
    modifyGridColumns('1fr');
    return section;
}

const removeProductDOM = (productId) => {
    const removeCartProduct = createElementDOM('button', 'X', 'cart__content_removeBtn');
    removeCartProduct.addEventListener('click', () => {
        removeItemFromCart(productId);
        removeItemFromDOM(productId);
    });
    return removeCartProduct;
}

const addQuantityDOM = (quantity, item) => {
    const moreQuantity = createElementDOM('button', '+', 'cart__content_addBtn');
    moreQuantity.addEventListener('click', () => {
        quantity.textContent = `Quantity: ${++item.quantity}`;
        addQuantity();
        document.querySelector('.total__cart_section_shippingValue').textContent = `${getTotal()}$`
    });
    return moreQuantity;
}

const subQuantityDOM = (quantity, item) => {
    const lessQuantity = createElementDOM('button','-','cart__content_subBtn');
    lessQuantity.addEventListener('click', () => {
        quantity.textContent = `Quantity: ${item.quantity > 1 ? --item.quantity : item.quantity}`;
        subQuantity();
        document.querySelector('.total__cart_section_shippingValue').textContent = `${getTotal()}$`;
    });
    return lessQuantity;
}

const createCart = (item) => {
    const article = createElementDOM('article', '','cart__content');
    article.id = item.id;
    const subtitle = createElementDOM('h2', item.name, 'cart__content_subtitle');
    const img = createElementDOM('img', '', 'cart__content_img', `../../public/images/${item.image}`, item.name);
    const price = createElementDOM('span', `${item.price}$`, 'cart__content_price');
    const quantity = createElementDOM('span', `Quantity: ${item.quantity}`,'cart__content_quantity');

    const moreQuantity = addQuantityDOM(quantity, item);
    const lessQuantity = subQuantityDOM(quantity, item);
    const removeCartProduct = removeProductDOM(item.id);

    article.append(subtitle, img, price, quantity, moreQuantity, lessQuantity, removeCartProduct);
    modifyGridColumns('1fr');
    createDOMContent(article);
}

export const showPlayersFromCategory = (category) => {
    const categoryPlayers = products.filter(player => player.position.toLowerCase() == category);
    loopData(categoryPlayers, category);
}

const closeModal = (modalElement) => {
    const btnCloseModal = createElementDOM('button', 'X', 'products__modal_closeBtn');
    btnCloseModal.addEventListener('click', () => modalElement.style.display = 'none');
    return btnCloseModal;
}

const addProductModal = (productId) => {
    const btnBuyModal = createElementDOM('button','<i class="fa fa-cart-plus"></i> Add to Cart','products__modal_buyBtn');
    btnBuyModal.addEventListener('click', () => addItemToCart(productId));
    return btnBuyModal;
}

const viewCartModal = (modalElement) => {
    const btnCartModal = createElementDOM('button','<i class="fa-solid fa-bag-shopping"></i> View Cart','products__modal_cartBtn');
    btnCartModal.addEventListener('click', () => {
        window.location.hash = '#_cart';
        modalElement.style.display = 'none';
    })
    return btnCartModal;
}

const createModalScore = (score) => {
    const scoreModal = createElementDOM('span', score, 'products__modal_score');
    return scoreModal;
}

export const createModal = (player) => {
    const {id, name, description, image, score} = player;
    const modal = document.querySelector('.products__modal');
    const descriptionParagraph = createElementDOM('p', description, 'products__modal_description');
    const playerSubtitle = createElementDOM('h2', name, 'products__modal_subtitle');
    const playerImg = createElementDOM('img','','products__modal_image',`../../public/images/${image}`, name);

    const btnCloseModal = closeModal(modal);
    const btnBuyModal = addProductModal(id);
    const btnCartModal = viewCartModal(modal);
    const modalScore = createModalScore(score);
    const containerBtns = createElementDOM('div','','products__modal_container_btns');
    containerBtns.append(btnBuyModal, modalScore, btnCartModal);
    
    modal.innerHTML = "";
    modal.style.display = 'block';
    modal.append(playerSubtitle, playerImg, btnCloseModal, descriptionParagraph, containerBtns);
};

const openModal = (player) => {
    const productBtn = createElementDOM('button','<i class="fa fa-cart-plus"></i>','products__card_btn');
    productBtn.addEventListener('click', (e) => {
       createModal(player);
       window.scrollTo({top: 0, behavior: 'smooth'});
    });
    return productBtn;
}

export const createCard = (player) => {
    const {image, name, price, id} = player;
    const article = createElementDOM('article', '', 'products__card');
    const playerFigure = createElementDOM('figure', '', 'products__card_figure');
    const img = createElementDOM('img', '', 'products__card_img', `../../public/images/${image}`, name);
    playerFigure.append(img);
    const playerSubtitle = createElementDOM('h2', name, 'products__card_subtitle');
    const bottomCard = createElementDOM('div', '', 'products__cartd_bottomSection');
    let playerPrice = createElementDOM('p', price, 'products__card_price');

    const productBtn = openModal(player);
    productBtn.id = id;
    bottomCard.append(playerPrice, productBtn);
    article.append(playerFigure, playerSubtitle, bottomCard);
    modifyGridColumns('1fr 1fr 1fr');
    createDOMContent(article);
}