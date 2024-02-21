export const getEvents = async () => {
    try {
        const res = await fetch("/api/events");
        const data = await res.json();
        return data;
    } catch (error) {
        throw error;
    }
}

export const getSpeakers = async () => {
    try {
        const res = await fetch("/api/speakers");
        const data = await res.json();
        return data;
    } catch (error) {
        throw error;
    }
}