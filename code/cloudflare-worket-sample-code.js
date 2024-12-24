addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request))
})

async function handleRequest(request) {
    if (request.method !== 'POST') {
        return new Response('Method Not Allowed', {
            status: 405
        });
    }

    let body;
    try {
        body = await request.json();
    } catch (error) {
        return new Response('Invalid JSON', {
            status: 400
        });
    }

    const {
        message
    } = body;

    if (!message) {
        return new Response('No message provided', {
            status: 400
        });
    }

    // place the your chat-ID instead of 'YOUR TELEGRAM CHAT ID'
    const chat_id = 'YOUR TELEGRAM CHAT ID';
    // Place the your bot token instead of 'YOUR TELEGRAM BOT TOKEN'
    const token = 'YOUR TELEGRAM BOT TOKEN';
    const telegramUrl = `https://api.telegram.org/bot${token}/sendMessage`;

    const response = await fetch(telegramUrl, {
        method: 'POST',
        body: JSON.stringify({
            chat_id: chat_id,
            text: message
        }),
        headers: {
            'Content-Type': 'application/json'
        },
    });

    return new Response('Message sent', {
        status: response.ok ? 200 : 500,
        statusText: response.ok ? 'OK' : 'Error'
    });
}