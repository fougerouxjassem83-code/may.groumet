CREATE TABLE equipe (
    id INT PRIMARY KEY NOT NULL AUTO_INCREMENT,
    nom VARCHAR(155) NOT NULL, --not null signifie que c'est obligatoire il est facultatif
    prenom VARCHAR(155) NOT NULL,
    mail VARCHAR(100), --ici je met ce commentaire pour dire que ce n'est obligatoire de mettre ce champs
    telephone VARCHAR(100) NOT NULL, --pour qu'il ne te casse pas la tête
    poste VARCHAR(80) NOT NULL,


    );