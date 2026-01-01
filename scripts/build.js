const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const apiDir = path.join(__dirname, '../src/app/api');
const tempApiDir = path.join(__dirname, '../src/app/_api');
const adminDir = path.join(__dirname, '../src/app/admin');
const tempAdminDir = path.join(__dirname, '../src/app/_admin');

function cleanup() {
    if (fs.existsSync(tempApiDir)) {
        fs.renameSync(tempApiDir, apiDir);
        console.log('Restored API directory.');
    }
    if (fs.existsSync(tempAdminDir)) {
        fs.renameSync(tempAdminDir, adminDir);
        console.log('Restored Admin directory.');
    }
}

try {
    if (fs.existsSync(apiDir)) {
        console.log('Hiding API directory for static build...');
        fs.renameSync(apiDir, tempApiDir);
    }
    if (fs.existsSync(adminDir)) {
        console.log('Hiding Admin directory for static build...');
        fs.renameSync(adminDir, tempAdminDir);
    }

    console.log('Running Next.js Build...');
    execSync('next build --webpack', { stdio: 'inherit' });
    console.log('Build Success!');
} catch (error) {
    console.error('Build Failed!');
    process.exit(1);
} finally {
    cleanup();
}
