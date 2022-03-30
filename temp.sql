USE fc21;
GO

DROP TABLE users
GO

CREATE TABLE users (
id int IDENTITY PRIMARY KEY,
name VARCHAR(MAX) NOT NULL
)
GO

INSERT INTO users (name) VALUES('Coco')
INSERT INTO users (name) VALUES('Dodo')
INSERT INTO users (name) VALUES('Eoeo')
GO

SELECT * FROM users
GO

DELETE FROM users WHERE name = 'AAA'

DELETE FROM users where name = '';DELETE FROM users