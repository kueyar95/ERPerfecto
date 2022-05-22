const app = Vue.createApp({
    data() {
        return{
            message: "I'm Thor",
            author: "José Cuellar"
        }
    },
    methods: {
        changeQuote(){
            console.log("hola mundo");
            this.message = "I'm Tony Stark"
        }
    }
});

app.mount('#myApp');