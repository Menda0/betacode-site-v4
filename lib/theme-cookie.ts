export const THEME_COOKIE = "betacode-theme"
export const THEME_MAX_AGE = 60 * 60 * 24 * 365

export type ThemeChoice = "light" | "dark"

export function themeChoice(value: string | undefined | null): ThemeChoice | null {
  return value === "light" || value === "dark" ? value : null
}

/** Cookie written from the browser when the user picks a theme. */
export function themeCookieAssignment(theme: ThemeChoice): string {
  const secure = location.protocol === "https:" ? "; Secure" : ""
  return `${THEME_COOKIE}=${theme}; Path=/; Max-Age=${THEME_MAX_AGE}; SameSite=Lax${secure}`
}

/**
 * Runs before paint. A saved cookie wins. Otherwise follow the OS, and keep
 * localStorage aligned so next-themes applies the same theme.
 */
export const themeInitScript = `(function(){try{var k=${JSON.stringify(THEME_COOKIE)};var m=document.cookie.match(new RegExp('(?:^|; )'+k+'=(light|dark)(?:;|$)'));var c=m?m[1]:null;var s=null;try{s=localStorage.getItem(k)}catch(e){}var chosen=c||(s==='light'||s==='dark'?s:null);var t=chosen||(window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light');if(chosen){try{localStorage.setItem(k,chosen)}catch(e){}if(!c){document.cookie=k+'='+chosen+'; Path=/; Max-Age=${THEME_MAX_AGE}; SameSite=Lax'+(location.protocol==='https:'?'; Secure':'')}}else{try{localStorage.removeItem(k)}catch(e){}}var r=document.documentElement;r.classList.remove('light','dark');r.classList.add(t);r.style.colorScheme=t}catch(e){}})();`
