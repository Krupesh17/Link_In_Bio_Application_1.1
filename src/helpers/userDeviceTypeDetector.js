export function getUserDeviceType() {
  const userAgent = navigator.userAgent.toLowerCase();
  const screenWidth = window.innerWidth;
  let device = "Other";

  const isMobileUA = /android|iphone|ipod|blackberry|windows phone/i.test(
    userAgent
  );
  const isTabletUA = /ipad|tablet|playbook|silk|(android(?!.*mobile))/i.test(
    userAgent
  );

  if ((screenWidth < 768 && !isTabletUA) || isMobileUA) {
    device = "Phone";
  } else if ((screenWidth >= 768 && screenWidth < 1024) || isTabletUA) {
    device = "Tablet";
  } else if (screenWidth >= 1024 && !isMobileUA && !isTabletUA) {
    device = "Desktop";
  }

  return device;
}
