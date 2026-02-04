

--ici je prépare l'opération pour enssuite pouvoir créer ma table 

CREATE TABLE equipe (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nom VARCHAR(155) NOT NULL,-- il est facultatif
    prenom VARCHAR(155) NOT NULL,
    mail VARCHAR(100), 
    telephone VARCHAR(100) NOT NULL, 
    poste VARCHAR(80) NOT NULL,
    presentation VARCHAR(255),
    date_revrutrment DATE 

    );


--icije créer ma table

INSERT INTO equipe 
(nom,
prenom,
mail,
telephone,
poste,
presentation,
 date_revrutrment ) VALUES 
 ("SAID","Fatima","Sfatima@gmail.com","0693678798","Gérante","passionée de cuisine traditionnelle ","2015-01-02"),
 ("MAMADOU","mamadou","Mmamadou@gmail.com","0639406150,maféticherose,il","il mange la terre","2014-05-02");



-- ici je vais fairedfférants tables pour voir mes acquis et blocage--


CREATE TABLE plats (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(155) NOT NULL,-- il est facultatif
    combien VARCHAR (155) NOT NULL, --je devais mettre prix
    quantité VARCHAR (155) NOT NULL, 
    ingrédient VARCHAR (155) NOT NULL,
    fait_maison VARCHAR (155) NOT NULL
    );


INSERT INTO plats 
(nom,
combien,
quantité,
ingrédient,
fait_maison
 ) VALUES ("pilao","10€","1","Riz sauce","oui");



--ici je rajoute d'autre plats

INSERT INTO plats 
(nom,
combien,
quantité,
ingrédient,
fait_maison
 ) VALUES ("brochette viande","15","2","viande de boeuf-assaisonement","oui"),
 ("Mtsolola poisson","10","1","1 à 2 racines de manioc 1 kg de viande boeuf","oui"),
 ("poulet grillées","15","10","sel poivre","oui"),
 ("camaron a la sauce tomate","15","1","crevette&saucetomate","oui");


