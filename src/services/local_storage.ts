export default class LocalStorage {
    static USER_DATA: string = "user_data";

    // Get data from storage
    static getData(key: string): string {
        try {
            return localStorage.getItem(key)!;
        } catch (e) {
            console.log(`Error getting data from storage`);
            return "";
        }
    }
    // Store data to local storage
    static setData(key: string, data: string): void {
        try {
            localStorage.setItem(key, data);
        } catch (e) {
            console.log(`Error storing data to storage`);
        }
    }

    // Check if data is available in storage
    static checkData(key: string): boolean {
        try {
            const data: string | null = localStorage.getItem(key);
            if (data === null) {
                return false;
            } else {
                return true;
            }
        } catch (e) {
            return false;
        }
    }

    static deleteData(key: string): void {
        try {
            if (LocalStorage.checkData(key)) {
                localStorage.removeItem(key);
            }
        } catch (e) { }
    }
}
