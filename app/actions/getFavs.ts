import prisma from "@/app/lib/prismaDB";
import getCurrentUser from "./getCurrentUser";
import { th } from "date-fns/locale";


export default async function getFavs() {
    try {
        const currentUser = await getCurrentUser();
        if(!currentUser) return [];
        const favs = await prisma.listing.findMany({
            where: {
                id: {
                    in: [...(currentUser.favoriteIds || [])]
                }
            }
        })

        const safeFavs = favs.map((fav) => (
            {
                ...fav,
                createdAt: fav.createdAt.toISOString(),

            }

        ))
        return safeFavs;
    } catch (error: any) {
        throw new Error(error);
    }
}