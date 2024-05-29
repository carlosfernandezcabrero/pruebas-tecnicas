import { formatToCurrency } from '@/formatter'
import db from '@/lib/repository'
import queries from '@/queries'
import { EmpresaDetail } from '@/types'
import Table from './table'

interface Props {
  dni: string
}

async function getEmpresaDetailByDni(dni: string) {
  const details = await db.query<EmpresaDetail>(
    queries.empresa.getDetailByDNI(dni)
  )

  return details.rows
}

export default async function TableEmpresa({ dni }: Props) {
  const empresaDetails = await getEmpresaDetailByDni(dni)

  return (
    <>
      <h3 className="text-center fs-5 mb-3">Empresa {empresaDetails[0].cif}</h3>
      <Table>
        <thead>
          <tr>
            <th scope="col">FECHA</th>
            <th scope="col">BRUTO</th>
            <th scope="col">SS</th>
            <th scope="col">IRPF</th>
          </tr>
        </thead>
        <tbody>
          {empresaDetails
            .sort((a, b) => a.fecha.getTime() - b.fecha.getTime())
            .map(({ fecha, bruto, ss, ret }) => (
              <tr key={fecha.toLocaleDateString('es-ES')}>
                <td scope="row">{fecha.toLocaleDateString('es-ES')}</td>
                <td>{formatToCurrency(bruto)}</td>
                <td>{formatToCurrency(ss)}</td>
                <td>{formatToCurrency(ret)}</td>
              </tr>
            ))}
          <tr>
            <th scope="row">Total</th>
            <th>
              {formatToCurrency(
                empresaDetails.reduce(
                  (acc, curr) => acc + Number(curr.bruto),
                  0
                )
              )}
            </th>
            <th>
              {formatToCurrency(
                empresaDetails.reduce((acc, curr) => acc + Number(curr.ss), 0)
              )}
            </th>
            <th>
              {formatToCurrency(
                empresaDetails.reduce((acc, curr) => acc + Number(curr.ret), 0)
              )}
            </th>
          </tr>
        </tbody>
      </Table>
    </>
  )
}
