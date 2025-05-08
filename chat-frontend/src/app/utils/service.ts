import { useRouter } from "next/navigation";
export const baseUrl = "http://localhost:5000/api";

export const postRequest = async (url: string, body: []) => {

    try {
        const response = await fetch(url, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })

        const data = await response.json();

        if (!response.ok) {
            let message;

            if (data?.message) {
                message = data.message;
            } else {
                message = data;
            }

            return { error: true, message };
        }

        return data;
    } catch (error) {
        console.log(error);

    }


}

export const getRequest = async(url: string, body:[]) => {
    
    try {
        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(body)
        })

        const data = await response.json();

        if (!response.ok) {
            let message;

            if (data?.message) {
                message = data.message;
            } else {
                message = data;
            }

            return { error: true, message };
        }

        return data;
    } catch (error) {
        console.log(error);

    }
}



export const logoutUser = () => {
    const router = useRouter();

    localStorage.removeItem('user')
    router.push('/Login')
}