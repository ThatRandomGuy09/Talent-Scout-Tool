import { SearchIcon } from "lucide-react";
import { db } from "@/db";
import { room } from "@/db/schema";
import { eq } from "drizzle-orm";
import { like } from "drizzle-orm";
import { unstable_noStore } from "next/cache";

export async function getRooms(search: string | undefined) {
  unstable_noStore(); // for Caching
  const where = search ? like(room.tags, `%${search}%`) : undefined;
  const rooms = await db.query.room.findMany({
    where,
  });
  return rooms;
}

export async function getRoom(roomId: string) {
  unstable_noStore(); // for Caching
  return await db.query.room.findFirst({
    where: eq(room.id, roomId),
  });
}
