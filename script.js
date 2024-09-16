document.addEventListener('DOMContentLoaded', () => {
    const subscribeButton = document.getElementById('subscribeButton');
    const subscriptionQuery = document.getElementById('subscriptionQuery').value;
    const outputArea = document.getElementById('subscriptionOutput');

    const websocketUrl = 'ws://your-graphql-endpoint'; // Replace with your GraphQL WebSocket endpoint
    let client;

    subscribeButton.addEventListener('click', () => {
        const query = subscriptionQuery.value;

        if (!query) {
            alert('Please enter a subscription query.');
            return;
        }

        if (client) {
            client.close();
        }

        client = new WebSocket(websocketUrl);

        client.onopen = () => {
            console.log('Connected to WebSocket');
            client.send(JSON.stringify({
                type: 'subscribe',
                query: query,
            }));
        };

        client.onmessage = (message) => {
            const data = JSON.parse(message.data);
            outputArea.innerHTML += `<pre>${JSON.stringify(data, null, 2)}</pre>`;
        };

        client.onerror = (error) => {
            console.error('WebSocket Error:', error);
        };

        client.onclose = () => {
            console.log('WebSocket closed');
        };
    });
});
