export function calculateSize(obj) {
    return new TextEncoder().encode(JSON.stringify(obj)).length;
}