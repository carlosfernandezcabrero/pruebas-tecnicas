CREATE OR REPLACE PROCEDURE calculo_oficial()
  LANGUAGE plpgsql
AS
$$
DECLARE
  dni_trabajador VARCHAR(10);
  total_salario_bruto NUMERIC;
  total_ss DECIMAL;
  total_irpf DECIMAL;
  total_retencion_banco DECIMAL;
  total_intereses_banco DECIMAL;
  tipo_ss NUMERIC;
  resultado DECIMAL;
  CURS CURSOR FOR SELECT  EMPRESA.DNI,
                          EMPRESA.TOTAL_BRUTO_EMPRESA,
                          EMPRESA.TOTAL_SS,
                          EMPRESA.TOTAL_IRPF,
                          BANCO.TOTAL_COMISIONES,
                          BANCO.TOTAL_BRUTO_BANCO
                  FROM
                      (
                          SELECT  SUM(BRUTO) AS TOTAL_BRUTO_EMPRESA,
                                  SUM(SS) AS TOTAL_SS,
                                  SUM(RET) AS TOTAL_IRPF,
                                  DNI
                          FROM EMPRESA1 GROUP BY DNI
                        UNION
                          SELECT  SUM(BRUTO) AS TOTAL_BRUTO_EMPRESA,
                                  SUM(SS) AS TOTAL_SS,
                                  SUM(RET) AS TOTAL_IRPF,
                                  DNI
                          FROM EMPRESA2 GROUP BY DNI
                      ) AS EMPRESA
                    INNER JOIN
                      (
                          SELECT SUM(BRUTO) AS TOTAL_BRUTO_BANCO, SUM(RET) TOTAL_COMISIONES, DNI
                          FROM BANCO1 GROUP BY DNI
                        UNION
                          SELECT SUM(BRUTO) AS TOTAL_BRUTO_BANCO, SUM(RET) TOTAL_COMISIONES, DNI
                          FROM BANCO2 GROUP BY DNI
                      ) AS BANCO USING (DNI);
BEGIN
  OPEN CURS;
    LOOP FETCH NEXT FROM CURS INTO
                                  dni_trabajador,
                                  total_salario_bruto,
                                  total_ss,
                                  total_irpf,
                                  total_retencion_banco,
                                  total_intereses_banco;
      EXIT WHEN NOT FOUND;

      resultado = get_resultado(
        total_salario_bruto, total_intereses_banco, total_retencion_banco, total_irpf, total_ss
      );

      INSERT INTO BORRADOR (DNI, BRUTOTRABAJO, BRUTOBANCO, SS, RETTRABAJO, RETBANCO, RESULTADO)
      VALUES (
        dni_trabajador, total_salario_bruto, total_intereses_banco, total_ss, total_irpf, total_retencion_banco, resultado
      );
      INSERT INTO BORRADORUSUARIO (DNI, BRUTOTRABAJO, BRUTOBANCO, SS, RETTRABAJO, RETBANCO, RESULTADO)
      VALUES (
        dni_trabajador, total_salario_bruto, total_intereses_banco, total_ss, total_irpf, total_retencion_banco, resultado
      );

    END LOOP;

  CLOSE CURS;

END;

$$;

CALL calculo_oficial();