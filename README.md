# Hiring SMS Referral System

Automated, compliant hiring texts for referred candidates.

## Endpoints

### POST /send-referral
Send first referral message.

Body:
{
  "phone": "+15551234567",
  "name": "Jamie",
  "referrer": "Chris"
}

### POST /incoming
Webhook for incoming SMS replies (YES / STOP)

## Environment Variables
- TWILIO_SID
- TWILIO_TOKEN
- TWILIO_NUMBER
- 
