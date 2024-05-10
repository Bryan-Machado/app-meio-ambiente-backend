-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema api_node
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema api_node
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `api_node` DEFAULT CHARACTER SET utf8 ;
USE `api_node` ;

-- -----------------------------------------------------
-- Table `api_node`.`user`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `api_node`.`user` (
  `id` INT NOT NULL,
  `name` VARCHAR(250) NOT NULL,
  `email` VARCHAR(250) NOT NULL,
  `avatar` LONGTEXT NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `api_node`.`product`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `api_node`.`product` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `name` VARCHAR(250) NOT NULL,
  `price` INT NOT NULL,
  `quantity` INT NOT NULL,
  `photo` LONGTEXT NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
