const {Kafka} = require("kafkajs");

async function run() {
    try {
        const kafka = new Kafka({
            "clientId": "myapp1",
            "brokers": ["vigo-HP-250-G7-Notebook-PC:9092"]
        })
        const admin = kafka.admin();
        console.log("Connecting...");
        await admin.connect();
        console.log("Connected.");
        await admin.createTopics({
            "topics": [{
                "topic": "Users",
                "numPartitions": 2
            }]
        })
        console.log("Created topics");
        await admin.disconnect();
        console.log("disconnected");
    }
    catch (err) {
        console.log("Error occures ",err);
    }
}

run();

/* For running broker server
sudo docker run --name kafka -p 9092:9092 -e KAFKA_ZOOKEEPER_CONNECT=vigo-HP-250-G7-Notebook-PC:2181 -e KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://vigo-HP-250-G7-Notebook-PC:9092 -e KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1 confluentinc/cp-kafka

For running zookeeper
sudo docker run --name zookeeper -p 2181:2181 zookeeper

*/

