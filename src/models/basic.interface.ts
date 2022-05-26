export interface CommonResponseType {
	status: boolean;
	message: string;
}

export type Simplify<T> = T extends Record<string, any> ? { [K in keyof T]: Simplify<T[K]> } : T;
