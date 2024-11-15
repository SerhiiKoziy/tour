import { Box, BoxProps } from '@chakra-ui/react';
import React, {
  ReactElement,
  forwardRef,
  useImperativeHandle,
  useState,
  SyntheticEvent,
  useEffect,
  useRef,
} from 'react';

import {
  KeenSliderInstance,
  KeenSliderOptions,
  KeenSliderPlugin,
  useKeenSlider,
} from 'keen-slider/react';
import './carousel.module.scss';

export interface CarouselProps extends KeenSliderOptions {
  children?: ReactElement | ReactElement[];
  arrows?: boolean;
  autoplay?: boolean;
  dots?: boolean;
  duration?: number;
  wrapperProps?: BoxProps;
}

export interface CarouselRefProps {
  next: () => void;
  prev: () => void;
}

interface ArrowProps {
  disabled: boolean;
  left?: boolean;
  onClick: (e: SyntheticEvent) => void;
}

const KeyboardControls: KeenSliderPlugin = (slider: KeenSliderInstance) => {
  let focused = false;

  function eventFocus() {
    focused = true;
  }

  function eventBlur() {
    focused = false;
  }

  function eventKeydown(e: KeyboardEvent) {
    if (!focused) return;
    switch (e.key) {
      default:
        break;
      case 'Left':
      case 'ArrowLeft':
        slider.prev();
        break;
      case 'Right':
      case 'ArrowRight':
        slider.next();
        break;
    }
  }

  slider.on('created', () => {
    slider.container.setAttribute('tabindex', '0');
    slider.container.addEventListener('focus', eventFocus);
    slider.container.addEventListener('blur', eventBlur);
    slider.container.addEventListener('keydown', eventKeydown);
  });
};

// NOTE: Keen Slider sets the width of each slide using JS/TS instead of using CSS
// that's why we need this Resize plugin
const ResizePlugin: KeenSliderPlugin = (slider: KeenSliderInstance) => {
  if (typeof window !== 'undefined') {
    const observer = new ResizeObserver(function () {
      slider.update();
    });

    slider.on('created', () => {
      observer.observe(slider.container);
    });
    slider.on('destroyed', () => {
      observer.unobserve(slider.container);
    });
  }
};

// TODO we can implement a carousel that only loads in the dom the number of slides per view + 1, to save some memory
// but we might lose the infinite loop feature. Also, after doing some testing, if we use the approach shown on the Keen Slider examples page
// we will see an issue with the flickering of the unstyled content
export const Carousel = forwardRef(
  ({ children, wrapperProps, ...settings }: CarouselProps, ref) => {
    // This is to have the arrows and dots features
    const [currentSlide, setCurrentSlide] = useState(0);
    const [loaded, setLoaded] = useState(false);
    const timer = useRef<number>();

    // helper variables
    const { loop, autoplay, arrows, dots, selector } = settings;
    const duration = settings?.duration ?? 4500;
    const newSelector = selector ?? '';
    // Default function settings
    const sliderSettings: KeenSliderOptions = {
      slideChanged(slider: KeenSliderInstance) {
        setCurrentSlide(slider.track.details?.rel);
      },
      created: () => {
        setLoaded(true);
      },
    };

    const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>(
      {
        ...sliderSettings,
        ...settings,
        selector: newSelector
          ? `.${newSelector}.keen-slider__slide`
          : '.keen-slider__slide',
      },
      [KeyboardControls, ResizePlugin]
    );

    // This code only runs on the client side
    // This is an improved way to handle the autoplay, it is more flexible and allow to activate or de-activate
    // the autoplay feature
    useEffect(() => {
      if (autoplay) {
        const animation = { duration, easing: (t: number) => t };

        timer.current = window?.setInterval(() => {
          instanceRef?.current?.moveToIdx(
            instanceRef?.current?.track.details?.abs + 1,
            true,
            animation
          );
        }, duration);
        return () => {
          window?.clearInterval(timer.current);
        };
      }
      return;
    }, [autoplay, timer, instanceRef, duration]);

    // In this way, we will handle a kind of interface, using an adapter to encapsulate implementation details to who will use this component
    // but if you want to implement a custom ref prop, the result will be the same, as you can read here https://stackoverflow.com/a/62931842
    useImperativeHandle(
      ref,
      (): CarouselRefProps => ({
        next: () => {
          instanceRef?.current?.next();
        },
        prev: () => {
          instanceRef?.current?.prev();
        },
      })
    );

    // Setting height=100% to navigation-wrapper and keen-slider boxes due to  there was an issue when the card was displayed on a XL view,
    // the caruousel image was not centered and it was higher than its container
    return (
      <>
        <Box className="navigation-wrapper" height="100%">
          <Box ref={sliderRef} className="keen-slider" height="100%">
            {React.Children.map(children, (child, index) => (
              <Box
                key={`slide-${index}`}
                className={
                  newSelector
                    ? `${newSelector} keen-slider__slide`
                    : 'keen-slider__slide'
                }
                {...wrapperProps}
              >
                {child}
              </Box>
            ))}
          </Box>
          {arrows && loaded && instanceRef?.current && (
            <>
              <Arrow
                left
                onClick={(e: SyntheticEvent) => {
                  e.stopPropagation();
                  // guard to avoid an error when there are no slides in the carousel
                  if (!instanceRef?.current?.track.details) {
                    return;
                  }
                  instanceRef.current?.prev();
                }}
                disabled={!loop && currentSlide === 0}
              />

              <Arrow
                onClick={(e: SyntheticEvent) => {
                  e.stopPropagation();
                  // guard to avoid an error when there are no slides in the carousel
                  if (!instanceRef?.current?.track.details) {
                    return;
                  }
                  instanceRef.current?.next();
                }}
                disabled={
                  !loop &&
                  currentSlide ===
                    instanceRef.current.track.details?.slides.length - 1
                }
              />
            </>
          )}
        </Box>
        {dots && loaded && instanceRef?.current && (
          <div className="dots">
            {[
              ...Array(instanceRef.current.track.details?.slides.length).keys(),
            ].map((idx) => {
              return (
                <button
                  key={idx}
                  onClick={() => {
                    instanceRef.current?.moveToIdx(idx);
                  }}
                  className={'dot' + (currentSlide === idx ? ' active' : '')}
                ></button>
              );
            })}
          </div>
        )}
      </>
    );
  }
);

// This may be improved in a future, but it works as needed
const Arrow = ({ disabled, left, onClick }: ArrowProps) => {
  const isDisabled = disabled ? ' arrow--disabled' : '';
  return (
    <svg
      onClick={onClick}
      className={`arrow ${left ? 'arrow--left' : 'arrow--right'} ${isDisabled}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
    >
      {left && (
        <path d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z" />
      )}
      {!left && <path d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z" />}
    </svg>
  );
};

export default Carousel;
