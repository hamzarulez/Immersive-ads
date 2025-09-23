export const PROJECT_STATUSES = [
    'Invitation',
    'Active',
    'In Review',
    'Completed',
    'Declined'
] as const; // 'as const' makes it a readonly tuple for better type safety