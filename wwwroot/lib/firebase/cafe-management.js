document.addEventListener("DOMContentLoaded", function() {
    
    const customers = document.getElementById('customers');
    const payment = document.getElementById('payment');
    const spotify = document.getElementById('spotify');
    const product = document.getElementById('product');


    customers.addEventListener('click', () => {
        // Do something here when the card is clicked
        console.log('Card1 clicked!');
        Swal.fire({
            icon: 'success',
            title: 'You have successfully accessed the Customers page!',
            text: 'You will now be redirected to the Customers page.',
            timer: 1500,
            timerProgressBar: true
        }).then(() => {
            console.log('Redirecting to Customers page...');
            window.location.href = "/CafeManagement/Customers";
        });
    });

    payment.addEventListener('click', () => {
        // Do something here when the card is clicked
        console.log('Card2 clicked!');
        Swal.fire({
            icon: 'success',
            title: 'You have successfully accessed the Payment page!',
            text: 'You will now be redirected to the Payment page.',
            timer: 1500,
            timerProgressBar: true
        }).then(() => {
            console.log('Redirecting to Payment page...');
            window.location.href = "/CafeManagement/Payment";
        });
    });

    spotify.addEventListener('click', () => {
        // Do something here when the card is clicked
        console.log('Card3 clicked!');
        Swal.fire({
            icon: 'success',
            title: 'You have successfully accessed the Spotify page!',
            text: 'You will now be redirected to the Spotify page.',
            timer: 1500,
            timerProgressBar: true
        }).then(() => {
            console.log('Redirecting to Spotify page...');
            window.location.href = "/Spotify/Index";
        });
    });
    product.addEventListener('click', () => {
        // Do something here when the card is clicked
        console.log('Card4 clicked!');
        Swal.fire({
            icon: 'success',
            title: 'You have successfully accessed the Product page!',
            text: 'You will now be redirected to the Product page.',
            timer: 1500,
            timerProgressBar: true
        }).then(() => {
            console.log('Redirecting to Product page...');
            window.location.href = "/CafeManagement/Products";
        });
    });
});