let request = {
    token: 'eyJhbGciOiJIUzUxMiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJqNENWdUR6R0RpQTJzeHUwWVlPWW5kaUU0WGtvbnNGYiIsImlhdCI6MTU2NTA0MjE1NDg5N30.7fhKSn_S18AMA8T12Ne1iK_O0yRZvvMd17J7unGGnuwN2MjjxZB306VSDqk3pQ1I-wj3iutJLhVyR3kHWkhxFw',
    endpoint: '/orders/1838023508012',
}
const instance = axios.create({
    baseURL: 'https://eshop-deve.herokuapp.com/api/v2',
    method: 'GET',
    headers: { 
        'content-type': 'application/json',
        'Authorization': `Bearer ${request.token}`
    },
});


const app = new Vue({
    el: '#app',
    data(){
        return {
            order: {
                number: null,
                items: [],
            },
            newProduct: {
                sku: null,
                name: null,
                quantity: null,
                price: null,
            },
            errors: {
                sku: false,
                name: false,
                quantity: false,
                price: false,
            },
        }
    },
    beforeCreate(){
        instance.get(request.endpoint)
        .then(response => {
            this.order = response.data.order
        })
    },
    methods: {
        addProduct(){
            if(this.validation()){
                this.order.items.push(this.newProduct)
                this.newProduct = {
                    sku: null,
                    name: null,
                    quantity: null,
                    price: null,
                }
            }
        },
        showPayAlert(){
            Swal.fire({
                icon: 'success',
                title: 'Pago realizado correctamente',
            })
        },
        validation(){
            this.errors = {
                sku: false,
                name: false,
                quantity: false,
                price: false,
            }
            let is_valid = true
            for (const [key, value] of Object.entries(this.newProduct)) {
                if(value == null || value == ''){
                    this.errors[key] = true
                    is_valid = false
                }
            }
            return is_valid
        }
    }
})