import { db } from "@/db";
import { room } from "@/db/schema";
import { eq } from "drizzle-orm";
import { unstable_noStore } from "next/cache";

export async function getRooms() {
  unstable_noStore(); // for Caching
  const rooms = await db.query.room.findMany();
  return rooms;
}

export async function getRoom(roomId: string) {
  unstable_noStore(); // for Caching
  return await db.query.room.findFirst({
    where: eq(room.id, roomId),
  });
}
