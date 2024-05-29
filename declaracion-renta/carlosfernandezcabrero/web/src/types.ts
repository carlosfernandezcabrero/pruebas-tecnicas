export interface Borrador {
  dni: string
  brutotrabajo: number
  brutobanco: number
  ss: number
  rettrabajo: number
  retbanco: number
  resultado: number
}

export interface EmpresaDetail {
  dni: string
  cif: string
  fecha: Date
  bruto: number
  ss: number
  ret: number
}

export interface BancoDetail {
  cif: string
  dni: string
  tipo: number
  bruto: number
  ret: number
}
