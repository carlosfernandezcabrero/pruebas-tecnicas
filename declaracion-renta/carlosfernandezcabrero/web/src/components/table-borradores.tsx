import { formatToCurrency } from '@/formatter'
import { Borrador } from '@/types'
import Link from 'next/link'
import Table from './table'

interface Props {
  borradores: Borrador[]
}

export default function TableBorradores({ borradores }: Props) {
  return (
    <Table>
      <thead>
        <tr>
          <th scope="col">DNI</th>
          <th scope="col">BRUTO TRABAJO</th>
          <th scope="col">BRUTO BANCO</th>
          <th scope="col">SS</th>
          <th scope="col">RET TRABAJO</th>
          <th scope="col">RET BANCO</th>
          <th scope="col">RESULTADO</th>
          <th scope="col">ACCIONES</th>
        </tr>
      </thead>
      <tbody>
        {borradores.map(
          ({
            dni,
            brutotrabajo,
            brutobanco,
            ss,
            rettrabajo,
            retbanco,
            resultado
          }) => (
            <tr key={dni}>
              <td scope="row">{dni}</td>
              <td>{formatToCurrency(brutotrabajo)}</td>
              <td>{formatToCurrency(brutobanco)}</td>
              <td>{formatToCurrency(ss)}</td>
              <td>{formatToCurrency(rettrabajo)}</td>
              <td>{formatToCurrency(retbanco)}</td>
              <td>{formatToCurrency(resultado)}</td>
              <td>
                <Link
                  href={`borrador?dni=${dni}`}
                  className="btn btn-primary btn-sm"
                >
                  Detalles
                </Link>
              </td>
            </tr>
          )
        )}
      </tbody>
    </Table>
  )
}
