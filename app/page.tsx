import Image from 'next/image'
import MotdData from './_components/motd-data'

// fetches the message of the day from the server


// dashboard page with an image as a background covering the entire page and a MOTD-data component in the center
export default async function Home() {
  async function getMotdFromServer() {
    'use server'
    return ""
  }
  const motdString = await getMotdFromServer()
  return (
    <main className="flex flex-col items-center justify-center w-full h-full bg-center bg-cover">
      <h1 className="text-4xl text-white font-bold mb-4">Message of the Day</h1>
      <MotdData motd={motdString}/>
    </main>
  )
}
