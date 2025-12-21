const { Kafka } = require("kafkajs");

async function start() {
  const kafka = new Kafka({
    clientId: "payment-service",
    brokers: [process.env.KAFKA_BROKER || "kafka:9092"],
  });

  const consumer = kafka.consumer({ groupId: "payment-group" });

  console.log("PaymentService: connecting to Kafka...");
  await consumer.connect();
  console.log("PaymentService: connected.");

  await consumer.subscribe({ topic: "orders", fromBeginning: false });

  console.log("PaymentService: waiting for orders...");

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const order = JSON.parse(message.value.toString());
      console.log("PaymentService: processing payment for order:", order);

      // Simulate payment processing
      await new Promise((resolve) => setTimeout(resolve, 1000));

      console.log("PaymentService: payment completed for order:", order.id);
    },
  });
}

start().catch((err) => {
  console.error("PaymentService error:", err);
  process.exit(1);
});