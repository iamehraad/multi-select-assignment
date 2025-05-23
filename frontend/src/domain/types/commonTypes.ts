export interface IconProps {
    width?: number;
    height?: number;
    fill?: string;
}

export interface FetchApiError {
    status: number;
    message: string;
}

export const LoadingEnum = {
    LOADING: "loading",
    IDLE: "idle",
} as const;

export type LoadingEnum = typeof LoadingEnum[keyof typeof LoadingEnum];