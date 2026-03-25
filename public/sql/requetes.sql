-- ============================================================
-- Base de données May.gourmet
-- Ici je crée mes tables et je fais des tests d'insertion
-- pour apprendre à manipuler SQL et les relations.
-- ============================================================


-- ===========================
-- TABLE EQUIPE
-- ===========================
-- Cette table stocke les membres de l'équipe (personnes qui travaillent
-- dans l'entreprise : gérant, secrétaire, etc.).

CREATE TABLE equipe (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,  -- identifiant unique
    nom VARCHAR(155) NOT NULL,                  -- nom de famille
    prenom VARCHAR(155) NOT NULL,               -- prénom
    mail VARCHAR(100),                          -- email (facultatif)
    telephone VARCHAR(100) NOT NULL,            -- téléphone
    poste VARCHAR(80) NOT NULL,                 -- poste dans l'entreprise
    presentation VARCHAR(255),                  -- petite description
    date_revrutrment DATE                       -- date de recrutement
);


-- ===========================
-- INSERTIONS EQUIPE (tests)
-- ===========================
-- Ici j’ajoute des membres pour tester ma table "equipe".

INSERT INTO equipe 
(nom, prenom, mail, telephone, poste, presentation, date_revrutrment) VALUES 
("MAMADOU","mamadou","Mmamadou@gmail.com","0639406150","maire de mamoudzou","élus par les habitants","2014-05-02");

INSERT INTO equipe 
(nom, prenom, mail, telephone, poste, presentation, date_revrutrment) VALUES 
("MAMADOU","mamadou","Mmamadou@gmail.com","0639406150","maféticherose","il mange la terre","2014-05-02");

INSERT INTO equipe
(nom, prenom, mail, telephone, poste, presentation, date_revrutrment) VALUES
("ALI",
 "Fatima",
 "fatima.ali@gmail.com",
 "0693123456",
 "Secrétaire",
 "Organisée et dynamique, elle gère l'administration",
 "2018-09-15");


-- ============================================================
-- TABLE PLATS
-- ============================================================
-- Cette table sert à stocker les plats proposés par May.gourmet.
-- C’est une première version pour tester mes compétences.

CREATE TABLE plats (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,  -- identifiant unique du plat
    nom VARCHAR(155) NOT NULL,                   -- nom du plat
    combien VARCHAR(155) NOT NULL,               -- prix du plat (texte, pour l'exercice)
    quantité VARCHAR(155) NOT NULL,              -- quantité / portion
    ingrédient VARCHAR(155) NOT NULL,            -- ingrédients principaux
    fait_maison VARCHAR(155) NOT NULL            -- "oui" ou "non" pour fait maison
);


-- ===========================
-- INSERTIONS PLATS
-- ===========================
-- Ici j’insère plusieurs plats pour tester ma table "plats".

INSERT INTO plats 
(nom, combien, quantité, ingrédient, fait_maison) 
VALUES ("pilao","10€","1","Riz sauce","oui");

-- Ici je rajoute d'autres plats pour enrichir la table
INSERT INTO plats 
(nom, combien, quantité, ingrédient, fait_maison) 
VALUES 
("brochette viande","15","2","viande de boeuf-assaisonement","oui"),
("Mtsolola poisson","10","1","1 à 2 racines de manioc 1 kg de viande boeuf","oui"),
("poulet grillées","15","10","sel poivre","oui"),
("camaron a la sauce tomate","15","1","crevette&saucetomate","oui");


-- ============================================================
-- PREMIERE VERSION TABLE PRODUITS (EXERCICE)
-- ============================================================
-- Ici je crée une première version de la table "produits" pour m'entraîner.
-- Elle ne sera pas forcément utilisée dans la version finale,
-- mais elle montre mes essais.

CREATE TABLE produits (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,  -- identifiant du produit
    NOM VARCHAR(155) NOT NULL,                  -- nom du produit
    Description VARCHAR(155),                   -- description du produit
    prix INT NOT NULL,                          -- prix en entier
    Categorie VARCHAR(155) NOT NULL,            -- catégorie (viande, poisson, etc.)
    Disponible BOOLEAN DEFAULT TRUE,            -- disponible ou non (par défaut TRUE)
    Origine VARCHAR(80) NOT NULL,               -- origine du produit
    Type_culture VARCHAR(30),                   -- type de culture (traditionnel, etc.)
    id_fournisseur INT NOT NULL                 -- id du fournisseur (sera relié plus tard)
);


-- ============================================================
-- PREMIER ESSAI TABLE FOURNISSEUR (EXERCICE)
-- ============================================================
-- Ici je fais un premier test d'insertion de fournisseurs.
-- C'est une version d'entraînement (nom de table "Fournisseur" en majuscule).

INSERT INTO Fournisseur
(
    nom,
    RESPONSABLE,
    TEL,
    MAIL,
    ADRESS_POSTALE
) VALUES
("Le Bill","Grand Chef Fournisseur","6302935012","lebillgrand@gmail.com","27 Rue abdallah"),
("Redd","le bon déroulement des actions","026457896","reddliab@gmail.com","42 Rue moussa"),
("berry","chauffeur des produits","025378964","berryoff@gmail.com","78 Rue bamcolo"),
("labyboss","decharge les produits","568975618","labybo@gmail.com","54 Rue alibaco");


-- ============================================================
-- STRUCTURATION PROPRE DES TABLES FOURNISSEUR / PRODUITS
-- ============================================================
-- A partir d'ici, je recrée mes tables "fournisseur" et "produits"
-- de façon propre, avec des clés étrangères (relations).

-- ===========================
-- TABLE FOURNISSEUR (DEFINITIVE)
-- ===========================
-- Cette table stocke les informations sur les fournisseurs.

CREATE TABLE fournisseur (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,  -- identifiant du fournisseur
    nom VARCHAR(155) NOT NULL,                   -- nom du fournisseur
    responsable VARCHAR(155) NOT NULL,           -- personne responsable
    tel VARCHAR(80),                             -- téléphone
    mail VARCHAR(155) NOT NULL,                  -- email
    adresse_postale VARCHAR(300)                 -- adresse postale
) ENGINE=InnoDB;


-- ===========================
-- INSERTIONS FOURNISSEUR
-- ===========================
-- Ici je remplis la table "fournisseur" avec quelques exemples.

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


-- ===========================
-- TABLE PRODUITS (DEFINITIVE)
-- ===========================
-- Cette table stocke les produits, reliés à un fournisseur.
-- La clé étrangère permet de faire le lien avec la table "fournisseur".

CREATE TABLE produits (
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,  -- identifiant du produit
    nom VARCHAR(155) NOT NULL,                   -- nom du produit
    description VARCHAR(155),                    -- description courte
    prix INT NOT NULL,                           -- prix en entier
    categorie VARCHAR(155) NOT NULL,             -- catégorie (viande, poisson, volaille, etc.)
    disponible BOOLEAN DEFAULT TRUE,             -- produit disponible ou non
    origine VARCHAR(80) NOT NULL,                -- origine géographique
    type_culture VARCHAR(30),                    -- type de culture / préparation
    id_fournisseur INT NOT NULL,                 -- identifiant du fournisseur
    CONSTRAINT fk_produit_fournisseur
        FOREIGN KEY (id_fournisseur)
        REFERENCES fournisseur(id)
        ON DELETE CASCADE                        -- si un fournisseur est supprimé, ses produits le sont aussi
        ON UPDATE CASCADE                        -- si l'id du fournisseur change, c'est mis à jour dans produits
) ENGINE=InnoDB;


-- ===========================
-- INSERTIONS PRODUITS
-- ===========================
-- Ici j’ajoute des produits qui sont fournis par le fournisseur
-- ayant l'id 1 (par exemple "Le Bill").

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


-- ===========================
-- AUTRE PRODUIT (EXERCICE)
-- ===========================
-- Ici je rajoute un produit supplémentaire pour continuer mes tests.

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
('Beredre sauce rouge','Viande de boeuf assaisonnée',10,'Viande',TRUE,'Anjouan','plat traditionnelle d''anjouan',1);