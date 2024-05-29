export default function Table({
  children
}: {
  children: Readonly<React.ReactNode>
}) {
  return (
    <table className="table table-bordered table-striped table-light rounded">
      {children}
    </table>
  )
}
