CREATE TABLE PRODUTOS(
  ID INTEGER PRIMARY KEY AUTOINCREMENT,
  NOME VARCHAR(50) NOT NULL,
  ID_CATEGORIA INT NOT NULL,
  PRECO DECIMAL(5,2) NOT NULL
)