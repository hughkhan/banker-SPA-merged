--
-- Set server timezone
--
--i.e. SET TIME ZONE 'US/Central';
--
SET TIME ZONE LOCAL;

--
-- Common Sequence
--
CREATE SEQUENCE common_seq
    START WITH 1000
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 5;


CREATE SEQUENCE guide_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 5;
	

--
-- Field implementation type
--
CREATE TYPE field_imp_type AS ENUM (
	'TEXTBOX',
	'MULTILINETEXTBOX',
	'DATE',
	'SELECT'
);

--
-- Field types
--
CREATE TYPE primitive_data_type AS ENUM (
	'TEXT',
	'INTEGER',
	'FLOAT',
	'CURRENCY',
	'DATE',
	'BOOL'
);


--
-- General types
--
CREATE TYPE hp_type AS ENUM (
	'CUSTOMER',
	'BANKER',
	'REQUIRED',
	'TABULAR',
	'UNSTRUCTURED',
	'MULTI-OCCUR-UNSTRUCTURED'
);


--
-- System Field Code.  Fields need to be unique for later analysis
--
CREATE TABLE sys_data_type (
	id 				INT 				DEFAULT NEXTVAL('common_seq'::regclass) PRIMARY KEY NOT NULL, 
	system_name 	character 			varying(64) NOT NULL, 
	description 	character 			varying, 
	prim_data_type	primitive_data_type DEFAULT 'TEXT'::primitive_data_type NOT NULL  
);

--
-- Entity.  Needed for multitenancy
--
CREATE TABLE entity (
	id 			INT 		DEFAULT NEXTVAL('common_seq'::regclass) PRIMARY KEY NOT NULL,
	name 		character 	varying(64) NOT NULL,
	description character 	varying 
);

CREATE UNIQUE INDEX entity_name_idx ON entity (lower(name));

--
-- User.  Assuming storing pwd in this database for now.  But will consider using OAuth, etc.
--
CREATE TABLE users (
	id 				INT 		DEFAULT NEXTVAL('common_seq'::regclass) PRIMARY KEY NOT NULL,
	entity_id 		INT 		NOT NULL,
	name_first 		character 	varying(50) NOT NULL,
	name_last 		character 	varying(50) NOT NULL,
	name_middle 	character 	varying(50),
	email 			character 	varying(255) NOT NULL,
	pwd 			character 	varying(50) NOT NULL,
	hash 			character 	varying(50) NOT NULL,
	active 			boolean 	NOT NULL,
	role 			hp_type 	DEFAULT 'CUSTOMER'::hp_type NOT NULL
);


--
-- Field Type.  System field types.  guide_id is populated with the default guide.  Each entity can add additional info using 'guide_addition' table.
--
CREATE TABLE sys_field_type (
    id 					INT 			DEFAULT NEXTVAL('common_seq'::regclass) PRIMARY KEY NOT NULL,
	sys_data_type_id 	INT 			NOT NULL,
	default_label 		character 		varying(256) NOT NULL,
	field_imp 			field_imp_type 	DEFAULT 'TEXTBOX'::field_imp_type NOT NULL,
	guide_id 			INT 			NOT NULL
);


--
-- Field.  Field definition per entity.  This instance and its data will be stored in 'field_instance' associated with each section.
-- Each entity can add additional info using 'guide_addition_id' column.
--
CREATE TABLE field (
    id 					INT 		DEFAULT NEXTVAL('common_seq'::regclass) PRIMARY KEY NOT NULL,
	entity_id 			INT 		NOT NULL,
    label 				character 	varying(256),
	name 				character 	varying(64) NOT NULL, 
	description 		character 	varying,
	sys_field_type_id 	INT 		NOT NULL,
	guide_addition_id 	INT, 
	config_data 		character 	varying 
);


--
-- Field Instance.  Stores field data.  Can have multiple occurances per sections (denoted by occur-sequence).  If the section is of tabular type then fields with same occur-sequence are displayed in the same table row.  
--
CREATE TABLE field_instance (
    id 				INT 		DEFAULT NEXTVAL('common_seq'::regclass) PRIMARY KEY NOT NULL, 
	entity_id 		INT 		NOT NULL,
	section_id 		INT 		NOT NULL,
	field_id 		INT 		NOT NULL,
    field_sequence 	smallint 	DEFAULT 1 NOT NULL,
	occur_sequence 	smallint 	DEFAULT 1 NOT NULL,
	data 			character 	varying
);


--
-- Field Instance Table Data.   Store table row data if the section is tabular.
--
--CREATE TABLE field_instance_row_data (
--	fi_id			INT 		REFERENCES field_instance(id) ON DELETE RESTRICT,
--	entity_id 		INT 		NOT NULL,
--    row_sequence 	smallint 	DEFAULT 1 NOT NULL,
--	data 			character 	varying
--);

--
-- Guide.  Filling guide for the borrower.  Each entity can add additional info using 'guide_addition' table
--
CREATE TABLE guide (
    id 		INT 		DEFAULT NEXTVAL('guide_seq'::regclass) PRIMARY KEY NOT NULL,
	data 	character 	varying NOT NULL 
);


--
-- Guide Additional Info.  Entity can add more information to the system provided info.  UI will determine how to mix in the additional info
--
CREATE TABLE guide_addition (
    id 			INT 		DEFAULT NEXTVAL('guide_seq'::regclass) PRIMARY KEY NOT NULL,
	entity_id 	INT 		NOT NULL,
	data 		character 	varying NOT NULL 
);


--
-- Section.  Sections can be empty or have other types of children.  Current implementation expects fields. If no fields, UI shows links to all children
--
CREATE TABLE section (
    id 			INT 		DEFAULT NEXTVAL('common_seq'::regclass) PRIMARY KEY NOT NULL, 
	entity_id 	INT 		NOT NULL, 
	name 		character 	varying(64) NOT NULL, 
    label 		character 	varying(256) NOT NULL, 
	type 		hp_type 	DEFAULT 'UNSTRUCTURED'::hp_type NOT NULL,
    purpose 	character 	varying
);

CREATE UNIQUE INDEX section_name_idx ON section (lower(name));

--
-- Template.  Templates comprised of sections for an entity.  Sections will be reused
--
CREATE TABLE form_template (
    id 			INT 		DEFAULT NEXTVAL('common_seq'::regclass) PRIMARY KEY NOT NULL, 
	entity_id 	INT 		NOT NULL,
	name 		character 	varying(64) NOT NULL,
	description character 	varying
);

CREATE UNIQUE INDEX template_name_idx ON form_template (lower(name));


--
-- Entity X Parent X Child Section .  Parent section and child section cross table
--
CREATE TABLE template_x_section (
	entity_id 			INT 		NOT NULL, 
	template_id 		INT 		NOT NULL, 
	section_id 			INT 		NOT NULL, 
	parent_section_id 	INT 		NOT NULL,   
    section_sequence 	smallint 	DEFAULT 1 NOT NULL, 
	PRIMARY KEY (entity_id, template_id, section_id, parent_section_id) 
);


--
-- Field Communication.  Adding 'entity_id' for future charding by entity needs.  'field_instance_id' is already unique across all entities so normally wouldn
--
CREATE TABLE field_comm ( 
	entity_id 			INT 			NOT NULL, 
	user_id 			INT 			NOT NULL, 
	field_instance_id 	INT 			NOT NULL, 
	name 				character 		varying(64) NOT NULL, 
	text 				character 		varying(512) NOT NULL,
	submit_date 		timestamptz 	NOT NULL DEFAULT (CURRENT_TIMESTAMP AT TIME ZONE 'UTC')	
);