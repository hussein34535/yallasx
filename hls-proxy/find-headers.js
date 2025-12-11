const axios = require('axios');

const targetUrl = 'https://wikinew.giokko.ru/wiki/yallalive5172/mono.css';

const referers = [
    '', // No referer
    'https://wikinew.giokko.ru/',
    'https://wikinew.giokko.ru',
    'https://wikinew.giokko.ru/wiki/yallalive5172/',
    'https://wikinew.giokko.ru/wiki/',
    'https://giokko.ru/',
    'https://google.com/',
    targetUrl
];

const userAgents = [
    'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    'VLC/3.0.18 LibVLC/3.0.18',
    'PostmanRuntime/7.36.0',
    'Mozilla/5.0 (iPhone; CPU iPhone OS 16_0 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/16.0 Mobile/15E148 Safari/604.1',
    '' // No UA
];

async function check(referer, ua) {
    try {
        const headers = {};
        if (referer) headers['Referer'] = referer;
        if (ua) headers['User-Agent'] = ua;

        console.log(`Testing [Referer: "${referer}"] [UA: "${ua.substring(0, 20)}..."]`);

        const res = await axios.get(targetUrl, {
            headers,
            validateStatus: () => true // Don't throw on error
        });

        if (res.status === 200) {
            console.log('\n✅ SUCCESS FOUND!');
            console.log('---------------------------------------------------');
            console.log(`Referer: ${referer}`);
            console.log(`User-Agent: ${ua}`);
            console.log('---------------------------------------------------\n');
            return true;
        } else {
            console.log(`❌ Failed (${res.status})`);
        }
    } catch (e) {
        console.log(`❌ Error: ${e.message}`);
    }
    return false;
}

async function run() {
    console.log(`Hunting for working headers for: ${targetUrl}\n`);

    for (const r of referers) {
        for (const u of userAgents) {
            if (await check(r, u)) return; // Stop after first success
            await new Promise(resolve => setTimeout(resolve, 500)); // Be nice to server
        }
    }

    console.log('\n❌ No working combination found. Could be IP blocked or require Cookies.');
}

run();
