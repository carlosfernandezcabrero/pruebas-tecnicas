/* eslint-disable multiline-ternary */
'use client'

import TableBorradores from '@/components/table-borradores'
import { Borrador } from '@/types'
import { useEffect, useState } from 'react'

interface Props {
  borradores: Borrador[]
}

export default function HomeClient({ borradores }: Props) {
  const [search, setSearch] = useState<string>('')
  const [filteredBorradores, setFilteredBorradores] = useState<Borrador[]>([])

  useEffect(() => {
    if (search !== '') {
      const filtered = borradores.filter(({ dni }) =>
        dni.toLowerCase().startsWith(search.toLowerCase())
      )

      setFilteredBorradores(filtered)
    } else {
      setFilteredBorradores(borradores)
    }
  }, [search, borradores])

  function handleSubmit(formData: FormData) {
    const dni = formData.get('q') as string

    setSearch(dni)
  }

  return (
    <div>
      <form
        className="d-flex column-gap-4 align-items-end"
        action={handleSubmit}
      >
        <div className="flex-grow-1">
          <label htmlFor="site-search" className="form-label fw-medium">
            Buscar borrador:
          </label>
          <input
            type="search"
            id="site-search"
            name="q"
            placeholder="borrador"
            className="form-control"
          />
        </div>

        <footer>
          <button type="submit" className="btn btn-primary">
            Buscar
          </button>
        </footer>
      </form>
      <p className="fs-5 mt-4">
        →{' '}
        {search === '' ? (
          <>Mostrando todos los borradores</>
        ) : (
          <>Buscando DNI "{search}"</>
        )}
      </p>
      <TableBorradores borradores={filteredBorradores} />
    </div>
  )
}
