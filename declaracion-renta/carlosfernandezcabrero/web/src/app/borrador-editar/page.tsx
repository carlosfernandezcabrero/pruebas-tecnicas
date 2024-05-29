/* eslint-disable @typescript-eslint/promise-function-async */
/* eslint-disable @typescript-eslint/no-misused-promises */
import db from '@/lib/repository'
import queries from '@/queries'
import { redirect } from 'next/navigation'

export default async function BorradorEditar({
  searchParams
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const dni = searchParams.dni as string

  async function updateBorrador(formData: FormData) {
    'use server'

    const dni = formData.get('dni') as string
    const salarioBruto = formData.get('salario_bruto') as string
    const intGenerados = formData.get('int_generados') as string

    await db.query(queries.borradores.updateByDNI(), [
      salarioBruto,
      intGenerados,
      dni
    ])

    redirect(`/borrador?dni=${dni}`)
  }

  return (
    <section>
      <h2 className="fs-4">Editar borrador</h2>

      <form className="mt-4" action={updateBorrador}>
        <div className="row">
          <div className="col">
            <label htmlFor="dni" className="form-label fw-medium">
              DNI
            </label>
            <input
              type="text"
              id="dni"
              name="dni"
              value={dni}
              readOnly
              className="form-control"
            />
          </div>
          <div className="col">
            <label htmlFor="salario_bruto" className="form-label fw-medium">
              Salario bruto percibido
            </label>
            <input
              type="number"
              id="salario_bruto"
              name="salario_bruto"
              className="form-control"
            />
          </div>
          <div className="col">
            <label htmlFor="int_generados" className="form-label fw-medium">
              Intereses generados
            </label>
            <input
              type="number"
              id="int_generados"
              name="int_generados"
              className="form-control"
            />
          </div>
        </div>

        <footer className="text-center">
          <button type="submit" className="btn btn-primary mt-5">
            Guardar
          </button>
        </footer>
      </form>
    </section>
  )
}
