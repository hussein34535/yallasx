const axios = require('axios');

module.exports = async function handler(req, res) {
  // 1. Receive URL from request
  const { url, key } = req.query;

  // Masking headers to mimic a browser
  const headers = {
    'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
    // Use origin as Referer to avoid 500 errors
    'Referer': new URL(url || key || 'https://wikinew.giokko.ru/').origin + '/'
  };

  try {
    // ---------------------------------------------------------
    // Case A: Encryption Key Request (Key Proxy)
    // ---------------------------------------------------------
    if (key) {
      const keyResponse = await axios.get(key, {
        headers: headers,
        responseType: 'arraybuffer' // Key comes as binary data
      });

      res.setHeader('Content-Type', 'application/octet-stream');
      res.setHeader('Access-Control-Allow-Origin', '*');
      return res.send(keyResponse.data);
    }

    // ---------------------------------------------------------
    // Case B: Main Stream File Request (Playlist Proxy)
    // ---------------------------------------------------------
    if (url) {
      const playlistResponse = await axios.get(url, { headers: headers });
      let playlistData = playlistResponse.data;

      // Get current server host
      const host = req.headers.host;
      const protocol = req.headers['x-forwarded-proto'] || 'http';
      const baseUrl = `${protocol}://${host}/api/index`;

      // The Trick: Find key URI and replace it with a link through our server
      // Searches for: URI="https://..." and converts to URI="https://our-vercel...?key=https://..."
      const keyRegex = /URI="([^"]+)"/g;
      playlistData = playlistData.replace(keyRegex, (match, originalKeyUrl) => {
        return `URI="${baseUrl}?key=${encodeURIComponent(originalKeyUrl)}"`;
      });

      // Prepare response
      res.setHeader('Content-Type', 'application/vnd.apple.mpegurl');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.setHeader('Content-Disposition', 'inline; filename="stream.m3u8"');

      return res.send(playlistData);
    }

    // If no URL provided
    return res.status(400).send('Please provide a ?url= parameter');

  } catch (error) {
    console.error(error);
    return res.status(500).send('Error fetching stream: ' + error.message);
  }
}
