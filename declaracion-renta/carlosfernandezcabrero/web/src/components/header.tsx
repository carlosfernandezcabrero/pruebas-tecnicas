import Link from 'next/link'

export default function Header() {
  return (
    <header className="bg-body-tertiary">
      <nav className="navbar navbar-expand-lg container">
        <div className="container-fluid">
          <h1>
            <Link href="/" className="navbar-brand">
              Declaración de la Renta
            </Link>
          </h1>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0" />
          </div>
        </div>
      </nav>
    </header>
  )
}
