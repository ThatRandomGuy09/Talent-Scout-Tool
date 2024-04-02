import { db } from "@/db";
import React from "react";

export default async function Home() {
  const items = await db.query.testing.findMany();
  return (
    <div>
      {items.map((item) => {
        return <div key={item.id}>{item.name}</div>;
      })}
    </div>
  );
}
