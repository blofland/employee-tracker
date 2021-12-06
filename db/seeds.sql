INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
  ('Ronald', 'Firbank', 1, 1),
  ('Virginia', 'Woolf', 1, 1),
  ('Piers', 'Gaveston', 1, 4),
  ('Charles', 'LeRoi', 2, 1),
  ('Katherine', 'Mansfield', 2, 1),
  ('Dora', 'Carrington', 3, 4),
  ('Edward', 'Bellamy', 3, 4),
  ('Montague', 'Summers', 3, 1),
  ('Octavia', 'Butler', 3, 1),
  ('Unica', 'Zurn', NULL, 1);

INSERT INTO department (name)
VALUES
  ('Tech'),
  ('HR'),
  ('Operations'),
  ('Human resources'),
  ('Other');
  
  INSERT INTO role (title, salary, department_id) 
  VALUES
  ('Dev', 12000, 2),
  ('Engineer', 27000, 2),
  ('Helper', 94000, 3),
  ('Hey', 5000, 4);
  