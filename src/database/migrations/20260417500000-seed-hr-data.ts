export const up = async ({ context: qi }) => {
  // Regions
  await qi.bulkInsert('regions', [
    { region_id: 1, region_name: 'Europe', createdAt: new Date(), updatedAt: new Date() },
    { region_id: 2, region_name: 'Americas', createdAt: new Date(), updatedAt: new Date() },
    { region_id: 3, region_name: 'Asia', createdAt: new Date(), updatedAt: new Date() },
    { region_id: 4, region_name: 'Middle East and Africa', createdAt: new Date(), updatedAt: new Date() },
  ]);

  // Countries
  await qi.bulkInsert('countries', [
    { country_id: 'AR', country_name: 'Argentina', region_id: 2, createdAt: new Date(), updatedAt: new Date() },
    { country_id: 'AU', country_name: 'Australia', region_id: 3, createdAt: new Date(), updatedAt: new Date() },
    { country_id: 'BE', country_name: 'Belgium', region_id: 1, createdAt: new Date(), updatedAt: new Date() },
    { country_id: 'BR', country_name: 'Brazil', region_id: 2, createdAt: new Date(), updatedAt: new Date() },
    { country_id: 'CA', country_name: 'Canada', region_id: 2, createdAt: new Date(), updatedAt: new Date() },
    { country_id: 'CH', country_name: 'Switzerland', region_id: 1, createdAt: new Date(), updatedAt: new Date() },
    { country_id: 'CN', country_name: 'China', region_id: 3, createdAt: new Date(), updatedAt: new Date() },
    { country_id: 'DE', country_name: 'Germany', region_id: 1, createdAt: new Date(), updatedAt: new Date() },
    { country_id: 'DK', country_name: 'Denmark', region_id: 1, createdAt: new Date(), updatedAt: new Date() },
    { country_id: 'EG', country_name: 'Egypt', region_id: 4, createdAt: new Date(), updatedAt: new Date() },
    { country_id: 'FR', country_name: 'France', region_id: 1, createdAt: new Date(), updatedAt: new Date() },
    { country_id: 'HK', country_name: 'HongKong', region_id: 3, createdAt: new Date(), updatedAt: new Date() },
    { country_id: 'IL', country_name: 'Israel', region_id: 4, createdAt: new Date(), updatedAt: new Date() },
    { country_id: 'IN', country_name: 'India', region_id: 3, createdAt: new Date(), updatedAt: new Date() },
    { country_id: 'IT', country_name: 'Italy', region_id: 1, createdAt: new Date(), updatedAt: new Date() },
    { country_id: 'JP', country_name: 'Japan', region_id: 3, createdAt: new Date(), updatedAt: new Date() },
    { country_id: 'KW', country_name: 'Kuwait', region_id: 4, createdAt: new Date(), updatedAt: new Date() },
    { country_id: 'ML', country_name: 'Malaysia', region_id: 3, createdAt: new Date(), updatedAt: new Date() },
    { country_id: 'MX', country_name: 'Mexico', region_id: 2, createdAt: new Date(), updatedAt: new Date() },
    { country_id: 'NG', country_name: 'Nigeria', region_id: 4, createdAt: new Date(), updatedAt: new Date() },
    { country_id: 'NL', country_name: 'Netherlands', region_id: 1, createdAt: new Date(), updatedAt: new Date() },
    { country_id: 'SG', country_name: 'Singapore', region_id: 3, createdAt: new Date(), updatedAt: new Date() },
    { country_id: 'UK', country_name: 'United Kingdom', region_id: 1, createdAt: new Date(), updatedAt: new Date() },
    { country_id: 'US', country_name: 'United States of America', region_id: 2, createdAt: new Date(), updatedAt: new Date() },
    { country_id: 'ZM', country_name: 'Zambia', region_id: 4, createdAt: new Date(), updatedAt: new Date() },
    { country_id: 'ZW', country_name: 'Zimbabwe', region_id: 4, createdAt: new Date(), updatedAt: new Date() },
  ]);

  // Locations
  await qi.bulkInsert('locations', [
    { location_id: 1000, street_address: '1297 Via Cola di Rie', postal_code: '00989', city: 'Roma', state_province: null, country_id: 'IT', createdAt: new Date(), updatedAt: new Date() },
    { location_id: 1100, street_address: '93091 Calle della Testa', postal_code: '10934', city: 'Venice', state_province: null, country_id: 'IT', createdAt: new Date(), updatedAt: new Date() },
    { location_id: 1200, street_address: '2017 Shinjuku-ku', postal_code: '1689', city: 'Tokyo', state_province: 'Tokyo Prefecture', country_id: 'JP', createdAt: new Date(), updatedAt: new Date() },
    { location_id: 1300, street_address: '9450 Kamiya-cho', postal_code: '6823', city: 'Hiroshima', state_province: null, country_id: 'JP', createdAt: new Date(), updatedAt: new Date() },
    { location_id: 1400, street_address: '2014 Jabberwocky Rd', postal_code: '26192', city: 'Southlake', state_province: 'Texas', country_id: 'US', createdAt: new Date(), updatedAt: new Date() },
    { location_id: 1500, street_address: '2011 Interiors Blvd', postal_code: '99236', city: 'South San Francisco', state_province: 'California', country_id: 'US', createdAt: new Date(), updatedAt: new Date() },
    { location_id: 1600, street_address: '2007 Zagora St', postal_code: '50090', city: 'South Brunswick', state_province: 'New Jersey', country_id: 'US', createdAt: new Date(), updatedAt: new Date() },
    { location_id: 1700, street_address: '2004 Charade Rd', postal_code: '98199', city: 'Seattle', state_province: 'Washington', country_id: 'US', createdAt: new Date(), updatedAt: new Date() },
    { location_id: 1800, street_address: '147 Spadina Ave', postal_code: 'M5V 2L7', city: 'Toronto', state_province: 'Ontario', country_id: 'CA', createdAt: new Date(), updatedAt: new Date() },
    { location_id: 1900, street_address: '6092 Boxwood St', postal_code: 'YSW 9T2', city: 'Whitehorse', state_province: 'Yukon', country_id: 'CA', createdAt: new Date(), updatedAt: new Date() },
    { location_id: 2000, street_address: '40-5-12 Laogianggen', postal_code: '190518', city: 'Beijing', state_province: null, country_id: 'CN', createdAt: new Date(), updatedAt: new Date() },
    { location_id: 2100, street_address: '1298 Vileparle (E)', postal_code: '490231', city: 'Bombay', state_province: 'Maharashtra', country_id: 'IN', createdAt: new Date(), updatedAt: new Date() },
    { location_id: 2200, street_address: '12-98 Victoria Street', postal_code: '2901', city: 'Sydney', state_province: 'New South Wales', country_id: 'AU', createdAt: new Date(), updatedAt: new Date() },
    { location_id: 2300, street_address: '198 Clementi North', postal_code: '540198', city: 'Singapore', state_province: null, country_id: 'SG', createdAt: new Date(), updatedAt: new Date() },
    { location_id: 2400, street_address: '8204 Arthur St', postal_code: null, city: 'London', state_province: null, country_id: 'UK', createdAt: new Date(), updatedAt: new Date() },
    { location_id: 2500, street_address: 'Magdalen Centre, The Oxford Science Park', postal_code: 'OX9 9ZB', city: 'Oxford', state_province: 'Oxford', country_id: 'UK', createdAt: new Date(), updatedAt: new Date() },
    { location_id: 2600, street_address: '9702 Chester Road', postal_code: '09629850293', city: 'Stretford', state_province: 'Manchester', country_id: 'UK', createdAt: new Date(), updatedAt: new Date() },
    { location_id: 2700, street_address: 'Schwanthalerstr. 7031', postal_code: '80925', city: 'Munich', state_province: 'Bavaria', country_id: 'DE', createdAt: new Date(), updatedAt: new Date() },
    { location_id: 2800, street_address: 'Rua Frei Caneca 1360', postal_code: '01307-002', city: 'Sao Paulo', state_province: 'Sao Paulo', country_id: 'BR', createdAt: new Date(), updatedAt: new Date() },
    { location_id: 2900, street_address: '20 Rue des Corps-Saints', postal_code: '1730', city: 'Geneva', state_province: 'Geneve', country_id: 'CH', createdAt: new Date(), updatedAt: new Date() },
    { location_id: 3000, street_address: 'Murtenstrasse 921', postal_code: '3095', city: 'Bern', state_province: 'BE', country_id: 'CH', createdAt: new Date(), updatedAt: new Date() },
    { location_id: 3100, street_address: 'Pieter Breughelstraat 837', postal_code: '3029SK', city: 'Utrecht', state_province: 'Utrecht', country_id: 'NL', createdAt: new Date(), updatedAt: new Date() },
    { location_id: 3200, street_address: 'Mariano Escobedo 9991', postal_code: '11932', city: 'Mexico City', state_province: 'Distrito Federal', country_id: 'MX', createdAt: new Date(), updatedAt: new Date() },
  ]);

  // Jobs
  await qi.bulkInsert('jobs', [
    { job_id: 'AD_PRES', job_title: 'President', min_salary: 20000, max_salary: 40000, createdAt: new Date(), updatedAt: new Date() },
    { job_id: 'AD_VP', job_title: 'Administration Vice President', min_salary: 15000, max_salary: 30000, createdAt: new Date(), updatedAt: new Date() },
    { job_id: 'AD_ASST', job_title: 'Administration Assistant', min_salary: 3000, max_salary: 6000, createdAt: new Date(), updatedAt: new Date() },
    { job_id: 'FI_MGR', job_title: 'Finance Manager', min_salary: 8200, max_salary: 16000, createdAt: new Date(), updatedAt: new Date() },
    { job_id: 'FI_ACCOUNT', job_title: 'Accountant', min_salary: 4200, max_salary: 9000, createdAt: new Date(), updatedAt: new Date() },
    { job_id: 'AC_MGR', job_title: 'Accounting Manager', min_salary: 8200, max_salary: 16000, createdAt: new Date(), updatedAt: new Date() },
    { job_id: 'AC_ACCOUNT', job_title: 'Public Accountant', min_salary: 4200, max_salary: 9000, createdAt: new Date(), updatedAt: new Date() },
    { job_id: 'SA_MAN', job_title: 'Sales Manager', min_salary: 10000, max_salary: 20000, createdAt: new Date(), updatedAt: new Date() },
    { job_id: 'SA_REP', job_title: 'Sales Representative', min_salary: 6000, max_salary: 12000, createdAt: new Date(), updatedAt: new Date() },
    { job_id: 'PU_MAN', job_title: 'Purchasing Manager', min_salary: 8000, max_salary: 15000, createdAt: new Date(), updatedAt: new Date() },
    { job_id: 'PU_CLERK', job_title: 'Purchasing Clerk', min_salary: 2500, max_salary: 5500, createdAt: new Date(), updatedAt: new Date() },
    { job_id: 'ST_MAN', job_title: 'Stock Manager', min_salary: 5500, max_salary: 8500, createdAt: new Date(), updatedAt: new Date() },
    { job_id: 'ST_CLERK', job_title: 'Stock Clerk', min_salary: 2000, max_salary: 5000, createdAt: new Date(), updatedAt: new Date() },
    { job_id: 'SH_CLERK', job_title: 'Shipping Clerk', min_salary: 2500, max_salary: 5500, createdAt: new Date(), updatedAt: new Date() },
    { job_id: 'IT_PROG', job_title: 'Programmer', min_salary: 4000, max_salary: 10000, createdAt: new Date(), updatedAt: new Date() },
    { job_id: 'MK_MAN', job_title: 'Marketing Manager', min_salary: 9000, max_salary: 15000, createdAt: new Date(), updatedAt: new Date() },
    { job_id: 'MK_REP', job_title: 'Marketing Representative', min_salary: 4000, max_salary: 9000, createdAt: new Date(), updatedAt: new Date() },
    { job_id: 'HR_REP', job_title: 'Human Resources Representative', min_salary: 4000, max_salary: 9000, createdAt: new Date(), updatedAt: new Date() },
    { job_id: 'PR_REP', job_title: 'Public Relations Representative', min_salary: 4500, max_salary: 10500, createdAt: new Date(), updatedAt: new Date() },
  ]);

  // Employees (manager_id/department_id 참조 때문에 순서 중요)
  await qi.bulkInsert('employees', [
    { employee_id: 100, first_name: 'Steven', last_name: 'King', email: 'SKING', phone_number: '515.123.4567', hire_date: '1987-06-17', job_id: 'AD_PRES', salary: 24000, commission_pct: null, manager_id: null, department_id: null, createdAt: new Date(), updatedAt: new Date() },
    { employee_id: 101, first_name: 'Neena', last_name: 'Kochhar', email: 'NKOCHHAR', phone_number: '515.123.4568', hire_date: '1989-09-21', job_id: 'AD_VP', salary: 17000, commission_pct: null, manager_id: 100, department_id: null, createdAt: new Date(), updatedAt: new Date() },
    { employee_id: 102, first_name: 'Lex', last_name: 'De Haan', email: 'LDEHAAN', phone_number: '515.123.4569', hire_date: '1993-01-13', job_id: 'AD_VP', salary: 17000, commission_pct: null, manager_id: 100, department_id: null, createdAt: new Date(), updatedAt: new Date() },
    { employee_id: 103, first_name: 'Alexander', last_name: 'Hunold', email: 'AHUNOLD', phone_number: '590.423.4567', hire_date: '1990-01-03', job_id: 'IT_PROG', salary: 9000, commission_pct: null, manager_id: 102, department_id: null, createdAt: new Date(), updatedAt: new Date() },
    { employee_id: 104, first_name: 'Bruce', last_name: 'Ernst', email: 'BERNST', phone_number: '590.423.4568', hire_date: '1991-05-21', job_id: 'IT_PROG', salary: 6000, commission_pct: null, manager_id: 103, department_id: null, createdAt: new Date(), updatedAt: new Date() },
    { employee_id: 105, first_name: 'David', last_name: 'Austin', email: 'DAUSTIN', phone_number: '590.423.4569', hire_date: '1997-06-25', job_id: 'IT_PROG', salary: 4800, commission_pct: null, manager_id: 103, department_id: null, createdAt: new Date(), updatedAt: new Date() },
    { employee_id: 106, first_name: 'Valli', last_name: 'Pataballa', email: 'VPATABAL', phone_number: '590.423.4560', hire_date: '1998-02-05', job_id: 'IT_PROG', salary: 4800, commission_pct: null, manager_id: 103, department_id: null, createdAt: new Date(), updatedAt: new Date() },
    { employee_id: 107, first_name: 'Diana', last_name: 'Lorentz', email: 'DLORENTZ', phone_number: '590.423.5567', hire_date: '1999-02-07', job_id: 'IT_PROG', salary: 4200, commission_pct: null, manager_id: 103, department_id: null, createdAt: new Date(), updatedAt: new Date() },
    { employee_id: 108, first_name: 'Nancy', last_name: 'Greenberg', email: 'NGREENBE', phone_number: '515.124.4569', hire_date: '1994-08-17', job_id: 'FI_MGR', salary: 12000, commission_pct: null, manager_id: 101, department_id: null, createdAt: new Date(), updatedAt: new Date() },
    { employee_id: 109, first_name: 'Daniel', last_name: 'Faviet', email: 'DFAVIET', phone_number: '515.124.4169', hire_date: '1994-08-16', job_id: 'FI_ACCOUNT', salary: 9000, commission_pct: null, manager_id: 108, department_id: null, createdAt: new Date(), updatedAt: new Date() },
    { employee_id: 110, first_name: 'John', last_name: 'Chen', email: 'JCHEN', phone_number: '515.124.4269', hire_date: '1997-09-28', job_id: 'FI_ACCOUNT', salary: 8200, commission_pct: null, manager_id: 108, department_id: null, createdAt: new Date(), updatedAt: new Date() },
    { employee_id: 111, first_name: 'Ismael', last_name: 'Sciarra', email: 'ISCIARRA', phone_number: '515.124.4369', hire_date: '1997-09-30', job_id: 'FI_ACCOUNT', salary: 7700, commission_pct: null, manager_id: 108, department_id: null, createdAt: new Date(), updatedAt: new Date() },
    { employee_id: 112, first_name: 'Jose Manuel', last_name: 'Urman', email: 'JMURMAN', phone_number: '515.124.4469', hire_date: '1998-03-07', job_id: 'FI_ACCOUNT', salary: 7800, commission_pct: null, manager_id: 108, department_id: null, createdAt: new Date(), updatedAt: new Date() },
    { employee_id: 113, first_name: 'Luis', last_name: 'Popp', email: 'LPOPP', phone_number: '515.124.4567', hire_date: '1999-12-07', job_id: 'FI_ACCOUNT', salary: 6900, commission_pct: null, manager_id: 108, department_id: null, createdAt: new Date(), updatedAt: new Date() },
    { employee_id: 114, first_name: 'Den', last_name: 'Raphaely', email: 'DRAPHEAL', phone_number: '515.127.4561', hire_date: '1994-12-07', job_id: 'PU_MAN', salary: 11000, commission_pct: null, manager_id: 100, department_id: null, createdAt: new Date(), updatedAt: new Date() },
    { employee_id: 145, first_name: 'John', last_name: 'Russell', email: 'JRUSSEL', phone_number: '011.44.1344.429268', hire_date: '1996-10-01', job_id: 'SA_MAN', salary: 14000, commission_pct: 0.40, manager_id: 100, department_id: null, createdAt: new Date(), updatedAt: new Date() },
    { employee_id: 146, first_name: 'Karen', last_name: 'Partners', email: 'KPARTNER', phone_number: '011.44.1344.467268', hire_date: '1997-01-05', job_id: 'SA_MAN', salary: 13500, commission_pct: 0.30, manager_id: 100, department_id: null, createdAt: new Date(), updatedAt: new Date() },
    { employee_id: 147, first_name: 'Alberto', last_name: 'Errazuriz', email: 'AERRAZUR', phone_number: '011.44.1344.429278', hire_date: '1997-03-10', job_id: 'SA_MAN', salary: 12000, commission_pct: 0.30, manager_id: 100, department_id: null, createdAt: new Date(), updatedAt: new Date() },
    { employee_id: 200, first_name: 'Jennifer', last_name: 'Whalen', email: 'JWHALEN', phone_number: '515.123.4444', hire_date: '1987-09-17', job_id: 'AD_ASST', salary: 4400, commission_pct: null, manager_id: 101, department_id: null, createdAt: new Date(), updatedAt: new Date() },
    { employee_id: 201, first_name: 'Michael', last_name: 'Hartstein', email: 'MHARTSTE', phone_number: '515.123.5555', hire_date: '1996-02-17', job_id: 'MK_MAN', salary: 13000, commission_pct: null, manager_id: 100, department_id: null, createdAt: new Date(), updatedAt: new Date() },
    { employee_id: 202, first_name: 'Pat', last_name: 'Fay', email: 'PFAY', phone_number: '603.123.6666', hire_date: '1997-08-17', job_id: 'MK_REP', salary: 6000, commission_pct: null, manager_id: 201, department_id: null, createdAt: new Date(), updatedAt: new Date() },
    { employee_id: 203, first_name: 'Susan', last_name: 'Mavris', email: 'SMAVRIS', phone_number: '515.123.7777', hire_date: '1994-06-07', job_id: 'HR_REP', salary: 6500, commission_pct: null, manager_id: 101, department_id: null, createdAt: new Date(), updatedAt: new Date() },
    { employee_id: 204, first_name: 'Hermann', last_name: 'Baer', email: 'HBAER', phone_number: '515.123.8888', hire_date: '1994-06-07', job_id: 'PR_REP', salary: 10000, commission_pct: null, manager_id: 101, department_id: null, createdAt: new Date(), updatedAt: new Date() },
    { employee_id: 205, first_name: 'Shelley', last_name: 'Higgins', email: 'SHIGGINS', phone_number: '515.123.8080', hire_date: '1994-06-07', job_id: 'AC_MGR', salary: 12000, commission_pct: null, manager_id: 101, department_id: null, createdAt: new Date(), updatedAt: new Date() },
    { employee_id: 206, first_name: 'William', last_name: 'Gietz', email: 'WGIETZ', phone_number: '515.123.8181', hire_date: '1994-06-07', job_id: 'AC_ACCOUNT', salary: 8300, commission_pct: null, manager_id: 205, department_id: null, createdAt: new Date(), updatedAt: new Date() },
  ]);

  // Departments (manager_id는 employees 삽입 후 설정 가능)
  await qi.bulkInsert('departments', [
    { department_id: 10, department_name: 'Administration', manager_id: 200, location_id: 1700, createdAt: new Date(), updatedAt: new Date() },
    { department_id: 20, department_name: 'Marketing', manager_id: 201, location_id: 1800, createdAt: new Date(), updatedAt: new Date() },
    { department_id: 30, department_name: 'Purchasing', manager_id: 114, location_id: 1700, createdAt: new Date(), updatedAt: new Date() },
    { department_id: 40, department_name: 'Human Resources', manager_id: 203, location_id: 2400, createdAt: new Date(), updatedAt: new Date() },
    { department_id: 50, department_name: 'Shipping', manager_id: null, location_id: 1500, createdAt: new Date(), updatedAt: new Date() },
    { department_id: 60, department_name: 'IT', manager_id: 103, location_id: 1400, createdAt: new Date(), updatedAt: new Date() },
    { department_id: 70, department_name: 'Public Relations', manager_id: 204, location_id: 2700, createdAt: new Date(), updatedAt: new Date() },
    { department_id: 80, department_name: 'Sales', manager_id: 145, location_id: 2500, createdAt: new Date(), updatedAt: new Date() },
    { department_id: 90, department_name: 'Executive', manager_id: 100, location_id: 1700, createdAt: new Date(), updatedAt: new Date() },
    { department_id: 100, department_name: 'Finance', manager_id: 108, location_id: 1700, createdAt: new Date(), updatedAt: new Date() },
    { department_id: 110, department_name: 'Accounting', manager_id: 205, location_id: 1700, createdAt: new Date(), updatedAt: new Date() },
    { department_id: 120, department_name: 'Treasury', manager_id: null, location_id: 1700, createdAt: new Date(), updatedAt: new Date() },
  ]);

  // Update employees with department_id
  await qi.bulkUpdate('employees', { department_id: 90 }, { employee_id: [100, 101, 102] });
  await qi.bulkUpdate('employees', { department_id: 60 }, { employee_id: [103, 104, 105, 106, 107] });
  await qi.bulkUpdate('employees', { department_id: 100 }, { employee_id: [108, 109, 110, 111, 112, 113] });
  await qi.bulkUpdate('employees', { department_id: 30 }, { employee_id: [114] });
  await qi.bulkUpdate('employees', { department_id: 80 }, { employee_id: [145, 146, 147] });
  await qi.bulkUpdate('employees', { department_id: 10 }, { employee_id: [200] });
  await qi.bulkUpdate('employees', { department_id: 20 }, { employee_id: [201, 202] });
  await qi.bulkUpdate('employees', { department_id: 40 }, { employee_id: [203] });
  await qi.bulkUpdate('employees', { department_id: 70 }, { employee_id: [204] });
  await qi.bulkUpdate('employees', { department_id: 110 }, { employee_id: [205, 206] });

  // Job History
  await qi.bulkInsert('job_history', [
    { employee_id: 101, start_date: '1989-09-21', end_date: '1993-10-27', job_id: 'AC_ACCOUNT', department_id: 110, createdAt: new Date(), updatedAt: new Date() },
    { employee_id: 101, start_date: '1993-10-28', end_date: '1997-03-15', job_id: 'AC_MGR', department_id: 110, createdAt: new Date(), updatedAt: new Date() },
    { employee_id: 102, start_date: '1993-01-13', end_date: '1998-07-24', job_id: 'IT_PROG', department_id: 60, createdAt: new Date(), updatedAt: new Date() },
    { employee_id: 114, start_date: '1998-03-24', end_date: '1999-12-31', job_id: 'ST_CLERK', department_id: 50, createdAt: new Date(), updatedAt: new Date() },
    { employee_id: 200, start_date: '1987-09-17', end_date: '1993-06-17', job_id: 'AD_ASST', department_id: 90, createdAt: new Date(), updatedAt: new Date() },
    { employee_id: 200, start_date: '1994-07-01', end_date: '1998-12-31', job_id: 'AC_ACCOUNT', department_id: 90, createdAt: new Date(), updatedAt: new Date() },
    { employee_id: 201, start_date: '1996-02-17', end_date: '1999-12-19', job_id: 'MK_REP', department_id: 20, createdAt: new Date(), updatedAt: new Date() },
    { employee_id: 202, start_date: '1994-01-13', end_date: '1998-07-24', job_id: 'IT_PROG', department_id: 60, createdAt: new Date(), updatedAt: new Date() },
    { employee_id: 205, start_date: '1993-09-21', end_date: '1997-10-27', job_id: 'AC_ACCOUNT', department_id: 110, createdAt: new Date(), updatedAt: new Date() },
  ]);
};

export const down = async ({ context: qi }) => {
  await qi.bulkDelete('job_history', {});
  await qi.bulkUpdate('employees', { department_id: null }, {});
  await qi.bulkDelete('departments', {});
  await qi.bulkDelete('employees', {});
  await qi.bulkDelete('jobs', {});
  await qi.bulkDelete('locations', {});
  await qi.bulkDelete('countries', {});
  await qi.bulkDelete('regions', {});
};
