<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Corcel\Model\User;
use Corcel\Services\PasswordService; // ✅ IMPORTANT : Utilisez ce service maintenant

class LoginController extends Controller
{
    public function login(Request $request)
    {
        $request->validate([
            'email' => 'required|email|max:255',
            'password' => 'required|string',
        ]);

        $user = User::on('wordpress')->where('user_email', $request->email)->first();
        // 1. Créez une instance du service de mot de passe
        $passwordService = new PasswordService();

        // 2. Utilisez la méthode check() pour vérifier le mot de passe
        if (!$user || !$passwordService->check($request->password, $user->user_pass)) {
            return response()->json([
                'message' => 'Les informations d\'identification sont incorrectes.'
            ], 401);
        }

        // --- Succès : Création du token d'API ---
        // $token = $user->createToken('auth-token-wordpress')->plainTextToken;
        // dd($user);

        // --- Envoi de la réponse au frontend ---
        return response()->json([
            'message' => 'Connexion réussie !',
            'user' => [
                'id' => $user->ID,
                'email' => $user->user_email,
                'display_name' => $user->display_name,
            ]
        ]);
    }
      public function logout(Request $request)
    {
        // Revoke the token that was used to authenticate the current request...
        $request->user()->currentAccessToken()->delete();

        return response()->json(['message' => 'Successfully logged out']);
    }
}
