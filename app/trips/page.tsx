import React from 'react'
import EmptyState from '../components/EmptyState'
import ClientOnly from '../components/ClientOnly'
import getCurrentUser from '../actions/getCurrentUser'
import getReservations from '../actions/getReservations'
import TripsClient from './TripsClient'



const Trips = async () => {
    const currentUser = await getCurrentUser()

    if (!currentUser) {
        return (
            <ClientOnly>
                <EmptyState
                    title="You are not logged in"
                    subtitle='Log in to view your trips'
                />
            </ClientOnly>
        )
    }

    const reservations = await getReservations({ userId: currentUser.id })

    if(reservations.length === 0) {
        return (
            <ClientOnly>
                <EmptyState
                    title="You have no trips scheduled"
                    subtitle='Try searching for a place to stay'
                />
            </ClientOnly>
        )
    }

  return (
    <ClientOnly>
        <TripsClient 
            reservations={reservations}
            currentUser={currentUser}
        />

    </ClientOnly>
  )
}

export default Trips
