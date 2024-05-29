import { Pool } from 'pg'

const CONFIG = {
  user: 'admin',
  host: 'localhost',
  database: 'main',
  password: 'admin'
}

let db: Pool

if (process.env.NODE_ENV === 'production') {
  db = new Pool(CONFIG)
} else {
  // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
  if (!(global as any).db) (global as any).db = new Pool(CONFIG)

  db = (global as any).db
}

export default db
