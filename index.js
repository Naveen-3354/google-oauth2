// const express = require('express');
// const axios = require('axios');
// const router = express();

// const APP_ID = '910200820816838';
// const APP_SECRET = 'f025fa22bc8f9ef53fce9b54d2724f35';
// const REDIRECT_URI = '<http://localhost:3000/auth/callback>';

// // Initiates the Facebook Login flow
// router.get('/auth/facebook', (req, res) => {
//   const url = `https://www.facebook.com/v13.0/dialog/oauth?client_id=${APP_ID}&redirect_uri=${REDIRECT_URI}&scope=email`;
//   res.redirect(url);
// });

// // Callback URL for handling the Facebook Login response
// router.get('/auth/callback', async (req, res) => {
//   const { incode } = req.query;

//   try {
//     // Exchange authorization code for access token
//     const { data } = await axios.get(`https://graph.facebook.com/v13.0/oauth/access_token?client_id=${APP_ID}&client_secret=${APP_SECRET}&code=${code}&redirect_uri=${REDIRECT_URI}`);

//     const { access_token } = data;

//     // Use access_token to fetch user profile
//     const { data: profile } = await axios.get(`https://graph.facebook.com/v13.0/me?fields=name,email&access_token=${access_token}`);

//     // Code to handle user authentication and retrieval using the profile data

//     res.redirect('/');
//   } catch (error) {
//     console.error('Error:', error.response.data.error);
//     res.redirect('/login');
//   }
// });

// // Logout route
// router.get('/logout', (req, res) => {
//   // Code to handle user logout
//   res.redirect('/login');
// });

// router.listen(3000, () => {
//     console.log('Server started on port 3000');
//   });

const http2 = require('http2'); 
const fs = require('fs'); 
  
// Private key and public certificate for access 
const options = { 
key: fs.readFileSync('private-key.pem'), 
cert: fs.readFileSync('public-cert.pem'), 
}; 
  
// Creating and initializing server 
// by using http2.createServer() method 
const server = http2.createServer(options); 
  
server.on('stream', (stream, requestHeaders) => { 
stream.respond({ 
    ':status': 200, 
    'content-type': 'text/plain'
}); 
  
stream.write('hello '); 
  
// Getting session object 
// by using session method 
const http2session = stream.session; 
  
// Getting alpnProtocol of this session 
// by using alpnProtocol method 
const alpnProtocol = http2session.alpnProtocol; 
  
stream.end("session protocol : " + alpnProtocol); 
  
http2session.close(); 
  
// Handling 'close' event 
http2session.on('close',() => { 
    console.log("session is closed"); 
}) 
  
// Stopping the server 
// by using the close() method 
server.close(() => { 
    console.log("server destroyed"); 
}) 
}); 
  
server.listen(8000); 
  
// Creating and initializing client 
// by using tls.connect() method 
const client = http2.connect( 
    'http://localhost:8000'); 
  
const req = client.request({ 
':method': 'GET', ':path': '/' }); 
  
req.on('response', (responseHeaders) => { 
console.log("status : "
+ responseHeaders[":status"]); 
}); 
  
req.on('data', (data) => { 
console.log('Received: %s ', 
data.toString().replace(/(\n)/gm,"")); 
}); 
  
req.on('end', () => { 
client.close(() => { 
    console.log("client destroyed"); 
}) 
});