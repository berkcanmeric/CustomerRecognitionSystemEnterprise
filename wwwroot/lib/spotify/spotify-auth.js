const AUTHORIZE = 'https://accounts.spotify.com/authorize';
const SPOTIFY_TOKEN_API = 'https://accounts.spotify.com/api/token';
const redirect_uri = 'https://localhost:7125/Spotify'; // change this to your value


var accessTokenSpotify = "";
var refreshTokenSpotify = "";

var clientIdSpotify = "";
var clientSecretSpotify = "";

// Function to check for Spotify authorization success and display success message
function checkSpotifyAuthorizationSuccess() {
    if (window.location.href.includes('code=')) {
        const code = new URLSearchParams(window.location.search).get('code');
        // getAccessTokenAndRefreshToken(code)
        //     .then(({accessToken, refreshToken}) => {
        //         // Use the access token and refresh token to interact with the Spotify Web API
        //         console.log('Access token:', accessToken);
        //         console.log('Refresh token:', refreshToken);
        //         accessTokenSpotify = accessToken;
        //         refreshTokenSpotify = refreshToken;
        //         // Example: Get the user's profile information
        //         // getUserProfile(accessToken)
        //         //     .then(profile => {
        //         //         console.log('User profile:', profile);
        //         //     })
        //         //     .catch(error => {
        //         //         console.error('Error getting user profile:', error);
        //         //     });
        //         //
        //         // // Example: Create a new playlist for the user
        //         // createPlaylist(accessToken, 'My Playlist', 'A playlist created using the Spotify Web API')
        //         //     .then(playlist => {
        //         //         console.log('Playlist created:', playlist);
        //         //     })
        //         //     .catch(error => {
        //         //         console.error('Error creating playlist:', error);
        //         //     });
        //         //
        //         // // Example: Add a track to the user's playlist
        //         // searchTracks(accessToken, 'Believer')
        //         //     .then(tracks => {
        //         //         const trackId = tracks[0].id;
        //         //         addTrackToPlaylist(accessToken, playlistId, trackId)
        //         //             .then(() => {
        //         //                 console.log('Track added to playlist');
        //         //             })
        //         //             .catch(error => {
        //         //                 console.error('Error adding track to playlist:', error);
        //         //             });
        //         //     })
        //         //     .catch(error => {
        //         //         console.error('Error searching tracks:', error);
        //         //     });
        //     })
        //     .catch(error => {
        //         console.error('Error getting access token and refresh token:', error);
        //     });

        // Display a success message to the user using Swal
        Swal.fire({
            icon: 'success',
            title: 'Spotify Login Successful!',
            text: 'You have successfully authorized the app with Spotify.',
        }).then(result => {
            if (result.isConfirmed) {
                const clientId=localStorage.getItem('clientIdSpotify');
                const clientSecret = localStorage.getItem('clientSecretSpotify');
                console.log(clientId + "clientId")
                console.log(clientSecret + "clientSecret")
                window.location.href = "/Spotify/AddSong?id=" + encodeURIComponent(clientId) + "&secret=" + encodeURIComponent(clientSecret);
            }
        });
    }
}


if (document.getElementById('authButton')) {

// Event listener for the "Request Authorization" button
    const requestAuthButton = document.getElementById('authButton');
    requestAuthButton.addEventListener('click', () => {
        const clientId = document.getElementById('clientId').value;
        const clientSecret = document.getElementById('clientSecret').value;

        // Save the clientId and clientSecret in localStorage
        localStorage.setItem('clientIdSpotify', clientId);
        localStorage.setItem('clientSecretSpotify', clientSecret);
        
        clientIdSpotify = clientId;
        clientSecretSpotify = clientSecret;
        console.log(clientIdSpotify + "clientId")
        console.log(clientSecretSpotify + "clientSecret")
        let url = AUTHORIZE;
        url += `?client_id=${clientId}`;
        url += '&response_type=code';
        url += `&redirect_uri=${encodeURI(redirect_uri)}`;
        url += '&show_dialog=true';
        url +=
            '&scope=user-read-private user-read-email user-modify-playback-state user-read-playback-position user-library-read streaming user-read-playback-state user-read-recently-played playlist-read-private';
        window.location.href = url; // Show Spotify's authorization screen
    });
}

// Call the checkSpotifyAuthorizationSuccess function after the page is redirected
checkSpotifyAuthorizationSuccess();
