import bcrypt from 'bcrypt';

const saltRounds = 10; // Number of salt rounds to use

// Function to hash a password
async function hashPassword(password: string) {
    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        console.error('Error hashing password:', error);
    }
}

async function comparePassword(password: string, hashedPassword: string) {
    try {
        const match = await bcrypt.compare(password, hashedPassword);
        if (match) {
            console.log('Password is correct!');
        } else {
            console.log('Password is incorrect!');
        }
    } catch (error) {
        console.error('Error comparing password:', error);
    }
}

export { comparePassword, hashPassword}