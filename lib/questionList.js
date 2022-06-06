const empDept = [];
const empRole =[];
const empStat =[];

const questionSequence =
{
    type: 'list',
    message: 'What do you wish to do?',
    name: 'nextChoice',
    choices: ['View Departments', 'View Roles', 'View Employees', 'Add Departments', 'Add Roles', 'Add Employees', 'Update Employee Roles', 'Exit EMS']
};

const includeDeptQs = 
{
    type: 'input',
    message: 'New department name:',
    name: 'deptNames'
};

const includeRoleQs = [
    {
        type: 'input',
        message: 'New role name:',
        name: 'roleTitle'
    },
    {
        type: 'input',
        message: 'New role salary:',
        name: 'newRoleSalary'
    },
    {
        type: 'list',
        message: 'New role department:',
        name: 'deptOfRole',
        choices: empDept
    }
];

const includeEmpQs = [
    {
        type: 'input',
        message: "New employee first name:",
        name: 'firstName'
    },
    {
        type: 'input',
        message: "New employee last name:",
        name: 'lastName'
    },
    {
        type: 'list',
        message: 'New employee role:',
        name: 'newEmpRole',
        choices: empRole
    },
    {
        type: 'list',
        message: 'Manager of new employee:',
        name: 'managerDept',
        choices: empStat
    }
];

const roleUpdateQs = [
    {
        type: 'list',
        message: 'Choose an employee to update:',
        name: 'currentEmpUpdate',
        choices: empStat
    },
    {
        type: 'list',
        message: 'Choose a new role for the employee:',
        name: 'roleUpdate',
        choices: empRole
    }
];

module.exports = { questionSequence, includeDeptQs, includeRoleQs, includeEmpQs, roleUpdateQs, empDept, empRole, empStat };