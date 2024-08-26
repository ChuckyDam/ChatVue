export const escapeHtml = (text: string): string => {
  return text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
};
export const toHtml = (text: string): string => {
  return text
    .replace(/&amp;/g, '&')
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'");
};

export function randomInteger(min: number, max: number) {
  let rand = min + Math.random() * (max + 1 - min);
  return Math.floor(rand);
}

export function sleep(callback:Function,ms:number){
    return new Promise<void>((res)=>{
        setTimeout(()=>{
            callback();
            res();
        }, ms)
    })
}