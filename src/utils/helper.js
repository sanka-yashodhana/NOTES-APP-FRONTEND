export const getInitials = (name) => {
    if (!name) return '';

    const nameParts = name.trim().split(' ');
    const initials = nameParts.map(part => part.charAt(0).toUpperCase()).join('');

    return initials;
}