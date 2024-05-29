CREATE OR REPLACE FUNCTION get_tipo_ss(total_salario_bruto NUMERIC)
  RETURNS NUMERIC IMMUTABLE
  LANGUAGE PLPGSQL
AS
$$
DECLARE
  tipo_ss NUMERIC;
BEGIN
  IF total_salario_bruto < 11000 THEN tipo_ss = 10;
  ELSIF total_salario_bruto < 17000 THEN tipo_ss = 20;
  ELSIF total_salario_bruto < 20000 THEN tipo_ss = 30;
  ELSEIF total_salario_bruto > 20000 THEN tipo_ss = 40;
  END IF;

  RETURN tipo_ss;
END;
$$;

CREATE OR REPLACE FUNCTION get_resultado(
    total_salario_bruto NUMERIC,
    total_intereses_banco NUMERIC,
    total_retencion_banco NUMERIC,
    total_irpf NUMERIC,
    ss NUMERIC
)
  RETURNS NUMERIC IMMUTABLE
  LANGUAGE PLPGSQL
AS
$$
DECLARE
  RESULTADO NUMERIC;
BEGIN
  RESULTADO = (
    (
      (total_salario_bruto - (ss * (get_tipo_ss(total_salario_bruto) / 100))) + (total_intereses_banco * 0.2)
    ) - total_retencion_banco - total_irpf
  );

  RETURN RESULTADO;
END;
$$;

CREATE OR REPLACE FUNCTION actualizar_resultado()
  RETURNS TRIGGER VOLATILE
  LANGUAGE PLPGSQL
AS
$$
DECLARE
  new_resultado DECIMAL;
  new_diferencia DECIMAL;
  DNI_BORRADOR BORRADOR.DNI%TYPE;
  RESULTADO_BORRADOR BORRADOR.RESULTADO%TYPE;
  RETBANCO BORRADOR.RETBANCO%TYPE;
  RETTRABAJO BORRADOR.RETTRABAJO%TYPE;
  SS BORRADOR.SS%TYPE;
BEGIN
  SELECT BORRADOR.RESULTADO, BORRADOR.RETBANCO, BORRADOR.RETTRABAJO, BORRADOR.SS, BORRADOR.DNI
  INTO RESULTADO_BORRADOR, RETBANCO, RETTRABAJO, SS, DNI_BORRADOR
  FROM BORRADOR WHERE BORRADOR.DNI = NEW.DNI FOR NO KEY UPDATE;

  new_resultado = get_resultado(
    NEW.BRUTOTRABAJO, NEW.BRUTOBANCO, RETBANCO, RETTRABAJO, SS
  );
  new_diferencia = RESULTADO_BORRADOR - new_resultado;

  NEW.RESULTADO = new_resultado;

  INSERT INTO PARALELA (DNI, CALCULADA, DIFERENCIA) VALUES (DNI_BORRADOR, new_resultado, new_diferencia)
  ON CONFLICT (DNI) DO UPDATE SET
    CALCULADA = new_resultado,
    DIFERENCIA = new_diferencia;

  RETURN NEW;
END;
$$;