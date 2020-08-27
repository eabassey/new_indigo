import { ClientConfig } from "./client.config";

export class Client {
    config: ClientConfig;
    constructor(config: ClientConfig) {
        this.config = config;
    }
}