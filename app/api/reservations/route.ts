import { NextResponse } from "next/server";

import prisma from "@/app/lib/prismaDB";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
    console.log("getting current user")
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return NextResponse.error();
    }

    const body  = await request.json();
    // console.log(body)
    const {
        listingId,
        startDate,
        endDate,
        totalPrice,
    } = body;

    if (!listingId || !startDate || !endDate || !totalPrice) {
        return NextResponse.error();
    }

    const listingAndReservations = await prisma.listing.update({
        where: {
            id: listingId,
        },
        data: {
            reservations: {
                create: {
                    userId: currentUser.id,
                    startDate,
                    endDate,
                    totalPrice,
                }
            }
        }
    })


    return NextResponse.json(listingAndReservations);

}