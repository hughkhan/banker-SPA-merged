--delete data
DELETE FROM sys_data_type;
DELETE FROM entity;
DELETE FROM users;
DELETE FROM guide;
DELETE FROM guide_addition;
DELETE FROM sys_field_type;
DELETE FROM field;
DELETE FROM section;
DELETE FROM field_instance;
DELETE FROM form_template;
DELETE FROM template_x_section;
DELETE FROM field_comm;


ALTER SEQUENCE "common_seq" RESTART WITH 1000;
ALTER SEQUENCE "guide_seq" RESTART WITH 1;

