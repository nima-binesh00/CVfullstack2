"use server";

export default async function Hashed() {
  const num = process.env.num;

  return `$2b$12$R7lGfS0yB7yD${num}`;
}
