export default class APIService {
    static error: Error = new Error("Unable to perform operation");

    static async get(url: string): Promise<any> {
        try {
            const res: Response = await fetch(url);
            if (res.status === 200) {
                const data = await res.json();
                return data;
            } else {
                throw APIService.error;
            }
        } catch (e) {
            console.log(`Fetch Error : ${e}`);
            throw APIService.error;
        }
    }

    static async post(url: string, body: {}): Promise<any> {
        try {
            const res: Response = await fetch(url, {
                method: "POST",
                body: JSON.stringify(body),
                headers: {
                    "Content-type": "application/json",
                },
            });

            if (res.ok) {
                const data = await res.json();
                return data;
            } else {
                throw APIService.error;
            }
        } catch (e) {
            console.log(`Fetch Error : ${e}`);
            throw APIService.error;
        }
    }

    static async put(url: string, body: {}): Promise<any> {
        try {
            const res: Response = await fetch(url, {
                method: "PUT",
                body: JSON.stringify(body),
                headers: {
                    "Content-type": "application/json",
                },
            });
            if (res.ok) {
                const data = await res.json();
                return data;
            } else {
                throw APIService.error;
            }
        } catch (e) {
            console.log(`Fetch Error : ${e}`);
        }
    }

    static async delete(url: string, id: string): Promise<any> {
        try {
            const res: Response = await fetch(url + `/${id}`, {
                method: "DELETE",
                headers: {
                    "Content-type": "application/json",
                },
            });
            if (res.ok) {
                const data = await res.json();
                return data;
            } else {
                throw APIService.error;
            }
        } catch (e) {
            console.log(`Fetch Error : ${e}`);
        }
    }
}
