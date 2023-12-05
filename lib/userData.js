import { getToken } from "@/lib/authenticate";

export async function addToFavourites(id) {

  try {
    const token = await getToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${token}`
      }
    });

    if (res.ok) {
      const data = await res.json();
      return data;
    } 
    else {
      return [];
    }
  } catch (error) {
    return [];
  }
}

export async function removeFromFavourites(id) {

  try {
    const token = await getToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `JWT ${token}`
      }
    });

    if (res.ok) {
      const data = await res.json();
      return data;
    } 
    else {
      return [];
    }
  } catch (error) {
    return [];
  }
}


export async function getFavourites() {

  try {
    const token = await getToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites`, {
      method: 'GET',
      headers: {
        'Authorization': `JWT ${getToken()}`
      }
    });

    if (res.ok) {
      const data = await res.json();
      return data;
    } 
    else {
      return [];
    }
  } catch (error) {
    return [];
  }
}

export async function addToHistory(id) {

  try {
    const token = await getToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${token}`
      }
    });

    if (res.ok) {
      const data = await res.json();
      return data;
    } 
    else {
      return [];
    }
  } catch (error) {
    return [];
  }
}

export async function removeFromHistory(id) {
  
  try {
    const token = await getToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `JWT ${token}`
      }
    });

    if (res.ok) {
      const data = await res.json();
      return data;
    } 
    else {
      return [];
    }
  } catch (error) {
    return [];
  }
}


export async function getHistory() {

  try {
    const token = await getToken();
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history`, {
      method: 'GET',
      headers: {
        'Authorization': `JWT ${getToken()}`
      }
    });

    if (res.ok) {
      const data = await res.json();
      return data;
    } 
    else {
      return [];
    }
  } catch (error) {
    return [];
  }
}
