// src/hooks/useAuth.ts
'use client'; // Indique que ce code s'exécute uniquement côté client

import { useState, useEffect } from 'react';

// Définir une interface pour la structure de vos données utilisateur
interface User {
  id: number;
  display_name: string;
  email: string;
  // Ajoutez d'autres champs si nécessaire
}

export const useAuth = () => {
  // Un état pour stocker les informations de l'utilisateur
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    // Cette fonction s'exécute uniquement dans le navigateur
    const userJson = localStorage.getItem('user');

    if (userJson) {
      // Si des données existent, on les parse et on les met dans l'état
      setUser(JSON.parse(userJson));
    }
  }, []); // Le tableau vide signifie que cet effet ne s'exécute qu'une seule fois au montage

  return { user };
};