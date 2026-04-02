export function getGreeting() {
    const currentHour = new Date().getHours()

    if (currentHour < 12) return "Bom dia!"
    if (currentHour < 18) return "Boa tarde!"
    return "Boa noite!"
}