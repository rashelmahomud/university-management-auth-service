import {
  IAcademecSemesterTitles,
  IAcademicSemesterCodes,
  IAcademicSemesterMonth,
} from './academicSemester.interface';

export const academicSemesterTitle: IAcademecSemesterTitles[] = [
  'Autumn',
  'Summer',
  'Fall',
];

export const academicSemesterCods: IAcademicSemesterCodes[] = [
  '01',
  '02',
  '03',
];

export const academicSemesterMonths: IAcademicSemesterMonth[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export const academicSemesterTitleCodeMapper: { [key: string]: string } = {
  Autumn: '01',
  Summer: '02',
  Fall: '03',
};

export const academicSemesterSharchAbleFields = ['title', 'code', 'year'];

export const academicSemesterFilterAbleFields = [
  'searchTerm',
  'title',
  'code',
  'year',
];
