import { Webhook } from "svix";
import userModel from "../models/userModel.js";

// API controller fxn to manage clerk user with database
const clerkWebhooks = async (req, res) => {
  console.log("🎯 Webhook endpoint hit");

  try {
    const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

    const evt = whook.verify(JSON.stringify(req.body), {
      "svix-id": req.headers["svix-id"],
      "svix-timestamp": req.headers["svix-timestamp"],
      "svix-signature": req.headers["svix-signature"],
    });

    const { data, type } = evt;
    console.log("📦 Verified Event Type:", type);

    switch (type) {
      case "user.created": {
        const userData = {
          clerkId: data.id,
          email: data.email_addresses[0].email_address,
          firstName: data.first_name,
          lastName: data.last_name,
          photo: data.image_url,
        };
        await userModel.create(userData);
        console.log("✅ User created in DB");
        res.status(200).json({});
        break;
      }

      case "user.updated": {
        const userData = {
          email: data.email_addresses[0].email_address,
          firstName: data.first_name,
          lastName: data.last_name,
          photo: data.image_url,
        };
        await userModel.findOneAndUpdate({ clerkId: data.id }, userData);
        console.log("🔄 User updated");
        res.status(200).json({});
        break;
      }

      case "user.deleted": {
        await userModel.findOneAndDelete({ clerkId: data.id });
        console.log("🗑️ User deleted");
        res.status(200).json({});
        break;
      }

      default:
        console.log("⚠️ Unhandled event type:", type);
        res.status(200).json({});
        break;
    }
  } catch (error) {
    console.error("❌ Webhook error:", error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

export { clerkWebhooks };
