"use client";
import React from 'react'
import { SafeListing, SafeUser } from '../types';
import Container from '../components/Container';
import Heading from '../components/Heading';
import ListingCard from '../components/listings/ListingCard';

interface FavouritesClientProps {
    listings: SafeListing[];
    currentUser?: SafeUser | null;
}

const FavouritesClient: React.FC<FavouritesClientProps> = ({
    listings,
    currentUser
}) => {
  return (
    <Container>
        <Heading
            title="Your Favourites"
            subTitle="Your saved listings"
        />
        <div className="
        mt-10
        grid
        grid-cols-1
        sm:grid-cols-2
        md:grid-cols-3
        lg:grid-cols-4
        xl:grid-cols-5
        2xl:grid-cols-6
        gap-8
        ">
            {listings.map((listing) => (
                <ListingCard
                    key={listing.id}
                    data={listing}
                    currentUser={currentUser}
                />
            
            ))}
        </div>
    </Container>
  )
}

export default FavouritesClient
