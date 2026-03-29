CREATE TABLE usuarios (
id 			SERIAL PRIMARY KEY,
nombre 		VARCHAR(100) NOT NULL,
email		VARCHAR(150) UNIQUE NOT NULL,
edad		INT NOT NULL
);

INSERT INTO usuarios (nombre, email, edad)
VALUES 
	('Andres Maturana', 'amaturana@email.com', 43),
	('Emilia Lepe', 'elepe@email.com', 21),
	('Francisca Benavente', 'fbenavente@email.com', 22);

SELECT * FROM usuarios;