import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Cette fonction sera exécutée pour chaque requête correspondante
export function middleware(request: NextRequest) {
  // 1. Récupérer le token depuis les cookies de la requête
  const token = request.cookies.get('XSRF-TOKEN');
  const { pathname } = request.nextUrl;

  // 2. Si l'utilisateur n'est pas connecté et essaie d'accéder à une page protégée
  if (!token && pathname !== '/signin') {
    // Rediriger vers la page de connexion
    return NextResponse.redirect(new URL('/signin', request.url));
  }

  // 3. Si l'utilisateur EST connecté et essaie d'accéder à la page de connexion
  if (token && pathname === '/signin') {
    // Rediriger vers la page d'accueil (ou le dashboard)
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // 4. Si tout est en ordre, laisser la requête passer
  return NextResponse.next();
}

// 5. Définir sur quelles routes ce middleware doit s'appliquer
export const config = {
  matcher: [
    /*
     * Faire correspondre tous les chemins de requête, à l'exception de ceux qui commencent par :
     * - api (routes API)
     * - _next/static (fichiers statiques)
     * - _next/image (fichiers d'optimisation d'images)
     * - favicon.ico (fichier favicon)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};