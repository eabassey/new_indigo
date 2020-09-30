
    export interface Tls {
        public_key: string;
        private_key: string;
    }

    export interface Cors {
        allowedHeaders: any[];
        credentials: boolean;
        maxAge: number;
        methods: string[];
        origin: string[];
        exposedHeaders: any[];
        optionsSuccessStatus: number;
        preflightContinue: boolean;
    }

    export interface Config {
        cors: Cors;
    }


    export interface Backend {
        url: string;
        query: string;
        group: string;
        params?: any;
        data?: any;
        config?: Config;
    }

    export interface Endpoint {
        endpoint: string;
        headers_to_pass: string[];
        method: string;
        backends: Backend[];
    }

    export interface FoursureConfig {
        version: string;
        port: number;
        timeout: number;
        console_debug: boolean;
        tls: Tls;
        config: Config;
        endpoints: Endpoint[];
    }


