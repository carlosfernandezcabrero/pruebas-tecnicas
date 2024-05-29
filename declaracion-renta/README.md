# Declaración de la renta

- [Declaración de la renta](#declaración-de-la-renta)
  - [Descripción del proyecto](#descripción-del-proyecto)
  - [Enunciado](#enunciado)

## Descripción del proyecto

Ejercicio de PL/SQL del tercer trimestre de 1º de DAW.

## Enunciado

Hacienda quiere preparar los borradores de la declaración de la renta de 2023.

Dispone de cuatro tablas cuyos datos han sido obtenidos por las presentaciones de dos empresas y dos bancos.

La estructura de las tablas EMPRESA1 y EMPRESA2 es la siguiente:

```SQL
CREATE TABLE EMPRESA1 (
    CIF VARCHAR2(10),   --CIF DE LA EMPRESA
    DNI VARCHAR2(10),   --DNI TRABAJADOR
    FECHA DATE,         --FECHA DE ABONO NÓMINA
    BRUTO NUMBER,       --RETRIBUCIÓN BRUTA MENSUAL
    SS NUMBER,          --COTIZACIÓN SEG. SOCIAL DEL MES
    RET NUMBER,         --RETENCIÓN DEL MES
    PRIMARY KEY (CIF,DNI,FECHA)
);
```

*Para EMPRESA2 misma estructura.*\
*NOTA: Se presupone UN SOLO empleo para cada trabajador, y varios abonos mensuales.*

La estructura de las tablas BANCO1 y BANCO2 es la siguiente:

```SQL
CREATE TABLE BANCO1 (
    CIF VARCHAR2(10),   --CIF DEL BANCO
    DNI VARCHAR2(10),   --DNI DEL CLIENTE
    TIPO NUMBER,        --TIPO DE CUENTA (1, 2, 3,ETC)
    BRUTO NUMBER,       --INTERESES BRUTOS
    RET NUMBER,         --RETENCIÓN DE INTERESES
    PRIMARY KEY (CIF,DNI,TIPO)
);
```

*Para BANCO2 misma estructura.*\
*NOTA: Se pueden tener VARIAS CUENTAS en un mismo banco PERO NO EN OTROS.*

Se deberá crear un procedimiento que al lanzarlo cargue de datos dos tablas exactamente iguales (BORRADOR y BORRADORUSUARIO) con esta estructura:

```SQL
CREATE TABLE BORRADOR (
    DNI VARCHAR2(10) PRIMARY KEY,   --DNI CIUDADANO
    BRUTOTRABAJO NUMBER,            --IMPORTE TOTAL BRUTO TRABAJO
    BRUTOBANCO NUMBER,              --IMPORTE TOTAL INTERESES BANCO
    SS NUMBER,                      --IMPORTE TOTAL COT.SS.
    RETTRABAJO NUMBER,              --IMPORTE TOTAL RETENCIÓN TRABAJO
    RETBANCO NUMBER,                --IMPORTE TOTAL RETENCIÓN BANCOS
    RESULTADO NUMBER                --CALCULAR LIQUIDACIÓN SEGÚN SE INDICA
);
```

*Para BORRADORUSUARIO misma estructura.*

<u>CALCULO DEL RESULTADO DE BORRADOR</u>

CUOTA DE TRABAJO SERA:\
SOBRE LA BASE DE BRUTO TRABAJO - SES. SOCIAL APLICAMOS UN TIPO

- si es menor de 11.000: 10%
- si es menor de 17.000: 20%
- si es menor de 20.000: 30%
- si es mayor de 20.000: 40%

*ACLARACIÓN: Al total de la cotización de la seguridad social le aplicamos el tipo en base al salario bruto y el resultado se los restamos al salario bruto.*

CUOTA INTERESES SERA:\
SE APLICA UN 20% PARA EL IMPORTE TOTAL DE INTERESES

FINALMENTE

RESULTADO = CUOTA DE TRABAJO + CUOTA DE INTERESES - RETTRABAJO - RET.INTERESES (RETBANCO)

Se deberá -además- codificar  un disparador sobre la tabla BORRADORUSUARIO (generada automáticamente por el procedimiento anterior).\
*Esta tabla es la que puede modificar el usuario si no esta conforme con el borrador.*

El nuevo calculo de resultado se almacenara automáticamente en la tabla BORRADORUSUARIO.

El disparador -ademas- rellenara otra tabla que posee esta estructura, calculando la nueva liquidación teniendo en cuenta las modificaciones del ciudadano.

```SQL
CREATE TABLE PARALELA (
    DNI VARCHAR2(10) PRIMARY KEY,
    CALCULADA NUMBER,
    DIFERENCIA NUMBER
);
```

En calculada, registraremos el resultado que hacienda a calculado.\
En diferencia pondremos la diferencia entre la calculada por hacienda y la nueva liquidación con las modificaciones del ciudadano.

Por otra parte, a continuación se facilitan los inserts necesarios para rellenar las tablas base con datos:

```SQL
insert into BANCO1 (CIF, DNI, TIPO, BRUTO, RET) values ('33333333-V', '11111111-B', 1, 300, 75);
insert into BANCO1 (CIF, DNI, TIPO, BRUTO, RET) values ('33333333-V', '11111111-B', 2, 100, 25);
insert into BANCO1 (CIF, DNI, TIPO, BRUTO, RET) values ('33333333-V', '11111111-C', 1, 100, 25);
insert into BANCO1 (CIF, DNI, TIPO, BRUTO, RET) values ('33333333-V', '11111111-D', 1, 0, 0);
insert into BANCO1 (CIF, DNI, TIPO, BRUTO, RET) values ('33333333-V', '11111111-D', 2, 10, 2);
insert into BANCO1 (CIF, DNI, TIPO, BRUTO, RET) values ('33333333-V', '11111111-D', 3, 20, 4);
-- insert into BANCO1 (CIF, DNI, TIPO, BRUTO, RET) values ('33333333-V', '11111111-E', 1, 200, 47);

insert into BANCO2 (CIF, DNI, TIPO, BRUTO, RET) values ('44444444-X', '11111111-F', 1, 50, 20);
insert into BANCO2 (CIF, DNI, TIPO, BRUTO, RET) values ('44444444-X', '11111111-F', 2, 100, 25);
insert into BANCO2 (CIF, DNI, TIPO, BRUTO, RET) values ('44444444-X', '11111111-G', 1, 200, 50);
insert into BANCO2 (CIF, DNI, TIPO, BRUTO, RET) values ('44444444-X', '11111111-E', 1, 200, 47);
insert into BANCO2 (CIF, DNI, TIPO, BRUTO, RET) values ('44444444-X', '11111111-E', 2, 200, 47);

insert into EMPRESA1 (CIF, DNI, FECHA, BRUTO, SS, RET)
values ('11111111-A', '11111111-B', TO_DATE('31-01-2016', '%d-%m-%Y'), 1500, 200, 40);
insert into EMPRESA1 (CIF, DNI, FECHA, BRUTO, SS, RET)
values ('11111111-A', '11111111-B', TO_DATE('29-02-2016', '%d-%m-%Y'), 1500, 200, 40);
insert into EMPRESA1 (CIF, DNI, FECHA, BRUTO, SS, RET)
values ('11111111-A', '11111111-B', TO_DATE('31-03-2016', '%d-%m-%Y'), 1500, 200, 40);
insert into EMPRESA1 (CIF, DNI, FECHA, BRUTO, SS, RET)
values ('11111111-A', '11111111-B', TO_DATE('30-04-2016', '%d-%m-%Y'), 1500, 200,40);
insert into EMPRESA1 (CIF, DNI, FECHA, BRUTO, SS, RET)
values ('11111111-A', '11111111-B', TO_DATE('31-05-2016', '%d-%m-%Y'), 1500, 200, 40);
insert into EMPRESA1 (CIF, DNI, FECHA, BRUTO, SS, RET)
values ('11111111-A', '11111111-B', TO_DATE('30-06-2016', '%d-%m-%Y'), 3000, 400, 80);
insert into EMPRESA1 (CIF, DNI, FECHA, BRUTO, SS, RET)
values ('11111111-A', '11111111-C', TO_DATE('31-01-2016', '%d-%m-%Y'), 1000, 100, 30);
insert into EMPRESA1 (CIF, DNI, FECHA, BRUTO, SS, RET)
values ('11111111-A', '11111111-C', TO_DATE('29-02-2016', '%d-%m-%Y'), 1000, 100, 30);
insert into EMPRESA1 (CIF, DNI, FECHA, BRUTO, SS, RET)
values ('11111111-A', '11111111-C', TO_DATE('31-03-2016', '%d-%m-%Y'), 1000, 100, 30);
insert into EMPRESA1 (CIF, DNI, FECHA, BRUTO, SS, RET)
values ('11111111-A', '11111111-C', TO_DATE('30-04-2016', '%d-%m-%Y'), 1000, 100, 30);
insert into EMPRESA1 (CIF, DNI, FECHA, BRUTO, SS, RET)
values ('11111111-A', '11111111-C', TO_DATE('31-05-2016', '%d-%m-%Y'), 500, 50, 200);
insert into EMPRESA1 (CIF, DNI, FECHA, BRUTO, SS, RET)
values ('11111111-A', '11111111-C', TO_DATE('30-06-2016', '%d-%m-%Y'), 2000, 200, 60);
insert into EMPRESA1 (CIF, DNI, FECHA, BRUTO, SS, RET)
values ('11111111-A', '11111111-D', TO_DATE('31-01-2016', '%d-%m-%Y'), 2000, 150, 45);
insert into EMPRESA1 (CIF, DNI, FECHA, BRUTO, SS, RET)
values ('11111111-A', '11111111-D', TO_DATE('29-02-2016', '%d-%m-%Y'), 2000, 150, 45);
insert into EMPRESA1 (CIF, DNI, FECHA, BRUTO, SS, RET)
values ('11111111-A', '11111111-D', TO_DATE('31-03-2016', '%d-%m-%Y'), 2000, 150, 45);
insert into EMPRESA1 (CIF, DNI, FECHA, BRUTO, SS, RET)
values ('11111111-A', '11111111-D', TO_DATE('30-04-2016', '%d-%m-%Y'), 2000, 150, 45);
insert into EMPRESA1 (CIF, DNI, FECHA, BRUTO, SS, RET)
values ('11111111-A', '11111111-D', TO_DATE('31-05-2016', '%d-%m-%Y'), 2000, 150, 45);
insert into EMPRESA1 (CIF, DNI, FECHA, BRUTO, SS, RET)
values ('11111111-A', '11111111-D', TO_DATE('30-06-2016', '%d-%m-%Y'), 4000, 300, 90);
insert into EMPRESA1 (CIF, DNI, FECHA, BRUTO, SS, RET)
values ('11111111-A', '11111111-I', TO_DATE('31-01-2016', '%d-%m-%Y'), 2000, 150, 45);
insert into EMPRESA1 (CIF, DNI, FECHA, BRUTO, SS, RET)
values ('11111111-A', '11111111-I', TO_DATE('29-02-2016', '%d-%m-%Y'), 2000, 150, 45);
insert into EMPRESA1 (CIF, DNI, FECHA, BRUTO, SS, RET)
values ('11111111-A', '11111111-I', TO_DATE('31-03-2016', '%d-%m-%Y'), 2000, 150, 45);
insert into EMPRESA1 (CIF, DNI, FECHA, BRUTO, SS, RET)
values ('11111111-A', '11111111-I', TO_DATE('30-04-2016', '%d-%m-%Y'), 2000, 150, 45);
insert into EMPRESA1 (CIF, DNI, FECHA, BRUTO, SS, RET)
values ('11111111-A', '11111111-I', TO_DATE('31-05-2016', '%d-%m-%Y'), 2000, 150, 45);
insert into EMPRESA1 (CIF, DNI, FECHA, BRUTO, SS, RET)
values ('11111111-A', '11111111-I', TO_DATE('30-06-2016', '%d-%m-%Y'), 4000, 300, 90);

insert into EMPRESA2 (CIF, DNI, FECHA, BRUTO, SS, RET)
values ('22222222-W', '11111111-E', TO_DATE('31-01-2016', '%d-%m-%Y'), 750, 75, 10);
insert into EMPRESA2 (CIF, DNI, FECHA, BRUTO, SS, RET)
values ('22222222-W', '11111111-E', TO_DATE('29-02-2016', '%d-%m-%Y'), 750, 75, 10);
insert into EMPRESA2 (CIF, DNI, FECHA, BRUTO, SS, RET)
values ('22222222-W', '11111111-E', TO_DATE('31-03-2016', '%d-%m-%Y'), 750, 75, 10);
insert into EMPRESA2 (CIF, DNI, FECHA, BRUTO, SS, RET)
values ('22222222-W', '11111111-E', TO_DATE('30-04-2016', '%d-%m-%Y'), 750, 75, 10);
insert into EMPRESA2 (CIF, DNI, FECHA, BRUTO, SS, RET)
values ('22222222-W', '11111111-E', TO_DATE('31-05-2016', '%d-%m-%Y'), 750, 75, 10);
insert into EMPRESA2 (CIF, DNI, FECHA, BRUTO, SS, RET)
values ('22222222-W', '11111111-E', TO_DATE('30-06-2016', '%d-%m-%Y'), 1500, 150, 10);
insert into EMPRESA2 (CIF, DNI, FECHA, BRUTO, SS, RET)
values ('22222222-W', '11111111-F', TO_DATE('31-01-2016', '%d-%m-%Y'), 2000, 150, 45);
insert into EMPRESA2 (CIF, DNI, FECHA, BRUTO, SS, RET)
values ('22222222-W', '11111111-F', TO_DATE('29-02-2016', '%d-%m-%Y'), 2000, 150, 45);
insert into EMPRESA2 (CIF, DNI, FECHA, BRUTO, SS, RET)
values ('22222222-W', '11111111-F', TO_DATE('31-03-2016', '%d-%m-%Y'), 2000, 150, 45);
insert into EMPRESA2 (CIF, DNI, FECHA, BRUTO, SS, RET)
values ('22222222-W', '11111111-F', TO_DATE('30-04-2016', '%d-%m-%Y'), 2000, 150, 45);
insert into EMPRESA2 (CIF, DNI, FECHA, BRUTO, SS, RET)
values ('22222222-W', '11111111-F', TO_DATE('31-05-2016', '%d-%m-%Y'), 2000, 150, 45);
insert into EMPRESA2 (CIF, DNI, FECHA, BRUTO, SS, RET)
values ('22222222-W', '11111111-F', TO_DATE('30-06-2016', '%d-%m-%Y'), 2000, 150, 90);
insert into EMPRESA2 (CIF, DNI, FECHA, BRUTO, SS, RET)
values ('22222222-W', '11111111-G', TO_DATE('31-01-2016', '%d-%m-%Y'), 4000, 300, 90);
insert into EMPRESA2 (CIF, DNI, FECHA, BRUTO, SS, RET)
values ('22222222-W', '11111111-G', TO_DATE('29-02-2016', '%d-%m-%Y'), 4000, 300, 90);
insert into EMPRESA2 (CIF, DNI, FECHA, BRUTO, SS, RET)
values ('22222222-W', '11111111-G', TO_DATE('31-03-2016', '%d-%m-%Y'), 4000, 300, 90);
insert into EMPRESA2 (CIF, DNI, FECHA, BRUTO, SS, RET)
values ('22222222-W', '11111111-G', TO_DATE('30-04-2016', '%d-%m-%Y'), 4000, 300, 90);
insert into EMPRESA2 (CIF, DNI, FECHA, BRUTO, SS, RET)
values ('22222222-W', '11111111-G', TO_DATE('31-05-2016', '%d-%m-%Y'), 4000, 300, 90);
insert into EMPRESA2 (CIF, DNI, FECHA, BRUTO, SS, RET)
values ('22222222-W', '11111111-G', TO_DATE('30-06-2016', '%d-%m-%Y'), 4000, 300, 90);
insert into EMPRESA2 (CIF, DNI, FECHA, BRUTO, SS, RET)
values ('22222222-W', '11111111-H', TO_DATE('31-01-2016', '%d-%m-%Y'), 3000, 200, 70);
insert into EMPRESA2 (CIF, DNI, FECHA, BRUTO, SS, RET)
values ('22222222-W', '11111111-H', TO_DATE('29-02-2016', '%d-%m-%Y'), 3000, 200, 70);
insert into EMPRESA2 (CIF, DNI, FECHA, BRUTO, SS, RET)
values ('22222222-W', '11111111-H', TO_DATE('31-03-2016', '%d-%m-%Y'), 3000, 200, 70);
insert into EMPRESA2 (CIF, DNI, FECHA, BRUTO, SS, RET)
values ('22222222-W', '11111111-H', TO_DATE('30-04-2016', '%d-%m-%Y'), 3000, 200, 70);
insert into EMPRESA2 (CIF, DNI, FECHA, BRUTO, SS, RET)
values ('22222222-W', '11111111-H', TO_DATE('31-05-2016', '%d-%m-%Y'), 3000, 200, 70);
insert into EMPRESA2 (CIF, DNI, FECHA, BRUTO, SS, RET)
values ('22222222-W', '11111111-H', TO_DATE('30-06-2016', '%d-%m-%Y'), 3000, 200, 70);
insert into EMPRESA2 (CIF, DNI, FECHA, BRUTO, SS, RET)
values ('22222222-W', '11111111-H', TO_DATE('31-07-2016', '%d-%m-%Y'), 3000, 200, 70);
```
