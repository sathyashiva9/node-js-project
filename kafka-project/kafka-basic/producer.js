const {Kafka} = require("kafkajs");
const msg = process.argv[2];
async function run() {
    try {
        const kafka = new Kafka({
            "clientId": "myapp1",
            "brokers": ["vigo-HP-250-G7-Notebook-PC:9092"]
        })
        const producer = kafka.producer();
        console.log("Connecting...");
        await producer.connect();
        console.log("Connected.");
        const partition = msg[0] < "N" ? 0 : 1;
        const result = await producer.send({
            "topic": "Users",
            "messages": [{
                "value": msg,
                "partition": partition
            }]
        })

        console.log("Sent messages ",result);
        await producer.disconnect();
        console.log("disconnected");
    }
    catch (err) {
        console.log("Error occures ",err);
    }
}

run();