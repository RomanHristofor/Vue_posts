import { DirectiveBinding } from 'vue';

type IntersectionObserverCallback = (
    entries: IntersectionObserverEntry[],
    observer: IntersectionObserver
) => void;
export default {
  name: 'intersection',
  mounted(el: HTMLElement, binding: DirectiveBinding) {
    const createObserver = (b = {}) => {
      const observerCallback: IntersectionObserverCallback = (entries) => {
        const entry = entries[0];

        if (entry.isIntersecting && el._page < 5 && b.page < b.totalPages) {
          binding.value.loadPosts();
        }
      };

      const options = {
        rootMargin: "0px",
        threshold: 1.0,
      };

      const observer = new IntersectionObserver(observerCallback, options);
      observer.observe(el);

      el._observer = observer;
    };

    createObserver();
    el._page = 1;
    el._createObserver = createObserver;
  },
  updated(el: HTMLElement, binding: DirectiveBinding) {
    const oldVal = binding.oldValue;
    const newVal = binding.value;

    if (newVal.totalPages !== oldVal.totalPages) {
      console.log(newVal, 'Переинициализируем Observer только при изменении ключевых параметров');
      el._createObserver(newVal);
    }
  },
}
