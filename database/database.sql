-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema appMeioAmbiente
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema appMeioAmbiente
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `appMeioAmbiente` DEFAULT CHARACTER SET utf8 ;
USE `appMeioAmbiente` ;

-- -----------------------------------------------------
-- Table `appMeioAmbiente`.`ecoponto`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `appMeioAmbiente`.`ecoponto` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  `cnpj` VARCHAR(20) NOT NULL,
  `email` VARCHAR(45) NULL,
  `telefone` VARCHAR(45) NULL,
  `descricao` VARCHAR(400) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `appMeioAmbiente`.`marker`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `appMeioAmbiente`.`marker` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `ecoponto_id` INT NOT NULL,
  `longitude` BIGINT NOT NULL,
  `latitude` BIGINT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_marker_ecoponto_idx` (`ecoponto_id` ASC),
  CONSTRAINT `fk_marker_ecoponto`
    FOREIGN KEY (`ecoponto_id`)
    REFERENCES `appMeioAmbiente`.`ecoponto` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `appMeioAmbiente`.`categoria`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `appMeioAmbiente`.`categoria` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `nome` VARCHAR(45) NOT NULL,
  `descricao` VARCHAR(400) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `appMeioAmbiente`.`marker_has_categoria`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `appMeioAmbiente`.`marker_has_categoria` (
  `id` INT NOT NULL AUTO_INCREMENT,
  `marker_id` INT NOT NULL,
  `categoria_id` INT NOT NULL,
  INDEX `fk_marker_has_categoria_categoria1_idx` (`categoria_id` ASC),
  INDEX `fk_marker_has_categoria_marker1_idx` (`marker_id` ASC),
  PRIMARY KEY (`id`),
  CONSTRAINT `fk_marker_has_categoria_marker1`
    FOREIGN KEY (`marker_id`)
    REFERENCES `appMeioAmbiente`.`marker` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_marker_has_categoria_categoria1`
    FOREIGN KEY (`categoria_id`)
    REFERENCES `appMeioAmbiente`.`categoria` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
