DROP DATABASE IF EXISTS TODO;

CREATE DATABASE TODO;

USE TODO;

CREATE TABLE todos (
  todo_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  task VARCHAR(50) NOT NULL,
  description VARCHAR(65535),
  date_created VARCHAR(24) NOT NULL,
  date_due VARCHAR(24) NOT NULL,
  priority VARCHAR(2)
);

INSERT INTO todos (todo_id, task, description, date_created, date_due, priority) VALUES (1, "Create a todo list app with Node.js", "", "2022-11-13T00:46:19.750Z", "", "p2");
INSERT INTO todos (todo_id, task, description, date_created, date_due, priority) VALUES (2, "Publish the app on GitHub", "", "2022-11-13T00:48:59.204Z", "", "p1");
INSERT INTO todos (todo_id, task, description, date_created, date_due, priority) VALUES (3, "Deploy the app on aws", "", "2022-11-13T00:55:15.320Z", "", "p3");

CREATE TABLE tags (
  tag_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
  tag VARCHAR(25) NOT NULL
);

INSERT INTO tags (tag_id, tag) VALUES (1, "Work");
INSERT INTO tags (tag_id, tag) VALUES (2, "Personal");
INSERT INTO tags (tag_id, tag) VALUES (3, "Social");

CREATE TABLE todos_tags (
  todo_id INT NOT NULL,
  tag_id INT NOT NULL,
  FOREIGN KEY (todo_id) REFERENCES todos(todo_id),
  FOREIGN KEY (tag_id) REFERENCES tags(tag_id)
);

INSERT INTO todos_tags (todo_id, tag_id) VALUES (1, 1);
INSERT INTO todos_tags (todo_id, tag_id) VALUES (2, 1);
INSERT INTO todos_tags (todo_id, tag_id) VALUES (3, 2);

