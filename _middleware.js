export async function onRequest(context) {
  const authHeader = context.request.headers.get('Authorization');
  if (authHeader) {
    const [scheme, encoded] = authHeader.split(' ');
    if (scheme === 'Basic') {
      const decoded = atob(encoded);
      const [user, pass] = decoded.split(':');
      
      // ПОМЕНЯЙТЕ ЛОГИН И ПАРОЛЬ ЗДЕСЬ:
      if (user === 'Ewgenoff' && pass === '663770+') {
        return await context.next();
      }
    }
  }

  return new Response('Требуется авторизация', {
    status: 401,
    headers: {
      'WWW-Authenticate': 'Basic realm="Access to the site"',
    },
  });
}