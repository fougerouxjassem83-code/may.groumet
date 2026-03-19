

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


--ici je créer ma table

INSERT INTO equipe 
(nom,
prenom,
mail,
telephone,
poste,
presentation,
 date_revrutrment ) VALUES 
 ("MAMADOU","mamadou","Mmamadou@gmail.com","0639406150,maire de mamoudzou"," élus par les habitants","2014-05-02");






INSERT INTO equipe 
(nom,
prenom,
mail,
telephone,
poste,
presentation,
 date_revrutrment ) VALUES 
 ("MAMADOU","mamadou","Mmamadou@gmail.com","0639406150,maféticherose,il","il mange la terre","2014-05-02");





INSERT INTO equipe
(nom,
prenom,
mail,
telephone,
poste,
presentation,
date_revrutrment ) VALUES
("ALI",
 "Fatima",
 "fatima.ali@gmail.com",
 "0693123456",
 "Secrétaire",
 "Organisée et dynamique, elle gère l'administration",
 "2018-09-15");


---------------------------------------------------------------------------------------------------------------------------

-- ici je vais faire dfférants tables pour voir mes acquis et blocage--


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

--------------------------------------------------------------------------------------------------------------

--ici je vais coder un autre tableau nommert produits

CREATE TABLE  produits (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    NOM VARCHAR (155) NOT NULL,
    Description VARCHAR (155),
    prix INT NOT NULL,
    Categorie VARCHAR (155) NOT NULL,
    Disponible Boolean DEFAULT TRUE,
    Origine VARCHAR (80) NOT NULL,
    Type-culture VARCHAR (30),
    id_fournisseur INT NOT NULL
    );




  ----------------------------------------------------------------------------------------

INSERT INTO Fournisseur
(
nom,
RESPONSABLE,
TEL,
MAIL,
ADRESS_POSTALE
) VALUES("Le Bill","Grand Chef Fournisseur","6302935012","lebillgrand@gmail.com"," 27 Rue abdallah "),
("Redd","le bon déroulement des actions","026457896","reddliab@gmail.com","42 Rue moussa"),
("berry","chauffeur des produits","025378964","berryoff@gmail.com","78 Rue bamcolo"),
("labyboss","decharge les produits","568975618","labybo@gmail.com","54 Rue alibaco");


----------------------------------------------------------------------------------------------

--ici j'associe mes tables

CREATE TABLE fournisseur (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(155) NOT NULL,
    responsable VARCHAR(155) NOT NULL,
    tel VARCHAR(80),
    mail VARCHAR(155) NOT NULL,
    adresse_postale VARCHAR(300)
) ENGINE=InnoDB;

  
----------------------------------------------------------------------------------------------------- 

--la deuxieme table normal de produits pour associer
CREATE TABLE produits (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(155) NOT NULL,
    description VARCHAR(155),
    prix INT NOT NULL,
    categorie VARCHAR(155) NOT NULL,
    disponible BOOLEAN DEFAULT TRUE,
    origine VARCHAR(80) NOT NULL,
    type_culture VARCHAR(30),
    id_fournisseur INT NOT NULL,
    CONSTRAINT fk_produit_fournisseur
        FOREIGN KEY (id_fournisseur)
        REFERENCES fournisseur(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=InnoDB;



    ------ICI JE RECREER MES TABLES DEPUIS LE DEBUT POUR LES ASSOCIER

    CREATE TABLE fournisseur (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(155) NOT NULL,
    responsable VARCHAR(155) NOT NULL,
    tel VARCHAR(80),
    mail VARCHAR(155) NOT NULL,
    adresse_postale VARCHAR(300)
) ENGINE=InnoDB;

-- ici je rajoute les infos pour ma table

  INSERT INTO fournisseur
(
    nom,
    responsable,
    tel,
    mail,
    adresse_postale
)
VALUES
('Le Bill', 'Grand Chef Fournisseur', '6302935012', 'lebillgrand@gmail.com', '27 Rue abdallah'),
('Redd', 'Le bon déroulement des actions', '026457896', 'reddliab@gmail.com', '42 Rue moussa'),
('Berry', 'Chauffeur des produits', '025378964', 'berryoff@gmail.com', '78 Rue bamcolo'),
('Labyboss', 'Décharge les produits', '568975618', 'labybo@gmail.com', '54 Rue alibaco');


------------------------------------------------------------------------------------------------------



--ici je rajoute aussi des produits a ma deuxieme table  qui se nomme produits
CREATE TABLE produits (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    nom VARCHAR(155) NOT NULL,
    description VARCHAR(155),
    prix INT NOT NULL,
    categorie VARCHAR(155) NOT NULL,
    disponible BOOLEAN DEFAULT TRUE,
    origine VARCHAR(80) NOT NULL,
    type_culture VARCHAR(30),
    id_fournisseur INT NOT NULL,
    CONSTRAINT fk_produit_fournisseur
        FOREIGN KEY (id_fournisseur)
        REFERENCES fournisseur(id)
        ON DELETE CASCADE
        ON UPDATE CASCADE
) ENGINE=InnoDB;


INSERT INTO produits
(
    nom,
    description,
    prix,
    categorie,
    disponible,
    origine,
    type_culture,
    id_fournisseur
)
VALUES
('Brochette viande', 'Viande de boeuf assaisonnée', 15, 'Viande', TRUE, 'Mayotte', 'Traditionnel', 1),
('Mtsolola poisson', '1 à 2 racines de manioc et 1 kg de viande de boeuf', 10, 'Poisson', TRUE, 'Mayotte', 'Traditionnel', 1),
('Poulet grillé', 'Sel et poivre', 15, 'Volaille', TRUE, 'Mayotte', 'Traditionnel', 1),
('Camaron à la sauce tomate', 'Crevettes et sauce tomate', 15, 'Fruits de mer', TRUE, 'Mayotte', 'Traditionnel', 1);


-----------------------------------------------------------------------------------------------------------------------

--ICI JE VAIS RAJOUTER DEUX AUTRE TRUCS

INSERT INTO produits
(
    nom,
    description,
    prix,
    categorie,
    disponible,
    origine,
    type_culture,
    id_fournisseur
)
VALUES
("Beredre sauce rouge","Viande de boeuf assaisonnée",10,"Viande",TRUE,"Anjouan","plat traditionnelle d'anjouan",1);


--------------------------------------------------------------------------------------------------------