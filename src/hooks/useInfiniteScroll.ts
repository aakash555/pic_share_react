import { useState, useRef, useCallback, useEffect } from 'react';
import { useAppSelector } from '../redux/hooks';

function useInfiniteScroll() {
  const [page, setPage] = useState(1);
  const isScrollObserved = useAppSelector(state => state.pictures.isScrollObserved)
  // const [isScrollObservedState, setIsScrollObservedState] = useState(isScrollObserved)
  const loadMoreRef = useRef(null);

  const handleObserver = useCallback((entries:any) => {
    const [target] = entries;
    if (target.isIntersecting) {
      setPage((prev) => prev + 1);
    }
  }, []);

  // useEffect(() => {
  //   setIsScrollObservedState(isScrollObserved);
  // }, [isScrollObserved])

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: '0px',
      threshold: 1.0,
    };

    const observer = new IntersectionObserver(handleObserver, option);

    if (loadMoreRef.current)
      observer.observe(loadMoreRef.current);

  }, [handleObserver]);

  return { loadMoreRef, page };
}

export default useInfiniteScroll;