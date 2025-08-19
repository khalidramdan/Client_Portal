<?php

namespace App\Models\Sanctum;

use Laravel\Sanctum\PersonalAccessToken as SanctumPersonalAccessToken;

class PersonalAccessToken extends SanctumPersonalAccessToken
{
    /**
     * Surcharge le constructeur pour définir dynamiquement la connexion.
     *
     * @param  array  $attributes
     * @return void
     */
    public function __construct(array $attributes = [])
    {
        parent::__construct($attributes);

        // Force le modèle à utiliser la connexion DB par défaut de Laravel
        // quelle que soit son nom ('mysql', 'pgsql', etc.)
        $this->setConnection(config('database.default'));
    }
}
