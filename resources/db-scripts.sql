--
--Create the database
--
CREATE DATABASE highplume_v2;

--
--Connect to the database
--
\c highplume_v2;


--
--Connect to the database
--
\c highplume_v2;



/* 

--entity_x_section_x_field

INSERT INTO entity_x_section_x_field (entity_id, section_id, field_id) 
	VALUES ((SELECT id FROM entity WHERE name = 'Enterprise Bank'),
			(SELECT id FROM section WHERE name = 'individual_info' AND entity_id = (SELECT id FROM entity WHERE name = 'Enterprise Bank')),
			(SELECT id FROM field WHERE entity_id = (SELECT id FROM entity WHERE name = 'Enterprise Bank') AND field_type_id = (SELECT id FROM field_type WHERE system_f_code_id = (SELECT id FROM system_f_code WHERE system_name = 'Borrower_Full_Name')))
			);
INSERT INTO entity_x_section_x_field (entity_id, section_id, field_id) 
	VALUES ((SELECT id FROM entity WHERE name = 'Enterprise Bank'),
			(SELECT id FROM section WHERE name = 'individual_info' AND entity_id = (SELECT id FROM entity WHERE name = 'Enterprise Bank')),
			(SELECT id FROM field WHERE entity_id = (SELECT id FROM entity WHERE name = 'Enterprise Bank') AND field_type_id = (SELECT id FROM field_type WHERE system_f_code_id = (SELECT id FROM system_f_code WHERE system_name = 'Borrower_Address_Street')))
			);
INSERT INTO entity_x_section_x_field (entity_id, section_id, field_id) 
	VALUES ((SELECT id FROM entity WHERE name = 'Enterprise Bank'),
			(SELECT id FROM section WHERE name = 'individual_info' AND entity_id = (SELECT id FROM entity WHERE name = 'Enterprise Bank')),
			(SELECT id FROM field WHERE entity_id = (SELECT id FROM entity WHERE name = 'Enterprise Bank') AND field_type_id = (SELECT id FROM field_type WHERE system_f_code_id = (SELECT id FROM system_f_code WHERE system_name = 'Borrower_Address_City')))
			);
INSERT INTO entity_x_section_x_field (entity_id, section_id, field_id) 
	VALUES ((SELECT id FROM entity WHERE name = 'Enterprise Bank'),
			(SELECT id FROM section WHERE name = 'individual_info' AND entity_id = (SELECT id FROM entity WHERE name = 'Enterprise Bank')),
			(SELECT id FROM field WHERE entity_id = (SELECT id FROM entity WHERE name = 'Enterprise Bank') AND field_type_id = (SELECT id FROM field_type WHERE system_f_code_id = (SELECT id FROM system_f_code WHERE system_name = 'Borrower_Address_State')))
			);
INSERT INTO entity_x_section_x_field (entity_id, section_id, field_id) 
	VALUES ((SELECT id FROM entity WHERE name = 'Enterprise Bank'),
			(SELECT id FROM section WHERE name = 'individual_info' AND entity_id = (SELECT id FROM entity WHERE name = 'Enterprise Bank')),
			(SELECT id FROM field WHERE entity_id = (SELECT id FROM entity WHERE name = 'Enterprise Bank') AND field_type_id = (SELECT id FROM field_type WHERE system_f_code_id = (SELECT id FROM system_f_code WHERE system_name = 'Borrower_Address_Zip')))
			);
			
			
--section
--INSERT INTO section (entity_id, name, label, seq) VALUES ((SELECT id FROM entity WHERE name = 'Enterprise Bank'), 'personal_info', 'Personal Information', 1);
			
			
--entity_x_parent_x_child_section

INSERT INTO entity_x_parent_x_child_section (entity_id, parent_id, child_id) 
	VALUES ((SELECT id FROM entity WHERE name = 'Enterprise Bank'),
			(SELECT id FROM section WHERE name = 'individual_info' AND entity_id = (SELECT id FROM entity WHERE name = 'Enterprise Bank')),
			(SELECT id FROM section WHERE name = 'personal_info' AND entity_id = (SELECT id FROM entity WHERE name = 'Enterprise Bank'))
			); 

			
--entity_x_section_x_field

INSERT INTO entity_x_section_x_field (entity_id, section_id, field_id) 
	VALUES ((SELECT id FROM entity WHERE name = 'Enterprise Bank'),
			(SELECT id FROM section WHERE name = 'personal_info' AND entity_id = (SELECT id FROM entity WHERE name = 'Enterprise Bank')),
			(SELECT id FROM field WHERE entity_id = (SELECT id FROM entity WHERE name = 'Enterprise Bank') AND field_type_id = (SELECT id FROM field_type WHERE system_f_code_id = (SELECT id FROM system_f_code WHERE system_name = 'Borrower_Phone')))
			);
INSERT INTO entity_x_section_x_field (entity_id, section_id, field_id) 
	VALUES ((SELECT id FROM entity WHERE name = 'Enterprise Bank'),
			(SELECT id FROM section WHERE name = 'personal_info' AND entity_id = (SELECT id FROM entity WHERE name = 'Enterprise Bank')),
			(SELECT id FROM field WHERE entity_id = (SELECT id FROM entity WHERE name = 'Enterprise Bank') AND field_type_id = (SELECT id FROM field_type WHERE system_f_code_id = (SELECT id FROM system_f_code WHERE system_name = 'Borrower_SSN')))
			);
INSERT INTO entity_x_section_x_field (entity_id, section_id, field_id) 
	VALUES ((SELECT id FROM entity WHERE name = 'Enterprise Bank'),
			(SELECT id FROM section WHERE name = 'personal_info' AND entity_id = (SELECT id FROM entity WHERE name = 'Enterprise Bank')),
			(SELECT id FROM field WHERE entity_id = (SELECT id FROM entity WHERE name = 'Enterprise Bank') AND field_type_id = (SELECT id FROM field_type WHERE system_f_code_id = (SELECT id FROM system_f_code WHERE system_name = 'Borrower_DOB')))
			);

			
--section
INSERT INTO section (entity_id, name, label, seq) VALUES ((SELECT id FROM entity WHERE name = 'Enterprise Bank'), 'personal_assets', 'Assets', 1);
			
			
--entity_x_parent_x_child_section

INSERT INTO entity_x_parent_x_child_section (entity_id, parent_id, child_id) 
	VALUES ((SELECT id FROM entity WHERE name = 'Enterprise Bank'),
			(SELECT id FROM section WHERE name = 'personal_info' AND entity_id = (SELECT id FROM entity WHERE name = 'Enterprise Bank')),
			(SELECT id FROM section WHERE name = 'business_related_info' AND entity_id = (SELECT id FROM entity WHERE name = 'Enterprise Bank'))
			); 

			
--entity_x_section_x_field

INSERT INTO entity_x_section_x_field (entity_id, section_id, field_id) 
	VALUES ((SELECT id FROM entity WHERE name = 'Enterprise Bank'),
			(SELECT id FROM section WHERE name = 'business_related_info' AND entity_id = (SELECT id FROM entity WHERE name = 'Enterprise Bank')),
			(SELECT id FROM field WHERE entity_id = (SELECT id FROM entity WHERE name = 'Enterprise Bank') AND field_type_id = (SELECT id FROM field_type WHERE system_f_code_id = (SELECT id FROM system_f_code WHERE system_name = 'Borrower_Title_Position')))
			);
INSERT INTO entity_x_section_x_field (entity_id, section_id, field_id) 
	VALUES ((SELECT id FROM entity WHERE name = 'Enterprise Bank'),
			(SELECT id FROM section WHERE name = 'business_related_info' AND entity_id = (SELECT id FROM entity WHERE name = 'Enterprise Bank')),
			(SELECT id FROM field WHERE entity_id = (SELECT id FROM entity WHERE name = 'Enterprise Bank') AND field_type_id = (SELECT id FROM field_type WHERE system_f_code_id = (SELECT id FROM system_f_code WHERE system_name = 'Borrower_Ownership_Perc')))
			);
INSERT INTO entity_x_section_x_field (entity_id, section_id, field_id) 
	VALUES ((SELECT id FROM entity WHERE name = 'Enterprise Bank'),
			(SELECT id FROM section WHERE name = 'business_related_info' AND entity_id = (SELECT id FROM entity WHERE name = 'Enterprise Bank')),
			(SELECT id FROM field WHERE entity_id = (SELECT id FROM entity WHERE name = 'Enterprise Bank') AND field_type_id = (SELECT id FROM field_type WHERE system_f_code_id = (SELECT id FROM system_f_code WHERE system_name = 'Borrower_Tenure')))
			);
INSERT INTO entity_x_section_x_field (entity_id, section_id, field_id) 
	VALUES ((SELECT id FROM entity WHERE name = 'Enterprise Bank'),
			(SELECT id FROM section WHERE name = 'business_related_info' AND entity_id = (SELECT id FROM entity WHERE name = 'Enterprise Bank')),
			(SELECT id FROM field WHERE entity_id = (SELECT id FROM entity WHERE name = 'Enterprise Bank') AND field_type_id = (SELECT id FROM field_type WHERE system_f_code_id = (SELECT id FROM system_f_code WHERE system_name = 'Borrower_Bankruptcy')))
			);
INSERT INTO entity_x_section_x_field (entity_id, section_id, field_id) 
	VALUES ((SELECT id FROM entity WHERE name = 'Enterprise Bank'),
			(SELECT id FROM section WHERE name = 'business_related_info' AND entity_id = (SELECT id FROM entity WHERE name = 'Enterprise Bank')),
			(SELECT id FROM field WHERE entity_id = (SELECT id FROM entity WHERE name = 'Enterprise Bank') AND field_type_id = (SELECT id FROM field_type WHERE system_f_code_id = (SELECT id FROM system_f_code WHERE system_name = 'Borrower_Existing_Customer')))
			);
 
  */
----------------------------------
--- Queries ---
----------------------------------	
			

--sections in an entity
SELECT id, name, label, purpose 
	FROM section
	WHERE entity_id = (select id from entity where name = 'Enterprise Bank')
	ORDER BY name;


--fields in a section
SELECT field.label, sys_field_type.default_label, field.name, field.config_data, fi.id, fi.data, field.description, fi.field_sequence, fi.occur_sequence, sys_field_type.field_imp, guide.data sys_guide, guide_addition.data guide_addition
	FROM field_instance fi 
	INNER JOIN field ON field_id = field.id AND field.entity_id = fi.entity_id 
	INNER JOIN sys_field_type ON field.sys_field_type_id = sys_field_type.id 
	INNER JOIN guide ON guide.id = sys_field_type.guide_id 
	FULL OUTER JOIN guide_addition ON guide_addition.id = field.guide_addition_id AND guide_addition.entity_id = fi.entity_id 
	WHERE fi.entity_id = (select id from entity where name = 'Enterprise Bank')  
	AND fi.section_id = (select id from section where name = 'credit_request') 
	ORDER BY fi.occur_sequence, fi.field_sequence;


--intermediate section heirarchy	
WITH RECURSIVE section_tree (level, parent_section_id, section_id, section_sequence) AS ( 
  SELECT 1, parent_section_id, section_id, section_sequence
  FROM template_x_section 
  WHERE parent_section_id = (SELECT id FROM section WHERE name = 'top') AND entity_id = (select id from entity where name = 'Enterprise Bank') AND template_id = (select id from form_template where name = 'Retail Store')
  UNION ALL 
  SELECT level+1, ss.parent_section_id, ss.section_id, ss.section_sequence 
  FROM template_x_section ss 
  INNER JOIN section_tree stree ON stree.section_id = ss.parent_section_id 
)

SELECT st.level, st.parent_section_id, st.section_id, ps.name parent_section, st.section_sequence child_seq, cs.name section_name, cs.label section_label, s.type sec_type  
FROM section s 
INNER JOIN section_tree st ON st.section_id = s.id 
INNER JOIN section ps ON st.parent_section_id = ps.id AND ps.entity_id = (select id from entity where name = 'Enterprise Bank') 
INNER JOIN section cs ON st.section_id = cs.id AND cs.entity_id = (select id from entity where name = 'Enterprise Bank') 
ORDER BY st.level, ps.name, st.section_sequence;


--field comm associated with each field_instance
SELECT name, text, submit_date 
	FROM field_comm 
	WHERE field_instance_id = 1096 
	AND entity_id = (select id from entity where name = 'Enterprise Bank') 
	ORDER BY submit_date;





curl -d "{\"entity_id\":1026, \"section_id\":1067}" -H "Content-Type: application/json" -X POST http://192.168.7.142:3000/forms/getfields
--should work but doesn't
--curl -d '{"entity_id":1026, "section_id":1067}' -H "Content-Type: application/json" -X POST http://192.168.7.142:3000/forms/getfields

curl -d "entity_id=1026&section_id=1067" -H "Content-Type: application/x-www-form-urlencoded" -X POST http://192.168.7.142:3000/forms/getfields


	
INSERT INTO field_comm (entity_id, field_instance_id, name, text)
VALUES (1026, 1081,'David', 'What is this');

INSERT INTO field_comm (entity_id, field_instance_id, name, text)
VALUES (1026, 1081,'John', 'Your full legal name, please.');

INSERT INTO field_comm (entity_id, field_instance_id, name, text)
VALUES (1026, 1081,'David', 'Thanks.');




CREATE TABLE timestamp_demo (ts TIMESTAMP, tstz TIMESTAMPTZ);
INSERT INTO timestamp_demo (ts, tstz)
VALUES
   (
      '2016-06-22 19:10:25-07',
      '2016-06-22 19:10:25-07'
   );
   
SHOW TIMEZONE;
SET timezone = 'America/Los_Angeles';


CREATE TABLE field_comm ( 
	entity_id 			INT 		NOT NULL, 
	field_instance_id 	INT 		NOT NULL, 
	name 				character 	varying(64) NOT NULL, 
	text 				character 	varying(512) NOT NULL,
	submit_date 		timestamp 	NOT NULL DEFAULT (now() AT TIME ZONE 'UTC')	
);

CREATE TABLE field_comm ( 
	entity_id 			INT 		NOT NULL, 
	field_instance_id 	INT 		NOT NULL, 
	name 				character 	varying(64) NOT NULL, 
	text 				character 	varying(512) NOT NULL,
	submit_date 		DATE 		NOT NULL DEFAULT CURRENT_DATE	
);


INSERT INTO timestamp_demo (ts, tstz)
VALUES
   (
      '2016-06-22 19:10:25-07',
      '2016-06-22 19:10:25-07'
   );
	
	


UPDATE field_instance 
SET data = 'howdy'
WHERE 
entity_id = 1026
AND 
id = 1083;


  INSERT INTO form_template (entity_id, name) VALUES (1100, 'Gas Stations') RETURNING id as new_template_id; 
  INSERT INTO form_template (entity_id, name) VALUES (1100, 'Gas Stations') RETURNING id as new_template_id
  
  
  
  
      INSERT INTO template_x_section (entity_id, template_id, (
      SELECT id from section WHERE entity_id = 1026 AND name = 'top'
      ), parent_section_id, section_sequence) 
      VALUES (1026, 1067, $3, 0, 1);
  
  
  
  
      INSERT INTO template_x_section (entity_id, template_id, section_id, parent_section_id, section_sequence) 
      VALUES (1026, 1299, (
      SELECT id from section WHERE entity_id = 1026 AND name = 'top'
      ), 0, 1);
  
  
  
--Experimental

-------------
WITH RECURSIVE section_tree (level, parent_section_id, section_id) AS ( 
  SELECT 1, parent_section_id, section_id
  FROM template_x_section 
  WHERE parent_section_id = (SELECT id FROM section WHERE name = 'top') AND entity_id = 1026 AND template_id = 1066 
  UNION ALL 
  SELECT level+1, ss.parent_section_id, ss.section_id 
  FROM template_x_section ss 
  INNER JOIN section_tree stree ON stree.section_id = ss.parent_section_id 
) 

SELECT st.level, st.parent_section_id, st.section_id, ps.name parent_section, cs.seq child_seq, cs.name section_name, cs.label section_label 
FROM section s 
INNER JOIN section_tree st ON st.section_id = s.id 
INNER JOIN section ps ON st.parent_section_id = ps.id 
INNER JOIN section cs ON st.section_id = cs.id
ORDER BY st.level, ps.name, cs.seq;
------

 WITH RECURSIVE section_tree (level, parent_section_id, section_id) AS ( SELECT 1, parent_section_id, section_id FROM template_x_section WHERE parent_section_id = (SELECT id FROM section WHERE name = 'top') AND entity_id = 1026 AND template_id = 1066 UNION ALL SELECT level+1, ss.parent_section_id, ss.section_id FROM template_x_section ss INNER JOIN section_tree stree ON stree.section_id = ss.parent_section_id )SELECT st.level, st.parent_section_id, st.section_id, ps.name parent_section, cs.seq child_seq, cs.name section_name, cs.label section_label FROM section s INNER JOIN section_tree st ON st.section_id = s.id INNER JOIN section ps ON st.parent_section_id = ps.id INNER JOIN section cs ON st.section_id = cs.id ORDER BY st.level, ps.name, cs.seq
---------------
      "WITH RECURSIVE section_tree (level, parent_section_id, section_id) AS ( " +
      "SELECT 1, parent_section_id, section_id " +
      "FROM template_x_section " +
      "WHERE parent_section_id = (SELECT id FROM section WHERE name = 'top') AND entity_id = $1 AND template_id = $2 " +
      "UNION ALL " +
      "SELECT level+1, ss.parent_section_id, ss.section_id " +
      "FROM template_x_section ss " +
      "INNER JOIN section_tree stree ON stree.section_id = ss.parent_section_id " +
      ")" +
      "SELECT st.level, st.parent_section_id, st.section_id, ps.name parent_section, cs.seq child_seq, cs.name section_name, cs.label section_label " +
      "FROM section s " +
      "INNER JOIN section_tree st ON st.section_id = s.id " +
      "INNER JOIN section ps ON st.parent_section_id = ps.id " +
      "INNER JOIN section cs ON st.section_id = cs.id " +
      "ORDER BY st.level, ps.name, cs.seq";


--root level heirarchy
WITH RECURSIVE section_tree (level, parent_id, child_id) AS ( 
  SELECT 1, parent_id, child_id
  FROM template_x_section 
  WHERE parent_id is NULL 
  UNION ALL 
  SELECT level+1, ss.parent_id, ss.child_id 
  FROM template_x_section ss 
  INNER JOIN section_tree stree ON stree.child_id = ss.parent_id 
) 

SELECT st.level, st.parent_id, st.child_id, ps.name parent_section, cs.seq child_seq, cs.name section_name, cs.label section_label 
FROM section s 
INNER JOIN section_tree st ON st.child_id = s.id 
INNER JOIN section ps ON st.parent_id = ps.id 
INNER JOIN section cs ON st.child_id = cs.id
ORDER BY st.level, ps.name, cs.seq;




------------------

WITH RECURSIVE section_tree (level, parent_id, child_id) AS ( 
  SELECT 1, parent_id, child_id
  FROM template_x_section 
  WHERE parent_id = (SELECT id FROM section WHERE name = 'top') AND entity_id = (select id from entity where name = 'Enterprise Bank') 
  UNION ALL 
  SELECT level+1, ss.parent_id, ss.child_id 
  FROM template_x_section ss 
  INNER JOIN section_tree stree ON stree.child_id = ss.parent_id 
) 

SELECT st.level, st.parent_id, st.child_id, ps.name parent_section, cs.seq child_seq, cs.name section_name, cs.label section_label 
FROM section s 
INNER JOIN section_tree st ON st.child_id = s.id 
INNER JOIN section ps ON st.parent_id = ps.id 
INNER JOIN section cs ON st.child_id = cs.id
ORDER BY st.level, ps.name, cs.seq;
-------------------



---------------recursion-------------------


CREATE TABLE employees (
  id serial,
  name varchar(255),
  manager_id int
);

INSERT INTO employees VALUES (1, 'Umur', null);
INSERT INTO employees VALUES (2, 'Craig', 1);
INSERT INTO employees VALUES (3, 'Daniel', 2);
INSERT INTO employees VALUES (4, 'Claire', 1);
INSERT INTO employees VALUES (5, 'Lindsay', 2);
INSERT INTO employees VALUES (6, 'Will', 2);
INSERT INTO employees VALUES (7, 'Burak', 2);
INSERT INTO employees VALUES (8, 'Eren', 2);
INSERT INTO employees VALUES (9, 'Katie', 3);
INSERT INTO employees VALUES (10, 'Teresa', 4);



--intermediate employee heirarchy	
WITH RECURSIVE managertree AS (
  SELECT id, name, manager_id
  FROM employees
  WHERE id = 2
  UNION ALL
  SELECT e.id, e.name, e.manager_id
  FROM employees e
  INNER JOIN managertree mtree ON mtree.id = e.manager_id
)

SELECT *
FROM managertree;
			
--big boss heirarchy	
WITH RECURSIVE managertree AS (
  SELECT id, name, manager_id
  FROM employees
  WHERE manager_id is null
  UNION ALL
  SELECT e.id, e.name, e.manager_id
  FROM employees e
  INNER JOIN managertree mtree ON mtree.id = e.manager_id
)

SELECT *
FROM managertree;
			

WITH RECURSIVE tens (n) AS (
    SELECT 10
  UNION ALL
    SELECT n+10 FROM tens WHERE n+10<= 100
)
SELECT n FROM tens;


--------------------------------------------








-------Old Stuff---------------			
INSERT INTO question_x_entity (question_id, entity_id) VALUES ((SELECT id FROM question WHERE text = 'Why1?'), (SELECT id FROM entity WHERE name = 'Google, Inc.'));
INSERT INTO question_x_entity (question_id, entity_id) VALUES ((SELECT id FROM question WHERE text = 'Why2?'), (SELECT id FROM entity WHERE name = 'Google, Inc.'));
INSERT INTO question_x_entity (question_id, entity_id) VALUES ((SELECT id FROM question WHERE text = 'Why3?'), (SELECT id FROM entity WHERE name = 'Google, Inc.'));

INSERT INTO answer (text, question_id, entity_id) VALUES ('Because1',(SELECT id FROM question WHERE text = 'Why1?'), (SELECT id FROM entity WHERE name = 'Google, Inc.'));
INSERT INTO answer (text, question_id, entity_id) VALUES ('Because2',(SELECT id FROM question WHERE text = 'Why2?'), (SELECT id FROM entity WHERE name = 'Google, Inc.'));
INSERT INTO answer (text, question_id, entity_id) VALUES ('Because3',(SELECT id FROM question WHERE text = 'Why3?'), (SELECT id FROM entity WHERE name = 'Google, Inc.'));

INSERT INTO question (text, type, sequence) VALUES ('What1?', 'YOUR_BIZ_QUESTION', 1);
INSERT INTO question (text, type, sequence) VALUES ('What2?', 'YOUR_BIZ_QUESTION', 2);
INSERT INTO question (text, type, sequence) VALUES ('What3?', 'YOUR_BIZ_QUESTION', 3);

INSERT INTO question_x_entity (question_id, entity_id) VALUES ((SELECT id FROM question WHERE text = 'What1?'), (SELECT id FROM entity WHERE name = 'Google, Inc.'));
INSERT INTO question_x_entity (question_id, entity_id) VALUES ((SELECT id FROM question WHERE text = 'What2?'), (SELECT id FROM entity WHERE name = 'Google, Inc.'));
INSERT INTO question_x_entity (question_id, entity_id) VALUES ((SELECT id FROM question WHERE text = 'What3?'), (SELECT id FROM entity WHERE name = 'Google, Inc.'));

INSERT INTO answer (text, question_id, entity_id) VALUES ('This1',(SELECT id FROM question WHERE text = 'What1?'), (SELECT id FROM entity WHERE name = 'Google, Inc.'));
INSERT INTO answer (text, question_id, entity_id) VALUES ('This2',(SELECT id FROM question WHERE text = 'What2?'), (SELECT id FROM entity WHERE name = 'Google, Inc.'));
INSERT INTO answer (text, question_id, entity_id) VALUES ('This3',(SELECT id FROM question WHERE text = 'What3?'), (SELECT id FROM entity WHERE name = 'Google, Inc.'));


INSERT INTO question (text, type, sequence) VALUES ('Why1?', 'YOU_QUESTION', 1);
INSERT INTO question (text, type, sequence) VALUES ('Why2?', 'YOU_QUESTION', 2);
INSERT INTO question (text, type, sequence) VALUES ('Why3?', 'YOU_QUESTION', 3);

INSERT INTO question_x_entity (question_id, entity_id) VALUES ((SELECT id FROM question WHERE text = 'Why1?'), (SELECT id FROM entity WHERE name = 'Google, Inc.'));
INSERT INTO question_x_entity (question_id, entity_id) VALUES ((SELECT id FROM question WHERE text = 'Why2?'), (SELECT id FROM entity WHERE name = 'Google, Inc.'));
INSERT INTO question_x_entity (question_id, entity_id) VALUES ((SELECT id FROM question WHERE text = 'Why3?'), (SELECT id FROM entity WHERE name = 'Google, Inc.'));

INSERT INTO answer (text, question_id, entity_id) VALUES ('Because1',(SELECT id FROM question WHERE text = 'Why1?'), (SELECT id FROM entity WHERE name = 'Google, Inc.'));
INSERT INTO answer (text, question_id, entity_id) VALUES ('Because2',(SELECT id FROM question WHERE text = 'Why2?'), (SELECT id FROM entity WHERE name = 'Google, Inc.'));
INSERT INTO answer (text, question_id, entity_id) VALUES ('Because3',(SELECT id FROM question WHERE text = 'Why3?'), (SELECT id FROM entity WHERE name = 'Google, Inc.'));

--
-- Name: film_actor_actor_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY film_actor
    ADD CONSTRAINT film_actor_actor_id_fkey FOREIGN KEY (actor_id) REFERENCES actor(actor_id) ON UPDATE CASCADE ON DELETE RESTRICT;

	
	--
-- Name: store_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres; Tablespace: 
--

ALTER TABLE ONLY store
    ADD CONSTRAINT store_pkey PRIMARY KEY (store_id);
	
--
-- Name: idx_fk_store_id; Type: INDEX; Schema: public; Owner: postgres; Tablespace: 
--

CREATE INDEX idx_fk_store_id ON customer USING btree (store_id);

--
-- Name: film_in_stock(integer, integer); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION film_in_stock(p_film_id integer, p_store_id integer, OUT p_film_count integer) RETURNS SETOF integer
    LANGUAGE sql
    AS $_$
     SELECT inventory_id
     FROM inventory
     WHERE film_id = $1
     AND store_id = $2
     AND inventory_in_stock(inventory_id);
$_$;


--ALTER FUNCTION public.film_in_stock(p_film_id integer, p_store_id integer, OUT p_film_count integer) OWNER TO postgres;
	
	
--
-- Name: customer_list; Type: VIEW; Schema: public; Owner: postgres
--

CREATE VIEW customer_list AS
    SELECT cu.customer_id AS id, (((cu.first_name)::text || ' '::text) || (cu.last_name)::text) AS name, a.address, a.postal_code AS "zip code", a.phone, city.city, country.country, CASE WHEN cu.activebool THEN 'active'::text ELSE ''::text END AS notes, cu.store_id AS sid FROM (((customer cu JOIN address a ON ((cu.address_id = a.address_id))) JOIN city ON ((a.city_id = city.city_id))) JOIN country ON ((city.country_id = country.country_id)));


--ALTER TABLE public.customer_list OWNER TO postgres;

--
-- Name: store_store_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE store_store_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;



--
-- Name: store; Type: TABLE; Schema: public; Owner: postgres; Tablespace: 
--

CREATE TABLE store (
    store_id integer DEFAULT nextval('store_store_id_seq'::regclass) NOT NULL,
    manager_staff_id smallint NOT NULL,
    address_id smallint NOT NULL,
    last_update timestamp without time zone DEFAULT now() NOT NULL
);


1) Is your business already better than other similar businesses in your area of town or online business segment? If 'yes', then how is it better? If 'not' then how could it be better?
2) Who does your business cater to?

1)Why are you in this business personally?
2)What drives you in life?
3) Are you constantly thinking about how to improve and grow your business?
4) Are you bit of a control freak?
5) Do you want to grow your business significantly or do you want to make a very comfortable and stable living?

- Business Plan (Strong business plan.  Why they should succeed.  Have you thought of the answers).
- Allied will respond.
- Hundreds of cubes out there.  Duplicate.
- Financials.  Knows how to model that.