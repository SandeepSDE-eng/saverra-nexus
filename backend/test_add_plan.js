const http = require('http');

const postData = JSON.stringify({
  type_key: '5bhk',
  label: '5 BHK Signature',
  area: '5200 Sq.Ft',
  features: ['Full Floor Plate', 'Private Elevator', '6 Bedrooms', 'Smart Home Controls', 'Infinity Plunge Pool'],
  image_url: 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=1200&q=80',
  is_published: true
});

const options = {
  hostname: '127.0.0.1',
  port: 5000,
  path: '/api/floor-plans',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }
};

const req = http.request(options, (res) => {
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  res.on('end', () => {
    console.log('Response Status:', res.statusCode);
    console.log('Response Body:', data);
  });
});

req.on('error', (e) => {
  console.error(`Problem with request: ${e.message}`);
});

req.write(postData);
req.end();
