INSERT INTO departments (name) VALUES
("Developers"),
("Testers"),
("Management"),
("Resources"),
("Financial");


INSERT INTO roles (title, salary, department_id) VALUES
("Junior Dev Front End", 60000, 1),
("Human Resources Manager", 70000, 4),
("Finance Manager", 90000, 5),
("Sales Manager", 110000, 5),
("Testing Manager", 85000, 2),
("Senior Dev Full Stack", 150000, 1),
("Facilities Management", 150000,3);

INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES
("Barundin", "Holdstream", 1, 1),
("Deldric", "ThumbHammer", 1, 2),
("Dorin", "GrimBeard", 2, 3),
("Elmador", "Stoutwatch", 3, 4),
("Hugrim", "Kindanvil", 4, 5),
("Grungi", "Morecaps", 5, 6),
("Kazador", "SteelGleam", 3, 7);

