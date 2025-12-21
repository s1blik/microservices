const { Kafka } = require("kafkajs");

async function start() {
  const kafka = new Kafka({
    clientId: "order-service",
    brokers: [process.env.KAFKA_BROKER || "kafka:9092"],
  });

  const producer = kafka.producer();

  console.log("OrderService: connecting to Kafka...");
  await producer.connect();
  console.log("OrderService: connected.");

  // Send a test order every 5 seconds
  setInterval(async () => {
    const order = {
      id: Date.now(),
      amount: Math.floor(Math.random() * 100) + 1,
      timestamp: new Date().toISOString(),
    };

    await producer.send({
      topic: "orders",
      messages: [{ value: JSON.stringify(order) }],
    });

    console.log("OrderService: sent order:", order);
  }, 5000);
}

start().catch((err) => {
  console.error("OrderService error:", err);
  process.exit(1);
});