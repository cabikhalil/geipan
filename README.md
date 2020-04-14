# Projet Geipan
> Binôme : Charbel Abi Khalil et Inès Ramoul
## Description 
### 1) Partie import de données

Dans un premier temps il a fallu importer les données du geipan dans une base de données MongoDB, nous avons procédé comme suit, dans un shell mongo :

> mongoimport -d geipan -c cas_pub --type csv --file cas_pub.csv --headerline

> mongoimport -d geipan -c temoignages_pub --type csv --file temoignages_pub.csv --headerline

### 2) Partie serveur

Le backend se trouve dans le dossier Geipan, pour l'exécuter il vous faut entrer la commande suivante dans un terminal (se placer dans le dossier Geipan avant) :
> nodemon serverCrudWithMongo.js

### 3) Partie React App

Elle se trouve dans le dossier React, pour la lancer il vous faut entrer la commande suivante (se placer dans React/geipan-front/) :
> npm install
> npm start 
