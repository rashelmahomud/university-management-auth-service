import {
  IAcademecSemesterTitles,
  IAcademicSemesterCodes,
  IAcademicSemesterMonth,
} from './academicSemester.interface';

export const academicSemesterTitle: IAcademecSemesterTitles[] = [
  'Autumn',
  'Summar',
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
  summer: '02',
  Fall: '03',
};
