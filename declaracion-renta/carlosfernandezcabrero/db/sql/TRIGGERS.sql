CREATE OR REPLACE TRIGGER actualizar_resultado BEFORE UPDATE ON BORRADORUSUARIO
  FOR EACH ROW EXECUTE FUNCTION actualizar_resultado();