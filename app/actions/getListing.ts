import prisma from "@/app/lib/prismaDB"

export default async function getListing(){
    try {
        const listing = await prisma.listing.findMany({
            orderBy: {
                createdAt: 'desc'
            },
        })
        return listing
    } catch (error: any) {
        throw new Error(error)
    }
}