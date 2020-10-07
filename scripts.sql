-- Create database

Create Database Inventory;

-- Inventory.Users definition

CREATE TABLE `Users` (
  `Name` varchar(100) NOT NULL,
  `Id` int NOT NULL AUTO_INCREMENT,
  `Password` varchar(600) CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci NOT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `Users_Id_IDX` (`Id`) USING BTREE,
  UNIQUE KEY `Users_Name_IDX` (`Name`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



-- Inventory.Products definition

CREATE TABLE `Products` (
  `Id` int NOT NULL AUTO_INCREMENT,
  `Name` varchar(100) NOT NULL,
  `Price` double NOT NULL,
  `Description` varchar(300) DEFAULT NULL,
  PRIMARY KEY (`Id`),
  UNIQUE KEY `Products_Name_IDX` (`Name`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

