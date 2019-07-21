const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

let app = new Vue ({
    el: '#app',
    data: {
        catalogUrl: '/catalogData.json',
        imgCatalog: 'https://placehold.it/200x150',
        products: [],
        filtered: [],
        userSearch: '',
        cartShown: false
    },
    components: {cart, products, filter_el, error},
    methods: {
        getJson(url){
            return fetch(url)
                .then(result => result.json())
                .catch(error => {
                    this.$refs.error.setError(error)
                    console.log(error)
                })
        },
        postJson (url, data) {
            return fetch(url, {
                method: 'POST',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify (data)
            })
                .then(result => result.json())
                .catch(error => {
                    this.$refs.error.setError(error)
                    console.log(error)
                })
        },
        putJson (url, data) {
            return fetch(url, {
                method: 'PUT',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify (data)
            })
                .then(result => result.json())
                .catch(error => {
                    this.$refs.error.setError(error)
                    console.log(error)
                })
        },
        deleteJson (url, data) {
            return fetch(url, {
                method: 'DELETE',
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify (data)
            })
                .then(result => result.json())
                .catch(error => {
                    this.$refs.error.setError(error)
                    console.log(error)
                })
        },
        addProduct(product){
            console.log(product.id_product);
        },
    },
    mounted(){
        console.log (this)
    }
})

