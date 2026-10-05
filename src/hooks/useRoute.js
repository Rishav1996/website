import { useState, useEffect, useCallback } from 'react';

function parseRouteLocation() {
  if (typeof window === 'undefined') return { route: 'home', watchId: null };

  const baseUrl = import.meta.env.BASE_URL || '/';
  let path = window.location.pathname;

  // Normalize path relative to baseUrl
  if (baseUrl !== '/' && path.startsWith(baseUrl)) {
    path = path.slice(baseUrl.length - 1);
  }

  // Check search params first (e.g. ?watch=kenneth-cole-kcwgl2104102mn)
  const searchParams = new URLSearchParams(window.location.search);
  const watchParam = searchParams.get('watch') || searchParams.get('id');

  // Check hash-based routing fallback (e.g. #/watches/kenneth-cole-kcwgl2104102mn or #/watches)
  const hash = window.location.hash;
  if (hash.startsWith('#/watches') || hash.startsWith('#watches')) {
    const cleanHash = hash.replace(/^#\/?watches\/?/, '');
    const hashId = cleanHash.split(/[?#]/)[0].trim() || null;
    return { route: 'watches', watchId: hashId || watchParam || null };
  }

  // Check pathname: e.g. /watches or /watches/kenneth-cole-kcwgl2104102mn
  const cleanPath = path.replace(/^\/+|\/+$/g, '');
  if (cleanPath === 'watches') {
    return { route: 'watches', watchId: watchParam || null };
  }
  if (cleanPath.startsWith('watches/')) {
    const subId = cleanPath.slice('watches/'.length).trim();
    return { route: 'watches', watchId: subId || watchParam || null };
  }

  return { route: 'home', watchId: null };
}

export function useRoute() {
  const [locationState, setLocationState] = useState(parseRouteLocation);

  useEffect(() => {
    const handleLocationChange = () => {
      setLocationState(parseRouteLocation());
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('app:navigate', handleLocationChange);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('app:navigate', handleLocationChange);
    };
  }, []);

  const navigate = useCallback((target, targetWatchId = null) => {
    const baseUrl = import.meta.env.BASE_URL || '/';
    let targetPath = target;

    if (target === 'home' || target === '/' || target === '') {
      targetPath = baseUrl;
    } else if (target === 'watches' || target === '/watches') {
      const cleanBase = baseUrl.endsWith('/') ? baseUrl : `${baseUrl}/`;
      if (targetWatchId) {
        targetPath = `${cleanBase}watches/${targetWatchId}`;
      } else {
        targetPath = `${cleanBase}watches`;
      }
    }

    if (window.location.pathname !== targetPath) {
      window.history.pushState({}, '', targetPath);
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
    setLocationState(parseRouteLocation());
    window.dispatchEvent(new Event('app:navigate'));
  }, []);

  return {
    route: locationState.route,
    watchId: locationState.watchId,
    navigate
  };
}

export default useRoute;
