const http = require('http');

http.get('http://localhost:3000', (res) => {
  let html = '';
  res.on('data', c => html += c);
  res.on('end', async () => {
    const regex = /(?:src|href)="(\/_next\/[^"]+)"/g;
    const matches = [];
    let match;
    while ((match = regex.exec(html)) !== null) {
      matches.push(match[1].replace(/&amp;/g, '&'));
    }
    console.log('Testing ' + matches.length + ' assets...');
    let failed = 0;
    for (const url of matches) {
      await new Promise((resolve) => {
        http.get('http://localhost:3000' + url, (assetRes) => {
          if (assetRes.statusCode !== 200) {
            console.log('FAILED (' + assetRes.statusCode + '): ' + url);
            failed++;
          }
          resolve();
        }).on('error', (err) => {
          console.log('ERROR: ' + err.message + ' ' + url);
          failed++;
          resolve();
        });
      });
    }
    console.log('Finished testing assets. Total failed: ' + failed);
  });
});
