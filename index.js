const inquirer = require('inquirer');
const util = require('util');
const questionList = require('./lib/questionList');
const dataBase = require('./lib/dbConnect');
const query = util.promisify(dataBase.query).bind(dataBase);

// init start the app
const init = () => {

    console.log(`
-----------------------------------------------------              
--           Employee Management System            --
-----------------------------------------------------
    `);
    
    startQuestions();
};

// startQuestions begins the user question in the terminal
const startQuestions = () => {

    inquirer
        .prompt(questionList.questionSequence)
        .then((answers) => {

            switch (answers.nextChoice) {

                case 'View Departments':

                    viewDepts();
                    break;

                case 'View Roles':

                    viewRoles();
                    break;

                case 'View Employees':

                    viewEmps();
                    break;

                case 'Add Departments':

                    addDepts();
                    break;

                case 'Add Roles':
                    
                    addRoles();
                    break;

                case 'Add Employees':

                    addEmps();
                    break;

                case 'Update Employee Roles':

                    updateCurrentRoles();
                    break;

                case 'Exit EMS':

                    exitEms();
                    break;
            }
        })

        .catch(err => {
            if (err) throw err;
        });
};

// viewDepts shows all departments
const viewDepts = async () => {

    const res = await query(`
    SELECT id, name AS deptActual 
    FROM deptActual;
    `)

    tableLayout(res);
    startQuestions();
};

// viewRoles shows all current roles
const viewRoles = async () => {

    const res = await query (`
    SELECT roles.id, roles.title, deptActual.name AS deptActual, roles.salary 
    FROM roles 
    JOIN deptActual ON roles.department_id = deptActual.id;
    `)
    
    tableLayout(res);
    startQuestions();
};

// viewEmps shows all current employees
const viewEmps = async () => {

    const res = await query (`
    SELECT employee.id, CONCAT(employee.first_name, " ", employee.last_name) AS employee, roles.title AS roleActual, roles.salary AS salary, deptActual.name AS deptActual, CONCAT(mang.first_name, " ", mang.last_name) AS manager
    FROM employee
    JOIN roles on employee.role_id = roles.id
    JOIN deptActual ON roles.department_id = deptActual.id
    JOIN employee mang ON mang.id = employee.manager_id;
    `)

    tableLayout(res);
    startQuestions();
};

// addDepts allows creating additional departments
const addDepts = async () => {

    const newDepts = await inquirer.prompt(questionList.includeDeptQs);

    await query(`
    INSERT INTO deptActual (name) 
    VALUES (?)`, newDepts.deptNames.trim());
    
    await viewDepts();
};

// addRoles allows the creation of new roles
const addRoles = async () => {

    // pulls departments choices from the questions list
    await grabDepts();

    const addingRole = await inquirer.prompt(questionList.includeRoleQs)

    // Create the department Id
    const queryDepts = await query(`
    SELECT id from deptActual 
    WHERE name = (?)`, addingRole.deptOfRole);
    const departmentID = queryDepts[0].id;

    await query(`
    INSERT INTO roles (title, salary, department_id) 
    VALUES (?, ?, ?)`, [addingRole.roleTitle, parseInt(addingRole.newRoleSalary), departmentID]);

    viewRoles();
};

// addEmps allows the creation of new employees
const addEmps = async () => {

    // Pulls the choices for employees info from the list
    await grabRoles();
    await grabEmps();

    const addNewEmps = await inquirer.prompt(questionList.includeEmpQs);

    // Create role Id
    const searchRoles = await query(`
    SELECT id from roles 
    WHERE title = (?)`, addNewEmps.newEmpRole);
    const rolesIds = searchRoles[0].id;

    // Create manager Id
    const nameOfManager = addNewEmps.managerDept.split(' ');
    const managerSearch = await query(`
    SELECT id from employee 
    WHERE first_name = (?) AND last_name = (?);`, [nameOfManager[0], nameOfManager[1]]);
    const managersID = managerSearch[0].id;
    await query(`
    INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES (?, ?, ?, ?)`, [addNewEmps.firstName, addNewEmps.lastName, rolesIds, managersID]);

    viewEmps();
};

// updateCurrentRoles will allow updating of current employee roles
const updateCurrentRoles = async () => {

    await grabRoles();
    await grabEmps();
    
    const empUpdateRoles = await inquirer.prompt(questionList.roleUpdateQs);

    const searchRoles = await query(`
    SELECT id from roles 
    WHERE title = (?);`, empUpdateRoles.roleUpdate);
    const rolesIds = searchRoles[0].id;

    const employeeName = empUpdateRoles.currentEmpUpdate.split(' ');
    const employeeSearch = await query(`
    SELECT id from employee 
    WHERE first_name = (?) AND last_name = (?);`, [employeeName[0], employeeName[1]]);
    const employeeId = employeeSearch[0].id;

    await query(`
    UPDATE employee
    SET role_id = (?)
    WHERE id = (?)`, [rolesIds, employeeId]);

    await viewEmps();
};

// exitEms ends terminal interaction
const exitEms = () => {

    console.log(`
-----------------------------------------------------
--                     Leaving                     --
--           Employee Management System            --
-----------------------------------------------------
        `);

    process.exit();
}

// tableLayout creates standard layout
const tableLayout = (data) => {
    console.log('\n');
    console.table(data);
    console.log('\n');
};

// grabDepts searches all departments and adds them to questionList.empDept
const grabDepts = async () => {
    
    // Search Departments
    const deptLists = await query(`SELECT id, name FROM deptActual;`);

    // Fill empDept
    for (const innerDepts of deptLists) {
        const deptActual = {};
        deptActual.id = innerDepts.id;
        deptActual.name = innerDepts.name;
        questionList.empDept.push(deptActual);
    };
};

// grabRoles will search roles and then fill them into questionList.empRole
const grabRoles = async () => {

    const roleLists = await query(`SELECT id, title FROM roles;`);

    for (const innerRoles of roleLists) {
        const roleActual = {};
        roleActual.id = innerRoles.id;
        roleActual.name = innerRoles.title;
        questionList.empRole.push(roleActual);
    };
};

// grabEmps will search all employees then fill questionList.empstat
const grabEmps = async () => {

    const empLists  = await query(`SELECT id, first_name, last_name FROM employee;`);
    
    for (const innerEmps of empLists) {
        const empActual = {};
        empActual.id = innerEmps.id;
        empActual.name = `${innerEmps.first_name} ${innerEmps.last_name}`;
        questionList.empStat.push(empActual);
    };
};

// Runs app
init();
