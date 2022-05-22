const citas =  [
    {  cita : 'La noche es más oscura justo antes del amanecer. Y te lo prometo, el amanecer está llegando.', autor : 'Harvey Dent, El Caballero de la Noche'} ,
    {  cita : 'Creo que lo que no te mata simplemente te convierte en un extraño.', autor : 'El Guasón, El Caballero de la Noche'} ,
    {  cita : 'Tu ira te da un gran poder. Pero si lo dejas, te destruirá... Como casi me hace a mí', autor : 'Henri Ducard, Batman Begins'} ,
    {  cita : 'O mueres como un héroe o vives lo suficiente para convertirte en el villano.', autor : 'Harvey Dent, El Caballero de la Noche'} ,
    {  cita : 'Si eres bueno en algo, nunca lo hagas gratis.',  autor : 'El Guasón, El Caballero de la Noche'} ,
    {  cita : 'Sí, padre. Me convertiré en un murciélago.', autor : 'Bruce Wayne/Batman, Batman: año uno'} ,
]

const app = Vue.createApp({
    data() {
        return{
            citas,
            nuevaCita: 'Hola mundo',
        }
    },
    methods: {
        addQuote(){
            this.citas.unshift({
                cita: this.nuevaCita
            })
        }
    }
});

app.mount('#myApp');