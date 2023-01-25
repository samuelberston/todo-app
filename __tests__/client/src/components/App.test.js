import React from 'react';
import { mount } from 'enzyme';

import App from '../../../../client/src/components/App';
import Header from '../../../../client/src/components/Header/Header';
import Body from '../../../../client/src/components/Body/Body';

// test App mounts and renders the Header and Body components
test('App mounts and renders the Header and Body components') {
    const wrapper = mount(<App />);
    const app = wrapper.find('.app');
    expect(app.exists()).to.be(true);
}

// test App calls componentDidMount
test('App calls componentDidMount', () => {
    sinon.spy(Foo.prototype, 'componentDidMount');
    const wrapper = mount(<Foo />);
    expect(Foo.prototype.componentDidMount).to.have.property('callCount', 1);
    // asset(Foo.prototype.componentDidMount.calledOnce);
});

// test App fetches todos (GET /todos)

// test App updates state