import { formatToCurrency } from '@/formatter'
import db from '@/lib/repository'
import queries from '@/queries'
import { BancoDetail } from '@/types'
import Table from './table'

interface Props {
  dni: string
}

async function getBancoDetailByDni(dni: string) {
  const details = await db.query<BancoDetail>(queries.banco.getDetailByDNI(), [
    dni
  ])

  return details.rows
}

export default async function TableBanco({ dni }: Props) {
  const bancoDetails = await getBancoDetailByDni(dni)

  return (
    <>
      <h3 className="text-center fs-5 mb-3">Banco {bancoDetails[0].cif}</h3>
      <Table>
        <thead>
          <tr>
            <th scope="col">TIPO</th>
            <th scope="col">INTERESES</th>
            <th scope="col">COMISIONES</th>
          </tr>
        </thead>
        <tbody>
          {bancoDetails
            .sort((a, b) => a.tipo - b.tipo)
            .map(({ bruto, tipo, ret }) => (
              <tr key={tipo}>
                <td>{tipo}</td>
                <td>{formatToCurrency(bruto)}</td>
                <td>{formatToCurrency(ret)}</td>
              </tr>
            ))}
        </tbody>
      </Table>
    </>
  )
}
