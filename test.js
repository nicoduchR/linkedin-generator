const https = require('https');

const data = JSON.stringify([
  {
    url: 'https://www.linkedin.com/in/nicolas-duchemann/',
    start_date: '2018-04-25T00:00:00.000Z',
    end_date: '2021-05-25T00:00:00.000Z',
  },
]);

const options = {
  hostname: 'api.brightdata.com',
  path: '/datasets/v3/trigger?dataset_id=gd_lyy3tktm25m4avu764&include_errors=true&type=discover_new&discover_by=profile_url',
  method: 'POST',
  headers: {
    Authorization:
      'Bearer 372d96779f770215c78e304930493ab10383c8041a685a7508dcd230e33295fe',
    'Content-Type': 'application/json',
  },
};

const req = https.request(options, (res) => {
  let responseData = '';

  res.on('data', (chunk) => {
    responseData += chunk;
  });

  res.on('end', () => {
    console.log(responseData);
  });
});

req.on('error', (error) => {
  console.error(error);
});

req.write(data);
req.end();
