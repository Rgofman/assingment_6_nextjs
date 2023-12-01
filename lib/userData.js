// Importing the necessary modules and functions
import useSWR from 'swr';
import { getToken } from "@/lib/authenticate";
import { readToken } from "@/lib/authenticate";


// Function to add an item to the favorites list
export async function addToFavourites(id) {
  try {
    const token = await getToken();

    // Making a PUT request to add an item to favorites
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${token}`
      }
    });

    if (response.ok) {
      // If the request is successful, return the data
      const data = await response.json();
      return data;
    } else {
      // If there's an error, return an empty array
      return [];
    }
  } catch (error) {
    console.error(error);
    return [];
  }
}

// Function to remove an item from the favorites list
export async function removeFromFavourites(id) {
  try {
    const token = await getToken();

    // Making a DELETE request to remove an item from favorites
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `JWT ${token}`
      }
    });

    if (response.ok) {
      // If the request is successful, return the data
      const data = await response.json();
      return data;
    } else {
      // If there's an error, return an empty array
      return [];
    }
  } catch (error) {
    console.error(error);
    return [];
  }
}

// Function to get the user's favorites list
export async function getFavourites() {
  try {
    const token = await getToken();

    // Making a GET request to fetch the favorites list
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/favourites`, {
      method: 'GET',
      headers: {
        'Authorization': `JWT ${getToken()}`
      }
    });

    if (response.ok) {
      // If the request is successful, return the data
      const data = await response.json();
      return data;
    } else {
      // If there's an error, return an empty array
      return [];
    }
  } catch (error) {
    console.error(error);
    return [];
  }
}

// Function to add an item to the search history
export async function addToHistory(id) {
  try {
    const token = await getToken();

    // Making a PUT request to add an item to the search history
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `JWT ${token}`
      }
    });

    if (response.ok) {
      // If the request is successful, return the data
      const data = await response.json();
      return data;
    } else {
      // If there's an error, return an empty array
      return [];
    }
  } catch (error) {
    console.error(error);
    return [];
  }
}

// Function to remove an item from the search history
export async function removeFromHistory(id) {
  try {
    const token = await getToken();

    // Making a DELETE request to remove an item from the search history
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `JWT ${token}`
      }
    });

    if (response.ok) {
      // If the request is successful, return the data
      const data = await response.json();
      return data;
    } else {
      // If there's an error, return an empty array
      return [];
    }
  } catch (error) {
    console.error(error);
    return [];
  }
}

// Function to get the user's search history
export async function getHistory() {
  try {
    const token = await getToken();

    //console.log(readToken())
    // Making a GET request to fetch the search history
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/history`, {
      method: 'GET',
      //body: JSON.stringify({}),
      headers: {
        'Authorization': `JWT ${getToken()}`
      }
    });

    if (response.ok) {
      // If the request is successful, return the data
      const data = await response.json();
      return data;
    } else {
      // If there's an error, return an empty array
      return [];
    }
  } catch (error) {
    console.error(error);
    return [];
  }
}
