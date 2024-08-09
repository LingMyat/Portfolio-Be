const prisma = require('../../utils/prismaClient');

const { SkillSeeder }   = require('./SkillSeeder');
const { ProjectSeeder } = require('./ProjectSeeder');

async function main() {
    try {
        await SkillSeeder();
        await ProjectSeeder();
        
    } catch (e) {
        console.error(e);
        process.exit(1);
    } finally {
        await prisma.$disconnect();
    }
}

main();
