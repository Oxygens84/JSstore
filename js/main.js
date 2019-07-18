const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

let app = new Vue ({
    el: '#app',
    data: {
        catalogUrl: '/catalogData.json',
        products: [],
        filtered: [],
        userSearch: '',
        imgCatalog: 'https://placehold.it/200x150',
        cartShown: false
    },
    components: {cart, products, filter},
    methods: {
        getJson(url){
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    console.log(error)
                })
        }
    },
    mounted(){
        console.log (this)
    }
})

