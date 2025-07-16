const bcrypt = require('bcryptjs');
const { Pool } = require('@neondatabase/serverless');
const ws = require('ws');

// Configure WebSocket for Neon
const { neonConfig } = require('@neondatabase/serverless');
neonConfig.webSocketConstructor = ws;

if (!process.env.DATABASE_URL) {
  console.error("DATABASE_URL must be set");
  process.exit(1);
}

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

async function createStaffAccount() {
  try {
    // Staff credentials
    const staffData = {
      username: 'admin',
      email: 'admin@company.com',
      password: 'admin123',
      fullName: 'Administrator',
      phone: '+1234567890',
      isStaff: true,
      isVerified: true,
      verifyCode: '1234',
      invitationCode: 'STAFF2024'
    };

    // Hash the password
    const hashedPassword = await bcrypt.hash(staffData.password, 10);

    // Insert the staff account
    const result = await pool.query(`
      INSERT INTO users (username, email, password, full_name, phone, is_staff, is_verified, verify_code, invitation_code, created_at, updated_at)
      VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, NOW(), NOW())
      RETURNING id, username, email, full_name, is_staff
    `, [
      staffData.username,
      staffData.email,
      hashedPassword,
      staffData.fullName,
      staffData.phone,
      staffData.isStaff,
      staffData.isVerified,
      staffData.verifyCode,
      staffData.invitationCode
    ]);

    console.log('✅ Staff account created successfully!');
    console.log('📋 Staff Account Details:');
    console.log(`   ID: ${result.rows[0].id}`);
    console.log(`   Username: ${result.rows[0].username}`);
    console.log(`   Email: ${result.rows[0].email}`);
    console.log(`   Full Name: ${result.rows[0].full_name}`);
    console.log(`   Is Staff: ${result.rows[0].is_staff}`);
    console.log('');
    console.log('🔑 Login Credentials:');
    console.log(`   Email: ${staffData.email}`);
    console.log(`   Password: ${staffData.password}`);
    console.log('');
    console.log('🌐 Dashboard URL: /dashboard');

  } catch (error) {
    console.error('❌ Error creating staff account:', error.message);
  } finally {
    await pool.end();
  }
}

createStaffAccount(); 
