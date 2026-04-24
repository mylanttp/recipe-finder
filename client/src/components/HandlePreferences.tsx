import { getAuth } from "firebase/auth";

export const getDiets = async (): Promise<string[]> => {
    const auth = getAuth()
    const currentUser = auth.currentUser;
    const token = currentUser ? await currentUser.getIdToken() : null;
    
    return fetch("http://localhost:8080/get/diets", {
        method: "GET",
        headers: {
            ...(token && { "Authorization": `Bearer ${token}` }),
            "Content-Type": "application/json",
        },
    })
    .then((res) => res.json())
    .then((diets) => {
        return diets ?? [];
    }
    )
    .catch( () => {
        return [];
    })
}

export const getIntolerances = async (): Promise<string[]> => {
    const auth = getAuth()
    const currentUser = auth.currentUser;
    const token = currentUser ? await currentUser.getIdToken() : null;
    
    return fetch("http://localhost:8080/get/intolerances", {
        method: "GET",
        headers: {
            ...(token && { "Authorization": `Bearer ${token}` }),
            "Content-Type": "application/json",
        },
    })
    .then((res) => res.json())
    .then((intolerances) => {
        return intolerances ?? [];
    }
    )
    .catch( () => {
        return [];
    })
}

export const updateDiets = async (diet: string, action: string) => {
    const auth = getAuth()
    const currentUser = auth.currentUser;
    const token = currentUser ? await currentUser.getIdToken() : null;
    
    return fetch("http://localhost:8080/update/diets", {
        method: "PUT",
        headers: {
            ...(token && { "Authorization": `Bearer ${token}` }),
            "Content-Type": "application/json",
        },
        body: JSON.stringify({diet, action})
    })
}

export const updateIntolerances = async (intolerance: string, action: string) => {
    const auth = getAuth()
    const currentUser = auth.currentUser;
    const token = currentUser ? await currentUser.getIdToken() : null;
    
    return fetch("http://localhost:8080/update/intolerances", {
        method: "PUT",
        headers: {
            ...(token && { "Authorization": `Bearer ${token}` }),
            "Content-Type": "application/json",
        },
        body: JSON.stringify({intolerance, action})
    })
}