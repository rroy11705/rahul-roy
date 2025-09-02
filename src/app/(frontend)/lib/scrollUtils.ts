export const smoothScrollToElement = (elementId: string, offset: number = 0) => {
  const element = document.getElementById(elementId);
  if (element) {
    const elementPosition = element.offsetTop - offset;
    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth'
    });
  }
};

export const scrollToContact = () => {
  // Dispatch custom event to trigger contact section animation
  window.dispatchEvent(new CustomEvent('contactScrollAnimation'));
  
  // Start scrolling
  smoothScrollToElement('contact', 100); // 100px offset from top
};