const empDept = [];
const empRole =[];
const empStat =[];

const questionSequence =
{
    type: 'list',
    message: 'What would you like to do?',
    name: 'nextChoice',
    choices: ['View Departments', 'View Roles', 'View Employees', 'Add Department', 'Add Role', 'Add Employee', 'Update Employee Role', 'Exit App']
};

const includeDeptQs = 
{
    type: 'input',
    message: 'Enter a name for the new department:',
    name: 'depName'
};

const includeRoleQs = [
    {
        type: 'input',
        message: 'Enter a name for the new role:',
        name: 'roleName'
    },
    {
        type: 'input',
        message: 'Enter a salary for the new role:',
        name: 'roleSalary'
    },
    {
        type: 'list',
        message: 'Select a department for the new role:',
        name: 'roleDept',
        choices: empDept
    }
];

const includeEmpQs = [
    {
        type: 'input',
        message: "Enter the new employee's first name:",
        name: 'firstName'
    },
    {
        type: 'input',
        message: "Enter the new employee's last name:",
        name: 'lastName'
    },
    {
        type: 'list',
        message: 'Select a role for the new employee:',
        name: 'empRole',
        choices: empRole
    },
    {
        type: 'list',
        message: 'Select a manager for the new employee:',
        name: 'empManager',
        choices: empStat
    }
];

const roleUpdateQs = [
    {
        type: 'list',
        message: 'Select an employee to update:',
        name: 'empUpdate',
        choices: empStat
    },
    {
        type: 'list',
        message: 'Select a new role for the employee:',
        name: 'roleUpdate',
        choices: empRole
    }
];

module.exports = { questionSequence, includeDeptQs, includeRoleQs, includeEmpQs, roleUpdateQs, empDept, empRole, empStat };