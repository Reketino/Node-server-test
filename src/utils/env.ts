

export function getEnv(name: string): string {
    const value = process.env[name];
    if (typeof value !== "string") {
        throw new Error(`Manglende environment variable: ${name}`);
    }
    return value;
}