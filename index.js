import express from "express";
import twilio from "twilio";

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const client = twilio(
  process.env.TWILIO_SID,
  process.env.TWILIO_TOKEN
);

// SEND REFERRAL TEXT
app.post("/send-referral", async (req, res) => {
  const { phone, name, referrer } = req.body;

  if (!phone || !name || !referrer) {
    return res.status(400).send("Missing fields");
  }

  try {
    await client.messages.create({
      to: phone,
      from: process.env.TWILIO_NUMBER,
      body: `Hi ${name}, this is an automated message from ACME Co. ${referrer} shared your number regarding a job opening. Reply YES for details or STOP to opt out.`
    });

    res.send("Referral text sent");
  } catch (err) {
    console.error(err);
    res.status(500).send("Failed to send");
  }
});

// HANDLE INCOMING SMS (YES / STOP)
app.post("/incoming", async (req, res) => {
  const message = req.body.Body.trim().toLowerCase();
  const from = req.body.From;

  if (message === "stop") {
    console.log(`Opt-out from ${from}`);
  }

  if (message === "yes") {
    await client.messages.create({
      to: from,
      from: process.env.TWILIO_NUMBER,
      body: "Great! Here’s the next step: https://example.com/schedule"
    });
  }

  res.set("Content-Type", "text/xml");
  res.send("<Response></Response>");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
