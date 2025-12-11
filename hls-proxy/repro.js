const axios = require('axios');

async function testReferer(referer) {
    const url = 'https://wikinew.giokko.ru/wiki/yallalive5172/mono.css';
    console.log(`\nTesting with Referer: ${referer}`);
    try {
        const response = await axios.get(url, {
            headers: {
                'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
                'Referer': referer
            }
        });
        console.log(`Status: ${response.status}`);
        console.log('Success! Headers accepted.');
    } catch (error) {
        if (error.response) {
            console.log(`Failed with Status: ${error.response.status}`);
            console.log(`Data preview: ${error.response.data.substring(0, 100)}...`);
        } else {
            console.log(`Error: ${error.message}`);
        }
    }
}

async function run() {
    // 1. Reproduce the failure (Full URL as Referer)
    await testReferer('https://wikinew.giokko.ru/wiki/yallalive5172/mono.css');

    // 2. Test the fix (Origin only as Referer)
    await testReferer('https://wikinew.giokko.ru/');
}

run();
