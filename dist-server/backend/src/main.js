"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const fs = __importStar(require("fs"));
const path = __importStar(require("path"));
async function bootstrap() {
    console.log('Starting application...');
    console.log('Triggering deploy for SSL check...');
    console.log('Current working directory:', process.cwd());
    // Fix SSL certificate path for Supabase
    const sslPath = path.join(process.cwd(), 'backend', 'ssl', 'supabase-ca.crt');
    if (fs.existsSync(sslPath)) {
        console.log('SSL certificate found at:', sslPath);
        if (process.env.DATABASE_URL && process.env.DATABASE_URL.includes('sslrootcert=./backend/ssl/supabase-ca.crt')) {
            console.log('Replacing relative SSL path with absolute path in DATABASE_URL');
            process.env.DATABASE_URL = process.env.DATABASE_URL.replace('sslrootcert=./backend/ssl/supabase-ca.crt', `sslrootcert=${sslPath}`);
        }
        if (process.env.DIRECT_URL && process.env.DIRECT_URL.includes('sslrootcert=./backend/ssl/supabase-ca.crt')) {
            console.log('Replacing relative SSL path with absolute path in DIRECT_URL');
            process.env.DIRECT_URL = process.env.DIRECT_URL.replace('sslrootcert=./backend/ssl/supabase-ca.crt', `sslrootcert=${sslPath}`);
        }
    }
    else {
        console.warn('WARNING: SSL certificate NOT found at:', sslPath);
        // Try to list files in backend directory to debug
        const backendPath = path.join(process.cwd(), 'backend');
        if (fs.existsSync(backendPath)) {
            console.log('Contents of backend directory:', fs.readdirSync(backendPath));
        }
        else {
            console.log('Backend directory not found at:', backendPath);
        }
    }
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    app.setGlobalPrefix('api');
    app.enableCors();
    const port = process.env.PORT ?? 3001;
    console.log(`Listening on port ${port}`);
    await app.listen(port, '0.0.0.0');
}
bootstrap().catch(err => {
    console.error('Fatal error during application startup:', err);
    process.exit(1);
});
//# sourceMappingURL=main.js.map