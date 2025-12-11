# HLS Proxy

This is a Vercel Serverless Function that proxies HLS streams, handling `Referer` headers and key/playlist rewriting.

## Setup

1.  Navigate to the directory:
    ```bash
    cd d:/yallasx/hls-proxy
    ```

2.  Install dependencies (optional locally, Vercel handles this):
    ```bash
    npm install
    ```

## Deployment

1.  Deploy to Vercel:
    ```bash
    vercel
    ```

2.  Follow the prompts (Yes to everything).

## Usage

Once deployed, your URL will look like `https://project.vercel.app`.

To proxy a stream:
```
https://project.vercel.app/api/index?url=<ORIGINAL_STREAM_URL>
```
