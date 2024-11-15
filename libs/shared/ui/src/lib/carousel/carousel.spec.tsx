import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';

import Carousel from './carousel';

// TODO move this to an util test lib
window.ResizeObserver =
  window.ResizeObserver ||
  jest.fn().mockImplementation(() => ({
    disconnect: jest.fn(),
    observe: jest.fn(),
    unobserve: jest.fn(),
  }));

describe('Carousel', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Carousel />);
    expect(baseElement).toBeTruthy();
  });

  it('should display dots and arrows if properties are set', () => {
    const { baseElement } = render(<Carousel arrows dots />);

    expect(baseElement.getElementsByClassName('dots').length).toBe(1);
    expect(baseElement.getElementsByClassName('arrow--left').length).toBe(1);
    expect(baseElement.getElementsByClassName('arrow--right').length).toBe(1);
  });

  it('should display as many dots as slides are in the carousel', () => {
    const { baseElement } = render(
      <Carousel dots>
        <div>1 slide</div>
        <div>2nd slide</div>
      </Carousel>
    );

    expect(baseElement.getElementsByClassName('dot').length).toBe(2);
  });

  // TODO this test should be as integration test (running in a browser)
  xit('should display the number of slides specified', () => {
    const { baseElement } = render(
      <Carousel dots arrows slides={{ perView: 2 }}>
        <div>1st slide</div>
        <div>2nd slide</div>
        <div>3rd slide</div>
      </Carousel>
    );

    expect(
      baseElement.getElementsByClassName('keen-slider__slide').length
    ).toBe(3);
    expect(screen.getByText('1st slide')).toBeVisible();
    expect(screen.getByText('2nd slide')).toBeVisible();
    expect(screen.getByText('3rd slide')).not.toBeVisible();
  });

  // TODO this test should be as integration test (running in a browser)
  xit('should change the active dot when we click the arrows, without matter if it is an external or internal arrow', async () => {
    const { baseElement } = render(
      <Carousel dots arrows slides={{ perView: 2 }}>
        <div>1st slide</div>
        <div>2nd slide</div>
        <div>3rd slide</div>
      </Carousel>
    );

    // check the 3 dots
    let dots = baseElement.getElementsByClassName('dot');
    expect(dots[0]).toHaveClass('active');
    expect(dots[1]).not.toHaveClass('active');
    expect(dots[2]).not.toHaveClass('active');

    userEvent.click(baseElement.getElementsByClassName('arrow--left')[0]);

    dots = baseElement.getElementsByClassName('dot');

    expect(dots[0]).not.toHaveClass('active');
    expect(dots[1]).toHaveClass('active');
    expect(dots[2]).not.toHaveClass('active');
  });
});
