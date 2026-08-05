export async function onRequest(context) {
  const authHeader = context.request.headers.get('Authorization');
  if (authHeader) {
    const [scheme, encoded] = authHeader.split(' ');
    if (scheme === 'Basic') {
      const decoded = atob(encoded);
      const [user, pass] = decoded.split(':');
      
      // УКАЖИТЕ СВОЙ ЛОГИН И ПАРОЛЬ:
      if (user === 'Ewgenoff' && pass === '123456') {
        return await context.next();
      }
    }
  }

  return new Response('Требуется авторизация', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Protected Area"',
    },
  });
}
