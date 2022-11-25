create database miau;
use miau;
CREATE TABLE `puntuaciones` (
  `p_id` int NOT NULL AUTO_INCREMENT,
  `p_nombre` varchar(45) DEFAULT NULL,
  `p_puntuaciones` varchar(3) DEFAULT NULL,
  PRIMARY KEY (`p_id`)
) 
