USE payroll_db

INSERT INTO department (name) 
VALUES ("Sales"), ("Engineering"), ("Finance"), ("Legal");


INSERT INTO `role` (title, salary, department_id)
VALUES ("Sales Lead", 100000, 1),
       ("Salesperson", 80000, 1),
       ("Lead Engineer", 150000, 2),
       ("Software Engineer", 120000, 2),
       ("Accountant", 125000, 3),
       ("Legal Team Lead", 250000, 4),
       ("Lawyer", 190000, 4),
       ("HR", 100000, 4),
       ("Intern", 50000, 4)
       ;


INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES ("Johnny", "Bravo", 1, NULL),
       ("Negan", "Smith", 9, 1),
       ("Walter", "White", 6, 1),
       ("Bruce", "Wayne", 7, 3),
       ("Rick", "Grimes", 8, 3),
       ("Tiffany", "Valentine", 6, 4),
       ("Issac", "Clark", 7, 6);