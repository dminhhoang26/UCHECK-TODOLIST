CREATE TABLE Users (
  id int NOT NULL AUTO_INCREMENT,
  username varchar(255),
  password varchar(255),
  displayName varchar(255),
  PRIMARY KEY (id)
);

CREATE TABLE RefreshTokens (
  id int NOT NULL AUTO_INCREMENT,
  userId int,
  refreshToken varchar(1000),
  PRIMARY KEY (id)
);

CREATE TABLE TodoList (
  id int NOT NULL AUTO_INCREMENT,
  userId int,
  text varchar(1000),
  remarks varchar(2000),
  complete int,
  startTime varchar(50),
  endTime varchar(50),
  createdDate varchar(50),
  focus boolean,
  PRIMARY KEY (id)
);
