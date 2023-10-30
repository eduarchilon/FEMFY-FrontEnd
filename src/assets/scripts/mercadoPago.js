function createPayment(){

const mp = new MercadoPago('TEST-c46d58ee-e473-471d-885a-249dbcaf067b');
const bricksBuilder = mp.bricks();


mp.bricks().create("wallet", "wallet_container", {
    initialization: {
        preferenceId: "<PREFERENCE_ID>",
    },
 });

}