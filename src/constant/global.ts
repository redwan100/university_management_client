export const monthNames = [
  "january",
  "february",
  "march",
  "april",
  "may",
  "jun",
  "july",
  "august",
  "september",
  "october",
  "november",
  "december",
];

export const monthOptions = monthNames.map((month) => ({
  value: month,
  label: month,
}));

export const genders = ["Male", "Female", "Other"];

export const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

export const genderOptions = genders.map((item) => ({
  value: item.toLowerCase(),
  label: item,
}));

export const bloodGroupOptions = bloodGroups.map((item) => ({
  value: item,
  label: item,
}));
