USE company_db;

INSERT INTO department (department_name)
VALUES ("Sales"),
       ("Finance"),
       ("Engineering"),
       ("Legal");

INSERT INTO role ( title, salary, department_id)
VALUES ( "Sales Lead", 100000, 1),
       ( "Salesperson", 80000, 1),
       ("Lead Engineer", 150000, 3),
       ( "Software Engineer", 120000, 3),
       ( "Account Manager", 160000, 2),
       ( "Accountant", 125000, 2),
       ( "Legal Team Lead", 250000, 4),
       ( "Lawyer", 190000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ( "Sam", "William",1, NULL),
       ("Mike", "John", 2, 1),
       ( "Don", "Carlion",3, NULL ),
       ( "Andrew", "Spok",4, 2 ),
       ( "Layla", "Straight", 5,NULL ),
       ( "Bob", "Bob", 6,3),
       ( "Tom", "John", 7, NULL),
       ( "Alex",  "Windstone", 8, 4);