# 🎵 MusicStream - Gestionnaire de Musique Locale

## 📝 Présentation
Application Angular 19 conçue pour la gestion et la lecture de fichiers audio locaux (MP3, WAV, OGG) avec persistance des données via IndexedDB.

## ✨ Fonctionnalités
- **CRUD Complet** : Ajout, modification, suppression et affichage des pistes.
- **Gestion d'État** : Utilisation de **Signals Angular** pour une réactivité fluide.
- **Lecteur Audio Avancé** : Contrôles (Play/Pause/Next/Prev), gestion du volume et barre de progression.
- **Stockage Client** : Persistance via **IndexedDB** permettant le stockage de fichiers volumineux (<10MB).
- **Calcul de Durée** : Détermination automatique de la durée des pistes lors de l'upload.
- **Filtres** : Recherche par titre/artiste et filtrage par catégorie.

## 🛠️ Stack Technique
- **Framework** : Angular 19 (Standalone Components)
- **Styling** : Tailwind CSS (Spotify Dark Theme)
- **Reactive Forms** : Validation stricte des métadonnées.
- **Routing** : Lazy loading pour optimiser le chargement.

## ⚙️ Installation
1. `npm install`
2. `npm start`
3. Ouvrir `http://localhost:4200`
