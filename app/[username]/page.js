import React from 'react'
import PaymentPage from '@/components/PaymentPage'
import { notFound } from "next/navigation"
import connectDb from '@/db/connectDb'
import User from '@/models/User'


const Username = async ({ params }) => {
  const resolvedParams = await params;
  
  // If the username is not present in the database, show a 404 page
  const checkUser = async (username) => {
    await connectDb()
    let u = await User.findOne({ username: username })
    if (!u) {
      return notFound()
    }
  }
  await checkUser(resolvedParams.username);



  return (
    <>
      <PaymentPage username={resolvedParams.username} />
    </>
  )
}

export default Username
 
export async function generateMetadata({ params }) {
  const resolvedParams = await params;
  return {
    title: `Support ${resolvedParams.username} - Get Me A Chai`,
  }
}
