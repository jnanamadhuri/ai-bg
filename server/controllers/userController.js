// API controller fxn to manage clerk user with database
//http://localhost:4000/api/user/webhooks

export const clerkWebhooks = async (req, res) => {
  console.log("Webhook hit");
  res.status(200).send("ok");
};
