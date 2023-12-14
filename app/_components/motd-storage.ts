interface IStorage {
    getMotd(): Promise<string>;
    setMotd(motd: string): void;
}


const motdStorage: IStorage = {
    async getMotd(): Promise<string> {
        // mock getting motd from server
        console.log("Getting motd");
        let motd = localStorage.getItem("motd");
        // wait for 2 seconds
        await new Promise(resolve => setTimeout(resolve, 1500));
        if (motd === null) {
            throw new Error("No motd found");
        }
        return motd;
    },
    setMotd(motd: string): void {
        // mock saving motd to server
        console.log("Saving motd: " + motd);
        localStorage.setItem("motd", motd);
    }
};

export { motdStorage}
export type { IStorage }