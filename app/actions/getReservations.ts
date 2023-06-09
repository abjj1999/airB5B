import prisma from "@/app/lib/prismaDB"
interface IParams{
    listingId?: string;
    userId?: string;
    authorId?: string;
}

export default async function getReservations(params: IParams){

    try{

        const {listingId, userId, authorId} = params
    
        const query: any = {}
    
        if(listingId) query.listingId = listingId
        if(userId) query.userId = userId
        if(authorId) query.listing = {userId: authorId}
    
        const reservations = await prisma.reservation.findMany({
            where: query,
            include: {
                listing: true,
            },
            orderBy: {
                startDate: 'desc'
            }
        })
    
        const safeReservations = reservations.map(reservation => ({
            ...reservation,
            createdAt: reservation.createdAt.toISOString(),
            // updatedAt: reservation.updatedAt.toISOString(),
            startDate: reservation.startDate.toISOString(),
            endDate: reservation.endDate.toISOString(),
            listing: {
                ...reservation.listing,
                createdAt: reservation.listing.createdAt.toISOString(),
            }
    
        }))
        return safeReservations
    }catch(err: any){
        // console.log(err)
        throw new Error(err)
    }
}