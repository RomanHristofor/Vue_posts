import { DirectiveBinding } from 'vue';

interface ScrollOptions {
  page: number;
  totalPages: number;
  loadPosts: () => void;
}

interface ExtendedHTMLElement extends HTMLElement {
  _observer?: IntersectionObserver;
  _createObserver?: (value?: Partial<ScrollOptions>) => void;
}

type IntersectionObserverCallback = (
  entries: IntersectionObserverEntry[],
  observer: IntersectionObserver
) => void;

export default {
  name: 'intersection',
  mounted(el: ExtendedHTMLElement, binding: DirectiveBinding<ScrollOptions>) {
    const createObserver = (value: Partial<ScrollOptions> = {}) => {
      const observerCallback: IntersectionObserverCallback = (entries) => {
        const entry = entries[0];
        const currentValue = { ...binding.value, ...value };

        if (entry.isIntersecting && currentValue.page < currentValue.totalPages) {
          binding.value.loadPosts();
          currentValue.page += 1;
        }
      };

      const options = {
        rootMargin: "0px",
        threshold: 1.0,
      };

      if (el._observer) {
        el._observer.disconnect();
      }

      const observer = new IntersectionObserver(observerCallback, options);
      observer.observe(el);
      el._observer = observer;
    };

    createObserver();
    el._createObserver = createObserver;
  },
  updated(el: ExtendedHTMLElement, binding: DirectiveBinding<ScrollOptions>) {
    const oldVal = binding.oldValue;
    const newVal = binding.value;

    if (newVal.totalPages !== oldVal?.totalPages && el._createObserver) {
      console.log(newVal, 'Переинициализируем Observer только при изменении ключевых параметров');
      el._createObserver({ ...newVal, page: 1 });
    }
  },
  beforeUnmount(el: ExtendedHTMLElement) {
    if (el._observer) {
      el._observer.disconnect();
    }
  }
}