--CREACION DE TABLAS

CREATE TABLE afiliados(
afi_numero NUMBER(11) NOT NULL,
afi_nombre VARCHAR2(50) NOT NULL,
afi_nacimiento DATE,
plan_codigo NUMBER(8),
CONSTRAINT pk_afiliados PRIMARY KEY (afi_numero)
);

CREATE TABLE planes(
plan_codigo NUMBER(8) NOT NULL,
plan_denom  VARCHAR2(50) NOT NULL,
CONSTRAINT pk_planes PRIMARY KEY (plan_codigo)
);

CREATE TABLE consumos(
con_numero NUMBER(8) NOT NULL,
afi_numero NUMBER(11) NOT NULL,
pres_codigo NUMBER(8) NOT NULL,
con_fecha DATE,
con_cantidad NUMBER(8) DEFAULT 0 NOT NULL,
CONSTRAINT pk_consumos PRIMARY KEY (con_numero)
);

CREATE TABLE prestaciones(
pres_codigo NUMBER(8) NOT NULL,
pres_denom VARCHAR2(50) NOT NULL,
pres_ambito CHAR(1),
pres_costo NUMBER(12,2),
CONSTRAINT pk_prestaciones PRIMARY KEY (pres_codigo)
);

CREATE TABLE cobertura(
plan_codigo NUMBER(8) NOT NULL,
pres_codigo NUMBER(8) NOT NULL,
CONSTRAINT pk_cobertura PRIMARY KEY (plan_codigo, pres_codigo)
);

ALTER TABLE afiliados
ADD CONSTRAINT fk1_afiliados FOREIGN KEY (plan_codigo) 
REFERENCES planes (plan_codigo);

ALTER TABLE consumos ADD (
CONSTRAINT fk1_consumos FOREIGN KEY (afi_numero) 
REFERENCES afiliados (afi_numero),
CONSTRAINT fk2_consumos FOREIGN KEY (pres_codigo) 
REFERENCES prestaciones (pres_codigo)
);

ALTER TABLE cobertura ADD (
CONSTRAINT fk1_cobertura FOREIGN KEY (plan_codigo) 
REFERENCES planes (plan_codigo),
CONSTRAINT fk2_cobertura FOREIGN KEY (pres_codigo) 
REFERENCES prestaciones (pres_codigo)
);


--  INSERCION DE DATOS

INSERT INTO afiliados (afi_numero, afi_nombre, afi_nacimiento, plan_codigo)
VALUES (1, 'Augusto', TO_DATE('01/01/2000','dd/MM/yyyy'), 1);
INSERT INTO afiliados (afi_numero, afi_nombre, afi_nacimiento, plan_codigo)
VALUES (2, 'Juan', TO_DATE('01/01/1991','dd/MM/yyyy'), 2);
INSERT INTO afiliados (afi_numero, afi_nombre, afi_nacimiento, plan_codigo)
VALUES (3, 'Milagros', TO_DATE('01/01/1985','dd/MM/yyyy'), 3);        

INSERT INTO planes (plan_codigo, plan_denom) VALUES (1, 'plan1');
INSERT INTO planes (plan_codigo, plan_denom) VALUES (2, 'plan2');
INSERT INTO planes (plan_codigo, plan_denom) VALUES (3, 'plan3');
        
INSERT INTO prestaciones (pres_codigo, pres_denom, pres_ambito, pres_costo)
VALUES (1, 'prestacion1', 'A', 10);   
INSERT INTO prestaciones (pres_codigo, pres_denom, pres_ambito, pres_costo)
VALUES (1, 'prestacion2', 'A', 33);   
INSERT INTO prestaciones (pres_codigo, pres_denom, pres_ambito, pres_costo)
VALUES (1, 'prestacion3', 'A', 100);   
        
INSERT INTO consumos (con_numero, afi_numero, pres_codigo, con_fecha, con_cantidad)
VALUES (1, 1, 1, TO_DATE('01/01/2020','dd/MM/yyyy'), 1);
INSERT INTO consumos (con_numero, afi_numero, pres_codigo, con_fecha, con_cantidad)
VALUES (2, 1, 1, TO_DATE('01/01/2020','dd/MM/yyyy'), 1);
INSERT INTO consumos (con_numero, afi_numero, pres_codigo, con_fecha, con_cantidad)
VALUES (3, 1, 3, TO_DATE('01/01/2020','dd/MM/yyyy'), 1);
INSERT INTO consumos (con_numero, afi_numero, pres_codigo, con_fecha, con_cantidad)
VALUES (4, 2, 1, TO_DATE('01/01/2020','dd/MM/yyyy'), 1);
INSERT INTO consumos (con_numero, afi_numero, pres_codigo, con_fecha, con_cantidad)
VALUES (5, 2, 1, TO_DATE('01/01/2020','dd/MM/yyyy'), 1);
INSERT INTO consumos (con_numero, afi_numero, pres_codigo, con_fecha, con_cantidad)
VALUES (6, 2, 1, TO_DATE('01/01/2020','dd/MM/yyyy'), 1);
INSERT INTO consumos (con_numero, afi_numero, pres_codigo, con_fecha, con_cantidad)
VALUES (7, 3, 1, TO_DATE('01/01/2020','dd/MM/yyyy'), 1);
INSERT INTO consumos (con_numero, afi_numero, pres_codigo, con_fecha, con_cantidad)
VALUES (8, 3, 1, TO_DATE('01/03/2020','dd/MM/yyyy'), 12);
INSERT INTO consumos (con_numero, afi_numero, pres_codigo, con_fecha, con_cantidad)
VALUES (9, 3, 1, TO_DATE('04/03/2020','dd/MM/yyyy'), 1);

INSERT INTO cobertura (plan_codigo, pres_codigo) VALUES (1, 1);
INSERT INTO cobertura (plan_codigo, pres_codigo) VALUES (2, 1);
INSERT INTO cobertura (plan_codigo, pres_codigo) VALUES (2, 2);
INSERT INTO cobertura (plan_codigo, pres_codigo) VALUES (3, 1);
INSERT INTO cobertura (plan_codigo, pres_codigo) VALUES (3, 2);
INSERT INTO cobertura (plan_codigo, pres_codigo) VALUES (3, 3);


-- QUERIES





--

SELECT a.afi_numero,
       a.afi_nombre,
       p.pres_costo
  FROM afiliados a, consumos c, prestaciones p
 WHERE a.afi_numero = c.con_afiliado
   AND p.pres_codigo = c.con_prestacion
   AND ROWNUM < 101
 ORDER BY p.pres_costo;

                --
                 
SELECT p.pres_codigo,
       p.pres_nombre,
       COUNT(c.con_prestacion)
  FROM consumos c, prestaciones p
 WHERE p.pres_codigo = c.con_prestacion
   AND ROWNUM < 20
   AND c.con_fecha >= (TO_DATE('01/01/2022','dd/MM/yyyy'))
   AND c.con_fecha <= (TO_DATE('31/03/2022','dd/MM/yyyy'))
 GROUP BY p.pres_codigo,
       p.pres_nombre  
 ORDER BY p.pres_costo;

                --

SELECT CASE WHEN c.pres_codigo NOT IN (SELECT cob.pres_codigo 
                                         FROM cobertura cob
                                        WHERE cob.plan_codigo = a.plan_codigo)
            THEN a.afi_numero 
            ELSE NULL END;
       a.afi_nombre,
  FROM afiliados a, consumos c
 WHERE a.afi_numero = c.afi_numero
   AND c.con_fecha >= (TO_DATE('01/01/2020','dd/MM/yyyy'))
   AND c.con_fecha <= (TO_DATE('31/12/2020','dd/MM/yyyy'))
 ORDER BY 1;
