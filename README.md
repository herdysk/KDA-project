Kadea Academy - Chatbot Experience

Ce projet est ma réponse au défi technique proposé par Kadea. L'objectif était de créer une interface moderne intégrant un assistant IA fonctionnel.

Ce que j'ai réalisé

J'ai voulu construire une expérience utilisateur fluide où l'IA n'est pas un gadget, mais un véritable outil d'aide à l'orientation.

- Interface Immersive : Utilisation de Tailwind CSS pour un design épuré, avec des effets de flou (glassmorphism) et des animations au scroll.
- Widget Chat Custom : J'ai codé le widget de A à Z en JavaScript (pas de librairie externe lourde) pour garder le contrôle total sur le DOM et les interactions.
- Architecture Sécurisée : Pour éviter d'exposer les tokens LingML dans le code client (faillite de sécurité classique), j'ai mis en place un serveur intermédiaire (Proxy) en PHP qui fait le pont entre le front et l'API IA.

Installation rapide

Le projet ne nécessite aucune installation de dépendances (npm/composer) pour rester léger.

1.  Clonez ce dépôt.
2.  Renommez `config.example.php` en `config.php` et ajoutez vos clés API.
3.  Lancez la commande : `php -S localhost:8000 -t public/`
4.  Ouvrez votre navigateur : `http://localhost:8000`

Modèle LingML et périmètre

Le modèle a été configuré via prompt engineering pour répondre en priorité aux questions liées au cursus Kadea (formats de formation, organisation, contenus, modalités, etc.).

Note pour l’évaluation : les identifiants permettant d’inspecter la configuration (prompt système, paramètres, connecteurs) sur la plateforme LingML ont été transmis par e-mail.

Pourquoi Genesys_search (recherche web)

Le modèle utilisé est Genesys_search : il s’appuie sur une recherche directe sur Internet pour sourcer ses réponses, plutôt que de dépendre uniquement d’une base de connaissances locale qui pourrait être incomplète ou rapidement obsolète.

Cette approche permet :

1. d’améliorer la couverture des questions ouvertes (infos publiques, mises à jour, pages officielles),

2. réduire le risque de réponses approximatives lorsqu’une information n’est pas disponible dans un corpus interne.