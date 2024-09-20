import { useEffect, useState } from 'react';

function useDebounce(value, timeout) {
  const [debounceValue, setDebounceValue] = useState(value);

  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebounceValue(value);
    }, timeout);

    // Return a cleanup function that clears the timeout
    return () => clearTimeout(timerId);

  }, [value]);

  return debounceValue;
}

const useInterval = (callback, delay) => {
  useEffect(() => {
    const intervalId = setInterval(callback, delay);

    return () => clearInterval(intervalId);
  }, [callback, delay]);
};

function useDimension() {
  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);

  const handleDimension = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };

  useEffect(() => {
    window.addEventListener('resize', handleDimension);
    return () => {
      window.removeEventListener('resize', handleDimension);
    };
  }, []);

  return { width, height };
}

function useMousePointer() {
  const [position, setPosition] = useState({ x: 0, y: 0 });

  const handleMouseMove = (e) => {
    setPosition({ x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return position;
}

function useIsOnline() {
  const [isOnline, setIsOnline] = useState(window.navigator.onLine);

  useEffect(() => {
    window.addEventListener('online', () => setIsOnline(true));
    window.addEventListener('offline', () => setIsOnline(false));
  }, []);

  return isOnline;
}

function SearchBar() {
  const [inputValue, setInputValue] = useState('');
  const debouncedValue = useDebounce(inputValue, 500);

  return (
    <div>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Search..."
      />
      <p>Debounced value: {debouncedValue}</p>
    </div>
  );
}

function App() {
  const isOnline = useIsOnline();
  const mousePointer = useMousePointer();
  const screenDimension = useDimension();
  const [count, setCount] = useState(0);

  useInterval(() => {
    setCount(c => c + 1);
  }, 1000);

  return (
    <>
      {isOnline ? "You are online yay!" : "You are not online"}
      <br />
      Your mouse position is {mousePointer.x} {mousePointer.y}
      <br />
      Your screen dimensions are {screenDimension.width} x {screenDimension.height}
      <br/>
      Timer is at {count}
      <br/>
      <SearchBar />
    </>
  );
}

export default App;
