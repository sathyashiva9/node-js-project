const {Kafka} = require("kafkajs");

async function run() {
    try {
        const kafka = new Kafka({
            "clientId": "myapp1",
            "brokers": ["vigo-HP-250-G7-Notebook-PC:9092"]
        })
        const consumer = kafka.consumer({ "groupId": "test" });
        console.log("Connecting...");
        await consumer.connect();
        console.log("Connected.");
        // const partition = msg[0] < "N" ? 0 : 1;
        await consumer.subscribe({
            "topic": "Users",
            "fromBeginning": true
        })

        await consumer.run({
            "eachMessage": async result => {
                const value = result.message.value;
                console.log(`RVD msg ${value.toString()} on partition ${result.partition}`);
            }
        })
    
    }
    catch (err) {
        console.log("Error occures ",err);
    }
}

run();