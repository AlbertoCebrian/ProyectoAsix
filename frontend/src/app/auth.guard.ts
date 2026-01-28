import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from './services/user.service';

export const authGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);
  const user = userService.currentUser;

  // --- ZONA DE DEPURACIÓN ---
  console.group('👮‍♂️ CONTROL DE ACCESO (AuthGuard)');
  console.log('Ruta solicitada:', state.url);
  console.log('Usuario actual:', user);
  console.log('¿Tiene token?', !!user.token);
  console.log('¿Es Admin?', user.isAdmin);
  // --------------------------

  if (user.token && user.isAdmin) {
    console.log('✅ ACCESO CONCEDIDO: El usuario es Admin.');
    console.groupEnd();
    return true;
  }

  console.warn('⛔ ACCESO DENEGADO: Redirigiendo a Home...');
  console.groupEnd();
  
  router.navigate(['/']);
  return false;
};