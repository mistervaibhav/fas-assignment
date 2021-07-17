import { useState, useRef, useEffect, useCallback } from 'react';

import axios from 'axios';

import Item from './components/item/Item';
import Box from './components/box/Box';

import './App.scss';

const App = () => {
  const [index, setIndex] = useState<number>(0);
  const [transition, setTransition] = useState<any>();

  const [page, setPage] = useState<number>(1);
  // const [max, setMax] = useState<number>(9);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [isPrevVisible, setIsPrevVisible] = useState<boolean>(true);
  const [isNextVisible, setIsNextVisible] = useState<boolean>(true);
  const [isLastItemReached, setIsLastItemReached] = useState<boolean>(false);

  const [items, setItems] = useState<Array<any>>([]);

  const containerRef = useRef<any>(null);
  const observer = useRef<any>(null);
  const lastItemRef = useCallback(
    (node) => {
      if (isLastItemReached) {
        return;
      }

      if (observer.current) {
        observer.current.disconnect();
      }

      observer.current = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          console.log('last item is visible');
          let nextPage = page + 1;
          setPage(nextPage);
          getData(nextPage);
        }
      });

      if (node) {
        observer.current.observe(node);
      }

      // console.log(node);
    },
    [items]
  );

  useEffect(() => {
    getData(page);
  }, []);

  useEffect(() => {
    console.log({ page });
  }, [page]);
  // useEffect(() => {
  //   console.log({ items });
  // }, [items]);

  useEffect(() => {
    if (index === 0) {
      setIsPrevVisible(false);
    } else {
      setIsPrevVisible(true);
    }
  }, [index]);

  function prevClickHandler() {
    const container = containerRef.current;
    const containerWidth = container.offsetWidth;

    let slide = index - 1;

    setTransition(slide * containerWidth);
    setIndex(slide);
    setIsNextVisible(true);
  }

  function nextClickHandler() {
    const container = containerRef.current;
    const containerWidth = container.offsetWidth;

    let slide = index + 1;

    setTransition(slide * containerWidth);
    setIndex(slide);
  }

  async function getData(nextPage: number) {
    if (isLastItemReached) {
      return;
    }

    setIsLoading(true);

    // console.log({ items });

    const endpoint = `http://localhost:5000/api/data`;

    // console.log('fetching data ');

    try {
      const response = await axios.get(endpoint, { params: { page: nextPage } });
      // console.log(response.config);
      // console.log(response.data[0]);
      // console.log({ items });
      // console.log(response.data);

      if (response.data.length === 0) {
        console.log('end of data !!');
        setIsLastItemReached(true);
        setIsNextVisible(false);
        setIsLoading(false);
        return;
      }

      let data = [...items, ...response.data];
      setItems([...data]);
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
    // if (index !== 0) {
    //   setIsNextVisible(false);
    // }
  }

  return (
    <Box
      containerRef={containerRef}
      onPrevClick={prevClickHandler}
      onNextClick={nextClickHandler}
      isPrevVisible={isPrevVisible}
      isNextVisible={isNextVisible}
    >
      {items.map((item, i) => {
        if (i === items.length - 1) {
          return <Item lastItemRef={lastItemRef} item={item} key={i} transition={transition} />;
        } else {
          return <Item item={item} key={i} transition={transition} />;
        }
      })}
    </Box>
  );
};

export default App;
