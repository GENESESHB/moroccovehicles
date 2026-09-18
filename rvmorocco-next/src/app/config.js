// ============================================================
//  src/app/config.js  –  SINGLE SOURCE OF TRUTH FOR API URL
// ============================================================
//
//  HOW TO SWITCH:
//  ─────────────────────────────────────────────────────────
//  Option A – via .env.local (recommended):
//    NEXT_PUBLIC_API_URL=http://localhost:5000/api      ← local
//    NEXT_PUBLIC_API_URL=https://moroccovehicles-1-6zww.onrender.com/api  ← deployed
//
//  Option B – change the fallback below directly:
//    const FALLBACK = 'http://localhost:5000/api';      ← local
//    const FALLBACK = 'https://moroccovehicles-1-6zww.onrender.com/api';  ← deployed
// ============================================================
const FALLBACK = 'http://localhost:3001/api';  
//const FALLBACK = 'https://moroccovehicles-1-6zww.onrender.com/api';

/** Full API base URL  e.g. http://localhost:5000/api */
export const API_URL = process.env.NEXT_PUBLIC_API_URL || FALLBACK;

/** Server origin without /api  e.g. http://localhost:5000 */
export const SERVER_ORIGIN = API_URL.replace(/\/api$/, '');
