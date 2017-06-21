INSERT INTO embarcacao (id, nome, tamanho) VALUES 
	(1, 'Borealis', 30),
	(2, 'Galeão Gangplank', 50),
	(3, 'USS Liberty', 100),
	(4, 'Pérola Negra', 66.666);

INSERT INTO porto (id, nome, adm, ano_fundacao) VALUES 
	(1, 'Porto de Itajaí', 1, 1980),
	(2, 'Porto de São Paulo', 0, 1920),
	(3, 'Port of New York', 1, 1833);
	
INSERT INTO especie (id, nome, profundidade_min, profundidade_max) VALUES
	(1, 'Tainha', 10, 100),
	(2, 'Atum', 20, 50),
	(3, 'Merluza', 50, 60),
	(4, 'Sardinha', 100, 1000);
	
INSERT INTO fotografia (id, caminho, especie_id) VALUES
	(1, '/assets/tainha1.jpg', 1),
	(2, '/assets/tainha2.jpg', 1),
	(3, '/assets/tainha3.jpg', 1),
	(4, '/assets/tainha4.png', 1);
	
INSERT INTO viagem (id, embarcacao_id, porto_saida_id, porto_chegada_id, data_saida, data_chegada) VALUES
	(1, 1, 1, 2, '2010-03-20', '2010-03-21'),
	(2, 2, 2, 1, '2010-03-22', '2010-03-23'),
	(3, 2, 1, 3, '2010-04-24', '2010-04-25'),
	(4, 3, 1, 2, '2010-06-26', '2010-06-27'),
	(5, 4, 3, 2, '2010-07-20', '2010-07-21'),
	(6, 4, 3, 2, '2011-01-20', '2011-01-21'),
	(7, 4, 3, 2, '2011-01-22', '2011-01-24');
	
INSERT INTO lance (id, viagem_id, hora_inicio, hora_fim, comprimento_rede, altura_rede, tamanho_malha, profundidade, latitude_inicial, longitude_inicial) VALUES
	(1, 1, '2010-03-20', '2010-03-20', 1, 2, 3, 4, 5, 6),
	(2, 1, '2010-03-20', '2010-03-20', 1, 2, 3, 4, 5, 6),
	(3, 2, '2010-03-22', '2010-03-22', 1, 2, 3, 4, 5, 6),
	(4, 5, '2010-07-20', '2010-07-20', 1, 2, 3, 4, 5, 6),
	(5, 5, '2010-07-20', '2010-07-20', 1, 2, 3, 4, 5, 6),
	(6, 3, '2010-04-24', '2010-04-24', 1, 2, 3, 4, 5, 6),
	(7, 3, '2010-04-24', '2010-04-24', 1, 2, 3, 4, 5, 6),
	(8, 4, '2010-06-26', '2010-06-26', 1, 2, 3, 4, 5, 6),
	(9, 3, '2010-04-24', '2010-04-24', 1, 2, 3, 4, 5, 6);
	
INSERT INTO captura (lance_id, especie_id, peso) VALUES 
	(1, 1, 10),
	(1, 2, 12),
	(2, 1, 18),
	(2, 2, 4),
	(3, 1, 4),
	(4, 3, 15),
	(5, 4, 1),
	(5, 2, 6),
	(6, 3, 7),
	(6, 4, 11),
	(7, 1, 98),	
	(7, 3, 5);