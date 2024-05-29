import db from '@/lib/repository'
import queries from '@/queries'
import { Borrador } from '@/types'
import HomeClient from './page.client'

async function getBorradores() {
  const borradores = await db.query<Borrador>(queries.borradores.getAll())

  return borradores.rows
}

export default async function Home() {
  const borradores = await getBorradores()

  return (
    <section className="row row-cols-1 gy-2">
      <HomeClient
        borradores={borradores.sort((a, b) => a.dni.localeCompare(b.dni))}
      />
    </section>
  )
}
