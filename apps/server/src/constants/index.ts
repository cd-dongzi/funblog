import path from 'path';

export const SERVER_PORT = process.env.SERVER_PORT || 3000;
export const PUBLIC_KEY = 'common:public';

export const LOG_DIR = process.env.LOG_PATH || path.resolve(process.cwd(), 'logs');
export const STATIC_DIR = process.env.PUBLIC_PATH || path.resolve(process.cwd(), 'public');
export const STATIC_IMAGE_DIR = path.resolve(STATIC_DIR, 'images');

export const LOG_CONSOLE = !process.env.LOG_CONSOLE ? true : process.env.LOG_CONSOLE === 'true';
export const LOG_FILE = process.env.LOG_FILE === 'true';

export const CONFIG_OPTIONS = 'CONFIG_OPTIONS';

export const FALLBACK_PICTURE_TYPE = 'jpg';

export const ADMIN_INVITATION_CODE = process.env.ADMIN_INVITATION_CODE || '123456789';
