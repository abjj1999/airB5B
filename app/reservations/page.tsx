import React from 'react'
import EmptyState from '../components/EmptyState'
import ClientOnly from '../components/ClientOnly'
import getCurrentUser from '../actions/getCurrentUser'
import getReservations from '../actions/getReservations'
import ReservationsClient from './ReservationsClient'


const Reservations = async() => {
    const currentUser = await getCurrentUser()
    if(!currentUser){
        return (
            <ClientOnly>
                <EmptyState
                    title="You are not logged in"
                    subtitle="Please login to see your reservations"
                />
            </ClientOnly>
        )
    }
    const reservations = await getReservations({
        authorId: currentUser.id
    })
    if(reservations.length === 0){
        return (
            <ClientOnly>
                <EmptyState
                    title="You have no reservations"
                    subtitle="Please make a reservation to see it here"
                />
            </ClientOnly>
        )
    }
  return (
    <ClientOnly>
        <ReservationsClient reservations={reservations} currentUser={currentUser} />
    </ClientOnly>
  )
}

export default Reservations
