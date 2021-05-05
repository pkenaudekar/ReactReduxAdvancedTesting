import React from 'react';
import { mount } from 'enzyme';
import Root from 'Root';
import App from 'components/App';
import moxios from 'moxios';

beforeEach(() => {
  moxios.install(); // setup and intercept any request axios trys to issue and turn off any request issued by axios
  moxios.stubRequest('http://jsonplaceholder.typicode.com/comments', {
    status: 200,
    response: [{ name: 'Fetch #1' }, { name: 'Fetch #2' }],
  }); // intercept and trick axios for request on the url
});

afterEach(() => {
  moxios.uninstall();
});

it('can fetch a list of comments and display them', (done) => {
  const wrapper = mount(
    <Root>
      <App />
    </Root>
  );

  // find the 'fetchComments' button and click it
  wrapper.find('.fetch-comments').simulate('click');

  moxios.wait(() => {
    wrapper.update();

    // Expect to find a list of comments!
    expect(wrapper.find('li').length).toEqual(2);

    done();
    wrapper.unmount();
  });
});
