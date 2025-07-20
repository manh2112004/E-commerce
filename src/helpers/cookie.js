export function getCookie(name) {
  const nameEQ = name + "=";
  const ca = document.cookie.split(";");
  for (let c of ca) {
    c = c.trim();
    if (c.indexOf(nameEQ) === 0)
      return decodeURIComponent(c.substring(nameEQ.length));
  }
  return null;
}
export function deleteAllCookies() {
  const cookies = document.cookie.split(";");

  for (const cookie of cookies) {
    const eqPos = cookie.indexOf("=");
    const name = eqPos > -1 ? cookie.substring(0, eqPos).trim() : cookie.trim();
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  }
}

export function checkCookie(name) {
  return getCookie(name) !== null;
}
export function setCookie(name, value, days) {
  let expires = "";
  if (days) {
    const date = new Date();
    date.setTime(date.getTime() + days * 86400000);
    expires = "; expires=" + date.toUTCString();
  }
  document.cookie =
    name + "=" + encodeURIComponent(value) + expires + "; path=/";
}
