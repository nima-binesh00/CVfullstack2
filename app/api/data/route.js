import { connectDB } from "@/lib/mongodb";
import YourModel from "@/models/modelWeb";

export async function GET() {
  try {
    await connectDB();

    const data = await YourModel.find({});
    console.log("📥 Received data:", data);

    return Response.json(data);
  } catch (err) {
    console.error("❌ Error fetching data:", err);
    return new Response("Server Error", { status: 500 });
  }
}
export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    // بررسی صحت داده
    if (!body.header || !body.about || !body.SkillsIcon) {
      return Response.json(
        { success: false, message: "Incomplete data" },
        { status: 400 }
      );
    }

    // پاک کردن داده قدیمی
    await YourModel.deleteMany({});

    // ذخیره جدید
    const saved = await YourModel.create(body);

    return Response.json({ success: true, data: saved }, { status: 201 });
  } catch (error) {
    console.error("❌ Error saving content:", error);
    return Response.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}
