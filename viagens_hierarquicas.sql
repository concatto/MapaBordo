CREATE VIEW viagens_hierarquicas AS (

	WITH

	fCapturas AS (
	  SELECT 
	    c.*,
	    row_to_json(e.*) AS especie
	  FROM captura c
	  INNER JOIN especie e ON e.id = c.especie_id
	),

	fLances AS (
	  SELECT
		lance.*,
		CASE WHEN COUNT(c.lance_id) = 0 THEN '[]' ELSE json_agg(c.*) END AS capturas
	  FROM lance
	  LEFT JOIN fCapturas c ON lance.id = c.lance_id
	  GROUP BY lance.id
	)

	SELECT
	  viagem.*,
	  row_to_json(e.*) AS embarcacao,
	  row_to_json(pc.*) AS porto_chegada,
	  row_to_json(ps.*) AS porto_saida,
	  CASE WHEN COUNT(l.id) = 0 THEN '[]' ELSE json_agg(l.*) END AS lances
	FROM viagem
	JOIN embarcacao e ON e.id = viagem.embarcacao_id
	JOIN porto pc ON pc.id = viagem.porto_chegada_id
	JOIN porto ps ON ps.id = viagem.porto_saida_id
	LEFT JOIN fLances l ON viagem.id = l.viagem_id
	GROUP BY viagem.id, e.id, pc.id, ps.id
);

SELECT * FROM viagens_hierarquicas