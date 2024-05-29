import TableBanco from '@/components/table-banco'
import TableEmpresa from '@/components/table-empresa'
import { formatToCurrency } from '@/formatter'
import db from '@/lib/repository'
import queries from '@/queries'
import { Borrador } from '@/types'
import Link from 'next/link'

function DetailItem({ label, value }: { label: string; value: string }) {
  return (
    <p>
      <span className="fw-medium">{label}:</span> {value}
    </p>
  )
}

async function getBorradorByDNI(dni: string) {
  const borrador = await db.query<Borrador>(queries.borradores.getByDNI(), [
    dni
  ])

  return borrador.rows[0]
}

export default async function BorradorPage({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const dni = searchParams.dni as string

  const { resultado, brutotrabajo, brutobanco, retbanco, rettrabajo, ss } =
    await getBorradorByDNI(dni)

  return (
    <section className="row row-cols-1 gy-5">
      <div className="border py-3 px-3 rounded mb-1 col">
        <h2 className="fs-5 mb-4">Detalles: {dni}</h2>
        <div className="row">
          <div className="col">
            <DetailItem label="Resultado" value={formatToCurrency(resultado)} />
            <DetailItem
              label="Aportación a la seguridad social"
              value={formatToCurrency(ss)}
            />
          </div>
          <div className="col">
            <DetailItem
              label="Bruto trabajo"
              value={formatToCurrency(brutotrabajo)}
            />
            <DetailItem
              label="Bruto banco"
              value={formatToCurrency(brutobanco)}
            />
          </div>
          <div className="col">
            <DetailItem
              label="Comisiones del banco"
              value={formatToCurrency(retbanco)}
            />
            <DetailItem
              label="IRPF total"
              value={formatToCurrency(rettrabajo)}
            />
          </div>
        </div>
      </div>

      <div className="col">
        <div className="container">
          <div className="row gy-4 gx-5">
            <div className="col ps-0">
              <TableEmpresa dni={dni} />
            </div>
            <div className="col pe-0">
              <TableBanco dni={dni} />
            </div>
          </div>
        </div>
      </div>

      <footer className="text-center col">
        <Link
          href={`borrador-editar?dni=${dni}`}
          className="btn btn-primary"
          rel="noreferrer"
        >
          Modificar
        </Link>
      </footer>
    </section>
  )
}
