function fixHeader(header: string): string {
    let split: string[] = header.split("-");
    return split
        .map((str) => {
            return str.toLowerCase().charAt(0).toUpperCase() + str.slice(1);
        })
        .join("-");
}

export type Method =
    | "GET"
    | "HEAD"
    | "POST"
    | "PUT"
    | "DELETE"
    | "CONNECT"
    | "OPTIONS"
    | "TRACE"
    | "PATCH";

export class HTTPRequest {
    public method: Method;
    public resource: string;
    public version: string;
    private headers: Map<string, string>;
    private body: string = "";

    public static from(raw: string): HTTPRequest {
        let allLines = raw.replace("\r", "").split("\n");
        let firstLine = allLines[0].split(" ");
        let rawHeaders = allLines.slice(1, allLines.indexOf(""));

        let method = firstLine[0] as Method;
        let resource = firstLine[1];
        let version = firstLine[2];

        let body = "";
        let idx = allLines.indexOf("");
        if (idx != -1) body = allLines.slice(idx + 1).join("\n");

        let headers: [string, string][] = rawHeaders.map((raw) => {
            let split = raw.split(": ");
            return [split[0], split[1]];
        });

        return new HTTPRequest(method, resource, version, headers, body);
    }

    constructor(
        method: Method,
        resource: string,
        version: string,
        headers: [string, string][],
        body: string
    ) {
        this.method = method;
        this.resource = resource;
        this.version = version;
        this.headers = new Map<string, string>();
        this.setBody(body);

        headers.forEach((val) => {
            this.setHeader(val[0], val[1]);
        });
    }

    public build(): string {
        let firstLine = `${this.method} ${this.resource} ${this.version}`;
        let headers = "";

        this.headers.forEach((val, key) => {
            headers += `${fixHeader(key)}: ${val}\n`;
        });

        return firstLine + "\n" + headers + "\n" + this.body;
    }

    public denylist(...deny: string[]) {
        deny.forEach((header) => {
            this.removeHeader(header);
        });
    }

    public allowlist(...allow: string[]) {
        this.headers.forEach((val, key) => {
            if (allow.indexOf(key) == -1) this.removeHeader(key);
        });
    }

    // getters setters
    public setBasicAuth(user: string, password: string) {
        var basic = `${user}:${password}`;
        this.setHeader("Authorization", "Basic " + btoa(basic));
    }

    public setHeader(key: string, val: string) {
        this.headers.set(fixHeader(key), val);
    }

    public getHeader(key: string): string {
        let value = this.headers.get(fixHeader(key));
        return value ? value : "";
    }

    public removeHeader(key: string) {
        this.headers.delete(fixHeader(key));
    }

    public getBody(): string {
        return this.body;
    }

    public setBody(data: string) {
        this.setHeader("Content-Length", data.length.toString());
        this.body = data;
    }
}
