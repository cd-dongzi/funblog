import { LinkType } from '@funblog/types';
export declare const LINK_LIST: ({
    value: LinkType;
    label: string;
    alias: string;
    showClient: boolean;
} | {
    value: LinkType;
    label: string;
    showClient: boolean;
    alias?: undefined;
} | {
    value: LinkType;
    label: string;
    alias?: undefined;
    showClient?: undefined;
})[];
export declare const CACHE_CLIENT_TAGS: {
    readonly getSiteMeta: "getSiteMeta";
    readonly getSiteBlogger: "getSiteBlogger";
    readonly getSitePagination: "getSitePagination";
    readonly getSiteComment: "getSiteComment";
    readonly getSocialAccount: "getSocialAccount";
    readonly getSiteUsr: "getSiteUsr";
    readonly getSiteLink: "getSiteLink";
    readonly getSiteLayout: "getSiteLayout";
};
export declare const TOKEN_KEY = "fun_sid";
export declare const PAGESIZE = 10;
