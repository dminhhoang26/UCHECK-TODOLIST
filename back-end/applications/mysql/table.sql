CREATE TABLE Users (
  id int NOT NULL,
  username varchar(255),
  password varchar(255),
  displayName varchar(255),
  PRIMARY KEY (id)
);

CREATE TABLE RefreshTokens (
  id int NOT NULL,
  userid int,
  refreshToken varchar(1000),
  PRIMARY KEY (id)
);
