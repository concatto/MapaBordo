-- Created by Vertabelo (http://vertabelo.com)
-- Last modification date: 2017-06-13 23:35:42.673

-- tables
-- Table: captura
CREATE TABLE captura (
    lance_id int  NOT NULL,
    especie_id int  NOT NULL,
    peso real  NOT NULL,
    CONSTRAINT captura_pk PRIMARY KEY (lance_id,especie_id)
);

-- Table: embarcacao
CREATE TABLE embarcacao (
    id serial  NOT NULL,
    nome varchar(255)  NOT NULL,
    tamanho real  NOT NULL,
    CONSTRAINT embarcacao_pk PRIMARY KEY (id)
);

-- Table: especie
CREATE TABLE especie (
    id serial  NOT NULL,
    profundidade_min real  NOT NULL,
    profundidade_max real  NOT NULL,
    nome varchar(255)  NOT NULL,
    CONSTRAINT especie_pk PRIMARY KEY (id)
);

-- Table: fotografia
CREATE TABLE fotografia (
    id serial  NOT NULL,
    caminho varchar(255)  NOT NULL,
    especie_id int  NOT NULL,
    CONSTRAINT fotografia_pk PRIMARY KEY (id)
);

-- Table: lance
CREATE TABLE lance (
    id serial  NOT NULL,
    viagem_id int  NOT NULL,
    hora_inicio timestamp  NOT NULL,
    hora_fim timestamp  NOT NULL,
    comprimento_rede real  NOT NULL,
    altura_rede real  NOT NULL,
    tamanho_malha real  NOT NULL,
    profundidade real  NOT NULL,
    latitude_inicial real  NOT NULL,
    longitude_inicial real  NOT NULL,
    CONSTRAINT lance_pk PRIMARY KEY (id)
);

-- Table: porto
CREATE TABLE porto (
    id serial  NOT NULL,
    adm smallint  NOT NULL,
    nome varchar(255)  NOT NULL,
    ano_fundacao smallint  NOT NULL,
    CONSTRAINT pub_priv CHECK (adm = 0 OR adm = 1) NOT DEFERRABLE INITIALLY IMMEDIATE,
    CONSTRAINT porto_pk PRIMARY KEY (id)
);

-- Table: viagem
CREATE TABLE viagem (
    id serial  NOT NULL,
    embarcacao_id int  NOT NULL,
    porto_saida_id int  NOT NULL,
    porto_chegada_id int  NOT NULL,
    data_saida timestamp  NOT NULL,
    data_chegada timestamp  NOT NULL,
    CONSTRAINT viagem_pk PRIMARY KEY (id)
);

-- foreign keys
-- Reference: fotografia_especie (table: fotografia)
ALTER TABLE fotografia ADD CONSTRAINT fotografia_especie
    FOREIGN KEY (especie_id)
    REFERENCES especie (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: lance_especie_especie (table: captura)
ALTER TABLE captura ADD CONSTRAINT lance_especie_especie
    FOREIGN KEY (especie_id)
    REFERENCES especie (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: lance_especie_lance (table: captura)
ALTER TABLE captura ADD CONSTRAINT lance_especie_lance
    FOREIGN KEY (lance_id)
    REFERENCES lance (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: lance_viagem (table: lance)
ALTER TABLE lance ADD CONSTRAINT lance_viagem
    FOREIGN KEY (viagem_id)
    REFERENCES viagem (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: viagem_embarcacao (table: viagem)
ALTER TABLE viagem ADD CONSTRAINT viagem_embarcacao
    FOREIGN KEY (embarcacao_id)
    REFERENCES embarcacao (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: viagem_porto_chegada (table: viagem)
ALTER TABLE viagem ADD CONSTRAINT viagem_porto_chegada
    FOREIGN KEY (porto_chegada_id)
    REFERENCES porto (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- Reference: viagem_porto_saida (table: viagem)
ALTER TABLE viagem ADD CONSTRAINT viagem_porto_saida
    FOREIGN KEY (porto_saida_id)
    REFERENCES porto (id)  
    NOT DEFERRABLE 
    INITIALLY IMMEDIATE
;

-- End of file.

