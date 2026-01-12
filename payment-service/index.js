const express = require("express");
const { Kafka } = require("kafkajs");
const paymentsRoute = require("./routes/payments");

const app = express();
const PORT = 3002;

app.use(express.json());
app.use("/payments", paymentsRoute);

// Start Express immediately
app.listen(PORT, "0.0.0.0", () => {
  console.log(`Payment service running on port ${PORT}`);
});

// Kafka consumer with retry logic
async function startKafka() {
  const kafka = new Kafka({
    clientId: "payment-service",
    brokers: [process.env.KAFKA_BROKER || "kafka:9092"],
  });

  const consumer = kafka.consumer({ groupId: "payment-group" });

  for (let i = 1; i <= 20; i++) {
    try {
      console.log(`Kafka: trying to connect (${i}/20)...`);
      await consumer.connect();
      console.log("PaymentService: connected.");

      await consumer.subscribe({ topic: "orders", fromBeginning: false });

      console.log("PaymentService: waiting for orders...");

      await consumer.run({
        eachMessage: async ({ topic, partition, message }) => {
          const order = JSON.parse(message.value.toString());
          console.log("PaymentService: processing payment for order:", order);

          //await new Promise((resolve) => setTimeout(resolve, 1000));
          //console.log("PaymentService: payment completed for order:", order.id);
        },
      });

      return;
    } catch (err) {
      console.log("Kafka connection failed, retrying in 3s...");
      await new Promise((res) => setTimeout(res, 3000));
    }
  }

  console.error("Kafka connection failed after retries.");
}

startKafka();