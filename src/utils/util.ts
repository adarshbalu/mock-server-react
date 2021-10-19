export default class Util {

    static checkForJSON = (str: string): boolean => {

        if (/^[\],:{}\s]*$/.test(str.replace(/\\["\\/bfnrtu]/g, '@').replace(/"[^"\\\n\r]*"|true|false|null|-?\d+(?:\.\d*)?(?:[eE][+-]?\d+)?/g, ']').replace(/(?:^|:|,)(?:\s*\[)+/g, ''))) {
            return true;
        }
        else {
            return false;
        }
    }

    static checkForValidURL = (str: string): boolean => {
        const urlMatcher = 'http?://(?:www.)?([-a-zA-Z0-9@:%._+~#=]{2,256}.[a-z]{2,6}\b)*(/[/dw.-]*)*(?:[?])*(.+)*';
        let re = new RegExp(urlMatcher);
        if (re.test(str)) {
            return true;
        }
        else {
            return false;
        }
    }

    static getParmsFromURL = (url: string): {} => {
        const stringList = url.split("?");
        const urlSearchParams = new URLSearchParams(stringList[1]);
        return (Object.fromEntries(urlSearchParams.entries()));
    }
}