"use server";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export async function loginAction(password) {
  // مستقیماً env رو بخون، نیازی به import Hashed نیست
  const hash = `$2b$12$R7lGfS0yB7yD${process.env.num}`;

  if (!hash) {
    throw new Error("Server not configured (HASHEDPASSWORD missing)");
  }

  const ok = await bcrypt.compare(password || "", hash);
  if (!ok) {
    return { ok: false, message: "Invalid password" };
  }

  // ساخت توکن
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new Error("Server not configured (JWT_SECRET missing)");
  }

  const payload = {
    sub: "admin",
    iat: Math.floor(Date.now() / 1000),
  };

  const token = jwt.sign(payload, secret, { expiresIn: "1d" });

  return { ok: true, token };
}
