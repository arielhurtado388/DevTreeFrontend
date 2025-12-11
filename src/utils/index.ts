export function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

export function esUrlValida(url: string) {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
}
