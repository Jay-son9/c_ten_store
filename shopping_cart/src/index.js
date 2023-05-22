let shop = document.getElementById('shop');

let shopItemsData = [{
    id: "jkhkjjk",
    name: "Engine Dress",
    price: 150,
    desc: "Lorem ipsum, dolor sit amet consectetur adipisicing.",
    img: "img/valvecv.png"

}, {
    id: "jgdggdfgf",
    name: "Emblem",
    price: 50,
    desc: "Lorem ipsum, dolor sit amet consectetur adipisicing.",
    img: "img/bowtie.png"
}, {
    id: "ththtrh",
    name: "Dash",
    price: 450,
    desc: "Lorem ipsum, dolor sit amet consectetur adipisicing.",
    img: "img/dash.jpg"
}, {
    id: "jththtth",
    name: "Seats",
    price: 1150,
    desc: "Lorem ipsum, dolor sit amet consectetur adipisicing.",
    img: "img/seats.jpg",
}, {
    id: "jjkfdjk",
    name: "Brake Booster",
    price: 135,
    desc: "Lorem ipsum, dolor sit amet consectetur adipisicing.",
    img: "img/booster.png",
}, {
    id: "lomjh",
    name: "Transmission",
    price: 2100,
    desc: "Lorem ipsum, dolor sit amet consectetur adipisicing.",
    img: "img/tranny.png",
}, {
    id: "jreedx",
    name: "Holley",
    price: 500,
    desc: "Lorem ipsum, dolor sit amet consectetur adipisicing.",
    img: "img/holley.png",
}, {
    id: "nxgsfgss",
    name: "Grill Assembly",
    price: 200,
    desc: "Lorem ipsum, dolor sit amet consectetur adipisicing.",
    img: "img/grillassembly.png",
}
];

let basket = JSON.parse(localStorage.getItem("data")) || [];

let generateShop = () => {
    return (shop.innerHTML = shopItemsData
        .map((x) => {
            let { id, name, price, desc, img } = x;
            let search = basket.find((x) => x.id === id) || [];
            return `
        <div id=product-id-${id} class="item">
        <img width="200" src=${img} alt="">
        <div class="details">
            <h3>${name}</h3>
            <p>${desc}</p>
            <div  class="price-quantity">
                <h2>$ ${price}</h2>
                <div class="buttons">
                    <i onclick="decrement(${id})" class="bi bi-dash-lg"></i>
                    <div id=${id} class="quantity">
                    ${search === undefined ? 0 : search.item}
                    </div>
                    <i onclick="increment(${id})" class="bi bi-plus-lg"></i>
                </div>
            </div>
        </div>
    </div>   
        `;
        }).join(""));
};

generateShop();


let increment = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id)

    if (search === undefined) {
        basket.push({
            id: selectedItem.id,
            item: 1,
        });
    } else {
        search.item += 1;
    }
    localStorage.setItem("data", JSON.stringify(basket));

    /*    console.log(basket); */
    update(selectedItem.id);
};

let decrement = (id) => {
    let selectedItem = id;
    let search = basket.find((x) => x.id === selectedItem.id)
    if (search === undefined) return;
    else if (search.item === 0) return;

    else {
        search.item -= 1;
    }

    update(selectedItem.id);
    basket = basket.filter((x) => x.item !== 0);

    /*   console.log(basket); */


    localStorage.setItem("data", JSON.stringify(basket));
};

let update = (id) => {
    let search = basket.find((x) => x.id === id);
    /*   console.log(search.item); */
    document.getElementById(id).innerHTML = search.item;
    calculation()
};

let calculation = () => {
    let cartIcon = document.getElementById("cartamt");
    cartIcon.innerHTML = basket.map((x) => x.item).reduce((x, y) => x + y, 0);
};

calculation();