import { sessions } from "./../db/schema";
import { SearchIcon } from "lucide-react";
import { db } from "@/db";
import { room } from "@/db/schema";
import { eq } from "drizzle-orm";
import { like } from "drizzle-orm";
import { unstable_noStore } from "next/cache";
import { getSession } from "@/lib/auth";

export async function getRooms(search: string | undefined) {
  unstable_noStore(); // for Caching
  const where = search ? like(room.tags, `%${search}%`) : undefined;
  const rooms = await db.query.room.findMany({
    where,
  });
  return rooms;
}

export async function getUserRooms() {
  unstable_noStore(); // for Caching
  const session = await getSession();
  if (!session) {
    throw new Error("User is not authenticated");
  }
  const rooms = await db.query.room.findMany({
    where: eq(room.userId, session.user.id),
  });
  return rooms;
}

export async function getRoom(roomId: string) {
  unstable_noStore(); // for Caching
  return await db.query.room.findFirst({
    where: eq(room.id, roomId),
  });
}
