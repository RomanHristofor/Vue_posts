import { DirectiveBinding } from 'vue';

type IntersectionObserverCallback = (
    entries: IntersectionObserverEntry[],
    observer: IntersectionObserver
) => void;
export default {
  name: 'intersection',
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const options = {
      rootMargin: "0px",
      threshold: 1.0,
    };
    const callback: IntersectionObserverCallback = (entries) => {
      if(entries[0].isIntersecting && binding.value.page < binding.value.totalPages) {
        console.log('@',  binding.value);
        binding.value.loadPosts();
      }
    };
    const observer = new IntersectionObserver(callback, options);
    observer.observe(el);
  }
}
