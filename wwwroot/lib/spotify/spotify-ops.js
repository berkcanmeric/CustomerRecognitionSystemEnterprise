

const AUTHORIZE = 'https://accounts.spotify.com/authorize';
const SPOTIFY_TOKEN_API = 'https://accounts.spotify.com/api/token';
const redirect_uri = 'https://localhost:7125/Spotify'; // change this to your value

var accessTokenSpotify = getAccessTokenAndRefreshToken();
var refreshTokenSpotify = "";

const searchParams = new URLSearchParams(window.location.search);
const clientIdSpotify = searchParams.get('id');
const clientSecretSpotify = searchParams.get('secret');

async function initialize() {
    const accessToken = await getAccessTokenAndRefreshToken();
    console.log('Access token:', accessToken);
    var refreshTokenSpotify = "";
    var accessTokenSpotify = accessToken;

    if (document.getElementById('get-liked-songs')) {
        console.log('Liked songs button found');
        const likedSongsButton = document.getElementById('get-liked-songs');
        likedSongsButton.addEventListener('click', () => {
            console.log('Getting saved tracks...');
            getSavedTracks(accessTokenSpotify);
        });
    }
}

// Function to exchange the authorization code for an access token and refresh token
async function getAccessTokenAndRefreshToken() {
    console.log('Getting access token and refresh token...');
    const authString = `${clientIdSpotify}:${clientSecretSpotify}`;
    const encodedAuthString = btoa(authString);

    const response = await fetch('https://accounts.spotify.com/api/token', {
        method: 'POST',
        headers: {
            Authorization: `Basic ${encodedAuthString}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `grant_type=client_credentials&client_id=${clientIdSpotify}&client_secret=${clientSecretSpotify}`,
    });

    const data = await response.json();
    const accessToken = data.access_token;
    return accessToken;
}

async function getSavedTracks(accessToken) {
    console.log('Fetching saved tracks...');
    const response = await fetch(`https://api.spotify.com/v1/users/halilakpinar4115/playlists`, {
        headers: {
            Authorization: `Bearer ${accessToken}`,
        }
    });
    const data = await response.json();
    console.log('Saved tracks:', data.items);
}

initialize();





// // Function to get the user's profile information
// async function getUserProfile(accessToken) {
//     const response = await fetch('https://api.spotify.com/v1/me', {
//         headers: {
//             Authorization: `Bearer ${accessToken}`,
//         },
//     });
//
//     const data = await response.json();
//
//     return data;
// }

// Function to create a new playlist for the user
// async function createPlaylist(accessToken, name, description) {
//     const userId = await getUserId(accessToken);
//
//     const response = await fetch(`https://api.spotify.com/v1/users/${userId}/playlists`, {
//         method: 'POST',
//         headers: {
//             Authorization: `Bearer ${accessToken}`,
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//             name,
//             description,
//         }),
//     });
//
//     const data = await response.json();
//
//     return data;
// }

// Function to get the user's Spotify user ID
// async function getUserId(accessToken) {
//     const response = await fetch('https://api.spotify.com/v1/me', {
//         headers: {
//             Authorization: `Bearer ${accessToken}`,
//         },
//     });
//
//     const data = await response.json();
//
//     return data.id;
// }

// // Function to search for tracks by keyword
// async function searchTracks(accessToken, keyword) {
//     const response = await fetch(`https://api.spotify.com/v1/search?q=${encodeURI(keyword)}&type=track`, {
//         headers: {
//             Authorization: `Bearer ${accessToken}`,
//         },
//     });
//
//     const data = await response.json();
//
//     return data.tracks.items;
// }
//
// // Function to add a track to a playlist
// async function addTrackToPlaylist(accessToken, playlistId, trackId) {
//     const response = await fetch(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
//         method: 'POST',
//         headers: {
//             Authorization: `Bearer ${accessToken}`,
//             'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//             uris: [`spotify:track:${trackId}`],
//         }),
//     });
//
//     const data = await response.json();
//
//     return data;
// }