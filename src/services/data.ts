import axios from "axios";
// @ts-ignore
export const BASE_URL = "https://sale-stroy.232425.uz/api/";

const Token = localStorage.getItem("token");

export const PostData = async (url: string, data: any) => {
    const response = await axios.post(BASE_URL + url, data);
    return response;
};

export const PostDataToken = async (url: string, data: any) => {
    const response = await axios.post(BASE_URL + url, data, {
        headers: {
            "Content-Type": "multipart/formData",
            Authorization: `Bearer ${Token}`,
        },
    });
    return response;
};
export const PutDataToken = async (url: string, data: any) => {
    const response = await axios.put(BASE_URL + url, data, {
        headers: {
            "Content-Type": "multipart/formData",
            Authorization: `Bearer ${Token}`,
        },
    });
    return response;
};

export const PostDataTokenJson = async (url: string, data: any) => {
    const response = await axios.post(BASE_URL + url, data, {
        headers: {
            Authorization: `Bearer ${Token}`,
        },
    });
    return response;
};
export const PutDataTokenJson = async (url: string, data: any) => {
    const response = await axios.put(BASE_URL + url, data, {
        headers: {
            Authorization: `Bearer ${Token}`,
        },
    });
    return response;
};

export const PostSimple = async (url: string) => {
    const response = await axios.post(
        BASE_URL + url,
        {},
        {
            headers: {
                Authorization: `Bearer ${Token}`,
            },
        }
    );
    return response;
};

export const GetDataSimple = async (url: string) => {
    if (Token) {
        const response = await axios.get(BASE_URL + url, {
            headers: {
                Authorization: `Bearer ${Token}`,
            },
        });
        return response.data;
    } else {
        const response = await axios.get(BASE_URL + url);
        return response.data;
    }
};

export async function GetDataWithBodyInGet(url: string, body: any) {
    const res = await fetch(`${BASE_URL}${url}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
        },
        body: JSON.stringify(body),
    });

    return res.json();
}

export const GetDataSimpleUrl = async (url: string) => {
    if (Token) {
        const response = await axios.get(url, {
            headers: {
                Authorization: `Bearer ${Token}`,
            },
        });
        return response.data;
    } else {
        const response = await axios.get(BASE_URL + url);
        return response.data;
    }
};

export const DeleteData = async (url: string) => {
    const response = await axios.delete(BASE_URL + url, {
        headers: {
            Authorization: `Bearer ${Token}`,
        },
    });
    return response;
};

export const NewPassword = async (url: string, data: any) => {
    const response = await axios.patch(BASE_URL + url, data);
    return response.data;
};
