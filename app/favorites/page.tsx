import React from 'react'
import EmptyState from '../components/EmptyState'
import ClientOnly from '../components/ClientOnly'
import getCurrentUser from '../actions/getCurrentUser'
import getFavs from '../actions/getFavs'
import Heading from '../components/Heading'
import FavouritesClient from './FavouritesClient'


const Favourites = async() => {
    const listings = await getFavs();
    const currentUser = await getCurrentUser();
    if(listings.length === 0) {
        return (
            <ClientOnly>

            <EmptyState
                title="You aren't signed in"
                subtitle="Sign in to see your favourites"   
                />
                </ClientOnly>
        )
    }
  return (
    <ClientOnly>
        <FavouritesClient 
            listings={listings}
            currentUser={currentUser}
        />
    </ClientOnly>
  )
}

export default Favourites
