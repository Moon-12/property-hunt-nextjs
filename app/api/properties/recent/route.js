import connectDB from "@/config/database";
import Property from "@/models/Property";

export async function GET() {
  await connectDB();
  const properties = await Property.find({})
    .sort({ createdAt: -1 })
    .limit(3)
    .lean();

  return Response.json(properties);
}
