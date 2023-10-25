export function autoFocus(id) {
  setTimeout(() => {
    document.getElementById(id).focus();
  });
}
