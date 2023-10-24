import { fireEvent, render, screen } from '@testing-library/react';
import { createRenderer } from 'react-dom/test-utils';
import { act } from 'react-dom/test-utils';

import IndexPage from '../pages/index';


const renderer = createRenderer();

const defaultComponent = <IndexPage />;

describe('<App />', () => {
  it('should render and match the snapshot', () => {
    renderer.render(defaultComponent);
    const renderedOutput = renderer.getRenderOutput();
    expect(renderedOutput).toMatchSnapshot();
  });
})