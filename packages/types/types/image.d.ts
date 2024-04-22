export interface Image {
    id: number;
    originalname: string;
    filename: string;
    mimetype: string;
    url: string;
    originalUrl?: string;
    thumbnailUrl?: string;
    metadata: Record<string, any>;
    createdAt: string;
}
