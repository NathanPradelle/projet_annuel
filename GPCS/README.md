## Installation du projet

Require:

- Docker
- Composer
- Nodejs (npm)

Cloner le repo:

```
git clone https://github.com/NathanPradelle/projet_annuel.git
```

Se mettre dans le dossier de l'app et installer les dépendances :  
( Si jamais les lignes de commandes ne suffisent pas, aller dans package.json et composer.json et run les scripts à la main )

```
cd projet_annuel
composer install
npm install
npm run dev (ou npm run build)
```

Vérifier que le fichier database.sqlite ait bien été créé et sinon le créer à la racine du dossier /database/  
Créer une cléf d'application pour votre .env

```
php artisan key:generate
```

Remplir la base de données avec les migrations et créer un utilisateur:

```
php artisan migrate
php artisan db:seed
```

Allumer le serveur en local :

```
php artisan serve
```

Ouvrir un onglet à cette [adresse](http:localhost:8000) pour vérifier si cela fonctionne

Pour la partie développement se référer à la [documentation](https://laravel.com/docs)
