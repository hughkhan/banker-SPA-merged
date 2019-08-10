INSERT INTO sys_data_type (system_name) VALUES ('Individual_Full_Name');
INSERT INTO sys_data_type (system_name) VALUES ('Individual_Address_Street');
INSERT INTO sys_data_type (system_name) VALUES ('Individual_Address_City');
INSERT INTO sys_data_type (system_name) VALUES ('Individual_Address_State');
INSERT INTO sys_data_type (system_name) VALUES ('Individual_Address_Zip');
INSERT INTO sys_data_type (system_name) VALUES ('Individual_Phone');
INSERT INTO sys_data_type (system_name) VALUES ('Individual_SSN');
INSERT INTO sys_data_type (system_name) VALUES ('Individual_DOB');
INSERT INTO sys_data_type (system_name) VALUES ('Individual_Title_Position');
INSERT INTO sys_data_type (system_name) VALUES ('Individual_Ownership_Perc');
INSERT INTO sys_data_type (system_name) VALUES ('Individual_Tenure');
INSERT INTO sys_data_type (system_name) VALUES ('Individual_Bankruptcy');
INSERT INTO sys_data_type (system_name) VALUES ('Individual_Existing_Customer');
INSERT INTO sys_data_type (system_name) VALUES ('Business_Name');
INSERT INTO sys_data_type (system_name) VALUES ('Business_Address_Street');
INSERT INTO sys_data_type (system_name) VALUES ('Business_Address_City');
INSERT INTO sys_data_type (system_name) VALUES ('Business_Address_State');
INSERT INTO sys_data_type (system_name) VALUES ('Business_Address_Zip');
INSERT INTO sys_data_type (system_name) VALUES ('Business_Type');
INSERT INTO sys_data_type (system_name) VALUES ('DBA');
INSERT INTO sys_data_type (system_name) VALUES ('EIN');
INSERT INTO sys_data_type (system_name, prim_data_type) VALUES ('Individual_Years_Owner', 'FLOAT');
INSERT INTO sys_data_type (system_name) VALUES ('Loan_Type');
INSERT INTO sys_data_type (system_name) VALUES ('Loan_Term');
INSERT INTO sys_data_type (system_name, prim_data_type) VALUES ('Loan_Amount', 'CURRENCY');


INSERT INTO entity (name) VALUES ('Highplume');
INSERT INTO entity (name) VALUES ('Enterprise Bank');
INSERT INTO entity (name) VALUES ('Bank of the Prairie');
INSERT INTO entity (name) VALUES ('NBKC');

INSERT INTO users (entity_id, name_first, name_last, name_middle, email, pwd, hash, active, role) VALUES ((SELECT id FROM entity WHERE name = 'Enterprise Bank'), 'Jane', 'Sue', 'Doe', 'jsd@gmail.com', 'xxx','xxx',true, 'CUSTOMER'); 

INSERT INTO guide (data) VALUES ('Your full legal name; as it appears on government issued identification​');
INSERT INTO guide (data) VALUES ('Your primary residence');
INSERT INTO guide (data) VALUES ('Of your primary residence​');
INSERT INTO guide (data) VALUES ('Select the state of your primary residence from the dropdown menu​');
INSERT INTO guide (data) VALUES ('5 digit postal code associated with this address');
INSERT INTO guide (data) VALUES ('The phone number at which your banker can most easily reach you');
INSERT INTO guide (data) VALUES ('Your 9 digit US Govt. issued number under section 205 of the Social Security Act​');
INSERT INTO guide (data) VALUES ('Your birthdate as corresponds with government issued identification; expressed as ##/##/##​');
INSERT INTO guide (data) VALUES ('The Title or Position that you hold with the company or organization in consideration of credit​');
INSERT INTO guide (data) VALUES ('Your approximate ownership of the company or organization in consideration expressed as a percentage (##.#%); calculated by dividing your shares by the total outstanding shares of the company');
INSERT INTO guide (data) VALUES ('Select, from the dropdown menu, the number of years you have been with the company or organization in consideration of credit​');
INSERT INTO guide (data) VALUES ('Select from the dropdown, whether you, or the company or organization in consideration, has ever declared bankruptcy​');
INSERT INTO guide (data) VALUES ('Select from the dropdown to indicate whether you are, or have you previously been a customer of this bank​');
--INSERT INTO guide_addition (data) VALUES ('Select from the dropdown to indicate whether you are, or have you previously been a customer of this bank or our parent bank, BOA?​');  --adding as an additional guide information
INSERT INTO guide (data) VALUES ('The legal name of you organization, as it appears on business filings submitted to your secretary of state. The legal name of the entity can be found on your Articles of Incorporation, Annual Report, Form 1120, or by searching the entity online on your secretary of states business entity database.​');
INSERT INTO guide (data) VALUES ('The primary address at which your business, and appears on business filings submitted to your secretary of state​');
INSERT INTO guide (data) VALUES ('Of your organization');
INSERT INTO guide (data) VALUES ('Select the state of your organization from the dropdown menu​');
INSERT INTO guide (data) VALUES ('5 digit postal code associated with this address​');
INSERT INTO guide (data) VALUES ('Select the legal structure of your organization for the dropdown menu');
INSERT INTO guide (data) VALUES ('List any Assumed Names, Trade Names, Fictitious Names, etc. that your business Does Business As​');
INSERT INTO guide (data) VALUES ('Employer Identification Number. The 9 digit number that the IRS uses to identify your businesses tax returns; you may also know it as Taxpayer Identification Number (TIN), Federal Tax Identification Number, Federal Tax ID, or FEIN.​');
INSERT INTO guide (data) VALUES ('Select from the dropdown how many years you have been an owner of the organization in consideration​');
INSERT INTO guide (data) VALUES ('Select from the dropdown the credit product that you are requesting​');
INSERT INTO guide (data) VALUES ('Select from the dropdown the amount of time over which you would like repay your loan​');
INSERT INTO guide (data) VALUES ('The total dollar amount that you need to borrow associated with this credit request​');

INSERT INTO sys_field_type (sys_data_type_id, default_label, field_imp, guide_id) VALUES ((SELECT id FROM sys_data_type WHERE system_name = 'Individual_Full_Name'), 'Name', 'TEXTBOX'::field_imp_type, 1);
INSERT INTO sys_field_type (sys_data_type_id, default_label, field_imp, guide_id) VALUES ((SELECT id FROM sys_data_type WHERE system_name = 'Individual_Address_Street'), 'Home Address', 'TEXTBOX'::field_imp_type, 2);
INSERT INTO sys_field_type (sys_data_type_id, default_label, field_imp, guide_id) VALUES ((SELECT id FROM sys_data_type WHERE system_name = 'Individual_Address_City'), 'City', 'TEXTBOX'::field_imp_type, 3);
INSERT INTO sys_field_type (sys_data_type_id, default_label, field_imp, guide_id) VALUES ((SELECT id FROM sys_data_type WHERE system_name = 'Individual_Address_State'), 'State', 'TEXTBOX'::field_imp_type, 4);
INSERT INTO sys_field_type (sys_data_type_id, default_label, field_imp, guide_id) VALUES ((SELECT id FROM sys_data_type WHERE system_name = 'Individual_Address_Zip'), 'ZIP', 'TEXTBOX'::field_imp_type, 5);
INSERT INTO sys_field_type (sys_data_type_id, default_label, field_imp, guide_id) VALUES ((SELECT id FROM sys_data_type WHERE system_name = 'Individual_Phone'), 'Phone', 'TEXTBOX'::field_imp_type, 6);
INSERT INTO sys_field_type (sys_data_type_id, default_label, field_imp, guide_id) VALUES ((SELECT id FROM sys_data_type WHERE system_name = 'Individual_SSN'), 'Social Security Number', 'TEXTBOX'::field_imp_type, 7);
INSERT INTO sys_field_type (sys_data_type_id, default_label, field_imp, guide_id) VALUES ((SELECT id FROM sys_data_type WHERE system_name = 'Individual_DOB'), 'Date of Birth', 'TEXTBOX'::field_imp_type, 8);
INSERT INTO sys_field_type (sys_data_type_id, default_label, field_imp, guide_id) VALUES ((SELECT id FROM sys_data_type WHERE system_name = 'Individual_Title_Position'), 'Title/Position', 'TEXTBOX'::field_imp_type, 9);
INSERT INTO sys_field_type (sys_data_type_id, default_label, field_imp, guide_id) VALUES ((SELECT id FROM sys_data_type WHERE system_name = 'Individual_Ownership_Perc'), 'Percent Ownership', 'TEXTBOX'::field_imp_type, 10);
INSERT INTO sys_field_type (sys_data_type_id, default_label, field_imp, guide_id) VALUES ((SELECT id FROM sys_data_type WHERE system_name = 'Individual_Tenure'), 'Tenure', 'TEXTBOX'::field_imp_type, 11);
INSERT INTO sys_field_type (sys_data_type_id, default_label, field_imp, guide_id) VALUES ((SELECT id FROM sys_data_type WHERE system_name = 'Individual_Bankruptcy'), 'Bankruptcy', 'TEXTBOX'::field_imp_type, 12);
INSERT INTO sys_field_type (sys_data_type_id, default_label, field_imp, guide_id) VALUES ((SELECT id FROM sys_data_type WHERE system_name = 'Individual_Existing_Customer'), 'Existing Customer?', 'TEXTBOX'::field_imp_type, 13);

INSERT INTO sys_field_type (sys_data_type_id, default_label, field_imp, guide_id) VALUES ((SELECT id FROM sys_data_type WHERE system_name = 'Business_Name'), 'Business Name', 'TEXTBOX'::field_imp_type, 14);
INSERT INTO sys_field_type (sys_data_type_id, default_label, field_imp, guide_id) VALUES ((SELECT id FROM sys_data_type WHERE system_name = 'Business_Address_Street'), 'Business Address', 'TEXTBOX'::field_imp_type, 15);
INSERT INTO sys_field_type (sys_data_type_id, default_label, field_imp, guide_id) VALUES ((SELECT id FROM sys_data_type WHERE system_name = 'Business_Address_City'), 'City', 'TEXTBOX'::field_imp_type, 16);
INSERT INTO sys_field_type (sys_data_type_id, default_label, field_imp, guide_id) VALUES ((SELECT id FROM sys_data_type WHERE system_name = 'Business_Address_State'), 'State', 'TEXTBOX'::field_imp_type, 17);
INSERT INTO sys_field_type (sys_data_type_id, default_label, field_imp, guide_id) VALUES ((SELECT id FROM sys_data_type WHERE system_name = 'Business_Address_Zip'), 'ZIP', 'TEXTBOX'::field_imp_type, 18);
INSERT INTO sys_field_type (sys_data_type_id, default_label, field_imp, guide_id) VALUES ((SELECT id FROM sys_data_type WHERE system_name = 'Business_Type'), 'Type of Business', 'TEXTBOX'::field_imp_type, 19);
INSERT INTO sys_field_type (sys_data_type_id, default_label, field_imp, guide_id) VALUES ((SELECT id FROM sys_data_type WHERE system_name = 'DBA'), 'Doing Business As', 'TEXTBOX'::field_imp_type, 20);
INSERT INTO sys_field_type (sys_data_type_id, default_label, field_imp, guide_id) VALUES ((SELECT id FROM sys_data_type WHERE system_name = 'EIN'), 'EIN', 'TEXTBOX'::field_imp_type, 21);
INSERT INTO sys_field_type (sys_data_type_id, default_label, field_imp, guide_id) VALUES ((SELECT id FROM sys_data_type WHERE system_name = 'Individual_Years_Owner'), 'Years owned this business', 'TEXTBOX'::field_imp_type, 22);

INSERT INTO sys_field_type (sys_data_type_id, default_label, field_imp, guide_id) VALUES ((SELECT id FROM sys_data_type WHERE system_name = 'Loan_Type'), 'Loan Type', 'SELECT'::field_imp_type, 23);
INSERT INTO sys_field_type (sys_data_type_id, default_label, field_imp, guide_id) VALUES ((SELECT id FROM sys_data_type WHERE system_name = 'Loan_Term'), 'Loan Term', 'SELECT'::field_imp_type, 24);
INSERT INTO sys_field_type (sys_data_type_id, default_label, field_imp, guide_id) VALUES ((SELECT id FROM sys_data_type WHERE system_name = 'Loan_Amount'), 'Loan Amount', 'TEXTBOX'::field_imp_type, 25);



INSERT INTO field (entity_id, sys_field_type_id, name) VALUES ((SELECT id FROM entity WHERE name = 'Enterprise Bank'), (SELECT id FROM sys_field_type WHERE sys_data_type_id = (SELECT id FROM sys_data_type WHERE system_name = 'Individual_Full_Name')), 'Individual_Full_Name');
INSERT INTO field (entity_id, sys_field_type_id, name) VALUES ((SELECT id FROM entity WHERE name = 'Enterprise Bank'), (SELECT id FROM sys_field_type WHERE sys_data_type_id = (SELECT id FROM sys_data_type WHERE system_name = 'Individual_Address_Street')), 'Individual_Address_Street');
INSERT INTO field (entity_id, sys_field_type_id, name) VALUES ((SELECT id FROM entity WHERE name = 'Enterprise Bank'), (SELECT id FROM sys_field_type WHERE sys_data_type_id = (SELECT id FROM sys_data_type WHERE system_name = 'Individual_Address_City')), 'Individual_Address_City');
INSERT INTO field (entity_id, sys_field_type_id, name) VALUES ((SELECT id FROM entity WHERE name = 'Enterprise Bank'), (SELECT id FROM sys_field_type WHERE sys_data_type_id = (SELECT id FROM sys_data_type WHERE system_name = 'Individual_Address_State')), 'Individual_Address_State');
INSERT INTO field (entity_id, sys_field_type_id, name) VALUES ((SELECT id FROM entity WHERE name = 'Enterprise Bank'), (SELECT id FROM sys_field_type WHERE sys_data_type_id = (SELECT id FROM sys_data_type WHERE system_name = 'Individual_Address_Zip')), 'Individual_Address_Zip');
INSERT INTO field (entity_id, sys_field_type_id, name) VALUES ((SELECT id FROM entity WHERE name = 'Enterprise Bank'), (SELECT id FROM sys_field_type WHERE sys_data_type_id = (SELECT id FROM sys_data_type WHERE system_name = 'Individual_Phone')), 'Individual_Phone');
INSERT INTO field (entity_id, sys_field_type_id, name) VALUES ((SELECT id FROM entity WHERE name = 'Enterprise Bank'), (SELECT id FROM sys_field_type WHERE sys_data_type_id = (SELECT id FROM sys_data_type WHERE system_name = 'Individual_SSN')), 'Individual_SSN');
INSERT INTO field (entity_id, sys_field_type_id, name) VALUES ((SELECT id FROM entity WHERE name = 'Enterprise Bank'), (SELECT id FROM sys_field_type WHERE sys_data_type_id = (SELECT id FROM sys_data_type WHERE system_name = 'Individual_DOB')), 'Individual_DOB');
INSERT INTO field (entity_id, sys_field_type_id, name) VALUES ((SELECT id FROM entity WHERE name = 'Enterprise Bank'), (SELECT id FROM sys_field_type WHERE sys_data_type_id = (SELECT id FROM sys_data_type WHERE system_name = 'Individual_Title_Position')), 'Individual_Title_Position');
INSERT INTO field (entity_id, sys_field_type_id, name) VALUES ((SELECT id FROM entity WHERE name = 'Enterprise Bank'), (SELECT id FROM sys_field_type WHERE sys_data_type_id = (SELECT id FROM sys_data_type WHERE system_name = 'Individual_Ownership_Perc')), 'Individual_Ownership_Perc');
INSERT INTO field (entity_id, sys_field_type_id, name) VALUES ((SELECT id FROM entity WHERE name = 'Enterprise Bank'), (SELECT id FROM sys_field_type WHERE sys_data_type_id = (SELECT id FROM sys_data_type WHERE system_name = 'Individual_Tenure')), 'Individual_Tenure');
INSERT INTO field (entity_id, sys_field_type_id, name) VALUES ((SELECT id FROM entity WHERE name = 'Enterprise Bank'), (SELECT id FROM sys_field_type WHERE sys_data_type_id = (SELECT id FROM sys_data_type WHERE system_name = 'Individual_Bankruptcy')), 'Individual_Bankruptcy');
INSERT INTO field (entity_id, sys_field_type_id, name) VALUES ((SELECT id FROM entity WHERE name = 'Enterprise Bank'), (SELECT id FROM sys_field_type WHERE sys_data_type_id = (SELECT id FROM sys_data_type WHERE system_name = 'Individual_Existing_Customer')), 'Individual_Existing_Customer');


INSERT INTO field (entity_id, sys_field_type_id, name) VALUES ((SELECT id FROM entity WHERE name = 'Enterprise Bank'), (SELECT id FROM sys_field_type WHERE sys_data_type_id = (SELECT id FROM sys_data_type WHERE system_name = 'Business_Name')), 'Business_Name');
INSERT INTO field (entity_id, sys_field_type_id, name) VALUES ((SELECT id FROM entity WHERE name = 'Enterprise Bank'), (SELECT id FROM sys_field_type WHERE sys_data_type_id = (SELECT id FROM sys_data_type WHERE system_name = 'Business_Address_Street')), 'Business_Address_Street');
INSERT INTO field (entity_id, sys_field_type_id, name) VALUES ((SELECT id FROM entity WHERE name = 'Enterprise Bank'), (SELECT id FROM sys_field_type WHERE sys_data_type_id = (SELECT id FROM sys_data_type WHERE system_name = 'Business_Address_City')), 'Business_Address_City');
INSERT INTO field (entity_id, sys_field_type_id, name) VALUES ((SELECT id FROM entity WHERE name = 'Enterprise Bank'), (SELECT id FROM sys_field_type WHERE sys_data_type_id = (SELECT id FROM sys_data_type WHERE system_name = 'Business_Address_State')), 'Business_Address_State');
INSERT INTO field (entity_id, sys_field_type_id, name) VALUES ((SELECT id FROM entity WHERE name = 'Enterprise Bank'), (SELECT id FROM sys_field_type WHERE sys_data_type_id = (SELECT id FROM sys_data_type WHERE system_name = 'Business_Address_Zip')), 'Business_Address_Zip');
INSERT INTO field (entity_id, sys_field_type_id, name) VALUES ((SELECT id FROM entity WHERE name = 'Enterprise Bank'), (SELECT id FROM sys_field_type WHERE sys_data_type_id = (SELECT id FROM sys_data_type WHERE system_name = 'Business_Type')), 'Business_Type');
INSERT INTO field (entity_id, sys_field_type_id, name) VALUES ((SELECT id FROM entity WHERE name = 'Enterprise Bank'), (SELECT id FROM sys_field_type WHERE sys_data_type_id = (SELECT id FROM sys_data_type WHERE system_name = 'DBA')), 'DBA');
INSERT INTO field (entity_id, sys_field_type_id, name) VALUES ((SELECT id FROM entity WHERE name = 'Enterprise Bank'), (SELECT id FROM sys_field_type WHERE sys_data_type_id = (SELECT id FROM sys_data_type WHERE system_name = 'EIN')), 'EIN');
INSERT INTO field (entity_id, sys_field_type_id, name) VALUES ((SELECT id FROM entity WHERE name = 'Enterprise Bank'), (SELECT id FROM sys_field_type WHERE sys_data_type_id = (SELECT id FROM sys_data_type WHERE system_name = 'Individual_Years_Owner')), 'Individual_Years_Owner');

--INSERT INTO field (entity_id, sys_field_type_id, name, config_data) VALUES ((SELECT id FROM entity WHERE name = 'Enterprise Bank'), (SELECT id FROM sys_field_type WHERE sys_data_type_id = (SELECT id FROM sys_data_type WHERE system_name = 'Loan_Type')), 'Loan_Type', '[{ "key": 1, "value": "Accordian"}, { "key": 2, "value": "Term"}]');
--INSERT INTO field (entity_id, sys_field_type_id, name, config_data) VALUES ((SELECT id FROM entity WHERE name = 'Enterprise Bank'), (SELECT id FROM sys_field_type WHERE sys_data_type_id = (SELECT id FROM sys_data_type WHERE system_name = 'Loan_Term')), 'Loan_Term', '[{ "key": 1, "value": "3-month"}, { "key": 2, "value": "6-month"}, { "key": 3, "value": "1-year"}, { "key": 4, "value": "2-year"}]');
INSERT INTO field (entity_id, sys_field_type_id, name, config_data) VALUES ((SELECT id FROM entity WHERE name = 'Enterprise Bank'), (SELECT id FROM sys_field_type WHERE sys_data_type_id = (SELECT id FROM sys_data_type WHERE system_name = 'Loan_Type')), 'Loan_Type', '[{ "value": 1, "label": "Accordian"}, { "value": 2, "label": "Term"}]');
INSERT INTO field (entity_id, sys_field_type_id, name, config_data) VALUES ((SELECT id FROM entity WHERE name = 'Enterprise Bank'), (SELECT id FROM sys_field_type WHERE sys_data_type_id = (SELECT id FROM sys_data_type WHERE system_name = 'Loan_Term')), 'Loan_Term', '[{ "value": 1, "label": "3-month"}, { "value": 2, "label": "6-month"}, { "value": 3, "label": "1-year"}, { "value": 4, "label": "2-year"}]');
INSERT INTO field (entity_id, sys_field_type_id, name) VALUES ((SELECT id FROM entity WHERE name = 'Enterprise Bank'), (SELECT id FROM sys_field_type WHERE sys_data_type_id = (SELECT id FROM sys_data_type WHERE system_name = 'Loan_Amount')), 'Loan_Amount');



--add the empty single parent
INSERT INTO section (entity_id, name, label) VALUES ((SELECT id FROM entity WHERE name = 'Enterprise Bank'), 'top', 'top');

--add first template
INSERT INTO form_template (entity_id, name) 
	VALUES 	((SELECT id FROM entity WHERE name = 'Enterprise Bank'),
			'Retail Store');

--add the empty single parent 'top' section to the template			
INSERT INTO template_x_section (entity_id, template_id, section_id, parent_section_id, section_sequence) 
SELECT entity.id entity_id, st.id template_id, section.id section_id, 0, 1 
FROM entity 
INNER JOIN form_template st ON entity.id = st.entity_id 
INNER JOIN section ON entity.id = section.entity_id 
WHERE entity.name = 'Enterprise Bank' 
AND st.name = 'Retail Store' 
AND section.name = 'top';


			
--add level 1 sections
INSERT INTO section (entity_id, name, label) VALUES ((SELECT id FROM entity WHERE name = 'Enterprise Bank'), 'individual_info', 'Individual Information');
INSERT INTO section (entity_id, name, label) VALUES ((SELECT id FROM entity WHERE name = 'Enterprise Bank'), 'business_info', 'Business Information');
INSERT INTO section (entity_id, name, type, label) VALUES ((SELECT id FROM entity WHERE name = 'Enterprise Bank'), 'credit_request', 'TABULAR', 'Credit Request');
INSERT INTO section (entity_id, name, label) VALUES ((SELECT id FROM entity WHERE name = 'Enterprise Bank'), 'personal_fin_info', 'Personal Financial Information');

--insert sections into template under 'top'
INSERT INTO template_x_section (entity_id, template_id, section_id, parent_section_id, section_sequence) 
SELECT entity.id entity_id, st.id template_id, section.id section_id, parent.id parent_section_id, 1  
FROM entity 
INNER JOIN form_template st ON entity.id = st.entity_id 
INNER JOIN section ON entity.id = section.entity_id 
INNER JOIN section parent ON entity.id = parent.entity_id 
WHERE entity.name = 'Enterprise Bank' 
AND st.name = 'Retail Store' 
AND section.name = 'individual_info' 
AND parent.name = 'top';

			
INSERT INTO template_x_section (entity_id, template_id, section_id, parent_section_id, section_sequence) 
SELECT entity.id entity_id, st.id template_id, section.id section_id, parent.id parent_section_id, 2 
FROM entity 
INNER JOIN form_template st ON entity.id = st.entity_id 
INNER JOIN section ON entity.id = section.entity_id 
INNER JOIN section parent ON entity.id = parent.entity_id 
WHERE entity.name = 'Enterprise Bank' 
AND st.name = 'Retail Store' 
AND section.name = 'business_info' 
AND parent.name = 'top';
			

/* INSERT INTO template_x_section (entity_id, parent_id, child_id) 
	VALUES ((SELECT id FROM entity WHERE name = 'Enterprise Bank'),
			(SELECT id FROM section WHERE name = 'top' AND entity_id = (SELECT id FROM entity WHERE name = 'Enterprise Bank')),
			(SELECT id FROM section WHERE name = 'credit_request' AND entity_id = (SELECT id FROM entity WHERE name = 'Enterprise Bank'))
			);  */

INSERT INTO template_x_section (entity_id, template_id, section_id, parent_section_id, section_sequence) 
SELECT entity.id entity_id, st.id template_id, section.id section_id, parent.id parent_section_id, 3 
FROM entity 
INNER JOIN form_template st ON entity.id = st.entity_id 
INNER JOIN section ON entity.id = section.entity_id 
INNER JOIN section parent ON entity.id = parent.entity_id 
WHERE entity.name = 'Enterprise Bank' 
AND st.name = 'Retail Store' 
AND section.name = 'credit_request' 
AND parent.name = 'top';
						
			

INSERT INTO template_x_section (entity_id, template_id, section_id, parent_section_id, section_sequence) 
SELECT entity.id entity_id, st.id template_id, section.id section_id, parent.id parent_section_id, 4  
FROM entity 
INNER JOIN form_template st ON entity.id = st.entity_id 
INNER JOIN section ON entity.id = section.entity_id 
INNER JOIN section parent ON entity.id = parent.entity_id 
WHERE entity.name = 'Enterprise Bank' 
AND st.name = 'Retail Store' 
AND section.name = 'personal_fin_info' 
AND parent.name = 'top';
						
			
--insert level 2 section
INSERT INTO section (entity_id, name, label) VALUES ((SELECT id FROM entity WHERE name = 'Enterprise Bank'), 'assets', 'Assests');


INSERT INTO template_x_section (entity_id, template_id, section_id, parent_section_id, section_sequence) 
SELECT entity.id entity_id, st.id template_id, section.id section_id, parent.id parent_section_id, 1 
FROM entity 
INNER JOIN form_template st ON entity.id = st.entity_id 
INNER JOIN section ON entity.id = section.entity_id 
INNER JOIN section parent ON entity.id = parent.entity_id 
WHERE entity.name = 'Enterprise Bank' 
AND st.name = 'Retail Store' 
AND section.name = 'assets' 
AND parent.name = 'personal_fin_info';			
			
INSERT INTO section (entity_id, name, label) VALUES ((SELECT id FROM entity WHERE name = 'Enterprise Bank'), 'marketable_sec', 'Marketable Securities');
INSERT INTO section (entity_id, name, label) VALUES ((SELECT id FROM entity WHERE name = 'Enterprise Bank'), 'nonmarketable_sec', 'Non-Marketable Securities');
INSERT INTO section (entity_id, name, label) VALUES ((SELECT id FROM entity WHERE name = 'Enterprise Bank'), 'retirment_account_', 'Retirement Accounts');


INSERT INTO template_x_section (entity_id, template_id, section_id, parent_section_id, section_sequence) 
SELECT entity.id entity_id, st.id template_id, section.id section_id, parent.id parent_section_id, 1  
FROM entity 
INNER JOIN form_template st ON entity.id = st.entity_id 
INNER JOIN section ON entity.id = section.entity_id 
INNER JOIN section parent ON entity.id = parent.entity_id 
WHERE entity.name = 'Enterprise Bank' 
AND st.name = 'Retail Store' 
AND section.name = 'marketable_sec' 
AND parent.name = 'assets';				

INSERT INTO template_x_section (entity_id, template_id, section_id, parent_section_id, section_sequence) 
SELECT entity.id entity_id, st.id template_id, section.id section_id, parent.id parent_section_id, 2 
FROM entity 
INNER JOIN form_template st ON entity.id = st.entity_id 
INNER JOIN section ON entity.id = section.entity_id 
INNER JOIN section parent ON entity.id = parent.entity_id 
WHERE entity.name = 'Enterprise Bank' 
AND st.name = 'Retail Store' 
AND section.name = 'nonmarketable_sec' 
AND parent.name = 'assets';	


INSERT INTO template_x_section (entity_id, template_id, section_id, parent_section_id, section_sequence) 
SELECT entity.id entity_id, st.id template_id, section.id section_id, parent.id parent_section_id, 3 
FROM entity 
INNER JOIN form_template st ON entity.id = st.entity_id 
INNER JOIN section ON entity.id = section.entity_id 
INNER JOIN section parent ON entity.id = parent.entity_id 
WHERE entity.name = 'Enterprise Bank' 
AND st.name = 'Retail Store' 
AND section.name = 'retirment_account_' 
AND parent.name = 'assets';	

INSERT INTO section (entity_id, name, label) VALUES ((SELECT id FROM entity WHERE name = 'Enterprise Bank'), 'liabilities', 'Liabilities');


INSERT INTO template_x_section (entity_id, template_id, section_id, parent_section_id, section_sequence) 
SELECT entity.id entity_id, st.id template_id, section.id section_id, parent.id parent_section_id, 2 
FROM entity 
INNER JOIN form_template st ON entity.id = st.entity_id 
INNER JOIN section ON entity.id = section.entity_id 
INNER JOIN section parent ON entity.id = parent.entity_id 
WHERE entity.name = 'Enterprise Bank' 
AND st.name = 'Retail Store' 
AND section.name = 'liabilities' 
AND parent.name = 'personal_fin_info';				
			
INSERT INTO section (entity_id, name, label) VALUES ((SELECT id FROM entity WHERE name = 'Enterprise Bank'), 'credit_obligations', 'Credt Obligations');


INSERT INTO template_x_section (entity_id, template_id, section_id, parent_section_id, section_sequence) 
SELECT entity.id entity_id, st.id template_id, section.id section_id, parent.id parent_section_id, 1 
FROM entity 
INNER JOIN form_template st ON entity.id = st.entity_id 
INNER JOIN section ON entity.id = section.entity_id 
INNER JOIN section parent ON entity.id = parent.entity_id 
WHERE entity.name = 'Enterprise Bank' 
AND st.name = 'Retail Store' 
AND section.name = 'credit_obligations' 
AND parent.name = 'liabilities';	

INSERT INTO section (entity_id, name, label) VALUES ((SELECT id FROM entity WHERE name = 'Enterprise Bank'), 'income_expenditures', 'Income and Expenditures');


INSERT INTO template_x_section (entity_id, template_id, section_id, parent_section_id, section_sequence) 
SELECT entity.id entity_id, st.id template_id, section.id section_id, parent.id parent_section_id, 3 
FROM entity 
INNER JOIN form_template st ON entity.id = st.entity_id 
INNER JOIN section ON entity.id = section.entity_id 
INNER JOIN section parent ON entity.id = parent.entity_id 
WHERE entity.name = 'Enterprise Bank' 
AND st.name = 'Retail Store' 
AND section.name = 'income_expenditures' 
AND parent.name = 'personal_fin_info';

INSERT INTO section (entity_id, name, label) VALUES ((SELECT id FROM entity WHERE name = 'Enterprise Bank'), 'contingent_liabilities', 'Contingent Liabilities');


INSERT INTO template_x_section (entity_id, template_id, section_id, parent_section_id, section_sequence) 
SELECT entity.id entity_id, st.id template_id, section.id section_id, parent.id parent_section_id, 4 
FROM entity 
INNER JOIN form_template st ON entity.id = st.entity_id 
INNER JOIN section ON entity.id = section.entity_id 
INNER JOIN section parent ON entity.id = parent.entity_id 
WHERE entity.name = 'Enterprise Bank' 
AND st.name = 'Retail Store' 
AND section.name = 'contingent_liabilities' 
AND parent.name = 'personal_fin_info';

INSERT INTO section (entity_id, name, label) VALUES ((SELECT id FROM entity WHERE name = 'Enterprise Bank'), 'business_fin_info', 'Business Financial Information');


INSERT INTO template_x_section (entity_id, template_id, section_id, parent_section_id, section_sequence) 
SELECT entity.id entity_id, st.id template_id, section.id section_id, parent.id parent_section_id, 5 
FROM entity 
INNER JOIN form_template st ON entity.id = st.entity_id 
INNER JOIN section ON entity.id = section.entity_id 
INNER JOIN section parent ON entity.id = parent.entity_id 
WHERE entity.name = 'Enterprise Bank' 
AND st.name = 'Retail Store' 
AND section.name = 'business_fin_info' 
AND parent.name = 'top';

INSERT INTO section (entity_id, name, label) VALUES ((SELECT id FROM entity WHERE name = 'Enterprise Bank'), 'curr_prev_fin', 'Current and Previous Financials');


INSERT INTO template_x_section (entity_id, template_id, section_id, parent_section_id, section_sequence) 
SELECT entity.id entity_id, st.id template_id, section.id section_id, parent.id parent_section_id, 1 
FROM entity 
INNER JOIN form_template st ON entity.id = st.entity_id 
INNER JOIN section ON entity.id = section.entity_id 
INNER JOIN section parent ON entity.id = parent.entity_id 
WHERE entity.name = 'Enterprise Bank' 
AND st.name = 'Retail Store' 
AND section.name = 'curr_prev_fin' 
AND parent.name = 'business_fin_info';


--Add fields to individual_info section
INSERT INTO field_instance (entity_id, section_id, field_id, field_sequence, data) 
	VALUES ((SELECT id FROM entity WHERE name = 'Enterprise Bank'), 
			(SELECT id FROM section WHERE name = 'individual_info' AND entity_id = (SELECT id FROM entity WHERE name = 'Enterprise Bank')), 
			(SELECT id FROM field WHERE (sys_field_type_id = 
					(SELECT id FROM sys_field_type WHERE sys_data_type_id = 
							((SELECT id FROM sys_data_type WHERE system_name = 'Individual_Full_Name')))) 
									AND entity_id = (SELECT id FROM entity WHERE name = 'Enterprise Bank')), 1, 'John Doe');
			
INSERT INTO field_instance (entity_id, section_id, field_id, field_sequence) 
	VALUES ((SELECT id FROM entity WHERE name = 'Enterprise Bank'), 
			(SELECT id FROM section WHERE name = 'individual_info' AND entity_id = (SELECT id FROM entity WHERE name = 'Enterprise Bank')), 
			(SELECT id FROM field WHERE (sys_field_type_id = 
					(SELECT id FROM sys_field_type WHERE sys_data_type_id = 
							((SELECT id FROM sys_data_type WHERE system_name = 'Individual_Address_Street')))) 
									AND entity_id = (SELECT id FROM entity WHERE name = 'Enterprise Bank')), 2);


INSERT INTO field_instance (entity_id, section_id, field_id, field_sequence) 
	VALUES ((SELECT id FROM entity WHERE name = 'Enterprise Bank'), 
			(SELECT id FROM section WHERE name = 'individual_info' AND entity_id = (SELECT id FROM entity WHERE name = 'Enterprise Bank')), 
			(SELECT id FROM field WHERE (sys_field_type_id = 
					(SELECT id FROM sys_field_type WHERE sys_data_type_id = 
							((SELECT id FROM sys_data_type WHERE system_name = 'Individual_Address_City')))) 
									AND entity_id = (SELECT id FROM entity WHERE name = 'Enterprise Bank')), 3);
									
INSERT INTO field_instance (entity_id, section_id, field_id, field_sequence) 
	VALUES ((SELECT id FROM entity WHERE name = 'Enterprise Bank'), 
			(SELECT id FROM section WHERE name = 'individual_info' AND entity_id = (SELECT id FROM entity WHERE name = 'Enterprise Bank')), 
			(SELECT id FROM field WHERE (sys_field_type_id = 
					(SELECT id FROM sys_field_type WHERE sys_data_type_id = 
							((SELECT id FROM sys_data_type WHERE system_name = 'Individual_Address_State')))) 
									AND entity_id = (SELECT id FROM entity WHERE name = 'Enterprise Bank')), 4);
									
INSERT INTO field_instance (entity_id, section_id, field_id, field_sequence) 
	VALUES ((SELECT id FROM entity WHERE name = 'Enterprise Bank'), 
			(SELECT id FROM section WHERE name = 'individual_info' AND entity_id = (SELECT id FROM entity WHERE name = 'Enterprise Bank')), 
			(SELECT id FROM field WHERE (sys_field_type_id = 
					(SELECT id FROM sys_field_type WHERE sys_data_type_id = 
							((SELECT id FROM sys_data_type WHERE system_name = 'Individual_Address_Zip')))) 
									AND entity_id = (SELECT id FROM entity WHERE name = 'Enterprise Bank')), 5);
									
INSERT INTO field_instance (entity_id, section_id, field_id, field_sequence) 
	VALUES ((SELECT id FROM entity WHERE name = 'Enterprise Bank'), 
			(SELECT id FROM section WHERE name = 'individual_info' AND entity_id = (SELECT id FROM entity WHERE name = 'Enterprise Bank')), 
			(SELECT id FROM field WHERE (sys_field_type_id = 
					(SELECT id FROM sys_field_type WHERE sys_data_type_id = 
							((SELECT id FROM sys_data_type WHERE system_name = 'Individual_Phone')))) 
									AND entity_id = (SELECT id FROM entity WHERE name = 'Enterprise Bank')), 6);
									
INSERT INTO field_instance (entity_id, section_id, field_id, field_sequence) 
	VALUES ((SELECT id FROM entity WHERE name = 'Enterprise Bank'), 
			(SELECT id FROM section WHERE name = 'individual_info' AND entity_id = (SELECT id FROM entity WHERE name = 'Enterprise Bank')), 
			(SELECT id FROM field WHERE (sys_field_type_id = 
					(SELECT id FROM sys_field_type WHERE sys_data_type_id = 
							((SELECT id FROM sys_data_type WHERE system_name = 'Individual_SSN')))) 
									AND entity_id = (SELECT id FROM entity WHERE name = 'Enterprise Bank')), 7);
									
INSERT INTO field_instance (entity_id, section_id, field_id, field_sequence) 
	VALUES ((SELECT id FROM entity WHERE name = 'Enterprise Bank'), 
			(SELECT id FROM section WHERE name = 'individual_info' AND entity_id = (SELECT id FROM entity WHERE name = 'Enterprise Bank')), 
			(SELECT id FROM field WHERE (sys_field_type_id = 
					(SELECT id FROM sys_field_type WHERE sys_data_type_id = 
							((SELECT id FROM sys_data_type WHERE system_name = 'Individual_DOB')))) 
									AND entity_id = (SELECT id FROM entity WHERE name = 'Enterprise Bank')), 8);
									
INSERT INTO field_instance (entity_id, section_id, field_id, field_sequence) 
	VALUES ((SELECT id FROM entity WHERE name = 'Enterprise Bank'), 
			(SELECT id FROM section WHERE name = 'individual_info' AND entity_id = (SELECT id FROM entity WHERE name = 'Enterprise Bank')), 
			(SELECT id FROM field WHERE (sys_field_type_id = 
					(SELECT id FROM sys_field_type WHERE sys_data_type_id = 
							((SELECT id FROM sys_data_type WHERE system_name = 'Individual_Title_Position')))) 
									AND entity_id = (SELECT id FROM entity WHERE name = 'Enterprise Bank')), 9);
									
INSERT INTO field_instance (entity_id, section_id, field_id, field_sequence) 
	VALUES ((SELECT id FROM entity WHERE name = 'Enterprise Bank'), 
			(SELECT id FROM section WHERE name = 'individual_info' AND entity_id = (SELECT id FROM entity WHERE name = 'Enterprise Bank')), 
			(SELECT id FROM field WHERE (sys_field_type_id = 
					(SELECT id FROM sys_field_type WHERE sys_data_type_id = 
							((SELECT id FROM sys_data_type WHERE system_name = 'Individual_Ownership_Perc')))) 
									AND entity_id = (SELECT id FROM entity WHERE name = 'Enterprise Bank')), 10);
									
INSERT INTO field_instance (entity_id, section_id, field_id, field_sequence) 
	VALUES ((SELECT id FROM entity WHERE name = 'Enterprise Bank'), 
			(SELECT id FROM section WHERE name = 'individual_info' AND entity_id = (SELECT id FROM entity WHERE name = 'Enterprise Bank')), 
			(SELECT id FROM field WHERE (sys_field_type_id = 
					(SELECT id FROM sys_field_type WHERE sys_data_type_id = 
							((SELECT id FROM sys_data_type WHERE system_name = 'Individual_Tenure')))) 
									AND entity_id = (SELECT id FROM entity WHERE name = 'Enterprise Bank')), 11);
									
INSERT INTO field_instance (entity_id, section_id, field_id, field_sequence) 
	VALUES ((SELECT id FROM entity WHERE name = 'Enterprise Bank'), 
			(SELECT id FROM section WHERE name = 'individual_info' AND entity_id = (SELECT id FROM entity WHERE name = 'Enterprise Bank')), 
			(SELECT id FROM field WHERE (sys_field_type_id = 
					(SELECT id FROM sys_field_type WHERE sys_data_type_id = 
							((SELECT id FROM sys_data_type WHERE system_name = 'Individual_Bankruptcy')))) 
									AND entity_id = (SELECT id FROM entity WHERE name = 'Enterprise Bank')), 12);
									
INSERT INTO field_instance (entity_id, section_id, field_id, field_sequence) 
	VALUES ((SELECT id FROM entity WHERE name = 'Enterprise Bank'), 
			(SELECT id FROM section WHERE name = 'individual_info' AND entity_id = (SELECT id FROM entity WHERE name = 'Enterprise Bank')), 
			(SELECT id FROM field WHERE (sys_field_type_id = 
					(SELECT id FROM sys_field_type WHERE sys_data_type_id = 
							((SELECT id FROM sys_data_type WHERE system_name = 'Individual_Existing_Customer')))) 
									AND entity_id = (SELECT id FROM entity WHERE name = 'Enterprise Bank')), 13);



--Add fields to business_info section

INSERT INTO field_instance (entity_id, section_id, field_id, field_sequence) 
	VALUES ((SELECT id FROM entity WHERE name = 'Enterprise Bank'), 
			(SELECT id FROM section WHERE name = 'business_info' AND entity_id = (SELECT id FROM entity WHERE name = 'Enterprise Bank')), 
			(SELECT id FROM field WHERE (sys_field_type_id = 
					(SELECT id FROM sys_field_type WHERE sys_data_type_id = 
							((SELECT id FROM sys_data_type WHERE system_name = 'Business_Name')))) 
									AND entity_id = (SELECT id FROM entity WHERE name = 'Enterprise Bank')), 1);

INSERT INTO field_instance (entity_id, section_id, field_id, field_sequence) 
	VALUES ((SELECT id FROM entity WHERE name = 'Enterprise Bank'), 
			(SELECT id FROM section WHERE name = 'business_info' AND entity_id = (SELECT id FROM entity WHERE name = 'Enterprise Bank')), 
			(SELECT id FROM field WHERE (sys_field_type_id = 
					(SELECT id FROM sys_field_type WHERE sys_data_type_id = 
							((SELECT id FROM sys_data_type WHERE system_name = 'Business_Address_Street')))) 
									AND entity_id = (SELECT id FROM entity WHERE name = 'Enterprise Bank')), 2);
									
INSERT INTO field_instance (entity_id, section_id, field_id, field_sequence) 
	VALUES ((SELECT id FROM entity WHERE name = 'Enterprise Bank'), 
			(SELECT id FROM section WHERE name = 'business_info' AND entity_id = (SELECT id FROM entity WHERE name = 'Enterprise Bank')), 
			(SELECT id FROM field WHERE (sys_field_type_id = 
					(SELECT id FROM sys_field_type WHERE sys_data_type_id = 
							((SELECT id FROM sys_data_type WHERE system_name = 'Business_Address_City')))) 
									AND entity_id = (SELECT id FROM entity WHERE name = 'Enterprise Bank')), 3);

INSERT INTO field_instance (entity_id, section_id, field_id, field_sequence) 
	VALUES ((SELECT id FROM entity WHERE name = 'Enterprise Bank'), 
			(SELECT id FROM section WHERE name = 'business_info' AND entity_id = (SELECT id FROM entity WHERE name = 'Enterprise Bank')), 
			(SELECT id FROM field WHERE (sys_field_type_id = 
					(SELECT id FROM sys_field_type WHERE sys_data_type_id = 
							((SELECT id FROM sys_data_type WHERE system_name = 'Business_Address_State')))) 
									AND entity_id = (SELECT id FROM entity WHERE name = 'Enterprise Bank')), 4);
									
INSERT INTO field_instance (entity_id, section_id, field_id, field_sequence) 
SELECT entity.id entity_id, section.id section_id, field.id field_id, 5 
FROM entity 
INNER JOIN section ON entity.id = section.entity_id 
INNER JOIN field ON entity.id = field.entity_id 
INNER JOIN sys_field_type ON sys_field_type.id = field.sys_field_type_id 
INNER JOIN sys_data_type ON sys_data_type.id = sys_field_type.sys_data_type_id 
WHERE entity.name = 'Enterprise Bank' 
AND section.name = 'business_info' 
AND sys_data_type.system_name = 'Business_Address_Zip';


INSERT INTO field_comm (entity_id, user_id, field_instance_id, name, text)
VALUES (1026, (SELECT id FROM users WHERE email = 'jsd@gmail.com'), 1096,'David', 'What is this');

INSERT INTO field_comm (entity_id, user_id, field_instance_id, name, text)
VALUES (1026, (SELECT id FROM users WHERE email = 'jsd@gmail.com'), 1096,'John', 'Your full legal name, please.');

INSERT INTO field_comm (entity_id, user_id, field_instance_id, name, text)
VALUES (1026, (SELECT id FROM users WHERE email = 'jsd@gmail.com'), 1096,'David', 'Thanks.');



--Add fields to credit_request section.  Two occurances. Two loan products
INSERT INTO field_instance (entity_id, section_id, field_id, field_sequence, occur_sequence, data) 
SELECT entity.id entity_id, section.id section_id, field.id field_id, 1, 1, '1' 
FROM entity 
INNER JOIN section ON entity.id = section.entity_id 
INNER JOIN field ON entity.id = field.entity_id 
INNER JOIN sys_field_type ON sys_field_type.id = field.sys_field_type_id 
INNER JOIN sys_data_type ON sys_data_type.id = sys_field_type.sys_data_type_id 
WHERE entity.name = 'Enterprise Bank' 
AND section.name = 'credit_request' 
AND sys_data_type.system_name = 'Loan_Type';

INSERT INTO field_instance (entity_id, section_id, field_id, field_sequence, occur_sequence, data) 
SELECT entity.id entity_id, section.id section_id, field.id field_id, 2, 1, '1' 
FROM entity 
INNER JOIN section ON entity.id = section.entity_id 
INNER JOIN field ON entity.id = field.entity_id 
INNER JOIN sys_field_type ON sys_field_type.id = field.sys_field_type_id 
INNER JOIN sys_data_type ON sys_data_type.id = sys_field_type.sys_data_type_id 
WHERE entity.name = 'Enterprise Bank' 
AND section.name = 'credit_request' 
AND sys_data_type.system_name = 'Loan_Term';

INSERT INTO field_instance (entity_id, section_id, field_id, field_sequence, occur_sequence, data) 
SELECT entity.id entity_id, section.id section_id, field.id field_id, 3, 1, '30,000'  
FROM entity 
INNER JOIN section ON entity.id = section.entity_id 
INNER JOIN field ON entity.id = field.entity_id 
INNER JOIN sys_field_type ON sys_field_type.id = field.sys_field_type_id 
INNER JOIN sys_data_type ON sys_data_type.id = sys_field_type.sys_data_type_id 
WHERE entity.name = 'Enterprise Bank' 
AND section.name = 'credit_request' 
AND sys_data_type.system_name = 'Loan_Amount';

INSERT INTO field_instance (entity_id, section_id, field_id, field_sequence, occur_sequence, data) 
SELECT entity.id entity_id, section.id section_id, field.id field_id, 1, 2, '2' 
FROM entity 
INNER JOIN section ON entity.id = section.entity_id 
INNER JOIN field ON entity.id = field.entity_id 
INNER JOIN sys_field_type ON sys_field_type.id = field.sys_field_type_id 
INNER JOIN sys_data_type ON sys_data_type.id = sys_field_type.sys_data_type_id 
WHERE entity.name = 'Enterprise Bank' 
AND section.name = 'credit_request' 
AND sys_data_type.system_name = 'Loan_Type';

INSERT INTO field_instance (entity_id, section_id, field_id, field_sequence, occur_sequence, data) 
SELECT entity.id entity_id, section.id section_id, field.id field_id, 2, 2, '3' 
FROM entity 
INNER JOIN section ON entity.id = section.entity_id 
INNER JOIN field ON entity.id = field.entity_id 
INNER JOIN sys_field_type ON sys_field_type.id = field.sys_field_type_id 
INNER JOIN sys_data_type ON sys_data_type.id = sys_field_type.sys_data_type_id 
WHERE entity.name = 'Enterprise Bank' 
AND section.name = 'credit_request' 
AND sys_data_type.system_name = 'Loan_Term';

INSERT INTO field_instance (entity_id, section_id, field_id, field_sequence, occur_sequence, data) 
SELECT entity.id entity_id, section.id section_id, field.id field_id, 3, 2, '100,000' 
FROM entity 
INNER JOIN section ON entity.id = section.entity_id 
INNER JOIN field ON entity.id = field.entity_id 
INNER JOIN sys_field_type ON sys_field_type.id = field.sys_field_type_id 
INNER JOIN sys_data_type ON sys_data_type.id = sys_field_type.sys_data_type_id 
WHERE entity.name = 'Enterprise Bank' 
AND section.name = 'credit_request' 
AND sys_data_type.system_name = 'Loan_Amount';
