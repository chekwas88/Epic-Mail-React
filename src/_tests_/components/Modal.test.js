import React from 'react';
import { shallow } from 'enzyme';
import Modal from '../../components/Modal';

const props = {
  close: () => {},
  title: 'modal',
  classname: 'modal-view'
};

describe('Modal component should be rendered', () => {
  const modalComponent = shallow(<Modal {...props}><div>modal</div></Modal>);

  it('should contain a header element', () => {
    expect(modalComponent.find('header').exists()).toBe(true);
  });
  it('should have a button element', () => {
    expect(modalComponent.find('header').find('button'));
  });
});
