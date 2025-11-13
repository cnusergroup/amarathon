/**
 * Device type detection utility
 * Returns 'pc', 'pad', or 'mobile' based on window width
 */
export default function deviceType() {
  const width = window.innerWidth;
  
  if (width > 1199) {
    return 'pc';
  } else if (width > 767) {
    return 'pad';
  } else {
    return 'mobile';
  }
}
