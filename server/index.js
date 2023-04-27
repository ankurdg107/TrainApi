const express = require('express');
const http = require('http');
const https = require('https');

const app = express();

// Set up the API endpoint URL with query parameters
const apiUrl = 'https://us-central1-delhimetroapi.cloudfunctions.net/route-get';

app.get('/route', (req, res) => {
  // Get the query parameters from the request object
  const { from, to } = req.query;
  
  // Construct the API request URL with the query parameters
  const query = `?from=${encodeURIComponent(from)}&to=${encodeURIComponent(to)}`;
  const url = apiUrl + query;
  
  // Choose the appropriate protocol module based on the URL scheme
  const protocol = url.startsWith('https') ? https : http;
  
  // Send the API request and handle the response
  protocol.get(url, (response) => {
    let data = '';
    
    response.on('data', (chunk) => {
      data += chunk;
    });
    
    response.on('end', () => {
      // Process the data and handle any errors
      const parsedData = JSON.parse(data);
      res.send(parsedData);
    });
    
  }).on('error', (error) => {
    console.error(error);
    res.status(500).send('An error occurred while processing the request.');
  });
});

app.listen(4000, () => {
  console.log('Server started on port 3000');
});
