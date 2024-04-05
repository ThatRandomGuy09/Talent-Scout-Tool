import { db } from "@/db";
import { unstable_noStore } from "next/cache";

export async function getRooms(){
    unstable_noStore();  // for Caching
    const rooms = await db.query.room.findMany();
    return rooms;
}