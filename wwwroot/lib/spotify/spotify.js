var redirect_uri = "https://localhost:7125/Spotify"; // change this your value
const AUTHORIZE = "https://accounts.spotify.com/authorize"

const requestAuthButton = document.getElementById('authButton');
requestAuthButton.addEventListener('click', () => {

    var clientId = document.getElementById('clientId').value;
    var clientSecret = document.getElementById('clientSecret').value;
    let url = AUTHORIZE;
    console.log(url)
    url += "?client_id=" + clientId;
    console.log(url)
    url += "&response_type=code";
    console.log(url)
    url += "&redirect_uri=" + encodeURI(redirect_uri);
    console.log(url)
    url += "&show_dialog=true";
    console.log(url)
    url += "&scope=user-read-private user-read-email user-modify-playback-state user-read-playback-position user-library-read streaming user-read-playback-state user-read-recently-played playlist-read-private";
    console.log(url)
    window.location.href = url; // Show Spotify's authorization screen
});

// Function to check for Spotify authorization success and display success message
function checkSpotifyAuthorizationSuccess() {
    if (window.location.href.includes('code=')) {
        // Display success message to the user using Swal
        Swal.fire({
            icon: 'success',
            title: 'Spotify Login Successful!',
            text: 'You have successfully authorized the app with Spotify.'
        });
    }
}

// Call the checkSpotifyAuthorizationSuccess function after the page is redirected
checkSpotifyAuthorizationSuccess();


