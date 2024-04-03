import { db } from "@/db";
import React from "react";

export default async function Home() {
  const rooms = await db.query.room.findMany();
  return (
    <div>
      {rooms.map((room) => {
        return <div key={room.name}>{room.name}</div>;
      })}
    </div>
  );
}
