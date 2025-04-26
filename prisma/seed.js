const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
    console.log('Starting database seeding...');

    await prisma.grade.deleteMany({});
    await prisma.student.deleteMany({});
    await prisma.course.deleteMany({});
    await prisma.level.deleteMany({});
    console.log('Deleted existing data');

    const students = [
        {
            studentId: 'CS2001',
            firstName: 'Γιώργος',
            lastName: 'Παπαδόπουλος',
            email: 'gpapad@example.com',
            enrollmentYear: 2020,
        },
        {
            studentId: 'CS2002',
            firstName: 'Μαρία',
            lastName: 'Κωνσταντίνου',
            email: 'mkons@example.com',
            enrollmentYear: 2020,
        },
        {
            studentId: 'CS2003',
            firstName: 'Νίκος',
            lastName: 'Αλεξίου',
            email: 'nalex@example.com',
            enrollmentYear: 2021,
        },
        {
            studentId: 'CS2004',
            firstName: 'Ελένη',
            lastName: 'Βασιλείου',
            email: 'evasil@example.com',
            enrollmentYear: 2021,
        },
        {
            studentId: 'CS2005',
            firstName: 'Δημήτρης',
            lastName: 'Γεωργίου',
            email: 'dgeorg@example.com',
            enrollmentYear: 2022,
        },
        {
            studentId: 'CS2006',
            firstName: 'Σοφία',
            lastName: 'Πέτρου',
            email: 'spetrou@example.com',
            enrollmentYear: 2022,
        },
        {
            studentId: 'CS2007',
            firstName: 'Αντώνης',
            lastName: 'Νικολάου',
            email: 'anikol@example.com',
            enrollmentYear: 2022,
        },
        {
            studentId: 'CS2008',
            firstName: 'Χριστίνα',
            lastName: 'Δημητρίου',
            email: 'cdimit@example.com',
            enrollmentYear: 2023,
        },
        {
            studentId: 'CS2009',
            firstName: 'Γιάννης',
            lastName: 'Μακρής',
            email: 'gmakr@example.com',
            enrollmentYear: 2023,
        },
        {
            studentId: 'CS2010',
            firstName: 'Κατερίνα',
            lastName: 'Αποστόλου',
            email: 'kapost@example.com',
            enrollmentYear: 2023,
        },
    ];

    const courses = [
        {
            courseCode: 'CS101',
            title: 'Εισαγωγή στην Επιστήμη Υπολογιστών',
            department: 'Πληροφορική',
            credits: 6,
        },
        {
            courseCode: 'CS102',
            title: 'Προγραμματισμός I',
            department: 'Πληροφορική',
            credits: 6,
        },
        {
            courseCode: 'CS201',
            title: 'Δομές Δεδομένων',
            department: 'Πληροφορική',
            credits: 6,
        },
        {
            courseCode: 'CS202',
            title: 'Βάσεις Δεδομένων',
            department: 'Πληροφορική',
            credits: 6,
        },
        {
            courseCode: 'CS301',
            title: 'Αλγόριθμοι',
            department: 'Πληροφορική',
            credits: 6,
        },
        {
            courseCode: 'CS302',
            title: 'Τεχνητή Νοημοσύνη',
            department: 'Πληροφορική',
            credits: 6,
        },
        {
            courseCode: 'MA101',
            title: 'Μαθηματική Ανάλυση',
            department: 'Μαθηματικά',
            credits: 5,
        },
        {
            courseCode: 'MA201',
            title: 'Γραμμική Άλγεβρα',
            department: 'Μαθηματικά',
            credits: 5,
        },
    ];

    for (const student of students) {
        await prisma.student.create({
            data: student,
        });
    }
    console.log('Created students');

    for (const course of courses) {
        await prisma.course.create({
            data: course,
        });
    }
    console.log('Created courses');

    const createdStudents = await prisma.student.findMany();
    const createdCourses = await prisma.course.findMany();

    const grades = [];
    for (const student of createdStudents) {
        const numberOfCourses = Math.floor(Math.random() * 3) + 3;
        const shuffledCourses = [...createdCourses].sort(
            () => 0.5 - Math.random()
        );

        for (
            let i = 0;
            i < numberOfCourses && i < shuffledCourses.length;
            i++
        ) {
            const course = shuffledCourses[i];

            const grade = Math.floor(Math.random() * 51 + 50) / 10;

            const semester =
                course.courseCode.includes('101') ||
                course.courseCode.includes('102')
                    ? 'Χειμερινό'
                    : 'Εαρινό';
            const academicYear = `${2020 + Math.floor(i / 4)}-${
                2021 + Math.floor(i / 4)
            }`;

            grades.push({
                studentId: student.id,
                courseId: course.id,
                grade,
                semester,
                academicYear,
            });
        }
    }

    for (const grade of grades) {
        await prisma.grade.create({
            data: grade,
        });
    }
    console.log('Created grades');

    const levels = [
        {
            name: 'Basic SELECT',
            description:
                'Γεια σου! Είμαι εδώ για να σε βοηθήσω να μάθεις SQL. Ας ξεκινήσουμε με την εντολή SELECT.|||Η εντολή SELECT χρησιμοποιείται για να εξάγετε δεδομένα από μια βάση δεδομένων.|||Η βασική σύνταξη είναι: SELECT column1, column2 FROM table_name|||Για αυτό το επίπεδο, δοκίμασε να επιλέξεις όλους τους φοιτητές: SELECT * FROM Student',
            sqlQuery: 'SELECT * FROM Student',
            hints: [
                {
                    pattern: 'SELECT',
                    basicHint:
                        'Πρέπει να ξεκινήσεις το ερώτημά σου με τη λέξη-κλειδί SELECT.',
                },
                {
                    pattern: 'FROM',
                    basicHint:
                        'Μετά το SELECT χρειάζεσαι το FROM για να προσδιορίσεις τον πίνακα.',
                },
                {
                    pattern: 'Student',
                    basicHint: 'Πρέπει να επιλέξεις από τον πίνακα Student.',
                },
            ],
        },
        {
            name: 'Filtering with WHERE',
            description:
                'Καλωσήρθες στο δεύτερο επίπεδο!|||Τώρα θα μάθουμε για την εντολή WHERE.|||Η εντολή WHERE χρησιμοποιείται για να φιλτράρετε τα αποτελέσματα βάσει συγκεκριμένων συνθηκών.|||Δοκίμασε να βρεις όλους τους φοιτητές που γράφτηκαν το 2022.',
            sqlQuery: 'SELECT * FROM Student WHERE enrollmentYear = 2022',
            hints: [
                {
                    pattern: 'WHERE',
                    basicHint:
                        'Χρειάζεσαι τη λέξη-κλειδί WHERE για να φιλτράρεις τα αποτελέσματα.',
                },
                {
                    pattern: 'enrollmentYear',
                    basicHint:
                        'Πρέπει να φιλτράρεις βάσει του πεδίου enrollmentYear.',
                },
                {
                    pattern: '2022',
                    basicHint: 'Ψάχνεις για φοιτητές που γράφτηκαν το 2022.',
                },
            ],
        },
        {
            name: 'Sorting with ORDER BY',
            description:
                'Συγχαρητήρια που έφτασες στο τρίτο επίπεδο!|||Εδώ θα μάθουμε για την εντολή ORDER BY.|||Η ORDER BY χρησιμοποιείται για να ταξινομήσετε τα αποτελέσματα.|||Δοκίμασε να φέρεις όλα τα μαθήματα ταξινομημένα κατά αριθμό credits σε φθίνουσα σειρά.',
            sqlQuery: 'SELECT * FROM Course ORDER BY credits DESC',
            hints: [
                {
                    pattern: 'ORDER BY',
                    basicHint:
                        'Χρειάζεσαι τη λέξη-κλειδί ORDER BY για να ταξινομήσεις τα αποτελέσματα.',
                },
                {
                    pattern: 'credits',
                    basicHint:
                        'Ταξινόμησε τα μαθήματα με βάση τα credits τους.',
                },
                {
                    pattern: 'DESC',
                    basicHint:
                        'Χρησιμοποίησε το DESC για φθίνουσα ταξινόμηση (από το μεγαλύτερο στο μικρότερο).',
                },
            ],
        },
        {
            name: 'Joining Tables',
            description:
                'Καλώς ήρθες στο τέταρτο επίπεδο!|||Τώρα θα μάθουμε για τις συνδέσεις πινάκων με JOIN.|||Το JOIN επιτρέπει να συνδυάσετε γραμμές από δύο ή περισσότερους πίνακες.|||Δοκίμασε να βρεις όλους τους φοιτητές μαζί με τους βαθμούς τους.',
            sqlQuery:
                'SELECT Student.firstName, Student.lastName, Course.title, Grade.grade FROM Grade JOIN Student ON Grade.studentId = Student.id JOIN Course ON Grade.courseId = Course.id',
            hints: [
                {
                    pattern: 'JOIN',
                    basicHint:
                        'Χρειάζεσαι τη λέξη-κλειδί JOIN για να συνδέσεις τους πίνακες.',
                },
                {
                    pattern: 'ON',
                    basicHint:
                        'Μετά το JOIN χρειάζεσαι το ON για να προσδιορίσεις πώς συνδέονται οι πίνακες.',
                },
                {
                    pattern: 'Grade.studentId = Student.id',
                    basicHint:
                        'Οι πίνακες Grade και Student συνδέονται μέσω των πεδίων studentId και id.',
                },
                {
                    pattern: 'Grade.courseId = Course.id',
                    basicHint:
                        'Οι πίνακες Grade και Course συνδέονται μέσω των πεδίων courseId και id.',
                },
            ],
        },
        {
            name: 'Aggregation Functions',
            description:
                'Φτάσαμε στο τελευταίο επίπεδο!|||Θα μάθουμε για τις συναθροιστικές συναρτήσεις όπως COUNT, SUM, AVG, MAX, MIN.|||Αυτές οι συναρτήσεις εκτελούν υπολογισμούς σε ένα σύνολο τιμών.|||Δοκίμασε να βρεις το μέσο όρο βαθμολογίας ανά μάθημα.',
            sqlQuery:
                'SELECT Course.title, AVG(Grade.grade) as average_grade FROM Grade JOIN Course ON Grade.courseId = Course.id GROUP BY Course.id ORDER BY average_grade DESC',
            hints: [
                {
                    pattern: 'AVG',
                    basicHint:
                        'Χρησιμοποίησε τη συνάρτηση AVG() για να υπολογίσεις το μέσο όρο.',
                },
                {
                    pattern: 'GROUP BY',
                    basicHint:
                        'Χρειάζεσαι το GROUP BY για να ομαδοποιήσεις τα αποτελέσματα ανά μάθημα.',
                },
                {
                    pattern: 'Course.id',
                    basicHint:
                        'Κάνε GROUP BY με βάση το Course.id για να πάρεις ένα αποτέλεσμα ανά μάθημα.',
                },
                {
                    pattern: 'JOIN',
                    basicHint:
                        'Χρειάζεσαι JOIN για να συνδέσεις τους πίνακες Grade και Course.',
                },
            ],
        },
    ];

    for (const level of levels) {
        const hints = level.hints || [];
        delete level.hints;

        const createdLevel = await prisma.level.create({
            data: level,
        });

        for (const hint of hints) {
            await prisma.hint.create({
                data: {
                    ...hint,
                    levelId: createdLevel.id,
                },
            });
        }
    }

    console.log('Database seeding completed successfully');
}

main()
    .catch((e) => {
        console.error('Error seeding database:', e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
