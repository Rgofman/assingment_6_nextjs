import { favouritesAtom } from "@/store";
import { searchHistoryAtom } from "@/store";
import { getFavourites } from "@/lib/userData";
import { getHistory } from "@/lib/userData";
import { isAuthenticated } from '@/lib/authenticate';
import { useRouter } from 'next/router';
import { useAtom } from 'jotai';
import { useState, useEffect } from 'react';

const PUBLIC_PATHS = ['/login', '/register', '/', '/_error'];

export default function RouteGuard(props) {
    const [searchHistory, setSearchHistory] = useAtom(searchHistoryAtom);
    const [favouritesList, setFavouritesList] = useAtom(favouritesAtom);
    const [authorized, setAuthorized] = useState(false);

    async function updateAtoms() {
        setFavouritesList(await getFavourites());
        setSearchHistory(await getHistory());
    }

    const router = useRouter();

    useEffect(() => {
        updateAtoms()
        authCheck(router.pathname);
        router.events.on('routeChangeComplete', authCheck);

        return () => {
            router.events.off('routeChangeComplete', authCheck);
        };
    }, []);

    function authCheck(url) {
        const path = url.split('?')[0];
        if (!isAuthenticated() && !PUBLIC_PATHS.includes(path)) {
            setAuthorized(false);
            router.push('/login');
        } else {
            setAuthorized(true);
        }
    }

    return <>{props.children}</>
}