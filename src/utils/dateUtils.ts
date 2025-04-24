export const formatDateForGrouping = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleDateString('de-DE', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

export const formatTimeForDisplay = (dateString: string): string => {
    const date = new Date(dateString);
    return date.toLocaleTimeString('de-DE', {
        hour: '2-digit',
        minute: '2-digit',
    });
};

export const getGoogleMapsUrl = (latitude: number, longitude: number): string => {
    return `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
};