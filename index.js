const XLSX = require('xlsx');

const faker = require('faker');
faker.locale = process.env.DUMMY_LOCALE || 'ja';

const out = process.env.DUMMY_OUTPUT || 'out.xlsx';

let numOfRows = new Number(process.env.DUMMY_NUM_OF_ROWS);
if (isNaN(numOfRows)) {
  numOfRows = 1;
}

const wb = XLSX.utils.book_new();

const fakerKey = [
  ['name', 'lastName'],
  ['name', 'firstName'],
  ['name', 'jobTitle'],
  ['name', 'jobArea'],
  ['name', 'jobType'],
  ['internet', 'email'],
  ['phone', 'phoneNumber'],
  ['lorem', 'word'],
  ['company', 'companyName'],
  ['company', 'companySuffix'],
  ['address', 'zipCode'],
  ['address', 'state'],
  ['address', 'city'],
  ['address', 'streetName'],
  ['address', 'streetAddress'],
  ['address', 'streetSuffix'],
  ['address', 'streetPrefix'],
  ['address', 'secondaryAddress'],
  ['address', 'country'],
  ['address', 'stateAbbr'],
];

const header = fakerKey.map(keys => keys[1]);
const data = [];
data.push(header);

for (let i = 0; i < numOfRows; i++) {
  const row = fakerKey.map((keys) => {
    return faker[keys[0]][keys[1]]();
  });

  if (i % (numOfRows / 100) === 0) {
    process.stdout.write('.');
  }
  data.push(row)
}
console.log('');


const ws = XLSX.utils.aoa_to_sheet(data);

XLSX.utils.book_append_sheet(wb, ws, 'Sheet1');
XLSX.writeFile(wb, out);
