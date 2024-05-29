DROP TABLE IF EXISTS EMPRESA1;
DROP TABLE IF EXISTS EMPRESA2;
DROP TABLE IF EXISTS BANCO1;
DROP TABLE IF EXISTS BANCO2;
DROP TABLE IF EXISTS BORRADOR;
DROP TABLE IF EXISTS BORRADORUSUARIO;
DROP TABLE IF EXISTS PARALELA;

BEGIN TRANSACTION;

-- Se presupone un solo empleo para cada trabajador y varios abonos mensuales
CREATE TABLE EMPRESA1 (
    CIF VARCHAR(10),
    DNI VARCHAR(10),
    FECHA DATE,
    BRUTO DECIMAL,
    SS DECIMAL,
    RET DECIMAL,

    PRIMARY KEY (CIF, DNI, FECHA)
);
CREATE TABLE EMPRESA2 (
    CIF VARCHAR(10),
    DNI VARCHAR(10),
    FECHA DATE,
    BRUTO DECIMAL,
    SS DECIMAL,
    RET DECIMAL,
    PRIMARY KEY (CIF, DNI, FECHA)
);

-- Se pueden tener varias cuentas en un mismo banco pero NO en otros
CREATE TABLE BANCO1 (
    CIF VARCHAR(10),
    DNI VARCHAR(10),
    TIPO DECIMAL,
    BRUTO DECIMAL,
    RET DECIMAL,

    PRIMARY KEY (CIF, DNI, TIPO)
);
CREATE TABLE BANCO2 (
    CIF VARCHAR(10),
    DNI VARCHAR(10),
    TIPO DECIMAL,
    BRUTO DECIMAL,
    RET DECIMAL,

    PRIMARY KEY (CIF, DNI, TIPO)
);

CREATE TABLE BORRADOR (
    DNI VARCHAR(10) PRIMARY KEY,
    BRUTOTRABAJO DECIMAL,
    BRUTOBANCO DECIMAL,
    SS DECIMAL,
    RETTRABAJO DECIMAL,
    RETBANCO DECIMAL,
    RESULTADO DECIMAL
);
CREATE TABLE BORRADORUSUARIO (
    DNI VARCHAR(10) PRIMARY KEY,
    BRUTOTRABAJO DECIMAL,
    BRUTOBANCO DECIMAL,
    SS DECIMAL,
    RETTRABAJO DECIMAL,
    RETBANCO DECIMAL,
    RESULTADO DECIMAL
);

CREATE TABLE PARALELA (
    DNI VARCHAR(10) PRIMARY KEY,
    CALCULADA DECIMAL,
    DIFERENCIA DECIMAL
);

COMMIT;