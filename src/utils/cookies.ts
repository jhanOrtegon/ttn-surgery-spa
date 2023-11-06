export function getCookie(name: string) {
  if (typeof window !== 'undefined') {
    const cookieName = name + '=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookieArray = decodedCookie.split(';');

    for (let i = 0; i < cookieArray.length; i++) {
      let cookie = cookieArray[i];
      while (cookie.charAt(0) === ' ') {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(cookieName) === 0) {
        const cookieValue = cookie.substring(cookieName.length, cookie.length);
        try {
          return JSON.parse(cookieValue);
        } catch (error) {
          return cookieValue;
        }
      }
    }
  }

  return null;
}

export function setCookie({ name, value }: { name: string; value: any }) {
  const valueString = JSON.stringify(value); // Convierte el valor a JSON
  document.cookie = `${name}=${valueString}; path=/`;
}
