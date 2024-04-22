export * from './tag';
export * from './category';
export * from './post';
export * from './site';
export * from './comment';
export * from './image';
export * from './userRole';
export * from './rolePermission';
export * from './invitationCode';
export * from './page';
export * from './visitor';
export * from './link';
export * from './svg';
export interface PageRes<T> {
    list: T[];
    total: number;
}
interface Query {
    page?: number;
    pageSize?: number;
}
export type PageQuery<T = boolean> = T extends Record<string, any> ? Query & T : Query;
