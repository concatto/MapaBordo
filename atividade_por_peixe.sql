SELECT 
	especie.nome,
	COALESCE(SUM(peso), 0) AS total_capturado,
	extract('year' from g) AS ano,
	to_char(g, 'TMMonth') AS mes,
	extract('month' from g)::int AS mes_idx
FROM (
	SELECT generate_series(
		(SELECT MIN(data_saida) FROM viagem),
		(SELECT MAX(data_saida) FROM viagem),
		'1 month'::interval
	)::date AS g
) AS g
CROSS JOIN especie
FULL OUTER JOIN viagem
	ON extract('month' from viagem.data_saida) = extract('month' from g)
	AND extract('year' from viagem.data_saida) = extract('year' from g)
FULL OUTER JOIN lance
	ON viagem.id = lance.viagem_id
FULL OUTER JOIN captura
	ON captura.lance_id = lance.id
	AND captura.especie_id = especie.id
GROUP BY g, especie.nome ORDER BY especie.nome, g;