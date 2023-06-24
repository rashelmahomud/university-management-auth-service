import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(process.cwd(), '.env') });

export default {
  env: process.env.NODE_ENV,
  port: process.env.PORT,
  database_url: process.env.DATABASE_URL,
  student_default_password: process.env.STUDENT_DEFAULT_PASSWORD,
  default_faculty_pass: process.env.DEFAULT_FACULTY_PASS,
  default_admin_pass: process.env.DEFAULT_ADMIN_PASS,

  bcrypt_salt_round: process.env.BCRYPT_SALT_ROUNDS,

  jwt: {
    jwt_secret: process.env.JWT_SECRET,
    jwt_refresh_secret: process.env.JWT_REFRESH_SECRET,
    jwt_expirest_id: process.env.JWT_EXPIRES_IN,
    jwt_algoridam: process.env.JWT_ALGORITHOM,
    jwt_refresh_expires: process.env.JWT_REFRESH_EXPIRES_IN,
  },
};
