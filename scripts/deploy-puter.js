import { execSync } from 'child_process';
import readline from 'readline';

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const runCommand = (cmd) => {
  try {
    execSync(cmd, { stdio: 'inherit' });
    return true;
  } catch (error) {
    return false;
  }
};

const askQuestion = (query) => new Promise((resolve) => rl.question(query, resolve));

async function main() {
  console.log('\n🚀 Puter.js Website Deployer 🚀');
  console.log('==================================');

  // 1. Verify PUTER_AUTH_TOKEN is present
  const token = process.env.PUTER_AUTH_TOKEN;
  if (!token) {
    console.error('❌ Error: PUTER_AUTH_TOKEN environment variable is missing.');
    console.log('\nTo get your token:');
    console.log('1. Go to https://puter.com/dashboard#account and log in.');
    console.log('2. Scroll down to "Auth Token" and copy it.');
    console.log('3. Set it in your terminal before running this script:');
    console.log('   Windows PowerShell: $env:PUTER_AUTH_TOKEN="your_copied_token"');
    console.log('   Windows CMD:        set PUTER_AUTH_TOKEN=your_copied_token');
    console.log('   Linux/macOS:        export PUTER_AUTH_TOKEN="your_copied_token"');
    rl.close();
    process.exit(1);
  }

  // 2. Ask for desired subdomain name
  let subdomain = process.argv[2];
  if (!subdomain) {
    subdomain = await askQuestion('Enter your desired subdomain name (e.g. my-homechef): ');
  }
  
  subdomain = subdomain.trim().toLowerCase().replace(/[^a-z0-9\-]/g, '');

  if (!subdomain || subdomain.length < 3) {
    console.error('❌ Error: Subdomain must be at least 3 characters long and alphanumeric.');
    rl.close();
    process.exit(1);
  }

  console.log(`\n📦 Subdomain selected: https://${subdomain}.puter.site`);
  console.log('🔨 Step 1: Compiling React Production Build...');

  // Build the app locally
  if (!runCommand('npm run build')) {
    console.error('❌ Error: Vite production build failed.');
    rl.close();
    process.exit(1);
  }

  console.log('\n🚀 Step 2: Uploading and Deploying static directory to Puter Hosting...');
  
  // Deploy the built folder using @heyputer/cli
  const success = runCommand(`npx @heyputer/cli site deploy ./dist ${subdomain}`);

  if (success) {
    console.log('\n✅ Deployment completed successfully!');
    console.log(`🔗 Live URL: https://${subdomain}.puter.site`);
  } else {
    console.error('\n❌ Deployment failed. Please verify that the subdomain is not taken or that your token is valid.');
  }

  rl.close();
}

main();
