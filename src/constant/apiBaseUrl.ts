/**
 * Only variables that start with 'NEXT_PUBLIC_' can be used on both sides.
 * NODE_API preferred on server, and not sent to client ('undefined' in browser),
 * so no additional checks required.
 * */
const API_BASE_URL = process.env.LOCAL_API_BASE_URL || process.env.NEXT_PUBLIC_API_BASE_URL;

export default API_BASE_URL;
